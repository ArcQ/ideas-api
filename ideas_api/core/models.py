import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


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

    def __str__(self):
        return self.username + " " + self.auth_key


class Lab(GenericModel):
    name = models.URLField(max_length=255)
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    image_url = models.URLField(max_length=255, default='https://source.unsplash.com/random/1000x1000')


class LabMember(GenericModel):
    role = models.CharField(max_length=255)
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    lab = models.ForeignKey(Lab, null=False, on_delete=models.CASCADE)


class Idea(GenericModel):
    title = models.CharField(max_length=50)
    desc = models.CharField(max_length=140)
    notes = models.CharField(max_length=1000, blank=True)
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE)
