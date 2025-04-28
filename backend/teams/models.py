from django.db import models
from django.conf import settings

class Team(models.Model):
    """Team model for sports teams"""
    name = models.CharField(max_length=100)
    sport = models.CharField(max_length=50)
    logo = models.ImageField(upload_to='team_logos/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Team can have multiple members with different roles
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, through='TeamMember')
    
    def __str__(self):
        return f"{self.name} ({self.sport})"
    
    @property
    def members_count(self):
        return self.members.count()
    
    @property
    def coach(self):
        coach_member = self.teammember_set.filter(role='coach').first()
        return coach_member.user if coach_member else None
    
    @property
    def players(self):
        return self.teammember_set.filter(role='player')

class TeamMember(models.Model):
    """Relationship between users and teams with roles"""
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    ROLE_CHOICES = (
        ('player', 'Player'),
        ('coach', 'Coach'),
        ('manager', 'Manager'),
        ('staff', 'Staff'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    jersey_number = models.IntegerField(null=True, blank=True)
    position = models.CharField(max_length=50, blank=True)
    joined_date = models.DateField(auto_now_add=True)
    
    class Meta:
        unique_together = ('team', 'user')
    
    def __str__(self):
        return f"{self.user.username} - {self.team.name} ({self.role})"
