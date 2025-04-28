#!/usr/bin/env python
"""
Script to set up initial database for Sports League Organizer
"""
import os
import django
import random
from datetime import datetime, timedelta

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sports_league_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from users.models import Profile
from teams.models import Team, TeamMember
from leagues.models import League, Standing
from games.models import Game, Venue
from community.models import Post, Comment

User = get_user_model()

def create_users():
    print("Creating users...")
    
    # Create admin user
    admin, created = User.objects.get_or_create(
        username='admin',
        email='admin@example.com',
        defaults={'first_name': 'Admin', 'last_name': 'User', 'is_staff': True, 'is_superuser': True}
    )
    if created:
        admin.set_password('admin123')
        admin.save()
        Profile.objects.get_or_create(user=admin, roles=['organizer'])
    
    # Create regular users
    users = []
    for i in range(1, 11):
        user, created = User.objects.get_or_create(
            username=f'user{i}',
            email=f'user{i}@example.com',
            defaults={'first_name': f'User', 'last_name': f'{i}'}
        )
        if created:
            user.set_password('password123')
            user.save()
            role = 'player' if i &lt;= 8 else 'coach'
            Profile.objects.get_or_create(user=user, roles=[role])
        users.append(user)
    
    return admin, users

def create_teams(users):
    print("Creating teams...")
    
    team_data = [
        {'name': 'Thunder Eagles', 'sport': 'Basketball'},
        {'name': 'Lightning Sharks', 'sport': 'Soccer'},
        {'name': 'Mountain Lions', 'sport': 'Baseball'},
        {'name': 'River Rapids', 'sport': 'Hockey'},
        {'name': 'Desert Scorpions', 'sport': 'Volleyball'},
        {'name': 'Forest Wolves', 'sport': 'Basketball'},
    ]
    
    teams = []
    for data in team_data:
        team, created = Team.objects.get_or_create(
            name=data['name'],
            defaults={'sport': data['sport']}
        )
        teams.append(team)
    
    # Assign users to teams
    for i, user in enumerate(users[:8]):  # First 8 users are players
        team = teams[i % len(teams)]
        TeamMember.objects.get_or_create(
            team=team,
            user=user,
            defaults={'role': 'player', 'jersey_number': i + 1}
        )
    
    # Assign coaches
    for i, user in enumerate(users[8:10]):  # Last 2 users are coaches
        team = teams[i % len(teams)]
        TeamMember.objects.get_or_create(
            team=team,
            user=user,
            defaults={'role': 'coach'}
        )
    
    return teams

def create_leagues(admin, teams):
    print("Creating leagues...")
    
    league_data = [
        {
            'name': 'Downtown Basketball League',
            'sport': 'Basketball',
            'season': 'Summer 2023',
            'start_date': datetime.now() - timedelta(days=30),
            'end_date': datetime.now() + timedelta(days=60),
            'status': 'active'
        },
        {
            'name': 'City Soccer Championship',
            'sport': 'Soccer',
            'season': 'Fall 2023',
            'start_date': datetime.now() + timedelta(days=15),
            'end_date': datetime.now() + timedelta(days=90),
            'status': 'registration'
        },
        {
            'name': 'Community Baseball Tournament',
            'sport': 'Baseball',
            'season': 'Spring 2023',
            'start_date': datetime.now() - timedelta(days=90),
            'end_date': datetime.now() - timedelta(days=30),
            'status': 'completed'
        }
    ]
    
    leagues = []
    for data in league_data:
        league, created = League.objects.get_or_create(
            name=data['name'],
            defaults={
                'sport': data['sport'],
                'season': data['season'],
                'start_date': data['start_date'],
                'end_date': data['end_date'],
                'status': data['status'],
                'organizer': admin
            }
        )
        
        # Add teams to league
        for team in teams:
            if team.sport == league.sport:
                league.teams.add(team)
                Standing.objects.get_or_create(
                    league=league,
                    team=team,
                    defaults={
                        'wins': random.randint(0, 10),
                        'losses': random.randint(0, 10),
                        'draws': random.randint(0, 5),
                        'points_for': random.randint(50, 150),
                        'points_against': random.randint(50, 150)
                    }
                )
        
        leagues.append(league)
    
    return leagues

