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
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    auth_key = models.CharField(max_length=255, unique=True)
    image_url = models.CharField(max_length=255)
    email = models.EmailField()

    def __str__(self):
        return self.username + " " + self.auth_key


class Lab(GenericModel):
    name = models.ManyToManyField(User)
    members = models.ManyToManyField(User)
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='created_by')
    owned_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='owned_by')
    image_url = models.URLField(max_length=255, default='https://source.unsplash.com/random/1000x1000')


class Idea(GenericModel):
    title = models.CharField(max_length=50)
    desc = models.CharField(max_length=140)
    notes = models.CharField(max_length=1000)
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='created_by')
    owned_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='owned_by')
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE)
