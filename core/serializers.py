from core.models import Lab


class UserSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_blank=False, max_length=255)
    score = serializers.DecimalField(max_digits=9, decimal_places=4)


class LabSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, allow_blank=False, max_length=255)
    members = UserSerializer(many=True)
    created_by = UserSerializer()
    owned_by = UserSerializer()
    image_url = serializers.CharField(trim_whitespace=True)

    created_at = serializers.DateTimeField(allow_null=True, required=False, read_only=True)
    updated_at = serializers.DateTimeField(allow_null=True, required=False, read_only=True)

    class Meta:
        model = Lab
        fields = ("name", "score", "users", "created_at", "updated_at")
        read_only_fields = ("created_at", "update_at")

    def create(self, validated_data):
        return Lab(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.content = validated_data.get('content', instance.content)
        instance.created = validated_data.get('created', instance.created)
        return instance
