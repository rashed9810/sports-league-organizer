from rest_framework import serializers
from .models import Post, PostImage, Comment, Event
from users.serializers import UserSerializer
from teams.serializers import TeamSerializer

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image', 'alt_text']

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    likes_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'author', 'content', 'created_at', 'updated_at', 'likes_count', 'parent']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        user = self.context['request'].user
        return Comment.objects.create(author=user, **validated_data)

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)
    team_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    images = PostImageSerializer(many=True, read_only=True)
    likes_count = serializers.IntegerField(read_only=True)
    comments_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'team', 'team_id', 'created_at', 'updated_at', 
                  'images', 'likes_count', 'comments_count', 'shares_count']
        read_only_fields = ['id', 'created_at', 'updated_at', 'shares_count']
    
    def create(self, validated_data):
        user = self.context['request'].user
        return Post.objects.create(author=user, **validated_data)

class PostDetailSerializer(PostSerializer):
    comments = serializers.SerializerMethodField()
    
    class Meta(PostSerializer.Meta):
        fields = PostSerializer.Meta.fields + ['comments']
    
    def get_comments(self, obj):
        # Only get top-level comments (no parent)
        comments = obj.comments.filter(parent=None).order_by('-created_at')
        return CommentSerializer(comments, many=True).data

class EventSerializer(serializers.ModelSerializer):
    organizer = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)
    team_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    attendees_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'time', 'location', 'organizer', 
                  'team', 'team_id', 'attendees_count', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        user = self.context['request'].user
        return Event.objects.create(organizer=user, **validated_data)
