from django.db import models
from django.conf import settings
from teams.models import Team

class League(models.Model):
    """League model for organizing teams and games"""
    name = models.CharField(max_length=100)
    sport = models.CharField(max_length=50)
    season = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    
    STATUS_CHOICES = (
        ('registration', 'Registration'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='registration')
    
    teams = models.ManyToManyField(Team, related_name='leagues', blank=True)
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='organized_leagues')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} - {self.season}"
    
    @property
    def teams_count(self):
        return self.teams.count()
    
    @property
    def games_count(self):
        return self.games.count()
    
    @property
    def completed_games_count(self):
        return self.games.filter(status='completed').count()

class Standing(models.Model):
    """Team standings within a league"""
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='standings')
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    draws = models.IntegerField(default=0)
    points_for = models.IntegerField(default=0)
    points_against = models.IntegerField(default=0)
    
    class Meta:
        unique_together = ('league', 'team')
    
    def __str__(self):
        return f"{self.team.name} in {self.league.name}"
    
    @property
    def games_played(self):
        return self.wins + self.losses + self.draws
    
    @property
    def points(self):
        # Default scoring: 3 points for win, 1 for draw, 0 for loss
        return (self.wins * 3) + self.draws
    
    @property
    def point_differential(self):
        return self.points_for - self.points_against
