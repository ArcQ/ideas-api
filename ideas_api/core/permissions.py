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


# view is automatic if you're a member
def is_allowed_on_lab(permission_resource: PermissionResource, crud_permission: CrudPermission, user: User,
                      lab_id: str) -> bool:
    if LabMember.objects.filter(user_id=user.id,
                                lab_id=lab_id).count() > 0:
        return crud_permission == CrudPermission.VIEW and user.has_perm(
            'core.' + crud_permission.value + '_' + permission_resource.value)
    else:
        raise PermissionDenied("You do not have permission to access the requested lab")
