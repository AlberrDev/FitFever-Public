from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Objetivo(models.Model):
    Objetivos = [
        ('Perder Peso', 'Perder Peso'),
        ('Ganar Masa Muscular', 'Ganar Masa Muscular'),
        ('Mantener Peso', 'Mantener Peso'),
    ]
    objetivo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50, choices=Objetivos)
    descripcion = models.CharField(max_length=200)
   

class Perfiles(models.Model):
    
    Sexo = [
        ('masculino', 'masculino'),
        ('femenino', 'femenino'),
    ]
    perfil = models.OneToOneField(User, on_delete=models.CASCADE)
    peso = models.FloatField()
    altura = models.FloatField()
    edad = models.IntegerField()
    Objetivo = models.ForeignKey(Objetivo, on_delete=models.CASCADE)
    sexo = models.CharField(choices=Sexo, max_length=15)
    factor_Actividad = models.FloatField( validators=[MinValueValidator(1.0), MaxValueValidator(2.0)])
    foto_perfil= models.CharField(max_length=200)
    fecha_nacimiento = models.DateField()
    Calorias = models.FloatField()

class Recetas(models.Model):
    id_receta = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=2500)
    Objetivo = models.ForeignKey(Objetivo, on_delete=models.CASCADE)
    calorias = models.CharField(max_length=2500)
    proteinas = models.CharField(max_length=2500)
    grasas = models.CharField(max_length=2500)
    carbohidratos = models.CharField(max_length=2500)
    ingredientes = models.CharField(max_length=2500)
    imagen= models.CharField(max_length=2500, null=True, blank=True)
    instrucciones = models.CharField(max_length=2000,null=True, blank=True)

class Productos(models.Model):
    id_producto = models.ManyToManyField(Recetas)
    nombre = models.CharField(max_length=500)
    calorias = models.CharField(max_length=500)
    proteinas = models.CharField(max_length=500, null=True, blank=True)
    grasas = models.CharField(max_length=500, null=True, blank=True)
    carbohidratos = models.CharField(max_length=500, null=True, blank=True)

class Detail_Consumo_Producto(models.Model):
    detail_consumo = models.ForeignKey('Detail_Consumo', on_delete=models.CASCADE)
    producto = models.ForeignKey(Productos, on_delete=models.CASCADE)
    calorias = models.CharField(max_length=50)
    proteinas = models.CharField(max_length=50)
    grasas = models.CharField(max_length=50)
    carbohidratos = models.CharField(max_length=50)

class Detail_Consumo(models.Model):
    momentos = [
        ('Desayuno', 'Desayuno'),
        ('Almuerzo', 'Almuerzo'),
        ('Comida', 'Comida'),
        ('Merienda', 'Merienda'),
        ('Cena', 'Cena'),
        
    ]
    Momento_dia = models.CharField(max_length=50, choices=momentos)
    calorias = models.CharField(max_length=50)
    proteinas = models.CharField(max_length=50)
    grasas = models.CharField(max_length=50)
    carbohidratos = models.CharField(max_length=50)

class Consumo(models.Model):
    id_consumo = models.AutoField(primary_key=True)
    fecha_consumo = models.DateField()
    calorias_consumidas = models.CharField(max_length=50)
    calorias_restantes = models.CharField(max_length=50)
    proteinas = models.CharField(max_length=50)
    grasas = models.CharField(max_length=50)
    carbohidratos = models.CharField(max_length=50)
    momento_dia = models.ForeignKey(Detail_Consumo,on_delete=models.CASCADE)
    perfil = models.ForeignKey(Perfiles, blank=True, null=True, on_delete=models.CASCADE)
    recetas = models.ForeignKey(Recetas,blank=True, null=True,on_delete=models.CASCADE)

class Rutinas(models.Model):
    Objetivos = [
        ('Perder Peso', 'Perder Peso'),
        ('Ganar Masa Muscular', 'Ganar Masa Muscular'),
        ('Mantener Peso', 'Mantener Peso'),
    ]
    niveles = [
        ('Principiante', 'Principiante'),
        ('Intermedio', 'Intermedio'),
        ('Avanzado', 'Avanzado'),
    ]
    id_rutina = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=200)
    Objetivo = models.CharField(max_length=50, choices=Objetivos)
    duracion = models.IntegerField()
    nivel = models.CharField(choices=niveles, max_length=50)
    perfil = models.ForeignKey(Perfiles, on_delete=models.CASCADE)
    dia_semana = models.CharField(max_length=50, null=True, blank=True)

class Ejercicios(models.Model):
    id_ejercicio = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    grupo_muscular = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=200)
    series = models.IntegerField()
    repeticiones = models.IntegerField()
    rutina = models.ManyToManyField(Rutinas)
    perfil = models.ForeignKey(Perfiles, on_delete=models.CASCADE,null=True, blank=True)

class RutinasAsociadas(models.Model):
    perfil = models.ForeignKey(Perfiles, on_delete=models.CASCADE)
    rutina = models.ForeignKey(Rutinas, on_delete=models.CASCADE)
    fecha_asociada = models.DateField(null=True, blank=True)
    dia_semana = models.CharField(max_length=50)
    



    
