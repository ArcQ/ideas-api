from graphene_django import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation

import graphene
from core.models import Idea
from core.serializers import IdeaSerializer


class IdeaType(DjangoObjectType):
    class Meta:
        model = Idea


class CreateIdeaMutation(SerializerMutation):
    class Meta:
        serializer_class = IdeaSerializer
        model_operations = ['create', 'update']
        lookup_field = 'id'


class Mutation(graphene.ObjectType):
    create_idea = CreateIdeaMutation.Field()
