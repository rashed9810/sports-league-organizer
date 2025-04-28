from rest_framework import serializers
from .models import Team, TeamMember
from users.serializers import UserSerializer

class TeamMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = TeamMember
        fields = ['id', 'user', 'user_id', 'role', 'jersey_number', 'position', 'joined_date']
        read_only_fields = ['id', 'joined_date']

class TeamSerializer(serializers.ModelSerializer):
    members_count = serializers.IntegerField(read_only=True)
    coach = UserSerializer(read_only=True)
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'sport', 'logo', 'created_at', 'updated_at', 'members_count', 'coach']
        read_only_fields = ['id', 'created_at', 'updated_at']

class TeamDetailSerializer(TeamSerializer):
    members = TeamMemberSerializer(source='teammember_set', many=True, read_only=True)
    
    class Meta(TeamSerializer.Meta):
        fields = TeamSerializer.Meta.fields + ['members']
