from graphene_django.rest_framework.mutation import SerializerMutation

import graphene

import core.schema
from core.models import Idea
from core.serializers import IdeaSerializer


class IdeaMutation(SerializerMutation):
    created_by_id = graphene.ID()
    lab_id = graphene.ID()

    class Meta:
        serializer_class = IdeaSerializer
        lookup_field = 'id'


class DeleteIdeaMutation(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **kwargs):
        obj = Idea.objects.get(pk=kwargs["id"])
        obj.delete()
        return cls(ok=True)


class Mutation(graphene.ObjectType):
    idea = IdeaMutation.Field()
    delete_idea = DeleteIdeaMutation.Field()