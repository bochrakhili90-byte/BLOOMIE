from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, ParentChild, Scenario, Choice, Reflection, EmotionResult


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["account_type"]


class RegisterSerializer(serializers.ModelSerializer):
    account_type = serializers.ChoiceField(choices=["child", "parent"])

    class Meta:
        model = User
        fields = ["id", "username", "password", "account_type"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        account_type = validated_data.pop("account_type")
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, account_type=account_type)
        return user


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ["id", "text", "order"]


class ScenarioSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Scenario
        fields = ["id", "title", "description", "category", "choices"]


class ReflectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reflection
        fields = ["id", "user", "scenario", "choice", "text", "submitted_at"]
        read_only_fields = ["user", "submitted_at"]


class EmotionResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmotionResult
        fields = ["emotion_label", "feedback_message", "detected_at"]