from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Game, Venue, GameOfficial, GameStatistic, GameEvent
from .serializers import (
    GameSerializer, GameDetailSerializer, VenueSerializer,
    GameOfficialSerializer, GameStatisticSerializer, GameEventSerializer
)
from .permissions import IsLeagueOrganizerOrReadOnly
from leagues.models import League, Standing

class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    permission_classes = [permissions.IsAuthenticated]

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [permissions.IsAuthenticated, IsLeagueOrganizerOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return GameDetailSerializer
        return GameSerializer
    
    @action(detail=True, methods=['post'])
    def update_score(self, request, pk=None):
        game = self.get_object()
        home_score = request.data.get('home_score')
        away_score = request.data.get('away_score')
        
        if home_score is not None and away_score is not None:
            game.home_score = home_score
            game.away_score = away_score
            game.status = 'completed'
            game.save()
            
            # Update standings
            self._update_standings(game)
            
            return Response(GameDetailSerializer(game).data)
        return Response({"detail": "Home score and away score are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    def _update_standings(self, game):
        """Update team standings after a game is completed"""
        if not game.is_completed or game.home_score is None or game.away_score is None:
            return
        
        # Get or create standings
        home_standing, _ = Standing.objects.get_or_create(league=game.league, team=game.home_team)
        away_standing, _ = Standing.objects.get_or_create(league=game.league, team=game.away_team)
        
        # Update points scored
        home_standing.points_for += game.home_score
        home_standing.points_against += game.away_score
        away_standing.points_for += game.away_score
        away_standing.points_against += game.home_score
        
        # Update wins/losses/draws
        if game.home_score > game.away_score:
            home_standing.wins += 1
            away_standing.losses += 1
        elif game.away_score > game.home_score:
            away_standing.wins += 1
            home_standing.losses += 1
        else:
            home_standing.draws += 1
            away_standing.draws += 1
        
        home_standing.save()
        away_standing.save()
    
    @action(detail=True, methods=['post'])
    def add_official(self, request, pk=None):
        game = self.get_object()
        serializer = GameOfficialSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(game=game)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def add_event(self, request, pk=None):
        game = self.get_object()
        serializer = GameEventSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(game=game)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def update_statistics(self, request, pk=None):
        game = self.get_object()
        
        try:
            statistics = game.statistics
        except GameStatistic.DoesNotExist:
            statistics = GameStatistic(game=game)
        
        serializer = GameStatisticSerializer(statistics, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def generate_schedule(self, request):
        league_id = request.data.get('league_id')
        
        try:
            league = League.objects.get(id=league_id)
            teams = list(league.teams.all())
            
            if len(teams) &lt; 2:
                return Response({"detail": "League must have at least 2 teams to generate a schedule."}, 
                               status=status.HTTP_400_BAD_REQUEST)
            
            # Simple round-robin schedule generation
            games_created = self._generate_round_robin(league, teams)
            
            return Response({"detail": f"{games_created} games have been scheduled."}, 
                           status=status.HTTP_201_CREATED)
        except League.DoesNotExist:
            return Response({"detail": "League not found."}, status=status.HTTP_404_NOT_FOUND)
    
    def _generate_round_robin(self, league, teams):
        """Generate a round-robin schedule for the teams"""
        import datetime
        from itertools import combinations
        
        # Get all possible team combinations
        team_pairs = list(combinations(teams, 2))
        games_created = 0
        
        # Start date is league start date or today if league has already started
        start_date = max(league.start_date, datetime.date.today())
        game_date = start_date
        
        # Schedule games with 3 days between each game
        for home_team, away_team in team_pairs:
            # Create home game
            Game.objects.create(
                league=league,
                home_team=home_team,
                away_team=away_team,
                date=game_date,
                time=datetime.time(18, 0)  # 6:00 PM default
            )
            games_created += 1
            
            # Add days for next game
            game_date += datetime.timedelta(days=3)
            
            # Create away game (return match)
            Game.objects.create(
                league=league,
                home_team=away_team,
                away_team=home_team,
                date=game_date,
                time=datetime.time(18, 0)  # 6:00 PM default
            )
            games_created += 1
            
            # Add days for next game
            game_date += datetime.timedelta(days=3)
            
            # Make sure we don't schedule past the league end date
            if game_date > league.end_date:
                break
        
        return games_created
