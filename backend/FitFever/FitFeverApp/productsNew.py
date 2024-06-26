import requests
from bs4 import BeautifulSoup

def scrape_productos(url):
    # Realizar la solicitud GET a la página
    response = requests.get(url)

    # Comprobar si la solicitud fue exitosa
    if response.status_code == 200:
        # Parsear el contenido HTML
        soup = BeautifulSoup(response.text, 'html.parser')

        # Inicializar un diccionario para almacenar los datos de los productos
        productos_data = []

        # Encontrar todos los elementos con la clase 'producto'
        productos = soup.find_all('div', class_='producto')

        # Iterar sobre cada producto
        for producto in productos:
            # Inicializar un diccionario para almacenar los datos del producto actual
            producto_data = {}

            # Extraer el nombre del producto
            producto_data['nombre'] = producto.find('h2').text.strip()

            # Extraer las calorías, grasas, proteínas y carbohidratos
            producto_data['calorias'] = producto.find('p', class_='calorias').text.split(': ')[1]
            producto_data['grasas'] = producto.find('p', class_='grasas').text.split(': ')[1]
            producto_data['proteinas'] = producto.find('p', class_='proteinas').text.split(': ')[1]
            producto_data['carbohidratos'] = producto.find('p', class_='carbos').text.split(': ')[1]

            # Agregar los datos del producto al diccionario de datos de productos
            productos_data.append(producto_data)

        # Devolver los datos de los productos
        return productos_data
    else:
        print("Error al conectar con la página:", url)
        return None

# Utilizar la función para obtener los datos de los productos
productos = scrape_productos("https://products-fit-fever.vercel.app/")
if productos:
    for producto in productos:
        print(producto)
        print("-----------------------")
