import time
from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse

#Ya esta realizado ya almaceno un monton de datos en un diccionario con un monton de productos

import requests
from bs4 import BeautifulSoup
#Hecho
def obtener_nombres_secciones(url):
    nombres_secciones = []
    response = requests.get(url,allow_redirects=False)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        enlaces_secciones = soup.find_all("a", class_="cmsb7-items-center", href=True)
        
        contador = 0
        for enlace in enlaces_secciones:
            # Incrementar el contador
            contador += 1
            
            # Ignorar la primera, tercera y las dos últimas secciones
            if contador in [1, 3, len(enlaces_secciones) - 1, len(enlaces_secciones)]:
                continue
            
            # Obtener el atributo href del enlace
            href = enlace['href']
            
            # Obtener el último segmento de la URL
            nombre_seccion = urlparse(href).path.split('/')[-2]
            
            # Agregar el nombre de la sección a la lista
            nombres_secciones.append(nombre_seccion)
        
        print(nombres_secciones, "names")
        return nombres_secciones
    else:
        print(f"Error al conectar con la página {url}")
        return None





def sacar_nombre_productos(soup):
    nombres_productos = []

# Encontrar todos los enlaces con la clase product__link y extraer el nombre del último segmento de la URL
    enlaces = soup.find_all('a', class_='product__link')
    for enlace in enlaces:
        url = enlace['href']
        nombre_producto = url.split('/')[-2]
        nombres_productos.append(nombre_producto)
    print(nombres_productos,"namess")
    return nombres_productos

def sacar_precio_productos(soup):
    array_precios = []
    precios = soup.find_all("span", class_="price-wrapper")
    for precio in precios:
        precio = precio.find("span", class_="price")
        precio_limpio = precio.text.strip().split(' ')[0].replace(',', '.')
        array_precios.append(precio_limpio)
    return array_precios

import re

def obtener_datos_productos(url, nombre_producto):
    name = nombre_producto.strip().lower()
    nombre_producto_sin_parentesis = re.sub(r'\([^)]*\)', '', name)
    url_producto = f"{url}{nombre_producto_sin_parentesis.strip()}/"
    
    response = requests.get(url_producto, allow_redirects=False)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")  
        tabla = soup.find("table")
        
        if tabla:
            detalles = {}
            filas = tabla.find_all("tr")
            
            for fila in filas:
                celdas = fila.find_all("td")
                if len(celdas) == 2:  # Asegúrate de que haya dos celdas por fila
                    nutriente = celdas[0].get_text().strip().lower()
                    valor = celdas[1].get_text().strip()
                    detalles[nutriente] = valor
            
            calorias = detalles.get("valor energético kcal")
            grasas = detalles.get("grasas")
            carbohidratos = detalles.get("hidratos de carbono")
            proteinas = detalles.get("proteinas")
            
            return {
                "Nombre": nombre_producto_sin_parentesis.strip(), 
                "Calorias": calorias, 
                "Grasas": grasas, 
                "Carbohidratos": carbohidratos, 
                "Proteinas": proteinas
            }
        else:
            print("No se encontró la tabla de nutrición en la página.")
    else:
        print(f"Error al conectar con la página {url_producto}")



def obtener_datos_secciones(url_base):
    datos_secciones = {}
    nombres_secciones = obtener_nombres_secciones(url_base)

    if nombres_secciones:
        for nombre_seccion in nombres_secciones:
            url_categoria = f"{url_base}/{nombre_seccion}/"
            response = requests.get(url_categoria,allow_redirects=False)
            alimentos = []
            print(url_categoria)

            if response.status_code == 200:
                soup = BeautifulSoup(response.text, "html.parser")
                nombres = sacar_nombre_productos(soup)

                for nombre in nombres:
                    nombre_producto = nombre.rstrip().replace(" ", "-")
                    nombre_producto = nombre_producto.rstrip().replace("/", "")  # Eliminar "/"
                    devolucion = obtener_datos_productos(url_categoria, nombre_producto)
                    if devolucion is not None:
                        alimentos.append(devolucion)
                    # time.sleep(1) # Esperar 1 segundo antes de hacer la siguiente petición

                datos_secciones[nombre_seccion] = alimentos
            else:
                print(f"Error al conectar con la página {url_categoria}")
    else:
        print("No se pudieron obtener los nombres de las secciones.")

    return datos_secciones

# URL del sitio web
url_supermercado = "https://www.supermercadosmas.com"
datos_secciones = obtener_datos_secciones(url_supermercado)
print(datos_secciones,"datos_secciones")


if datos_secciones:
    print("Datos de las secciones:")
    for seccion, productos in datos_secciones.items():
        print(f"\n{seccion}:")
        for producto in productos:
            print(producto)
else:
    print("No se pudieron obtener los datos de las secciones.")
