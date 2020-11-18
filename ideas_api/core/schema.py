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
    all_labs = DjangoFilterConnectionField(LabNode)

    user = relay.Node.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)

    idea = relay.Node.Field(IdeaNode)
    all_ideas = DjangoFilterConnectionField(IdeaNode)