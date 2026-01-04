import os
import sys
import django
from datetime import date, time

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sports_league_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.test import RequestFactory
from teams.models import Team
from leagues.models import League, Standing
from games.models import Game
from games.views import GameViewSet
from leagues.permissions import IsLeagueOrganizerOrReadOnly

User = get_user_model()

def verify_fixes():
    print("Starting Verification...")
    
    # Setup Data
    user = User.objects.create_user(username='verifier', email='verify@test.com', password='password')
    organizer = User.objects.create_user(username='organizer', email='org@test.com', password='password')
    
    team1 = Team.objects.create(name='T1', sport='Soccer')
    team2 = Team.objects.create(name='T2', sport='Soccer')
    
    league = League.objects.create(
        name='Test League', 
        sport='Soccer', 
        season='2024', 
        start_date=date.today(), 
        end_date=date.today(),
        organizer=organizer
    )
    
    game = Game.objects.create(
        league=league,
        home_team=team1,
        away_team=team2,
        date=date.today(),
        time=time(12,0)
    )
    
    print("Setup Complete.")
    
    # ==========================================
    # TEST 1: Scoring Corruption
    # ==========================================
    print("\n[TEST 1] Verifying Score Update Logic...")
    
    # 1. First Update: 2-1
    view = GameViewSet()
    # Mock request isn't strictly needed for _update_standings as we can call it manually to test logic, 
    # but let's test the helper method directly to isolate logic from view overhead
    
    game.home_score = 2
    game.away_score = 1
    game.status = 'completed'
    game.save()
    
    print("  Applying Score: 2-1")
    view._update_standings(game) # First update
    
    s1 = Standing.objects.get(league=league, team=team1)
    print(f"  Team1 Stats: Wins={s1.wins}, PF={s1.points_for} (Expected: Wins=1, PF=2)")
    if s1.wins != 1 or s1.points_for != 2:
        print("  ❌ FAILURE: Initial update wrong.")
        return

    # 2. Second Update: Correction to 3-1
    print("  Updating Score to: 3-1 (Correction)")
    old_home = 2
    old_away = 1
    old_status = 'completed'
    
    game.home_score = 3
    game.away_score = 1
    game.save()
    
    # Iterate update with old context
    view._update_standings(game, old_home_score=old_home, old_away_score=old_away, old_status=old_status)
    
    s1.refresh_from_db()
    print(f"  Team1 Stats: Wins={s1.wins}, PF={s1.points_for} (Expected: Wins=1, PF=3)")
    
    if s1.wins == 1 and s1.points_for == 3:
        print("  ✅ SUCCESS: Logic handled update correctly.")
    else:
        print(f"  ❌ FAILURE: Logic corrupted data. (Got Wins={s1.wins}, PF={s1.points_for})")

    # ==========================================
    # TEST 2: Permissions Crash
    # ==========================================
    print("\n[TEST 2] Verifying Permission Logic...")
    perm = IsLeagueOrganizerOrReadOnly()
    request = RequestFactory().post('/')
    request.user = organizer
    
    print("  Checking permission for Game object...")
    try:
        has_perm = perm.has_object_permission(request, None, game)
        if has_perm:
            print("  ✅ SUCCESS: Permission check passed and didn't crash.")
        else:
            print("  ❌ FAILURE: Permission denied (should be allowed).")
    except AttributeError as e:
        print(f"  ❌ CRITICAL FAILURE: Crash detected! {e}")
    except Exception as e:
        print(f"  ❌ FAILURE: Exception detected! {e}")
        
    # Cleanup
    game.delete()
    league.delete()
    team1.delete()
    team2.delete()
    user.delete()
    organizer.delete()

if __name__ == "__main__":
    verify_fixes()
