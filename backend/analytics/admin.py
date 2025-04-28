from django.contrib import admin
from .models import PlayerStatistic, TeamAnalytics

class PlayerStatisticAdmin(admin.ModelAdmin):
    list_display = ('user', 'team', 'game', 'minutes_played', 'created_at')
    list_filter = ('team', 'game')
    search_fields = ('user__username', 'team__name')

class TeamAnalyticsAdmin(admin.ModelAdmin):
    list_display = ('team', 'league', 'start_date', 'end_date', 'games_played', 'wins', 'losses', 'draws')
    list_filter = ('team', 'league')
    search_fields = ('team__name', 'league__name')

admin.site.register(PlayerStatistic, PlayerStatisticAdmin)
admin.site.register(TeamAnalytics, TeamAnalyticsAdmin)
