from django.db import models
from django.conf import settings
from teams.models import Team
from leagues.models import League
from games.models import Game

class PlayerStatistic(models.Model):
    """Statistics for individual players"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='statistics')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='player_statistics')
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='player_statistics')
    
    # Common statistics across sports
    minutes_played = models.IntegerField(default=0)
    
    # Sport-specific statistics stored as JSON
    data = models.JSONField(default=dict)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('user', 'game')
    
    def __str__(self):
        return f"{self.user.username} stats for {self.game}"

class TeamAnalytics(models.Model):
    """Aggregated analytics for teams"""
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='analytics')
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='team_analytics')
    
    # Time period
    start_date = models.DateField()
    end_date = models.DateField()
    
    # Basic performance metrics
    games_played = models.IntegerField(default=0)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    draws = models.IntegerField(default=0)
    points_scored = models.IntegerField(default=0)
    points_allowed = models.IntegerField(default=0)
    
    # Advanced metrics stored as JSON
    performance_data = models.JSONField(default=dict)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Team analytics"
    
    def __str__(self):
        return f"{self.team.name} analytics ({self.start_date} to {self.end_date})"
    
    @property
    def win_percentage(self):
        if self.games_played == 0:
            return 0
        return self.wins / self.games_played
    
    @property
    def point_differential(self):
        return self.points_scored - self.points_allowed
