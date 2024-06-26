from django.apps import AppConfig


class FitfeverappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'FitFeverApp'
    #Import para que funcione el signals
    def ready(self):
        import FitFeverApp.signals

        
