from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Avg, Count, F, Q
from .models import PlayerStatistic, TeamAnalytics
from .serializers import PlayerStatisticSerializer, TeamAnalyticsSerializer
from teams.models import Team
from leagues.models import League
from games.models import Game
import datetime

class PlayerStatisticViewSet(viewsets.ModelViewSet):
    queryset = PlayerStatistic.objects.all()
    serializer_class = PlayerStatisticSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = PlayerStatistic.objects.all()
        
        # Filter by user
        user_id = self.request.query_params.get('user_id')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        # Filter by team
        team_id = self.request.query_params.get('team_id')
        if team_id:
            queryset = queryset.filter(team_id=team_id)
        
        # Filter by game
        game_id = self.request.query_params.get('game_id')
        if game_id:
            queryset = queryset.filter(game_id=game_id)
        
        return queryset

class TeamAnalyticsViewSet(viewsets.ModelViewSet):
    queryset = TeamAnalytics.objects.all()
    serializer_class = TeamAnalyticsSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = TeamAnalytics.objects.all()
        
        # Filter by team
        team_id = self.request.query_params.get('team_id')
        if team_id:
            queryset = queryset.filter(team_id=team_id)
        
        # Filter by league
        league_id = self.request.query_params.get('league_id')
        if league_id:
            queryset = queryset.filter(league_id=league_id)
        
        return queryset
    
    @action(detail=False, methods=['post'])
    def generate(self, request):
        """Generate or update team analytics"""
        team_id = request.data.get('team_id')
        league_id = request.data.get('league_id')
        
        if not team_id or not league_id:
            return Response({"detail": "Team ID and League ID are required."}, 
                           status=status.HTTP_400_BAD_REQUEST)
        
        try:
            team = Team.objects.get(id=team_id)
            league = League.objects.get(id=league_id)
            
            # Get date range (default to league dates)
            start_date = request.data.get('start_date', league.start_date)
            end_date = request.data.get('end_date', league.end_date)
            
            if isinstance(start_date, str):
                start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()
            if isinstance(end_date, str):
                end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d').date()
            
            # Get or create analytics object
            analytics, created = TeamAnalytics.objects.get_or_create(
                team=team,
                league=league,
                start_date=start_date,
                end_date=end_date,
                defaults={
                    'games_played': 0,
                    'wins': 0,
                    'losses': 0,
                    'draws': 0,
                    'points_scored': 0,
                    'points_allowed': 0,
                    'performance_data': {}
                }
            )
            
            # Calculate analytics
            self._calculate_team_analytics(analytics, team, league, start_date, end_date)
            
            return Response(TeamAnalyticsSerializer(analytics).data)
        except Team.DoesNotExist:
            return Response({"detail": "Team not found."}, status=status.HTTP_404_NOT_FOUND)
        except League.DoesNotExist:
            return Response({"detail": "League not found."}, status=status.HTTP_404_NOT_FOUND)
    
    def _calculate_team_analytics(self, analytics, team, league, start_date, end_date):
        """Calculate team analytics based on games"""
        # Get completed games in the date range
        home_games = Game.objects.filter(
            league=league,
            home_team=team,
            date__gte=start_date,
            date__lte=end_date,
            status='completed'
        )
        
        away_games = Game.objects.filter(
            league=league,
            away_team=team,
            date__gte=start_date,
            date__lte=end_date,
            status='completed'
        )
        
        # Calculate basic stats
        games_played = home_games.count() + away_games.count()
        
        # Wins, losses, draws and points
        wins = 0
        losses = 0
        draws = 0
        points_scored = 0
        points_allowed = 0
        
        for game in home_games:
            if game.home_score > game.away_score:
                wins += 1
            elif game.home_score < game.away_score:
                losses += 1
            else:
                draws += 1
            
            points_scored += game.home_score
            points_allowed += game.away_score
        
        for game in away_games:
            if game.away_score > game.home_score:
                wins += 1
            elif game.away_score < game.home_score:
                losses += 1
            else:
                draws += 1
            
            points_scored += game.away_score
            points_allowed += game.home_score
        
        # Update analytics object
        analytics.games_played = games_played
        analytics.wins = wins
        analytics.losses = losses
        analytics.draws = draws
        analytics.points_scored = points_scored
        analytics.points_allowed = points_allowed
        
        # Calculate advanced metrics
        performance_data = {
            'avg_points_per_game': points_scored / games_played if games_played > 0 else 0,
            'avg_points_allowed_per_game': points_allowed / games_played if games_played > 0 else 0,
            'home_record': f"{home_games.filter(home_score__gt=F('away_score')).count()}-{home_games.filter(home_score__lt=F('away_score')).count()}-{home_games.filter(home_score=F('away_score')).count()}",
            'away_record': f"{away_games.filter(away_score__gt=F('home_score')).count()}-{away_games.filter(away_score__lt=F('home_score')).count()}-{away_games.filter(away_score=F('home_score')).count()}",
        }
        
        analytics.performance_data = performance_data
        analytics.save()
