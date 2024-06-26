from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
# from .products2 import datos_secciones
from .productsNew import scrape_productos
from .models import *
from .serializer import *
from decouple import config
#for emails and tokens
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .utils import TokenGenerator,generate_token
from django.utils.encoding import force_bytes, DjangoUnicodeDecodeError,force_text
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View
import os
from django.shortcuts import get_object_or_404
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from datetime import datetime
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from decimal import Decimal
from .productsNew import scrape_productos
from django.template.loader import render_to_string
from weasyprint import HTML
import tempfile
#Comprobar bien que reciban los datos de la pagina estatica
@api_view(["GET"])
def getRoutes(request):
    return Response("datos_secciones")

#Aqui tenemos el view para hacer el ejemplo del WebScraping
@api_view(["GET"])
def getProductsCustomPage(request):
    # Llamar a la función para obtener los datos de los productos
    productos = scrape_productos("https://products-fit-fever.vercel.app/")
    if productos:
        return Response({"productos": productos})
    else:
        return Response({"message": "Error al obtener los datos de los productos"}, status=500)

from time import sleep

@api_view(["GET"])
def getProducts(request):
    # Obtener todos los productos de la base de datos
    productos = Productos.objects.all()
    
    # Serializar los productos para que puedan ser devueltos en la respuesta
    serialized_productos = []
    for producto in productos:
        serialized_producto = {
            "id": producto.id,  # Si tienes un campo id en tu modelo
            "nombre": producto.nombre,
            "calorias": producto.calorias,
            "proteinas": producto.proteinas,
            "grasas": producto.grasas,
            "carbohidratos": producto.carbohidratos
            # Agrega más campos según tu modelo
        }
        serialized_productos.append(serialized_producto)
    
    # Devolver la respuesta con los productos serializados
    return Response({"productos": serialized_productos})


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email

        return token

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v       
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getUserProfiles(request):
#     user=request.user
#     serializer=UserSerializer(user,many=False)
#     return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users=User.objects.all()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)

#Aqui lo que hacemos es el registro del Usuario y despues realizaremos la validacion mediante JTW, ya que al crear el user
#Le indicamos que no sea activo por lo cual no se podra logear hasta que este no este activo

#Completado todo el proceso de registro y logeo con cookies que esta en el UserAction con el Redux
#Falta ver si se genera el user con el token cuando se activa la cuenta o antes.
@api_view(['POST'])
def registerUser(request):
    data=request.data
    
    try:
        existing_user = User.objects.get(email=data['email'])
        if existing_user.is_active:
            message = {'details': "Ya existe un usuario activo con ese correo electrónico."}
            return Response(message)
        else:
            # Manejar el caso donde el usuario existe pero no está activo
            raise User.DoesNotExist
    except User.DoesNotExist:
        try:
            user = User.objects.create(username=data['username'], first_name=data['fname'],
                                        last_name=data['lname'], email=data['email'],
                                        password=make_password(data['password']), is_active=False)
            
            # Generar token para enviar correo electrónico
            email_subject = "Activar tu cuenta"
            message = render_to_string("activate.html", {
                'user': user.username,
                'domain': '127.0.0.1:8000',
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': generate_token.make_token(user)
            })

            email_message = EmailMessage(email_subject, message, settings.DEFAULT_FROM_EMAIL, [data['email']])

            email_message.content_subtype = "html"
            email_message.send()
            
            message = {'details': "Activación de cuenta enviada al correo electrónico. Por favor, revisa tu bandeja de entrada."}
            serialize = UserSerializerWithToken(user, many=False)
            return Response(message)
        except Exception as e:
            message = {'details': "Este usuario ya existe. Por favor, intenta con otro."}
            return Response(message)


class ActivateAccountView(View):
    def get(self,request,uidb64,token):
        try:
            
            uid=force_text(urlsafe_base64_decode(uidb64))
            user=User.objects.get(pk=uid)
            print("hola")
        except Exception as identifier:
            user=None
        if user is not None and generate_token.check_token(user,token):
            user.is_active=True
            user.save()
            message={"details":"Account is activated..."}
            return render(request,"activatesuccess.html")
        else:
            return render(request,"activatefail.html")   
        

#Aqui lo que hacemos es crear el perfil del usuario
#Mediante la informacion del front

#Aqui tenemos la creacion de Perfil donde, obtenemos el objetivo mediante el nombre
#Ye el usuario con su nombre debe ser unico
#Y tras esto creamos el perfil del usuario

@api_view(['POST'])
# @permission_classes([IsAuthenticated]) 
def createProfile(request):
    data = request.data
  

    username = data.get('username')
    user = get_object_or_404(User, username=username)

    # Obtén el objetivo
    objetivo_nombre = data['objetivo']
    objetivo = get_object_or_404(Objetivo, nombre=objetivo_nombre)
    

    # Comprueba si ya existe un perfil para el usuario
    try:
        perfil = Perfiles.objects.get(perfil_id=user.pk)
        # Actualiza los datos del perfil existente
        perfil.peso = data['peso']
        perfil.altura = data['altura']
        perfil.edad = data['edad']
        perfil.sexo = data['sexo']
        perfil.factor_Actividad = data['factor_Actividad']
        perfil.foto_perfil = data['foto_perfil']
        perfil.fecha_nacimiento = data['fecha_nacimiento']
        perfil.Calorias = data['Calorias']
        perfil.Objetivo_id = objetivo.pk
        perfil.save()
        created = False
        message = "Perfil actualizado exitosamente."
        status_code = status.HTTP_200_OK
    except Perfiles.DoesNotExist:
        # Crea un nuevo perfil si no existe
        perfil = Perfiles.objects.create(
            peso=data['peso'],
            altura=data['altura'],
            edad=data['edad'],
            sexo=data['sexo'],
            factor_Actividad=data['factor_Actividad'],
            foto_perfil=data['foto_perfil'],
            fecha_nacimiento=data['fecha_nacimiento'],
            Calorias=data['Calorias'],
            Objetivo_id=objetivo.pk,
            perfil_id=user.pk
        )
        created = True
        message = "Perfil creado exitosamente."
        status_code = status.HTTP_201_CREATED


    serializer = PerfilSerializer(perfil, many=False)
    return Response({'perfil': serializer.data, 'message': message}, status=status_code)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def checkUserProfile(request,username):
    try:
        # Intentar obtener el usuario
        user = get_object_or_404(User, username=username)
        
        # Intentar buscar el perfil asociado al usuario
        perfil = Perfiles.objects.get(perfil_id=user.pk)
        
        # Si se encuentra el perfil, devolver un mensaje indicando que el usuario ya tiene un perfil
        return Response({"message": "El usuario ya tiene un perfil asociado."})
    except Perfiles.DoesNotExist:
        # Si no se encuentra el perfil, devolver un mensaje indicando que el usuario aún no tiene un perfil
        return Response({"message": "El usuario aún no tiene un perfil asociado."})
    except User.DoesNotExist:
        # Si no se encuentra el usuario, devolver un mensaje indicando que el usuario no existe
        return Response({"message": "El usuario no existe."})
    
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getProfileByUsername(request, username):
    try:
        # Intenta obtener el usuario con el nombre de usuario proporcionado
        user = get_object_or_404(User, username=username)
        
        # Intenta obtener el perfil asociado al usuario
        perfil = Perfiles.objects.get(perfil_id=user.pk)
        
        # Serializa el perfil y devuelve los datos
        serializer = PerfilSerializer(perfil, many=False)
        return Response(serializer.data)
    except Perfiles.DoesNotExist:
        # Si no se encuentra el perfil, devuelve un mensaje indicando que el usuario no tiene un perfil asociado
        return Response({"message": "El usuario no tiene un perfil asociado."})
    except User.DoesNotExist:
        # Si no se encuentra el usuario, devuelve un mensaje indicando que el usuario no existe
        return Response({"message": "El usuario no existe."})
    

