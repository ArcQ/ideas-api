import uuid

from django.contrib.auth.models import Group
from django.db.models.signals import post_save, pre_delete, pre_save
from django.dispatch import receiver

from chat.EventProducer import EventsProducer
from core.models import Lab, LabJoin, LabMember, LabMemberRoles, LabJoinStatus, User
from core.permissions import PermissionResource, create_lab_group_admin, \
    create_lab_group_member, build_group_string, Role, delete_lab_group_admin, delete_lab_group_member

events_producer = EventsProducer()


@receiver(post_save, sender=Lab)
def create_lab(instance: Lab, created, **kwargs):
    if created:
        events_producer.send_upsert_chat_entity(members=[{"user": {"authKey": instance.created_by.auth_key}}],
                                                lab_id=str(instance.id), chat_id=instance.chat_id, name=instance.name)
        admin_group, _member_group = create_lab_group_admin(instance), create_lab_group_member(instance)
        instance.created_by.groups.add(admin_group)
        LabMember.objects.create(role=LabMemberRoles.OWNER.value, user=instance.created_by, lab=instance, is_admin=True)


@receiver(pre_delete, sender=Lab)
def delete_lab(instance: Lab, **kwargs):
    events_producer.send_delete_chat_entity(chat_id=instance.chat_id)
    delete_lab_group_admin(instance)
    delete_lab_group_member(instance)


@receiver(post_save, sender=LabJoin)
def create_lab_join(instance: LabJoin, created, **kwargs):
    # if join accepted
    if not created and instance.status is LabJoinStatus.ACCEPTED.value:
        events_producer.send_add_chat_member(user_auth_key=instance.created_by.auth_key, chat_id=instance.lab.chat_id)
        member_group = Group.objects.get(name=build_group_string(PermissionResource.LAB, Role.MEMBER, instance.id))
        instance.created_by.groups.add(member_group)
        LabMember.objects.create(role=LabMemberRoles.OWNER.value, user=instance.created_by, lab=instance.lab,
                                 is_lab_admin=True)


#for django admin user
@receiver(pre_save, sender=User)
def create_admin_user(instance: User, **kwargs):
    if instance.is_superuser is True:
         instance.auth_key = uuid.uuid4()
