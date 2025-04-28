from rest_framework import serializers
from .models import League, Standing
from teams.serializers import TeamSerializer
from users.serializers import UserSerializer

class StandingSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)
    
    class Meta:
        model = Standing
        fields = ['team_id', 'team_name', 'wins', 'losses', 'draws', 'points_for', 'points_against', 'games_played', 'points', 'point_differential']
        read_only_fields = ['games_played', 'points', 'point_differential']

class LeagueSerializer(serializers.ModelSerializer):
    teams_count = serializers.IntegerField(read_only=True)
    games_count = serializers.IntegerField(read_only=True)
    completed_games_count = serializers.IntegerField(read_only=True)
    organizer = UserSerializer(read_only=True)
    
    class Meta:
        model = League
        fields = ['id', 'name', 'sport', 'season', 'start_date', 'end_date', 'status', 
                  'teams_count', 'games_count', 'completed_games_count', 'organizer', 
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        user = self.context['request'].user
        league = League.objects.create(organizer=user, **validated_data)
        return league

class LeagueDetailSerializer(LeagueSerializer):
    teams = TeamSerializer(many=True, read_only=True)
    standings = StandingSerializer(many=True, read_only=True)
    
    class Meta(LeagueSerializer.Meta):
        fields = LeagueSerializer.Meta.fields + ['teams', 'standings']
