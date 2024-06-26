from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six


# "Genera tokens de restablecimiento de contraseña en Django utilizando la clase TokenGenerator, 
# garantizando compatibilidad entre Python 2 y Python 3 mediante el uso de 'six'."
class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self,user,timestamp):
        return (six.text_type(user.pk)+six.text_type(timestamp)+six.text_type(user.is_active))
generate_token=TokenGenerator()