from uuid import UUID

import django_filters
import graphene
from django.core.exceptions import PermissionDenied
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from core.models import Lab, Idea, User, LabJoin, LabMember
from core.permission_vars import build_permission_string
from core.permissions import CrudPermission, PermissionResource


class RegularIdNode(relay.Node):
    class Meta:
        name = 'Node'

    @classmethod
    def node_resolver(cls, only_type, root, info, id):
        return cls.get_node_from_global_id(info, id, only_type=only_type)

    @classmethod
    def from_global_id(cls, type, id):
        return UUID(id)

    @classmethod
    def to_global_id(cls, type, id):
        return id

    @classmethod
    def get_node_from_global_id(cls, info, global_id, only_type=None):
        return super().get_node_from_global_id(cls, info, UUID(global_id), only_type=None)


class IdeaNode(DjangoObjectType):
    lab__id = django_filters.ModelChoiceFilter(queryset=Lab.objects.all().values_list('id', flat=True))

    class Meta:
        model = Idea
        filter_fields = {
            'title': ['exact', 'icontains'],
            'desc': ['exact', 'icontains'],
            'notes': ['exact', 'icontains'],
            'lab__id': ['exact'],
        }
        interfaces = (RegularIdNode,)

    @classmethod
    def get_queryset(cls, queryset, info):
        lab_id_args = list(filter(lambda field: field.name.value == "lab_Id", info.field_asts[0].arguments))
        if len(lab_id_args) > 0:
            lab_id = info.variable_values['lab_Id'] or UUID(lab_id_args[0].value.value)
            if info.context.user.has_perm(build_permission_string(PermissionResource.LAB, CrudPermission.VIEW),
                                          Lab.objects.get(pk=lab_id)):
                return queryset.order_by('-created_at')
        else:
            raise PermissionDenied("You need to submit a lab to access ideas")


class LabNode(DjangoObjectType):
    class Meta:
        model = Lab
        filter_fields = {
            'name': ['exact', 'icontains', 'istartswith'],
            'code': ['exact'],
        }
        interfaces = (RegularIdNode,)

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset.filter(labmember__user_id=info.context.user.id)


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = {
            'username': ['exact', 'icontains', 'istartswith'],
            'auth_key': ['exact'],
        }
        interfaces = (RegularIdNode,)


class LabJoinNode(DjangoObjectType):
    lab__id = django_filters.ModelChoiceFilter(queryset=Lab.objects.all().values_list('id', flat=True))

    class Meta:
        model = LabJoin
        interfaces = (RegularIdNode,)
        filter_fields = {
            'lab__id': ['exact'],
        }

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset


class LabMemberNode(DjangoObjectType):
    lab__id = django_filters.ModelChoiceFilter(queryset=Lab.objects.all().values_list('id', flat=True))

    class Meta:
        model = LabMember
        interfaces = (RegularIdNode,)
        filter_fields = {
            'lab__id': ['exact'],
        }

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset


class Query(ObjectType):
    lab = graphene.Field(LabNode, id=graphene.UUID())
    my_labs = DjangoFilterConnectionField(LabNode)

    my_user = graphene.Field(UserNode, id=graphene.UUID())
    all_users = DjangoFilterConnectionField(UserNode)

    idea = graphene.Field(IdeaNode, id=graphene.UUID())
    my_ideas = DjangoFilterConnectionField(IdeaNode)

    lab_join = graphene.Field(LabJoinNode, id=graphene.UUID())
    my_lab_joins = DjangoFilterConnectionField(LabJoinNode)

    lab_member = graphene.Field(LabMemberNode, id=graphene.UUID())
    my_lab_members = DjangoFilterConnectionField(LabMemberNode)

    def resolve_lab(root, info, id):  # noqa
        if info.context.user.has_perm(build_permission_string(PermissionResource.LAB, CrudPermission.VIEW),
                                      Lab.objects.get(pk=id)):
            return Lab.objects.get(pk=id, labmember__user_id=info.context.user.id)
        raise PermissionDenied("Not allowed")

    def resolve_my_user(root, info, id):  # noqa
        # only implemented for retrieving your own profile
        if info.context.user.id == id:
            return info.context.user
        raise PermissionDenied("Not allowed")

    def resolve_idea(root, info, id):  # noqa
        idea = Idea.objects.get(pk=id)
        if info.context.user.has_perm(build_permission_string(PermissionResource.LAB, CrudPermission.VIEW),
                                      idea.lab):
            return idea
        raise PermissionDenied("Not allowed")
