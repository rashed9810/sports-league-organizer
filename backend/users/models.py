from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    """Custom user model with additional fields"""
    email = models.EmailField(_('email address'), unique=True)
    
    # Required for login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email

class Profile(models.Model):
    """User profile with additional information"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    
    # User roles
    ROLE_CHOICES = (
        ('player', 'Player'),
        ('coach', 'Coach'),
        ('organizer', 'Organizer'),
        ('referee', 'Referee'),
        ('fan', 'Fan'),
    )
    roles = models.JSONField(default=list)  # Store roles as a list
    
    def __str__(self):
        return f"{self.user.username}'s profile"
