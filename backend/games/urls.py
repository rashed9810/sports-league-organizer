from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameViewSet, VenueViewSet

router = DefaultRouter()
router.register(r'', GameViewSet)
router.register(r'venues', VenueViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
