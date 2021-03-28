from django.contrib.auth.models import Group
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

from core.models import Lab, LabJoin, LabMember, LabMemberRoles
from core.permissions import PermissionResource, create_lab_group_admin, \
    create_lab_group_member, build_group_string, Role, delete_lab_group_admin, delete_lab_group_member


@receiver(post_save, sender=Lab)
def create_lab(instance: Lab, created, **kwargs):
    if created:
        admin_group, _member_group = create_lab_group_admin(instance), create_lab_group_member(instance)
        instance.created_by.groups.add(admin_group)
        LabMember.objects.create(role=LabMemberRoles.OWNER.value, user=instance.created_by, lab=instance, is_admin=True)


@receiver(pre_delete, sender=Lab)
def delete_lab(_sender, instance: Lab, **kwargs):
    delete_lab_group_admin(instance)
    delete_lab_group_member(instance)


@receiver(post_save, sender=LabJoin)
def create_lab_join(_sender, instance: LabJoin, created, **kwargs):
    if not created and instance.is_accepted:
        member_group = Group.objects.get(name=build_group_string(PermissionResource.LAB, Role.MEMBER, instance.id))
        instance.created_by.groups.add(member_group)
        LabMember(role=LabMemberRoles.OWNER.value, user=instance.created_by, lab=instance.lab, is_admin=True).save()
