from graphene_django import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation

import graphene
import core.schema
from core.serializers import IdeaSerializer


class IdeaMutation(SerializerMutation):
    created_by_user_id = graphene.ID()
    lab_id = graphene.ID()

    class Meta:
        serializer_class = IdeaSerializer


class Mutation(graphene.ObjectType):
    idea = IdeaMutation.Field()

