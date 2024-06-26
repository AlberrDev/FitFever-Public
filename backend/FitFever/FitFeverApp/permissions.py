from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Permiso personalizado para verificar si el usuario es un administrador.
    """

    def has_permission(self, request, view):
        # Verificar si el usuario está autenticado y es administrador
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)