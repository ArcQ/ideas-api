from rest_framework.relations import PrimaryKeyRelatedField

from core.models import Lab, User

from rest_framework import serializers

class IdeaSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['id', 'title', 'account_name', 'users', 'created_by']
