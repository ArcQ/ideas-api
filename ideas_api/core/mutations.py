from graphene_django import DjangoObjectType

import graphene
from core.models import Idea
from core.serializers import IdeaSerializer


class IdeaType(DjangoObjectType):
    class Meta:
        model = Idea
        model_operations = ['create', 'update']


class IdeaMutation(graphene.Mutation):
    # class Meta:
    #     serializer_class = IdeaSerializer
    class Arguments:
        # The input arguments for this mutation
        title = graphene.String(required=True)
        desc = graphene.String(required=True)
        lab_id = graphene.PrimaryKey(Lab)
        created_by = graphene.PrimaryKey(User)

    idea = graphene.Field(IdeaType)
    title = graphene.String()

    @classmethod
    def mutate(cls, root, info, title, desc, lab_id, created_by):
        # idea = Idea.objects.get(pk=id)
        idea = Idea(title=title, desc=desc, lab_id=lab_id, created_by=created_by)
        idea.save()
        # Notice we return an instance of this mutation
        return IdeaMutation(idea=idea)


class Mutation(graphene.ObjectType):
    update_idea = IdeaMutation.Field()
