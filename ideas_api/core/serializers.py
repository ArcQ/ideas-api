from core.models import Idea, User, Lab

from rest_framework import serializers

import logging
logger = logging.getLogger("mylogger")


class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'auth_key', 'image_url', 'email']


class IdeaSerializer(serializers.ModelSerializer):
    # read only
    created_by = UserSerializer(read_only=True)
    lab = LabSerializer(read_only=True)
    # write
    created_by_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='created_by', write_only=True)
    lab_id = serializers.PrimaryKeyRelatedField(queryset=Lab.objects.all(), source='lab', write_only=True)

    class Meta:
        model = Idea
        fields = ('title', 'desc', 'notes', 'created_by', 'lab', 'created_by_id', 'lab_id')
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }