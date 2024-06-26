from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.utils import timezone
from .models import *
from django.db import transaction
from django.contrib.auth.models import User
import firebase_admin
from firebase_admin import credentials, storage
import requests
from io import BytesIO

@receiver(post_migrate, dispatch_uid="create_default_objetivos")
def create_default_objetivos(sender, **kwargs):
    if sender.name == 'FitFeverApp':
        if not Objetivo.objects.exists():
            Objetivo.objects.create(nombre='Perder Peso', descripcion='Bajamos 300 calorias por debajo de nuestro mantenimiento')
            Objetivo.objects.create(nombre='Ganar Masa Muscular', descripcion='Subimos 300 calorias por encima de nuestro mantenimiento')
            Objetivo.objects.create(nombre='Mantener Peso', descripcion='Descripción del objetivo de mantener peso')
    create_default_user_and_profile(sender, **kwargs)
# @receiver(post_migrate, dispatch_uid="create_default_user_and_profile")
def create_default_user_and_profile(sender, **kwargs):
    if sender.name == 'FitFeverApp':
        # Verifica si ya existe el usuario FitFever
        if not User.objects.filter(username='FitFever').exists():
            # Si no existe, crea el usuario FitFever
            user = User.objects.create_user('FitFever', password='test')

            # Crea un perfil para el usuario FitFever
            # Perfiles.objects.create(
            #     peso=75.0,
            #     altura=180.0,
            #     edad=30,
            #     sexo='masculino',
            #     factor_Actividad=1.5,
            #     foto_perfil='../static/fitfever.png',
            #     fecha_nacimiento='1994-05-22',
            #     Calorias=2000.0,
            #     Objetivo_id=Objetivo.objects.get(nombre='Perder Peso').pk,
            #     perfil_id=user.pk
            # )
    create_rutinas(sender, **kwargs)

def create_rutinas(sender, **kwargs):
    if sender.name == 'FitFeverApp':
        # Verifica si ya existen rutinas en la base de datos
        if not Rutinas.objects.exists():
            # Si no existen rutinas, crea instancias por defecto
            
            # Buscar o crear el usuario FitFever
            fitfever_user, created = User.objects.get_or_create(username='FitFever')
            if created:
                # Si el usuario FitFever ha sido creado ahora, puedes asociar el perfil
                perfil_fitfever = Perfiles.objects.create(
                peso=75.0,
                altura=180.0,
                edad=30,
                sexo='masculino',
                factor_Actividad=1.5,
                foto_perfil='../static/fitfever.png',
                fecha_nacimiento='1994-05-22',
                Calorias=2000.0,
                Objetivo_id=Objetivo.objects.get(nombre='Perder Peso'),
                perfil_id=fitfever_user.pk

            )
            else:
                # Si el usuario FitFever ya existía, simplemente obtén su perfil
                perfil_fitfever = fitfever_user.pk

            from .generadorEjeRutina import generar_rutinas_y_ejercicios
            generar_rutinas_y_ejercicios()
        # importar_recetas(sender, **kwargs)
    insert_productos_from_scraping(sender, **kwargs)

def insert_productos_from_scraping(sender, **kwargs):
    if sender.name == 'FitFeverApp':
        from .products2 import obtener_datos_secciones
        url_supermercado = "https://www.supermercadosmas.com"
        datos_secciones = obtener_datos_secciones(url_supermercado)
        if datos_secciones:
            for seccion, productos in datos_secciones.items():
                for producto in productos:
                    nombre = producto.get("Nombre")
                    calorias = producto.get("Calorias")
                    proteinas = producto.get("Proteinas")
                    grasas = producto.get("Grasas")
                    carbohidratos = producto.get("Carbohidratos")
                    if not Productos.objects.filter(nombre=nombre).exists():
                        Productos.objects.create(
                            nombre=nombre,
                            calorias=calorias,
                            proteinas=proteinas,
                            grasas=grasas,
                            carbohidratos=carbohidratos
                        )
    # importar_recetas(sender, **kwargs)

# def importar_recetas(sender, **kwargs):
#     from .recipesScrapping import buscar_recetas
#     query_words = ['chicken', 'beef', 'fish', 'vegetarian', 'soup', 'curry', 'pasta', 'salad', 'pizza', 'smoothie', 'dessert', 'breakfast', 'sandwich', 'grill', 'stew']
#     recetas = buscar_recetas(query_words)

#     # Verifica si la app de Firebase ya está inicializada
#     if not firebase_admin._apps:
#         cred = credentials.Certificate("static/fitfeverstorage-firebase-adminsdk-iqmy1-4450b1d71b.json")
#         firebase_admin.initialize_app(cred)

#     bucket = storage.bucket('fitfeverstorage.appspot.com')

#     with transaction.atomic():
#         for receta in recetas:
#             response = requests.get(receta['image'])
#             image_data = BytesIO(response.content)
#             blob = bucket.blob('fotos_recetas/' + receta['label'] + '.jpg')
#             if not blob.exists():
#                 blob.content_type = 'image/jpeg'
#                 blob.upload_from_file(image_data)
#                 blob.make_public()
#                 blob.reload()
#                 image_url = blob.public_url
#                 nueva_receta = Recetas(
#                     nombre=receta['label'],
#                     calorias=receta['calories'],
#                     proteinas=receta['protein'],
#                     grasas=receta['fats'],
#                     carbohidratos=receta['carbs'],
#                     ingredientes=", ".join([ingrediente['text'] for ingrediente in receta['ingredients']]),
#                     imagen=image_url,
#                 )
#                 diet_labels = receta['diet']
#                 objetivo = None
#                 if receta['calories'] > 2000:
#                     objetivo = Objetivo.objects.get(nombre='Ganar Masa Muscular')
#                 elif receta['calories'] < 1000:
#                     objetivo = Objetivo.objects.get(nombre='Perder Peso')
#                 else:
#                     objetivo = Objetivo.objects.get(nombre='Mantener Peso')
#                 if objetivo:
#                     nueva_receta.Objetivo = objetivo
#                     nueva_receta.save()
#                 else:
#                     print(f"No se encontró el objetivo adecuado para la receta {receta['label']}")
#             else:
#                 print(f"El objeto {blob.name} ya existe.")
