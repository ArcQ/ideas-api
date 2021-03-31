from django.contrib.auth.models import Group
from django.core.exceptions import PermissionDenied
from guardian.shortcuts import assign_perm, remove_perm

from core.models import LabMember, User, Lab
from core.permission_vars import CrudPermission, PermissionResource, Role, build_permission_string, build_group_string, \
    lab_admin_permissions


def create_lab_group_admin(instance: Lab) -> Group:
    group = Group.objects.create(name=build_group_string(PermissionResource.LAB, Role.ADMIN, str(instance.id)))
    for perm_str in lab_admin_permissions:
        assign_perm(perm_str, group, instance)
    return group


def create_lab_group_member(instance: Lab):
    group = Group.objects.create(name=build_group_string(PermissionResource.LAB, Role.MEMBER, str(instance.id)))
    for perm_str in [build_permission_string(PermissionResource.LAB, CrudPermission.VIEW)]:
        assign_perm(perm_str, group, instance)
    return group


def delete_lab_group_admin(instance: Lab):
    group = Group.objects.get(name=build_group_string(PermissionResource.LAB, Role.ADMIN, str(instance.id)))
    for perm_str in lab_admin_permissions:
        remove_perm(perm_str, group, instance)
    group.delete()


def delete_lab_group_member(instance: Lab):
    group = Group.objects.get(name=build_group_string(PermissionResource.LAB, Role.MEMBER, str(instance.id)))
    for perm_str in [build_permission_string(PermissionResource.LAB, CrudPermission.VIEW)]:
        remove_perm(perm_str, group, instance)
    group.delete()


# view is automatic if you're a member
def is_allowed_on_lab(permission_resource: PermissionResource, crud_permission: CrudPermission, role: Role, user: User,
                      lab_id: str) -> bool:
    if LabMember.objects.filter(user_id=user.id,
                                lab_id=lab_id).count() > 0 \
            and user.has_perm(build_permission_string(permission_resource, crud_permission),
                              Lab.objects.get(pk=lab_id)):
        return True
    else:
        raise PermissionDenied("You do not have permission to access the requested lab")
