from django.contrib import admin
from .models import *

admin.site.register(UserProfile)
admin.site.register(ParentChild)
admin.site.register(Scenario)
admin.site.register(Choice)
admin.site.register(Reflection)
admin.site.register(EmotionResult)
