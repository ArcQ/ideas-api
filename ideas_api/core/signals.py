from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

from core.models import Lab
from core.permissions import build_permission_string, PermissionResource, CrudPermission


@receiver(post_save, sender=Lab)
def create_lab(sender, instance: Lab, created, raw, using, update_fields):
    if created:
        instance.created_by.user_permissions.add(
            build_permission_string(PermissionResource.LAB, CrudPermission.CREATE),
            build_permission_string(PermissionResource.LAB, CrudPermission.MODIFY),
            build_permission_string(PermissionResource.LAB, CrudPermission.DELETE))


@receiver(pre_delete, sender=Lab)
def delete_lab(sender, instance: Lab, using):
    instance.created_by.user_permissions.remove(
        build_permission_string(PermissionResource.LAB, crud_permission))
