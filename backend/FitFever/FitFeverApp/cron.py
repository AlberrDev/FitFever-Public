from django_cron import CronJobBase, Schedule
from django.db.models import Max, Sum, FloatField, F
from django.db.models.functions import Cast
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from .models import Consumo
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.conf import settings
import tempfile
from weasyprint import HTML
from .views import *
from django.utils import timezone
from datetime import timedelta
from django.db.models import FloatField, Sum

class MyCronJob(CronJobBase):
    RUN_EVERY_MINS = 120  # cada 2 horas

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'FitFeverApp.cron.MyCronJob'

    def do(self):
        try:
            # Obtener todos los perfiles
            perfiles = Perfiles.objects.all()

            # Obtener la fecha actual
            today = timezone.now().date()

            # Calcular el primer día de la semana (lunes)
            start_of_week = today - timedelta(days=today.weekday())
            print(perfiles, "perfiles")

            for perfil in perfiles:
                # Obtener el usuario asociado con el perfil
                user = perfil.perfil
                print(user, "usuarios")

                # Inicializar un diccionario para almacenar los datos diarios
                datos_semanales = {}
                print("hola")

                # Iterar sobre cada día de la semana
                for i in range(7):
                    # Obtener la fecha para este día de la semana
                    fecha_dia = start_of_week + timedelta(days=i)
                    print(fecha_dia, "fechadia")

                    # Obtener todos los consumos asociados con este perfil para este día
                    consumos_dia = Consumo.objects.filter(perfil_id=perfil.pk, fecha_consumo=fecha_dia)
                    print(consumos_dia, "consumos_dia")

                    # Inicializar sumas del día
                    total_calorias = 0
                    total_grasas = 0
                    total_carbohidratos = 0
                    total_proteinas = 0

                    # Calcular las calorías y macronutrientes para este día
                    for consumo in consumos_dia:
                        total_calorias = round(float(consumo.calorias_consumidas), 2)
                        total_grasas = round(float(consumo.grasas), 2)
                        total_carbohidratos = round(float(consumo.carbohidratos), 2)
                        total_proteinas = round(float(consumo.proteinas), 2)

                    sumas_dia = {
                        'total_calorias': total_calorias,
                        'total_grasas': total_grasas,
                        'total_carbohidratos': total_carbohidratos,
                        'total_proteinas': total_proteinas,
                    }

                    # Guardar los datos diarios en el diccionario
                    datos_semanales[fecha_dia] = sumas_dia
                    print(datos_semanales, "datos_semanales")

                # Generar el contexto para la plantilla
                context = {
                    'start_of_week': start_of_week.strftime("%Y-%m-%d"),
                    'end_of_week': (start_of_week + timedelta(days=6)).strftime("%Y-%m-%d"),
                    'datos_semanales': datos_semanales,
                    'calorias_globales': perfil.Calorias
                }

                # Generar el PDF
                pdf = generate_pdf(context)
                print(pdf, "xd")

                # Configurar el mensaje de correo electrónico
                email_body = render_to_string('reporteInstruccion.html', {'user': user.username})

                email_subject = "Reporte Semanal de Consumo"
                email_message = EmailMessage(
                    email_subject,
                    email_body,
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],  # Envía el correo al usuario actual
                )
                email_message.content_subtype = "html"
                email_message.attach('reporte.pdf', pdf.read(), 'application/pdf')
                print("sending", "xd")
                print(email_message, "xd")

                email_message.send()
                pdf.close()

        except Exception as e:
            print(f"Error en MyCronJob: {e}")