def create_venues():
    print("Creating venues...")
    
    venue_data = [
        {'name': 'Central Park Court', 'address': '123 Park Ave', 'city': 'Anytown', 'state': 'CA', 'zip_code': '12345'},
        {'name': 'Riverside Field', 'address': '456 River Rd', 'city': 'Anytown', 'state': 'CA', 'zip_code': '12345'},
        {'name': 'Diamond Stadium', 'address': '789 Stadium Blvd', 'city': 'Anytown', 'state': 'CA', 'zip_code': '12345'},
    ]
    
    venues = []
    for data in venue_data:
        venue, created = Venue.objects.get_or_create(
            name=data['name'],
            defaults={
                'address': data['address'],
                'city': data['city'],
                'state': data['state'],
                'zip_code': data['zip_code']
            }
        )
        venues.append(venue)
    
    return venues

def create_games(leagues, venues):
    print("Creating games...")
    
    for league in leagues:
        teams = list(league.teams.all())
        if len(teams) &lt; 2:
            continue
        
        # Create some games
        for i in range(5):
            home_team = teams[i % len(teams)]
            away_team = teams[(i + 1) % len(teams)]
            venue = venues[i % len(venues)]
            
            # Game date
            if league.status == 'completed':
                game_date = league.end_date - timedelta(days=random.randint(5, 20))
                status = 'completed'
                home_score = random.randint(60, 100)
                away_score = random.randint(60, 100)
            elif league.status == 'active':
                if i &lt; 3:  # Some completed games
                    game_date = datetime.now() - timedelta(days=random.randint(1, 15))
                    status = 'completed'
                    home_score = random.randint(60, 100)
                    away_score = random.randint(60, 100)
                else:  # Some upcoming games
                    game_date = datetime.now() + timedelta(days=random.randint(1, 15))
                    status = 'scheduled'
                    home_score = None
                    away_score = None
            else:  # registration
                game_date = league.start_date + timedelta(days=random.randint(5, 20))
                status = 'scheduled'
                home_score = None
                away_score = None
            
            Game.objects.get_or_create(
                league=league,
                home_team=home_team,
                away_team=away_team,
                date=game_date,
                defaults={
                    'venue': venue,
                    'time': datetime.strptime(f"{random.randint(12, 20)}:00", "%H:%M").time(),
                    'status': status,
                    'home_score': home_score,
                    'away_score': away_score
                }
            )

def create_community_content(users, teams):
    print("Creating community content...")
    
    # Create some posts
    posts = []
    for i in range(5):
        user = users[i % len(users)]
        team = teams[i % len(teams)] if i % 2 == 0 else None
        
        post, created = Post.objects.get_or_create(
            author=user,
            content=f"This is a sample post {i+1} about sports and teamwork!",
            defaults={
                'team': team,
                'shares_count': random.randint(0, 20)
            }
        )
        
        # Add some likes
        for j in range(random.randint(1, 5)):
            liker = users[(i + j) % len(users)]
            post.likes.add(liker)
        
        posts.append(post)
    
    # Create some comments
    for post in posts:
        for i in range(random.randint(1, 3)):
            user = users[(i + 2) % len(users)]
            comment, created = Comment.objects.get_or_create(
                post=post,
                author=user,
                content=f"This is a comment {i+1} on the post!"
            )
            
            # Add some likes to comments
            for j in range(random.randint(0, 3)):
                liker = users[(i + j) % len(users)]
                comment.likes.add(liker)

def main():
    print("Setting up initial database for Sports League Organizer...")
    
    admin, users = create_users()
    teams = create_teams(users)
    leagues = create_leagues(admin, teams)
    venues = create_venues()
    create_games(leagues, venues)
    create_community_content(users, teams)
    
    print("Database setup complete!")

if __name__ == "__main__":
    main()
