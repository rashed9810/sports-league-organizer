from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Team, TeamMember
from .serializers import TeamSerializer, TeamDetailSerializer, TeamMemberSerializer
from .permissions import IsTeamManagerOrReadOnly

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated, IsTeamManagerOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TeamDetailSerializer
        return TeamSerializer
    
    def perform_create(self, serializer):
        team = serializer.save()
        # Add creator as team manager
        TeamMember.objects.create(team=team, user=self.request.user, role='manager')
    
    @action(detail=True, methods=['get', 'post'])
    def players(self, request, pk=None):
        team = self.get_object()
        
        if request.method == 'GET':
            players = team.teammember_set.filter(role='player')
            serializer = TeamMemberSerializer(players, many=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            serializer = TeamMemberSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(team=team, role='player')
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def add_member(self, request, pk=None):
        team = self.get_object()
        serializer = TeamMemberSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(team=team)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['delete'])
    def remove_member(self, request, pk=None):
        team = self.get_object()
        user_id = request.data.get('user_id')
        
        try:
            member = TeamMember.objects.get(team=team, user_id=user_id)
            member.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TeamMember.DoesNotExist:
            return Response({"detail": "Member not found."}, status=status.HTTP_404_NOT_FOUND)
