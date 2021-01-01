from core.models import Idea, User, Lab

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'auth_key', 'image_url', 'email']


class IdeaSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    lab = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Idea
        fields = ('title', 'desc', 'notes', 'created_by', 'lab')
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }

    def create(self, validated_data):
        lab = Lab.objects.get(id__exact=validated_data.pop('lab'))
        user = User.objects.get(id__exact=validated_data.pop('lab'))
        Idea(
            title=validated_data.get('title'),
            desc=validated_data.get('desc'),
            notes=validated_data.get('notes'),
            lab=lab,
            created_by=user
        )
        return Idea(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.desc = validated_data.get('desc', instance.desc)
        instance.notes = validated_data.get('notes', instance.notes)
        instance.save()
        return instance
