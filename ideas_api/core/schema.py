from uuid import UUID

from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from core.models import Lab, Idea, User


class IdeaNode(DjangoObjectType):
    class Meta:
        model = Idea
        filter_fields = {
            'title': ['exact', 'icontains'],
            'desc': ['exact', 'icontains'],
            'notes': ['exact', 'icontains'],
        }
        interfaces = (relay.Node,)


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
        # return queryset.filter(labmember__lab_id=UUID("09594ad2-2987-4bed-9e3d-9964cd110941")).distinct()
        # return queryset.filter(labmember__user_id=UUID("496e392c-3a70-4ed6-9d2e-ecaaea0a997d")).distinct()
        # return queryset


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
    all_ideas = DjangoFilterConnectionField(IdeaNode)