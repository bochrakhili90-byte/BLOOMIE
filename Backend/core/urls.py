from django.urls import path
from .views import home, get_scenarios, save_reflection, aura_analyze, parent_dashboard

urlpatterns = [
    path("", home),
    path("scenarios/", get_scenarios),
    path("reflection/", save_reflection),
    path("aura/", aura_analyze),
    path("dashboard/", parent_dashboard),
]