from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def home(request):
    return Response({"message": "BLOOMIE backend is running"})
@api_view(["GET"])
def get_scenarios(request):
    scenarios = Scenario.objects.filter(is_active=True)

    data = []

    for scenario in scenarios:
        choices = Choice.objects.filter(scenario=scenario).order_by("order")

        data.append({
            "id": scenario.id,
            "title": scenario.title,
            "description": scenario.description,
            "category": scenario.category,
            "choices": [
                {
                    "id": choice.id,
                    "text": choice.text
                }
                for choice in choices
            ]
        })

    return Response(data)
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Scenario, Choice, Reflection, EmotionResult
from .serializers import RegisterSerializer, ScenarioSerializer
from .aura_engine import analyze_reflection


@api_view(["POST"])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {"message": "User registered successfully", "user_id": user.id},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def scenario_list(request):
    scenarios = Scenario.objects.filter(is_active=True)
    serializer = ScenarioSerializer(scenarios, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def scenario_detail(request, scenario_id):
    try:
        scenario = Scenario.objects.get(id=scenario_id, is_active=True)
    except Scenario.DoesNotExist:
        return Response({"error": "Scenario not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ScenarioSerializer(scenario)
    return Response(serializer.data)


@api_view(["POST"])
def submit_reflection(request):
    username = request.data.get("username")
    scenario_id = request.data.get("scenario_id")
    choice_id = request.data.get("choice_id")
    text = request.data.get("text")

    if not username or not scenario_id or not text:
        return Response(
            {"error": "username, scenario_id, and text are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(username=username)
        scenario = Scenario.objects.get(id=scenario_id)
        choice = Choice.objects.get(id=choice_id) if choice_id else None
    except (User.DoesNotExist, Scenario.DoesNotExist, Choice.DoesNotExist):
        return Response({"error": "Invalid submitted data"}, status=status.HTTP_400_BAD_REQUEST)

    reflection = Reflection.objects.create(
        user=user,
        scenario=scenario,
        choice=choice,
        text=text
    )

    emotion, feedback = analyze_reflection(text)

    EmotionResult.objects.create(
        reflection=reflection,
        emotion_label=emotion,
        feedback_message=feedback
    )

    return Response({
        "message": "Reflection submitted successfully",
        "emotion": emotion,
        "feedback": feedback
    })


@api_view(["GET"])
def parent_dashboard(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    reflections = Reflection.objects.filter(user=user).order_by("-submitted_at")

    data = []
    for reflection in reflections:
        emotion_result = getattr(reflection, "emotion_result", None)
        data.append({
            "scenario": reflection.scenario.title,
            "reflection": reflection.text,
            "emotion": emotion_result.emotion_label if emotion_result else "unknown",
            "feedback": emotion_result.feedback_message if emotion_result else "",
            "date": reflection.submitted_at
        })

    return Response({
        "child": username,
        "total_reflections": reflections.count(),
        "history": data
    })
@api_view(["GET"])
def get_scenarios(request):
    scenarios = Scenario.objects.filter(is_active=True)

    data = []

    for scenario in scenarios:
        choices = Choice.objects.filter(scenario=scenario).order_by("order")

        data.append({
            "id": scenario.id,
            "title": scenario.title,
            "description": scenario.description,
            "category": scenario.category,
            "choices": [
                {"id": choice.id, "text": choice.text}
                for choice in choices
            ]
        })

    return Response(data)


@api_view(["POST"])
def save_reflection(request):
    text = request.data.get("text")

    reflection = Reflection.objects.create(
        text=text
    )

    return Response({
        "message": "Reflection saved!",
        "id": reflection.id
    })
@api_view(["POST"])
def aura_analyze(request):
    text = request.data.get("text", "")

    if not text.strip():
        return Response({
            "emotion": "neutral",
            "feedback": "Please write a reflection first."
        })

    emotion, feedback = analyze_reflection(text)

    return Response({
        "emotion": emotion,
        "feedback": feedback
    })


@api_view(["GET"])
def parent_dashboard(request):
    total_reflections = Reflection.objects.count()
    total_scenarios = Scenario.objects.count()
    total_emotions = EmotionResult.objects.count()

    recent_reflections = Reflection.objects.all().order_by("-submitted_at")[:5]

    return Response({
        "total_reflections": total_reflections,
        "total_scenarios": total_scenarios,
        "total_emotions_detected": total_emotions,
        "recent_reflections": [
            {
                "id": reflection.id,
                "text": reflection.text,
                "submitted_at": reflection.submitted_at
            }
            for reflection in recent_reflections
        ]
    })
    