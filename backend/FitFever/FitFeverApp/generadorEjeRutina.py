from django.db import transaction
from .models import *
from random import sample
from django.db.models.signals import post_migrate
from django.dispatch import receiver

def generar_rutinas_y_ejercicios():
    grupos_musculares = {
        'Pecho': ['Press de banca', 'Flexiones', 'Aperturas con mancuernas', 'Fondos'],
        'Espalda': ['Dominadas', 'Remo con barra', 'Peso muerto', 'Pull-ups'],
        'Brazo': ['Curl de bíceps', 'Press francés', 'Flexiones diamante', 'Tríceps en polea'],
        'Pierna': ['Sentadillas', 'Zancadas', 'Prensa de piernas', 'Peso muerto rumano'],
    }

    fitfever_user, created = User.objects.get_or_create(username='FitFever')
    perfil_fitfever, created = Perfiles.objects.get_or_create(
                peso=75.0,
                altura=180.0,
                edad=30,
                sexo='masculino',
                factor_Actividad=1.5,
                foto_perfil='ruta/a/imagen.jpg',
                fecha_nacimiento='1994-05-22',
                Calorias=2000.0,
                Objetivo_id=Objetivo.objects.get(nombre='Perder Peso').pk,
                perfil_id=fitfever_user.pk

    )

    with transaction.atomic():
        for grupo, ejercicios in grupos_musculares.items():
            nombre_rutina = f'Rutina para {grupo}'
            descripcion_rutina = f'Rutina diseñada para trabajar el grupo muscular {grupo}'
            nueva_rutina = Rutinas.objects.create(
                nombre=nombre_rutina,
                descripcion=descripcion_rutina,
                Objetivo='Ganar Masa Muscular',  # Cambia según tu necesidad
                duracion=30,  # Duración predeterminada de 30 días
                nivel='Principiante',  # Cambia según tu necesidad
                perfil_id=perfil_fitfever.pk
            )

            # Elegir 5 ejercicios aleatorios del grupo muscular
            ejercicios_seleccionados = sample(ejercicios, min(5, len(ejercicios)))
            for nombre_ejercicio in ejercicios_seleccionados:
                descripcion_ejercicio = f'Descripción del ejercicio {nombre_ejercicio}'
                nuevo_ejercicio = Ejercicios.objects.create(
                    nombre=nombre_ejercicio,
                    grupo_muscular=grupo,
                    descripcion=descripcion_ejercicio,
                    series=3,  # Número predeterminado de series
                    repeticiones=12,  # Número predeterminado de repeticiones
                )
                nueva_rutina.ejercicios_set.add(nuevo_ejercicio)


