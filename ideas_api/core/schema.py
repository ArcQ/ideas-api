from django.core.exceptions import PermissionDenied, ValidationError
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from common.RelayIdParser import parse_relay_id
from core.models import Lab, Idea, User, LabMember
from core.permissions import CrudPermission, PermissionResource, is_allowed_on_lab


class IdeaNode(DjangoObjectType):
    class Meta:
        model = Idea
        filter_fields = {
            'title': ['exact', 'icontains'],
            'desc': ['exact', 'icontains'],
            'notes': ['exact', 'icontains'],
            'lab_id': ['exact'],
        }
        interfaces = (relay.Node,)

    @classmethod
    def get_queryset(cls, queryset, info):
        try:
            lab_id_args = list(filter(lambda field: field.name.value == "labId", info.field_asts[0].arguments))
            if len(lab_id_args) > 0:
                lab_id = parse_relay_id(lab_id_args[0].value.value)
                if is_allowed_on_lab(PermissionResource.LAB, CrudPermission.VIEW, info.context.user, lab_id):
                    return queryset.order_by('-created_at')
            else:
                raise PermissionDenied("You need to submit a lab to access ideas")
        except:
            raise ValidationError("Could not parse lab id")


class LabNode(DjangoObjectType):
    class Meta:
        model = Lab
        filter_fields = {
            'name': ['exact', 'icontains', 'istartswith'],
        }
        interfaces = (relay.Node,)

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset.filter(labmember__user_id=info.context.user.id)


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = {
            'username': ['exact', 'icontains', 'istartswith'],
            'auth_key': ['exact'],
        }
        interfaces = (relay.Node,)


class Query(ObjectType):
    lab = relay.Node.Field(LabNode)
    my_labs = DjangoFilterConnectionField(LabNode)

    user = relay.Node.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)

    idea = relay.Node.Field(IdeaNode)
    my_ideas = DjangoFilterConnectionField(IdeaNode)
