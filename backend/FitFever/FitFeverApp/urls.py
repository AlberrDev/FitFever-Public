from django.contrib import admin
from django.urls import path,include
from . import views
from django.urls import re_path 
from django.contrib.auth.decorators import login_required
from django.conf import settings 
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



urlpatterns = [
    path('',views.getRoutes,name="getRoutes"),
    path('products/getProductsCustom',views.getProductsCustomPage,name="getProductsCustomPage"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/',views.createProfile,name="createProfile"),
    path('users/',views.getUsers,name="getUsers"),
    path("users/register/",views.registerUser,name="register"),
    path('activate/<uidb64>/<token>',views.ActivateAccountView.as_view(),name='activate'),
    path("users/checkUserProfile/<str:username>/", views.checkUserProfile, name="checkUserProfile"),
    path("users/getProfileByUsername/<str:username>/", views.getProfileByUsername, name="getProfileByUsername"),
    path('products/getProducts',views.getProducts,name="getProducts"),
    path('users/crear_consumo',views.crear_consumo,name="crearConsumo"),
    path('users/getUsernameProducts/<str:username>/<str:fecha_consumo>',views.getUsernameProducts,name="getUsernameProducts"),
    path('products/deleteProducts',views.eliminar_producto,name="eliminar_producto"),
    path('recipes/getRecipes',views.getRecipes,name="getRecipes"),
    path('entrenamiento/getRutinas/<str:username>/',views.getRutinas,name="getRutinas"),
    path('entrenamiento/getEjercicios/<str:username>/',views.getEjercicios,name="getEjercicios"),
    path('entrenamiento/addEjercicios',views.addEjercicio,name="addEjercicio"),
    path('entrenamiento/addRutinas',views.addRutina,name="addRutina"),
    path('entrenamiento/addRutinaDiaria',views.addRutinaDiaria,name="addRutinaDiaria"),
    path('entrenamiento/getRutinasDiarias/<str:username>/',views.getRutinasDiarias,name="getRutinasDiarias"),
    path('entrenamiento/eliminarRutina',views.eliminarRutina,name="eliminarRutina"),
    path('entrenamiento/eliminarEjercicio',views.eliminarEjercicio,name="eliminarEjercicio"),
    path('entrenamiento/eliminarRutinaDiaria',views.eliminarRutinaDiaria,name="eliminarRutinaDiaria"),
    path('users/scrapping',views.realizar_scraping,name="realizar_scraping"),









]
