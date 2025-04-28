from rest_framework import permissions

class IsTeamManagerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow team managers to edit.
    """
    
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to team managers
        return obj.teammember_set.filter(user=request.user, role='manager').exists()
