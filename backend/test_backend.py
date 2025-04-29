import os
import sys
import django

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sports_league_backend.settings')
django.setup()

# Import models
from django.contrib.auth import get_user_model
from teams.models import Team
from leagues.models import League

# Print model counts
User = get_user_model()
print(f"Number of users: {User.objects.count()}")
print(f"Number of teams: {Team.objects.count()}")
print(f"Number of leagues: {League.objects.count()}")

print("Backend code is valid!")
