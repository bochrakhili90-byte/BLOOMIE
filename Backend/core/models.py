from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    ACCOUNT_TYPES = [
        ("child", "Child"),
        ("parent", "Parent"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPES)

    def __str__(self):
        return f"{self.user.username} ({self.account_type})"


class ParentChild(models.Model):
    parent = models.ForeignKey(User, on_delete=models.CASCADE, related_name="parent_links")
    child = models.ForeignKey(User, on_delete=models.CASCADE, related_name="child_links")

    def __str__(self):
        return f"{self.parent.username} -> {self.child.username}"


class Scenario(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    category = models.CharField(max_length=80, default="General")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Choice(models.Model):
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE, related_name="choices")
    text = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.text


class Reflection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.SET_NULL, null=True, blank=True)
    text = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reflection by {self.user.username}"


class EmotionResult(models.Model):
    reflection = models.OneToOneField(Reflection, on_delete=models.CASCADE, related_name="emotion_result")
    emotion_label = models.CharField(max_length=50)
    feedback_message = models.TextField()
    detected_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.emotion_label
