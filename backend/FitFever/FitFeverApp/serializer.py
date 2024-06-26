from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *


class UserSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model=User
        fields=['id','_id','username','email','name','isAdmin']
    def get_name(self,obj):
        firstname=obj.first_name
        lastname=obj.last_name
        name=firstname+ "" + lastname
        if name =="":
            name="Set Your Name"
        return name
    
    def get__id(self,obj):
        return obj.id
    
    def get_isAdmin(self,obj):
        return obj.is_staff

class UserSerializerWithToken(UserSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    print(token)
    class Meta:
        model=User
        fields=['id','username','email','name','isAdmin','token']
    
    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)

class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model=Perfiles
        fields='__all__'

class ConsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Consumo
        fields='__all__'
    
class GetProductsSerializer(serializers.ModelSerializer):

    nombre = serializers.CharField(source='producto.nombre')
    class Meta:
        model=Detail_Consumo_Producto
        fields = ['id', 'calorias', 'proteinas', 'grasas', 'carbohidratos', 'detail_consumo', 'producto', 'nombre']

#Serializer para obtener los productos consumidos en un momento especifico

class ProductoConMomentoSerializer(serializers.Serializer):
    momento = serializers.CharField()
    detalle_consumo_productos = GetProductsSerializer(many=True)

class RecetasSerializer(serializers.ModelSerializer):
    objetivo_nombre = serializers.CharField(source='Objetivo.nombre', read_only=True)

    class Meta:
        model = Recetas
        fields = ['id_receta', 'nombre', 'objetivo_nombre', 'calorias', 'proteinas', 'grasas', 'carbohidratos', 'ingredientes',"imagen"]

class EjerciciosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ejercicios
        fields = '__all__'

class RutinasSerializer(serializers.ModelSerializer):
    ejercicios = EjerciciosSerializer(many=True, read_only=True, source='ejercicios_set')

    class Meta:
        model = Rutinas
        fields = '__all__'

class RutinasAsociadasSerializer(serializers.ModelSerializer):
    rutina = RutinasSerializer()

    class Meta:
        model = RutinasAsociadas
        fields = ['rutina', 'fecha_asociada', 'dia_semana']