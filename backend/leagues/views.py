from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import League, Standing
from .serializers import LeagueSerializer, LeagueDetailSerializer, StandingSerializer
from .permissions import IsLeagueOrganizerOrReadOnly
from teams.models import Team

class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = [permissions.IsAuthenticated, IsLeagueOrganizerOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return LeagueDetailSerializer
        return LeagueSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        return context
    
    @action(detail=True, methods=['get', 'post'])
    def teams(self, request, pk=None):
        league = self.get_object()
        
        if request.method == 'GET':
            teams = league.teams.all()
            serializer = TeamSerializer(teams, many=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            team_id = request.data.get('team_id')
            try:
                team = Team.objects.get(id=team_id)
                league.teams.add(team)
                # Create initial standing for the team
                Standing.objects.get_or_create(league=league, team=team)
                return Response({"detail": "Team added to league."}, status=status.HTTP_201_CREATED)
            except Team.DoesNotExist:
                return Response({"detail": "Team not found."}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['delete'])
    def remove_team(self, request, pk=None):
        league = self.get_object()
        team_id = request.data.get('team_id')
        
        try:
            team = Team.objects.get(id=team_id)
            league.teams.remove(team)
            # Remove standing for the team
            Standing.objects.filter(league=league, team=team).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Team.DoesNotExist:
            return Response({"detail": "Team not found."}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['get'])
    def standings(self, request, pk=None):
        league = self.get_object()
        standings = league.standings.all().order_by('-points', '-point_differential')
        serializer = StandingSerializer(standings, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def update_standing(self, request, pk=None):
        league = self.get_object()
        serializer = StandingSerializer(data=request.data)
        
        if serializer.is_valid():
            team_id = serializer.validated_data.get('team_id')
            try:
                team = Team.objects.get(id=team_id)
                standing, created = Standing.objects.get_or_create(league=league, team=team)
                
                for attr, value in serializer.validated_data.items():
                    if attr != 'team_id':
                        setattr(standing, attr, value)
                standing.save()
                
                return Response(StandingSerializer(standing).data)
            except Team.DoesNotExist:
                return Response({"detail": "Team not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```python file="backend/leagues/permissions.py"
from rest_framework import permissions

class IsLeagueOrganizerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow league organizers to edit.
    """
    
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to the league organizer
        return obj.organizer == request.user
