from django.contrib import admin
from .models import Post, PostImage, Comment, Event

class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 1

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0
    fields = ('author', 'content', 'created_at')
    readonly_fields = ('created_at',)

class PostAdmin(admin.ModelAdmin):
    list_display = ('author', 'team', 'created_at', 'likes_count', 'comments_count', 'shares_count')
    list_filter = ('team', 'created_at')
    search_fields = ('content', 'author__username')
    inlines = [PostImageInline, CommentInline]

class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'created_at', 'likes_count')
    list_filter = ('created_at',)
    search_fields = ('content', 'author__username')

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'time', 'location', 'organizer', 'team', 'attendees_count')
    list_filter = ('date', 'team')
    search_fields = ('title', 'description', 'location')

admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Event, EventAdmin)