#Primero tengo que comprobar si hay creado un consumo con esa id y en casa de que haya elimino el consumo y reemoplazo
@api_view(['POST'])
def crear_consumo(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        username = data.get('username')
        
        # Obtener el perfil del usuario a partir del nombre de usuario
        user = User.objects.get(username=username)
        perfil_obtenido = Perfiles.objects.get(perfil_id=user.pk)
        
        # Consultar si ya existe un momento para este usuario y este momento del día
        momento_existente = Detail_Consumo.objects.filter(
            Momento_dia=data['momento_dia'],
            consumo__perfil=perfil_obtenido
        ).first()
        print(momento_existente, "xd")
        
        if momento_existente:
            # Si el momento ya existe, obtén el consumo asociado
            consumo_existente = Consumo.objects.get(momento_dia=momento_existente, perfil=perfil_obtenido)
            # Modifica los campos del consumo existente según los datos recibidos
            consumo_existente.fecha_consumo = data['fecha_consumo']
            consumo_existente.calorias_consumidas = data['calorias_consumidas']
            consumo_existente.calorias_restantes = data['calorias_restantes']
            consumo_existente.proteinas = data['proteinas']
            consumo_existente.grasas = data['grasas']
            consumo_existente.carbohidratos = data['carbohidratos']
            consumo_existente.save()
            momento = momento_existente

            # Si el momento ya existe, actualiza sus detalles
            momento_existente.calorias = data['calorias_seccion']
            momento_existente.proteinas = data['proteinas']
            momento_existente.grasas = data['grasas']
            momento_existente.carbohidratos = data['carbohidratos']
            momento_existente.save()
            momento = momento_existente
        else:
            # Si no existe, crea un nuevo momento y un nuevo consumo
            momento = Detail_Consumo.objects.create(
                Momento_dia=data['momento_dia'],
                calorias=data['calorias_seccion'],
                proteinas=data['proteinas'],
                grasas=data['grasas'],
                carbohidratos=data['carbohidratos'],
            )
            consumo = Consumo.objects.create(
                fecha_consumo=data['fecha_consumo'],
                calorias_consumidas=data['calorias_consumidas'],
                calorias_restantes=data['calorias_restantes'],
                proteinas=data['proteinas'],
                grasas=data['grasas'],
                carbohidratos=data['carbohidratos'],
                momento_dia=momento,  # Asignar la instancia de Detail_Consumo
                perfil=perfil_obtenido,
            )

        productos_str = data.get('productos', '')
        nombres_productos = [nombre.strip() for nombre in productos_str.split(',')]

        # Consultar los objetos Productos correspondientes a los nombres recibidos
        productos = Productos.objects.filter(nombre__in=nombres_productos)

        # Obtener los productos asociados al momento actual
        productos_existente = Detail_Consumo_Producto.objects.filter(detail_consumo=momento, producto__in=productos)

        # Crear un conjunto de nombres de productos existentes para una búsqueda más rápida
        nombres_productos_existentes = set(producto.producto.nombre for producto in productos_existente)

        # Asociar los productos al momento, evitando duplicados
        for producto in productos:
            # Verificar si el producto ya está asociado al momento
            if producto.nombre not in nombres_productos_existentes:
                # Crear una instancia de Detail_Consumo_Producto para el producto y asociarlo al momento
                Detail_Consumo_Producto.objects.create(
                    detail_consumo=momento,
                    producto=producto,
                    calorias=data['calorias_producto'],
                    proteinas=data['proteinas'],
                    grasas=data['grasas'],
                    carbohidratos=data['carbohidratos'],
                )
                # Agregar el nombre del producto a la lista de nombres existentes para evitar duplicados
                nombres_productos_existentes.add(producto.nombre)

        return Response({'mensaje': 'Consumo creado correctamente'}, status=status.HTTP_201_CREATED)




from collections import defaultdict

@api_view(['GET'])
def getUsernameProducts(request, username, fecha_consumo):
    try:
        # Intentar obtener el usuario
        user = get_object_or_404(User, username=username)
        
        # Intentar buscar el perfil asociado al usuario
        perfil = get_object_or_404(Perfiles, perfil=user)
        
        # Obtener todos los consumos para la fecha específica
        consumos = Consumo.objects.filter(perfil=perfil, fecha_consumo=fecha_consumo)
        
        # Diccionario para almacenar los productos agrupados por momento del día
        productos_por_momento = defaultdict(list)
        
        # Iterar sobre cada consumo
        for consumo in consumos:
            detalle_consumo = consumo.momento_dia
            detalles_productos = Detail_Consumo_Producto.objects.filter(detail_consumo=detalle_consumo)
            for detalle_producto in detalles_productos:
                # Agrupar los productos por momento del día
                productos_por_momento[detalle_consumo.Momento_dia].append(detalle_producto)
        
        # Crear una lista para almacenar todos los objetos Detail_Consumo_Producto con su momento correspondiente
        productos_list = []
        
        for momento, productos in productos_por_momento.items():
            detalle_consumo_productos = [GetProductsSerializer(producto).data for producto in productos]
            productos_list.append({
                'momento': momento,
                'detalle_consumo_productos': detalle_consumo_productos
            })

        # Serializar los productos y devolverlos como respuesta
        return Response(productos_list, status=status.HTTP_200_OK)
    
    except Perfiles.DoesNotExist:
        return Response({"message": "El usuario aún no tiene un perfil asociado."}, status=status.HTTP_404_NOT_FOUND)
    except User.DoesNotExist:
        return Response({"message": "El usuario no existe."}, status=status.HTTP_404_NOT_FOUND)
    except Consumo.DoesNotExist:
        return Response({"message": "No hay consumo para la fecha especificada."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Manejar cualquier otra excepción y devolver una respuesta adecuada
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


import re

def to_float(value):
    # Usar una expresión regular para eliminar cualquier texto no numérico (como 'kcal')
    cleaned_value = re.sub(r'[^\d.]+', '', value)
    return float(cleaned_value)


@api_view(['POST'])
def eliminar_producto(request):

    if request.method == 'POST':
        data = request.data
        username = data.get('username')
        fecha_consumo = data.get('fecha_consumo')
        producto_nombre = data.get('producto')
        momento_dia = data.get('momento_dia')
        
        try:
            # Obtener el perfil del usuario a partir del nombre de usuario
            user = User.objects.get(username=username)
            perfil_obtenido = Perfiles.objects.get(perfil_id=user.pk)
            # Consultar si existe un momento para este usuario, esta fecha y este momento del día
            momento_existente = Detail_Consumo.objects.filter(
                Momento_dia=momento_dia,
                consumo__perfil=perfil_obtenido,
                consumo__fecha_consumo=fecha_consumo
            ).first()
            

            if not momento_existente:
                print("xd")
                return Response({'mensaje': 'El momento especificado no existe.'}, status=status.HTTP_404_NOT_FOUND)

            # Consultar el producto específico
            producto_id = Productos.objects.filter(nombre=producto_nombre).values('id').first()['id']
            # Consultar si existe un producto en Detail_Consumo_Producto con el ID obtenido
            producto_existente = Detail_Consumo_Producto.objects.filter(
                producto_id=producto_id,
                detail_consumo_id=momento_existente.pk
            ).first()


            if not producto_existente:
                return Response({'mensaje': 'El producto especificado no existe.'}, status=status.HTTP_404_NOT_FOUND)

            # Obtener el consumo existente para actualizarlo
            consumo_existente = Consumo.objects.filter(
                momento_dia=momento_existente,
                perfil=perfil_obtenido,
                fecha_consumo=fecha_consumo
            ).first()
            
            
            if not consumo_existente:
                return Response({'mensaje': 'El consumo especificado no existe.'}, status=status.HTTP_404_NOT_FOUND)

            # Convertir los valores de consumo_existente y producto_existente a float y realizar las restas
            calorias_producto = to_float(producto_existente.calorias)
            proteinas_producto = to_float(producto_existente.proteinas)
            grasas_producto = to_float(producto_existente.grasas)
            carbohidratos_producto = to_float(producto_existente.carbohidratos)

            calorias_momento = to_float(momento_existente.calorias)
            proteinas_momento = to_float(momento_existente.proteinas)
            grasas_momento = to_float(momento_existente.grasas)
            carbohidratos_momento = to_float(momento_existente.carbohidratos)

            # Actualizar las calorías consumidas y restantes
            consumo_existente.calorias_consumidas = str(to_float(consumo_existente.calorias_consumidas) - calorias_producto)
            consumo_existente.calorias_restantes = str(to_float(consumo_existente.calorias_restantes) + calorias_producto)

            # Actualizar los macronutrientes
            consumo_existente.proteinas = str(to_float(consumo_existente.proteinas) - proteinas_producto)
            consumo_existente.grasas = str(to_float(consumo_existente.grasas) - grasas_producto)
            consumo_existente.carbohidratos = str(to_float(consumo_existente.carbohidratos) - carbohidratos_producto)

            consumo_existente.save()

            # Actualizar los detalles del momento del consumo
            momento_existente.calorias = str(calorias_momento - calorias_producto)
            momento_existente.proteinas = str(proteinas_momento - proteinas_producto)
            momento_existente.grasas = str(grasas_momento - grasas_producto)
            momento_existente.carbohidratos = str(carbohidratos_momento - carbohidratos_producto)

            momento_existente.save()

            # Eliminar el producto
            producto_existente.delete()

            return Response({'mensaje': 'Producto eliminado correctamente'}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'mensaje': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Perfiles.DoesNotExist:
            return Response({'mensaje': 'Perfil no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'mensaje': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
def getRecipes(request):
    recetas = Recetas.objects.all()
    serializer = RecetasSerializer(recetas, many=True)
    return Response(serializer.data)
from django.db.models import Q
@api_view(['GET'])
def getRutinas(request, username):
    # Obtener el perfil del usuario basado en el username
    user_profile = get_object_or_404(Perfiles, perfil__username=username)
    
    # Obtener el perfil del usuario "FitFever"
    fitfever_profile = get_object_or_404(Perfiles, perfil__username="FitFever")
    
    # Filtrar rutinas que tengan asociado el perfil del usuario o el perfil "FitFever"
    rutinas = Rutinas.objects.filter(perfil__in=[user_profile, fitfever_profile])
    
    # Serializar los datos
    serializer = RutinasSerializer(rutinas, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def getEjercicios(request, username):
    # Obtener el perfil del usuario basado en el username
    perfil = get_object_or_404(Perfiles, perfil__username=username)
    
    # Filtrar ejercicios que no tengan asociado ningún perfil o que tengan el perfil del usuario
    ejercicios = Ejercicios.objects.filter(Q(perfil__isnull=True) | Q(perfil=perfil))
    
    # Serializar los datos
    serializer = EjerciciosSerializer(ejercicios, many=True)
    
    return Response(serializer.data)


@api_view(['POST'])
def addEjercicio(request):
    try:
        # Imprimir datos de la solicitud para depuración
        print(request.data)

        # Obtener el usuario a partir del nombre de usuario proporcionado
        usuario = request.data.get('usuario')
        user = User.objects.get(username=usuario)

        # Obtener el perfil asociado al usuario
        perfil_obtenido = Perfiles.objects.get(perfil_id=user.pk)

        # Verificar si ya existe un ejercicio con el mismo nombre
        nombre_ejercicio = request.data.get('nombre')
        if Ejercicios.objects.filter(nombre=nombre_ejercicio).exists():
            return Response({'detail': 'Ya existe un ejercicio con este nombre'}, status=status.HTTP_400_BAD_REQUEST)

        # Crear el objeto Ejercicio directamente en la base de datos
        ejercicio = Ejercicios.objects.create(
            nombre=nombre_ejercicio,
            grupo_muscular=request.data.get('grupo_muscular'),
            descripcion=request.data.get('descripcion'),
            series=request.data.get('series'),
            repeticiones=request.data.get('repeticiones'),
            perfil_id=perfil_obtenido.pk
        )

        # Devolver una respuesta de éxito con los datos del ejercicio creado
        serializer = EjerciciosSerializer(ejercicio)
        return Response({'data': serializer.data, 'message': 'Ejercicio añadido con éxito'}, status=status.HTTP_201_CREATED)

    except Perfiles.DoesNotExist:
        return Response({'detail': 'Perfil no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except User.DoesNotExist:
        return Response({'detail': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': "Hay que rellenar todos los campos"}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def addRutina(request):
    try:
        # Imprimir datos de la solicitud para depuración

        # Obtener el usuario a partir del nombre de usuario proporcionado
        usuario = request.data.get('usuario')
        user = User.objects.get(username=usuario)

        # Obtener el perfil asociado al usuario
        perfil_obtenido = Perfiles.objects.get(perfil_id=user.pk)

        # Extraer datos de la solicitud
        nombre_rutina = request.data.get('nombre')
        descripcion = request.data.get('descripcion')
        objetivo = request.data.get('objetivo')
        duracion = request.data.get('duracion')
        nivel = request.data.get('nivel')
        ejercicios_nombres = request.data.get('ejercicios')

        # Verificar si ya existe una rutina con el mismo nombre
        if Rutinas.objects.filter(nombre=nombre_rutina).exists():
            return Response({'detail': 'Ya existe una rutina con este nombre'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si se proporcionaron ejercicios
        if not ejercicios_nombres:
            return Response({'detail': 'Se deben proporcionar ejercicios para crear la rutina'}, status=status.HTTP_400_BAD_REQUEST)

        # Crear la nueva rutina
        nueva_rutina = Rutinas.objects.create(
            nombre=nombre_rutina,
            descripcion=descripcion,
            Objetivo=objetivo,
            duracion=duracion,
            nivel=nivel,
            perfil=perfil_obtenido
        )

        # Buscar los ejercicios por nombre y asociarlos a la nueva rutina
        for nombre_ejercicio in ejercicios_nombres:
            ejercicio = Ejercicios.objects.get(nombre=nombre_ejercicio)
            ejercicio.rutina.add(nueva_rutina)

        # Guardar la rutina con los ejercicios asociados
        nueva_rutina.save()

        # Devolver una respuesta de éxito con los datos de la rutina creada
        serializer = RutinasSerializer(nueva_rutina)
        return Response({'data': serializer.data, 'message': 'Rutina creada con éxito'}, status=status.HTTP_201_CREATED)

    except Perfiles.DoesNotExist:
        return Response({'detail': 'Perfil no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except User.DoesNotExist:
        return Response({'detail': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Ejercicios.DoesNotExist:
        return Response({'detail': 'Uno o más ejercicios no fueron encontrados'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def addRutinaDiaria(request):
    try:
        usuario = request.data.get('usuario')
        nombre_rutina = request.data.get('nombre')
        fecha = request.data.get('fecha')
        dia_semana = request.data.get('dia')

        user = User.objects.get(username=usuario)
        perfil = Perfiles.objects.get(perfil=user)

        rutina = Rutinas.objects.get(nombre=nombre_rutina)

        rutina_existente = RutinasAsociadas.objects.filter(
            perfil=perfil,
            rutina=rutina,
            fecha_asociada=fecha,
            dia_semana=dia_semana
        ).exists()

        if rutina_existente:
            return Response({'detail': 'Ya existe una rutina con el mismo nombre para este día'}, status=status.HTTP_400_BAD_REQUEST)

        rutinas_del_dia = RutinasAsociadas.objects.filter(
            perfil=perfil,
            fecha_asociada=fecha,
            dia_semana=dia_semana
        ).count()

        if rutinas_del_dia >= 3:
            return Response({'detail': 'No se pueden agregar más de 3 rutinas en un mismo día'}, status=status.HTTP_400_BAD_REQUEST)

        rutina_asociada = RutinasAsociadas.objects.create(
            perfil=perfil,
            rutina=rutina,
            fecha_asociada=fecha,
            dia_semana=dia_semana
        )

        return Response({
            'data': {
                'usuario': usuario,
                'nombre_rutina': nombre_rutina,
                'fecha': fecha,
                'dia_semana': dia_semana
            },
            'message': 'Rutina diaria creada con éxito'
        }, status=status.HTTP_201_CREATED)

    except User.DoesNotExist:
        return Response({'detail': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Rutinas.DoesNotExist:
        return Response({'detail': 'Rutina no encontrada'}, status=status.HTTP_404_NOT_FOUND)


    

@api_view(['GET'])
def getRutinasDiarias(request, username):
    # Obtener el perfil del usuario basado en el username
    perfil = get_object_or_404(Perfiles, perfil__username=username)
    
    # Filtrar las rutinas asociadas al perfil
    rutinas_asociadas = RutinasAsociadas.objects.filter(perfil=perfil)
    
    # Serializar los datos
    serializer = RutinasAsociadasSerializer(rutinas_asociadas, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def eliminarRutina(request):
    if request.method == 'POST':
        data = request.data
        username = data.get('username')
        nombre_rutina = data.get('nombre_rutina')

        try:
            # Obtener el perfil del usuario a partir del nombre de usuario
            user = get_object_or_404(User, username=username)
            perfil = get_object_or_404(Perfiles, perfil_id=user.pk)

            # Obtener la rutina a eliminar
            rutina = get_object_or_404(Rutinas, nombre=nombre_rutina, perfil=perfil)

            # Eliminar las RutinasAsociadas que tienen esta rutina
            RutinasAsociadas.objects.filter(rutina=rutina).delete()

            # Eliminar la rutina
            rutina.delete()

            return Response({'mensaje': 'Rutina eliminada correctamente'}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'mensaje': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Perfiles.DoesNotExist:
            return Response({'mensaje': 'Perfil no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'mensaje': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'mensaje': 'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

@api_view(['POST'])
def eliminarEjercicio(request):
    if request.method == 'POST':
        data = request.data
        username = data.get('username')
        nombre_ejercicio = data.get('nombre_ejercicio')

        try:
            # Obtener el perfil del usuario a partir del nombre de usuario
            user = get_object_or_404(User, username=username)
            perfil = get_object_or_404(Perfiles, perfil_id=user.pk)

            # Obtener el ejercicio a eliminar
            ejercicio = get_object_or_404(Ejercicios, nombre=nombre_ejercicio, perfil=perfil)

            # Obtener las rutinas asociadas al ejercicio
            rutinas = list(ejercicio.rutina.all())


            # Comprobar si las rutinas se quedan vacías después de eliminar el ejercicio
            rutinas_a_eliminar = [rutina for rutina in rutinas if rutina.ejercicios_set.count() == 1]

            # Eliminar el ejercicio
            ejercicio.delete()

            # Eliminar las rutinas que se quedan vacías
            for rutina in rutinas_a_eliminar:
                rutina.delete()

            return Response({'mensaje': 'Ejercicio y rutinas asociadas eliminados correctamente'}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'mensaje': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Perfiles.DoesNotExist:
            return Response({'mensaje': 'Perfil no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'mensaje': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'mensaje': 'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
@api_view(['POST'])
def eliminarRutinaDiaria(request):
    if request.method == 'POST':
        data = request.data
        username = data.get('username')
        nombre_rutina = data.get('nombre_rutina')
        fecha = data.get('fecha')
        dia = data.get('dia')

        try:
            # Obtener el perfil del usuario a partir del nombre de usuario
            user = get_object_or_404(User, username=username)
            perfil = get_object_or_404(Perfiles, perfil_id=user.pk)

            # Obtener la rutina a partir del nombre de la rutina
            rutina = get_object_or_404(Rutinas, nombre=nombre_rutina)

            # Obtener la rutina diaria a eliminar
            rutina_diaria = get_object_or_404(RutinasAsociadas, rutina=rutina, perfil=perfil, fecha_asociada=fecha, dia_semana=dia)

            # Eliminar la rutina diaria
            rutina_diaria.delete()

            return Response({'mensaje': 'Rutina diaria eliminada correctamente'}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'mensaje': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Perfiles.DoesNotExist:
            return Response({'mensaje': 'Perfil no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Rutinas.DoesNotExist:
            return Response({'mensaje': 'Rutina no encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        except RutinasAsociadas.DoesNotExist:
            return Response({'mensaje': 'Rutina diaria no encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'mensaje': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'mensaje': 'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
@api_view(['POST'])
def realizar_scraping(request):
    # Obtener el username desde el body de la solicitud
    username = request.data.get('username', None)
    url = "https://products-fit-fever.vercel.app/"  # URL de la página a scrapear

    if not username:
        return Response({
            'success': False,
            'message': 'El campo username es requerido.'
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Buscar al usuario por el username
        user = User.objects.get(username=username)

        # Verificar si el usuario es superusuario
        if not user.is_superuser:
            return Response({
                'success': False,
                'message': 'No tienes permisos para realizar esta acción.'
            }, status=status.HTTP_403_FORBIDDEN)

        # Realizar el scraping si el usuario es superusuario
        productos = scrape_productos(url)
        
        if productos:
            # Guardar los datos en la base de datos
            for producto_data in productos:
                # Crear una nueva instancia del modelo Productos
                producto = Productos(
                    nombre=producto_data['nombre'],
                    calorias=producto_data['calorias'],
                    grasas=producto_data['grasas'],
                    proteinas=producto_data['proteinas'],
                    carbohidratos=producto_data['carbohidratos']
                )
                producto.save()

            return Response({
                'success': True,
                'message': 'Datos de productos guardados con éxito.'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'success': False,
                'message': 'Error al realizar el scraping.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except User.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Usuario no encontrado.'
        }, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({
            'success': False,
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


def generate_pdf(context):
    html_string = render_to_string('reporte.html', context)
    html = HTML(string=html_string)
    result = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
    html.write_pdf(target=result.name)
    return result