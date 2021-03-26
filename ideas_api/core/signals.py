from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

from core.models import Lab, LabJoin, LabMember, LabMemberRoles
from core.permissions import build_permission_string, PermissionResource, CrudPermission


@receiver(post_save, sender=Lab)
def create_lab(instance: Lab, created, **kwargs):
    if created:
        instance.created_by.user_permissions.add(
            build_permission_string(PermissionResource.LAB, CrudPermission.CREATE, str(instance.id)),
            build_permission_string(PermissionResource.LAB, CrudPermission.MODIFY, str(instance.id)),
            build_permission_string(PermissionResource.LAB, CrudPermission.DELETE, str(instance.id)))
        LabMember.objects.create(role=LabMemberRoles.OWNER.value, user=instance.created_by, lab=instance, is_admin=True)


@receiver(pre_delete, sender=Lab)
def delete_lab(_sender, instance: Lab, **kwargs):
    instance.created_by.user_permissions.remove(
        build_permission_string(PermissionResource.LAB, CrudPermission.DELETE, instance.id))


@receiver(post_save, sender=LabJoin)
def create_lab_join(_sender, instance: LabJoin, created, **kwargs):
    if not created and instance.is_accepted:
        instance.created_by.user_permissions.add(
            build_permission_string(PermissionResource.LAB, CrudPermission.CREATE, instance.id))
        LabMember(role=LabMemberRoles.OWNER.value, user=instance.created_by, lab=instance.lab, is_admin=True).save()