from graphene import relay, ObjectType, Schema
from graphene_django.filter import DjangoFilterConnectionField

from core.schema import LabNode, UserNode, IdeaNode


class Query(ObjectType):
    lab = relay.Node.Field(LabNode)
    all_labs = DjangoFilterConnectionField(LabNode)

    user = relay.Node.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)

    idea = relay.Node.Field(IdeaNode)
    all_ideas = DjangoFilterConnectionField(IdeaNode)


schema = Schema(query=Query)
