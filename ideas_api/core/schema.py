import base64
from uuid import UUID

from django.core.exceptions import PermissionDenied, ValidationError
from django_filters import OrderingFilter
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from core.models import Lab, Idea, User, LabMember


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
        order_by = OrderingFilter(
            fields=(
                'created_at',
            )
        )

    @classmethod
    def get_queryset(cls, queryset, info):
        try:
            lab_id_args = list(filter(lambda field: field.name.value == "labId", info.field_asts[0].arguments))
            if len(lab_id_args) > 0:
                lab_id_bytes = base64.b64decode(lab_id_args[0].value.value)
                lab_id_str = lab_id_bytes.decode("ascii").split("LabNode:")[1]
                if LabMember.objects.filter(user_id=info.context.user.id,
                                            lab_id=UUID(lab_id_str)).count() > 0:
                    return queryset
                else:
                    raise PermissionDenied("You do not have permission to access the requested lab")
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
