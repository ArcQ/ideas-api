from core.models import Idea

from rest_framework import serializers


class IdeaSerializer(serializers.Serializer):
    class Meta:
        model = Idea
        fields = ('title', 'desc', 'notes', 'created_by', 'lab')
