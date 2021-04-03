from abc import abstractmethod

from core.models import Idea, User, Lab, LabJoin, LabJoinStatus
from django.db import IntegrityError

from rest_framework import serializers

import logging

logger = logging.getLogger("mylogger")

generic_read_only_fields = ['created_at', 'updated_at']


class WithCreateOnlyModelSerializer(serializers.ModelSerializer):
    class Meta:
        create_only_fields = ()

    def _check_if_create_only(self, validated_data):
        for key in validated_data.keys():
            if key in self.Meta.create_only_fields:
                raise serializers.ValidationError(f'{key} is a create only key')

    @abstractmethod
    def update(self, instance, validated_data):
        if 'create_only_fields' in self.Meta.keys():
            self._check_if_create_only(validated_data)

        return super().update(instance, validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class LabSerializer(WithCreateOnlyModelSerializer):
    created_by = UserSerializer(read_only=True)
    # write
    created_by_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='created_by',
                                                       write_only=True, required=False)

    class Meta:
        model = Lab
        fields = '__all__'
        read_only_fields = ['code'] + generic_read_only_fields
        create_only_fields = ['created_by_id', 'created_by']

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


class LabJoinSerializer(WithCreateOnlyModelSerializer):
    created_by = UserSerializer(read_only=True)
    lab = LabSerializer(read_only=True)
    # write
    created_by_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='created_by',
                                                       write_only=True, required=False)
    handled_by_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='handled_by',
                                                       write_only=True, required=False)
    lab_id = serializers.PrimaryKeyRelatedField(queryset=Lab.objects.all(), source='lab', write_only=True,
                                                required=False)

    class Meta:
        model = LabJoin
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True, 'required': False},
            'lab_id': {'read_only': False, 'required': False},
            'created_by_id': {'read_only': False, 'required': False}
        }
        read_only_fields = generic_read_only_fields
        create_only_fields = ['created_by_id', 'created_by']

    def validate_status(self, value):
        valid_values = [LabJoinStatus.ACCEPTED.value, LabJoinStatus.DENIED.value]
        if value not in valid_values:
            valid_values_str = ','.join(valid_values)
            raise serializers.ValidationError(f'invalid status; Valid values are: {valid_values_str}')
        return value

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if LabJoinStatus.is_active_status(instance.status):
            return super().update(instance, validated_data)


class IdeaSerializer(WithCreateOnlyModelSerializer):
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
        # fields = ('id', 'title', 'desc', 'notes', 'created_by', 'lab', 'created_by_id', 'lab_id')
        fields = '__all__'
        read_only_fields = generic_read_only_fields
        extra_kwargs = {
            'id': {'read_only': True, 'required': False},
            'lab_id': {'read_only': False, 'required': False},
            'created_by_id': {'read_only': False, 'required': False}
        }
        create_only_fields = ['created_by_id', 'created_by']

    def update(self, instance, validated_data):
        # create only fields, don't allow changing for this version
        if 'lab_id' in validated_data:
            validated_data.pop('lab_id')
        if 'created_by_id' in validated_data:
            validated_data.pop('created_by_id')
        if 'chat_id' in validated_data:
            validated_data.pop('chat_id')

        return super().update(instance, validated_data)
