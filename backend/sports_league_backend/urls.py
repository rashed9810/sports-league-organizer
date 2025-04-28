from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Sports League API",
        default_version='v1',
        description="API for Sports League Organizer",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@sportsleague.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/teams/', include('teams.urls')),
    path('api/leagues/', include('leagues.urls')),
    path('api/games/', include('games.urls')),
    path('api/analytics/', include('analytics.urls')),
    path('api/community/', include('community.urls')),
    
    # API documentation
    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
