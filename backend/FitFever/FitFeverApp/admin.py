from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Objetivo)
class ObjetivoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')

@admin.register(Perfiles)
class PerfilesAdmin(admin.ModelAdmin):
    list_display = ('perfil', 'peso', 'altura', 'edad', 'sexo', 'factor_Actividad', 'foto_perfil', 'fecha_nacimiento', 'Calorias')

@admin.register(Recetas)
class RecetasAdmin(admin.ModelAdmin):
    list_display = ('id_receta', 'nombre', 'Objetivo', 'calorias', 'proteinas', 'grasas', 'carbohidratos', 'ingredientes')

@admin.register(Productos)
class ProductosAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'calorias', 'proteinas', 'grasas', 'carbohidratos')


@admin.register(Detail_Consumo)
class Detail_ConsumoAdmin(admin.ModelAdmin):
    list_display = ('id', 'Momento_dia', 'calorias', 'proteinas', 'grasas', 'carbohidratos')

@admin.register(Consumo)
class ConsumoAdmin(admin.ModelAdmin):
    list_display = ('id_consumo', 'fecha_consumo', 'calorias_consumidas', 'calorias_restantes', 'proteinas', 'grasas', 'carbohidratos', 'momento_dia')

@admin.register(Rutinas)
class RutinasAdmin(admin.ModelAdmin):
    list_display = ('id_rutina', 'nombre', 'descripcion', 'Objetivo', 'duracion', 'nivel', 'perfil')

@admin.register(Ejercicios)
class EjerciciosAdmin(admin.ModelAdmin):
    list_display = ('id_ejercicio', 'nombre', 'grupo_muscular', 'descripcion', 'series', 'repeticiones')
