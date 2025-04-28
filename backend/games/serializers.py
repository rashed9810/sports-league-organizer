from rest_framework import serializers
from .models import Game, Venue, GameOfficial, GameStatistic, GameEvent
from teams.serializers import TeamSerializer
from leagues.serializers import LeagueSerializer
from users.serializers import UserSerializer

class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ['id', 'name', 'address', 'city', 'state', 'zip_code', 'capacity']

class GameOfficialSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = GameOfficial
        fields = ['id', 'user', 'user_id', 'role']

class GameEventSerializer(serializers.ModelSerializer):
    player = UserSerializer(read_only=True)
    player_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    
    class Meta:
        model = GameEvent
        fields = ['id', 'time', 'description', 'event_type', 'player', 'player_id', 'data', 'created_at']
        read_only_fields = ['id', 'created_at']

class GameStatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameStatistic
        fields = ['attendance', 'duration', 'notes', 'data']

class GameSerializer(serializers.ModelSerializer):
    league = LeagueSerializer(read_only=True)
    league_id = serializers.IntegerField(write_only=True)
    home_team = TeamSerializer(read_only=True)
    home_team_id = serializers.IntegerField(write_only=True)
    away_team = TeamSerializer(read_only=True)
    away_team_id = serializers.IntegerField(write_only=True)
    venue = VenueSerializer(read_only=True)
    venue_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    
    class Meta:
        model = Game
        fields = ['id', 'league', 'league_id', 'home_team', 'home_team_id', 'away_team', 'away_team_id',
                  'venue', 'venue_id', 'date', 'time', 'status', 'home_score', 'away_score',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class GameDetailSerializer(GameSerializer):
    officials = GameOfficialSerializer(many=True, read_only=True)
    statistics = GameStatisticSerializer(read_only=True)
    events = GameEventSerializer(many=True, read_only=True)
    
    class Meta(GameSerializer.Meta):
        fields = GameSerializer.Meta.fields + ['officials', 'statistics', 'events', 'is_completed', 'winner']
