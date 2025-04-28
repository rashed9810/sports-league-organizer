from django.db import models
from django.conf import settings
from teams.models import Team
from leagues.models import League

class Venue(models.Model):
    """Venue model for game locations"""
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    capacity = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        return self.name

class Game(models.Model):
    """Game model for matches between teams"""
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='games')
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_games')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_games')
    venue = models.ForeignKey(Venue, on_delete=models.SET_NULL, null=True, blank=True)
    
    date = models.DateField()
    time = models.TimeField()
    
    STATUS_CHOICES = (
        ('scheduled', 'Scheduled'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('postponed', 'Postponed'),
        ('cancelled', 'Cancelled'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    
    home_score = models.IntegerField(null=True, blank=True)
    away_score = models.IntegerField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.home_team.name} vs {self.away_team.name} - {self.date}"
    
    @property
    def is_completed(self):
        return self.status == 'completed'
    
    @property
    def winner(self):
        if not self.is_completed or self.home_score is None or self.away_score is None:
            return None
        if self.home_score > self.away_score:
            return self.home_team
        elif self.away_score > self.home_score:
            return self.away_team
        return None  # Draw

class GameOfficial(models.Model):
    """Officials assigned to games"""
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='officials')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=50)  # e.g., Referee, Scorekeeper, etc.
    
    def __str__(self):
        return f"{self.user.username} - {self.role} for {self.game}"

class GameStatistic(models.Model):
    """Statistics for a game"""
    game = models.OneToOneField(Game, on_delete=models.CASCADE, related_name='statistics')
    attendance = models.IntegerField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    notes = models.TextField(blank=True)
    
    # Additional statistics as JSON
    data = models.JSONField(default=dict)
    
    def __str__(self):
        return f"Statistics for {self.game}"

class GameEvent(models.Model):
    """Events during a game (scores, penalties, etc.)"""
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='events')
    time = models.CharField(max_length=20)  # e.g., "00:15:30" or "Q2 5:20"
    description = models.CharField(max_length=255)
    player = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    
    EVENT_TYPES = (
        ('score', 'Score'),
        ('penalty', 'Penalty'),
        ('substitution', 'Substitution'),
        ('timeout', 'Timeout'),
        ('other', 'Other'),
    )
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES)
    
    # Additional data as JSON
    data = models.JSONField(default=dict)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.event_type} at {self.time} - {self.game}"
