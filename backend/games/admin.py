from django.contrib import admin
from .models import Game, Venue, GameOfficial, GameStatistic, GameEvent

class GameOfficialInline(admin.TabularInline):
    model = GameOfficial
    extra = 1

class GameEventInline(admin.TabularInline):
    model = GameEvent
    extra = 1

class GameStatisticInline(admin.StackedInline):
    model = GameStatistic
    can_delete = False

class GameAdmin(admin.ModelAdmin):
    list_display = ('home_team', 'away_team', 'league', 'date', 'time', 'status', 'home_score', 'away_score')
    list_filter = ('status', 'league', 'date')
    search_fields = ('home_team__name', 'away_team__name', 'league__name')
    inlines = [GameOfficialInline, GameStatisticInline, GameEventInline]

admin.site.register(Game, GameAdmin)
admin.site.register(Venue)
admin.site.register(GameOfficial)
admin.site.register(GameStatistic)
admin.site.register(GameEvent)
