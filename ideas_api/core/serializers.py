from core.models import Idea, User, Lab, LabJoin, LabJoinStatus
from django.db import IntegrityError

from rest_framework import serializers

import logging

logger = logging.getLogger("mylogger")


class LabJoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabJoin
        fields = '__all__'
        read_only_fields = ['lab', 'created_by']

    def update(self, instance, validated_data):
        if instance.status == LabJoinStatus.AWAITING or LabJoinStatus.DENIED:
            instance.handled_by = validated_data.get('handled_by', instance.accepted_by)
            instance.status = validated_data.get('status', LabJoinStatus.is_valid_update(instance.status))
            return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'auth_key', 'image_url', 'email']


class LabSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    # write
    created_by_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='created_by',
                                                       write_only=True, required=False)

    class Meta:
        model = Lab
        fields = '__all__'
        read_only_fields = ['code']

    def create(self, validated_data):
        # regenerate code if non unique
        count = 0
        while count < 3:
            try:
                return super().create(validated_data)
            except IntegrityError:
                print("generated duplicate code, retrying")
            count += 1

        return super().create(validated_data)


class IdeaSerializer(serializers.ModelSerializer):
    # read only
    created_by = UserSerializer(read_only=True)
    lab = LabSerializer(read_only=True)
    # write
    created_by_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='created_by',
                                                       write_only=True, required=False)
    lab_id = serializers.PrimaryKeyRelatedField(queryset=Lab.objects.all(), source='lab', write_only=True,
                                                required=False)

    class Meta:
        model = Idea
        fields = ('id', 'title', 'desc', 'notes', 'created_by', 'lab', 'created_by_id', 'lab_id')
        extra_kwargs = {
            'id': {'read_only': False, 'required': False},
            'lab_id': {'read_only': False, 'required': False},
            'created_by_id': {'read_only': False, 'required': False}
        }

    def update(self, instance, validated_data):
        # create only fields, don't allow changing for this version
        if 'lab_id' in validated_data:
            validated_data.pop('lab_id')
        if 'created_by_id' in validated_data:
            validated_data.pop('created_by_id')
        if 'chat_id' in validated_data:
            validated_data.pop('chat_id')

        return super().update(instance, validated_data)
