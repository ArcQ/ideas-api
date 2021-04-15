from uuid import UUID

from django.core.exceptions import PermissionDenied
from graphene_django.rest_framework.mutation import SerializerMutation

import graphene
from core.models import Idea, Lab
from core.permission_vars import build_permission_string
from core.permissions import CrudPermission, PermissionResource
from core.serializers import IdeaSerializer, LabJoinSerializer, LabSerializer


def is_create(input):
    return 'id' not in input.keys()


class LabMutation(SerializerMutation):
    class Meta:
        serializer_class = LabSerializer

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        if is_create(input):
            input['created_by_id'] = info.context.user.id
            return super().mutate_and_get_payload(root, info, **input)
        elif info.context.user.has_perm(
                build_permission_string(PermissionResource.LAB, CrudPermission.MODIFY), Lab.objects.get(input['id'])):
            return super().mutate_and_get_payload(root, info, **input)


class DeleteLabMutation(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **input):
        lab = Lab.objects.get(pk=UUID(input['id']))
        if info.context.user.has_perm(
                build_permission_string(PermissionResource.LAB, CrudPermission.DELETE), lab):
            lab.delete()
            return cls(ok=True)


class IdeaMutation(SerializerMutation):
    lab_id = graphene.ID()

    class Meta:
        serializer_class = IdeaSerializer

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        if is_create(input):
            return cls.create(root, info, **input)
        else:
            return cls.update(root, info, **input)

    @classmethod
    def create(cls, root, info, **input):
        input['created_by_id'] = info.context.user.id
        if not info.context.user.has_perm(build_permission_string(PermissionResource.LAB, CrudPermission.VIEW),
                                          Lab.objects.get(pk=UUID(input['lab_id']))):
            raise PermissionDenied("You do not have permission to access ideas on the requested lab")
        return super().mutate_and_get_payload(root, info, **input)

    @classmethod
    def update(cls, root, info, **input):
        idea = Idea.objects.get(pk=input['id'])
        if not info.context.user.has_perm(build_permission_string(PermissionResource.LAB, CrudPermission.VIEW),
                                          idea.lab):
            raise PermissionDenied("You do not have permission to access ideas on the requested lab")
        return super().mutate_and_get_payload(root, info, **input)


class DeleteIdeaMutation(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **input):
        idea = Idea.objects.get(pk=UUID(input['id']))
        if info.context.user.has_perm(build_permission_string(PermissionResource.LAB, CrudPermission.VIEW),
                                      idea.lab):
            idea.delete()
            return cls(ok=True)


class LabJoinMutation(SerializerMutation):
    lab_id = graphene.ID()

    class Meta:
        serializer_class = LabJoinSerializer
        lookup_field = 'id'

    # any one can create lab, but no updates
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        if is_create(input):
            input['created_by_id'] = info.context.user.id
            return super().mutate_and_get_payload(root, info, **input)

        lab = Lab.objects.get(labjoin__id=UUID(input['id']))
        if not info.context.user.has_perm(
                build_permission_string(PermissionResource.LAB, CrudPermission.MODIFY), lab):
            raise PermissionDenied('You dont have permissions to act on this lab')

        input['handled_by'] = info.context.user.id
        return super().mutate_and_get_payload(root, info, **input)


class Mutation(graphene.ObjectType):
    lab = LabMutation.Field()
    delete_lab = DeleteLabMutation.Field()

    idea = IdeaMutation.Field()
    delete_idea = DeleteIdeaMutation.Field()

    lab_join = LabJoinMutation.Field()
