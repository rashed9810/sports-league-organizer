from django.contrib import admin
from .models import Team, TeamMember

class TeamMemberInline(admin.TabularInline):
    model = TeamMember
    extra = 1

class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'sport', 'members_count', 'created_at')
    search_fields = ('name', 'sport')
    inlines = [TeamMemberInline]

admin.site.register(Team, TeamAdmin)
admin.site.register(TeamMember)
