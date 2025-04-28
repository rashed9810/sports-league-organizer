from django.db import models
from django.conf import settings
from teams.models import Team

class Post(models.Model):
    """Community post model"""
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Optional team association
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts')
    
    # Likes
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_posts', blank=True)
    
    # Shares
    shares_count = models.IntegerField(default=0)
    
    def __str__(self):
        return f"Post by {self.author.username} at {self.created_at}"
    
    @property
    def likes_count(self):
        return self.likes.count()
    
    @property
    def comments_count(self):
        return self.comments.count()

class PostImage(models.Model):
    """Images attached to posts"""
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='post_images/')
    alt_text = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return f"Image for {self.post}"

class Comment(models.Model):
    """Comment model for posts"""
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Likes
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_comments', blank=True)
    
    # Parent comment for replies
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    
    def __str__(self):
        return f"Comment by {self.author.username} at {self.created_at}"
    
    @property
    def likes_count(self):
        return self.likes.count()

class Event(models.Model):
    """Community event model"""
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='organized_events')
    
    # Optional team or league association
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='events')
    
    # Attendees
    attendees = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='attending_events', blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    @property
    def attendees_count(self):
        return self.attendees.count()
