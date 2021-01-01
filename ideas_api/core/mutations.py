from graphene_django import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation

import graphene
from core.models import Idea


class IdeaType(DjangoObjectType):
    class Meta:
        model = Idea
        fields = '__all__'


from core.serializers import IdeaSerializer


class IdeaMutation(SerializerMutation):
    class Meta:
        serializer_class = IdeaSerializer
        model_operations = ['create', 'update']
        lookup_field = 'id'


class Mutation(graphene.ObjectType):
    idea = IdeaMutation.Field()
