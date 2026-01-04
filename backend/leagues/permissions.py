from rest_framework import permissions

class IsLeagueOrganizerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow league organizers to edit.
    """
    
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to the league organizer
        if hasattr(obj, 'league'):
            return obj.league.organizer == request.user
        return obj.organizer == request.user
