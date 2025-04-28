from rest_framework import serializers
from .models import PlayerStatistic, TeamAnalytics
from users.serializers import UserSerializer
from teams.serializers import TeamSerializer
from leagues.serializers import LeagueSerializer

class PlayerStatisticSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)
    
    class Meta:
        model = PlayerStatistic
        fields = ['id', 'user', 'team', 'game', 'minutes_played', 'data', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class TeamAnalyticsSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    league = LeagueSerializer(read_only=True)
    win_percentage = serializers.FloatField(read_only=True)
    point_differential = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = TeamAnalytics
        fields = ['id', 'team', 'league', 'start_date', 'end_date', 'games_played', 
                  'wins', 'losses', 'draws', 'points_scored', 'points_allowed',
                  'win_percentage', 'point_differential', 'performance_data', 
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
