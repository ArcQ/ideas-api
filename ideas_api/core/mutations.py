from graphene_django.rest_framework.mutation import SerializerMutation

import graphene
from common.RelayIdParser import parse_relay_id
from core.models import Idea, Lab, LabJoin
from core.permissions import is_allowed_on_lab, CrudPermission, PermissionResource
from core.serializers import IdeaSerializer, LabJoinSerializer, LabSerializer


class LabMutation(SerializerMutation):
    class Meta:
        serializer_class = LabSerializer

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user_id = info.context.user.id
        input['created_by_id'] = parse_relay_id(input['created_by_id'])
        input['lab_id'] = parse_relay_id(input['lab_id'])
        permission = CrudPermission.MODIFY if input['id'] else CrudPermission.CREATE

        if is_allowed_on_lab(PermissionResource.LAB, permission, user_id, input['lab_id']):
            return super().mutate_and_get_payload(root, info, **input)


class DeleteLabMutation(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **input):
        user = info.context.user
        if is_allowed_on_lab(PermissionResource.LAB, CrudPermission.DELETE, user, input['lab_id']):
            obj = Lab.objects.get(pk=input['id'])
            obj.delete()
            return cls(ok=True)


class IdeaMutation(SerializerMutation):
    created_by_id = graphene.ID()
    lab_id = graphene.ID()

    class Meta:
        serializer_class = IdeaSerializer

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        input['created_by_id'] = parse_relay_id(input['created_by_id'])
        input['lab_id'] = parse_relay_id(input['lab_id'])
        if is_allowed_on_lab(PermissionResource.LAB, CrudPermission.VIEW, info.context.user, input['lab_id']):
            return super().mutate_and_get_payload(root, info, **input)


class DeleteIdeaMutation(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **input):
        if is_allowed_on_lab(PermissionResource.LAB, CrudPermission.VIEW, info.context.user, input['lab_id']):
            obj = Idea.objects.get(pk=input['id'])
            obj.delete()
            return cls(ok=True)


class LabJoinMutation(SerializerMutation):
    created_by_id = graphene.ID()
    lab_id = graphene.ID()

    class Meta:
        serializer_class = LabJoinSerializer
        lookup_field = 'id'

    # any one can create lab, but no uppdates
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        input['created_by_id'] = info.context.user.id
        input['lab_id'] = parse_relay_id(input['lab_id'])
        if input['id'] and is_allowed_on_lab(PermissionResource.LAB_JOIN, CrudPermission.MODIFY, info.context.user,
                                             input['lab_id']):
            input['accepted_by'] = info.context.user.id
            return super().mutate_and_get_payload(root, info, **input)
        return super().mutate_and_get_payload(root, info, **input)


class DeleteLabJoinMutation(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **input):
        lab_join = LabJoin.objects.get(pk=input['id'])
        if is_allowed_on_lab(PermissionResource.LAB_JOIN, CrudPermission.DELETE, info.context.user, lab_join.lab_id):
            lab_join.delete()
            return cls(ok=True)


class Mutation(graphene.ObjectType):
    lab = LabMutation.Field()
    delete_lab = DeleteLabMutation.Field()

    idea = IdeaMutation.Field()
    delete_idea = DeleteIdeaMutation.Field()
