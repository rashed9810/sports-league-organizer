from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlayerStatisticViewSet, TeamAnalyticsViewSet

router = DefaultRouter()
router.register(r'player-statistics', PlayerStatisticViewSet)
router.register(r'team-analytics', TeamAnalyticsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
