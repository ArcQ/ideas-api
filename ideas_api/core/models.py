import uuid
import string
import random
from enum import Enum

from django.contrib.auth.models import AbstractUser
from django.db import models

from core.permission_vars import build_permissions_model_meta, lab_admin_permissions


class LabJoinStatus(Enum):
    ACCEPTED = 'accepted'
    DENIED = 'denied'
    AWAITING = 'awaiting'

    @classmethod
    def is_valid_update(cls, value):
        return value in [cls.ACCEPTED.value, cls.DENIED.value]


class LabMemberRoles(Enum):
    MEMBER = 'member'
    ADMIN = 'admin'
    OWNER = 'owner'


def random_code():
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(2)) + str(random.randint(1000, 9999))


class GenericModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    auth_key = models.CharField(max_length=255, unique=True)
    image_url = models.CharField(max_length=255)
    email = models.EmailField()
    is_active = models.BooleanField(default=True)

    is_authenticated = True

    def __str__(self):
        return self.username + " " + self.auth_key


class Lab(GenericModel):
    name = models.CharField(max_length=255)
    # desc = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    image_url = models.URLField(max_length=255, default='https://source.unsplash.com/random/1000x1000')
    chat_id = models.CharField(max_length=255)
    code = models.CharField(max_length=55, default=random_code, unique=True)

    class Meta:
        permissions = build_permissions_model_meta(lab_admin_permissions)


class LabMember(GenericModel):
    role = models.CharField(max_length=255)
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    lab = models.ForeignKey(Lab, null=False, on_delete=models.CASCADE)
    is_admin = models.BooleanField(null=True)


class Idea(GenericModel):
    title = models.CharField(max_length=50)
    desc = models.CharField(max_length=140)
    notes = models.CharField(max_length=1000, blank=True)
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE)


class LabJoin(GenericModel):
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name="lab_join_created",
                                   unique=False)
    handled_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name="lab_join_accepted")
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default=LabJoinStatus.AWAITING.value)

    class Meta:
        unique_together = (('created_by', 'lab'),)
