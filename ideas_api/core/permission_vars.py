from enum import Enum


class CrudPermission(Enum):
    VIEW = "view"
    CREATE = "create"
    MODIFY = "modify"
    DELETE = "delete"


class CustomPermission(Enum):
    ACCEPT_JOIN = "accept_join"


class PermissionResource(Enum):
    LAB = "lab"
    LAB_JOIN = "lab_join"


class Role(Enum):
    ADMIN = "admin"
    MEMBER = "member"


def build_permission_string(permission_resource: PermissionResource, crud_permission: CrudPermission) -> str:
    return 'core.' + permission_resource.value + '_' + crud_permission.value


def build_group_string(permission_resource: PermissionResource, role: Role, id_str: str) -> str:
    return 'core.' + permission_resource.value + '_' + role.value + '_' + id_str


def build_permissions_model_meta(permissions: list[str]) -> tuple[tuple[str, str], ...]:
    def build_human_readable_permission(permission) -> str:
        return permission.replace("core.", "").replace("_", " ")

    return tuple(
        [(permission.replace("core.", ""), build_human_readable_permission(permission)) for permission in permissions])


lab_join_permissions = (build_permission_string(PermissionResource.LAB_JOIN, CrudPermission.DELETE),
                        build_permission_string(PermissionResource.LAB_JOIN, CrudPermission.MODIFY))

lab_permissions = (build_permission_string(PermissionResource.LAB, CrudPermission.VIEW),
                   build_permission_string(PermissionResource.LAB, CrudPermission.CREATE),
                   build_permission_string(PermissionResource.LAB, CrudPermission.MODIFY),
                   build_permission_string(PermissionResource.LAB, CrudPermission.DELETE))

lab_admin_permissions = lab_join_permissions + lab_permissions
