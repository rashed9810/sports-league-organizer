from django.contrib import admin
from .models import League, Standing

class StandingInline(admin.TabularInline):
    model = Standing
    extra = 1

class LeagueAdmin(admin.ModelAdmin):
    list_display = ('name', 'sport', 'season', 'status', 'teams_count', 'start_date', 'end_date')
    list_filter = ('sport', 'status', 'season')
    search_fields = ('name', 'sport')
    inlines = [StandingInline]

admin.site.register(League, LeagueAdmin)
admin.site.register(Standing)
