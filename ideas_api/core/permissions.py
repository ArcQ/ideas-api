from enum import Enum

from django.core.exceptions import PermissionDenied

from core.models import LabMember, User


class CrudPermission(Enum):
    VIEW = "view"
    CREATE = "create"
    MODIFY = "modify"
    DELETE = "delete"


class PermissionResource(Enum):
    LAB = "lab"
    LAB_JOIN = "lab_join"


def build_permission_string(permission_resource: PermissionResource, crud_permission: CrudPermission, id: str):
    return 'core.' + crud_permission.value + '_' + permission_resource.value + '_' + id


def lab_admin_permissions(lab_id: str):
    return [build_permission_string(PermissionResource.LAB_JOIN, CrudPermission.DELETE, lab_id)
            build_permission_string(PermissionResource.LAB, CrudPermission.CREATE, lab_id),
            build_permission_string(PermissionResource.LAB, CrudPermission.MODIFY, lab_id),
            build_permission_string(PermissionResource.LAB, CrudPermission.DELETE, lab_id)]


# view is automatic if you're a member
def is_allowed_on_lab(permission_resource: PermissionResource, crud_permission: CrudPermission, user: User,
                      lab_id: str) -> bool:
    build_permission_string()
    if LabMember.objects.filter(user_id=user.id,
                                lab_id=lab_id).count() > 0 \
            and crud_permission == CrudPermission.VIEW \
            and user.has_perm(build_permission_string(permission_resource, crud_permission)):
        return True
    else:
        raise PermissionDenied("You do not have permission to access the requested lab")

