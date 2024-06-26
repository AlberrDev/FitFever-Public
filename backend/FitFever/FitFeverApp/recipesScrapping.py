import requests

def buscar_recetas(query_words, from_=0, to=100):
    app_id = 'ba58f6b7'  # Reemplaza 'TU_APP_ID' con tu ID de aplicación de Edamam
    app_key = 'cda682d9da93c71229c22dd4361e8566'  # Reemplaza 'TU_APP_KEY' con tu clave de API de Edamam
    
    all_recipes = []
    
    for query in query_words:
        if len(all_recipes) >= 100:  # Si ya tenemos 100 recetas, detenemos la búsqueda
            break

        params = {
            'q': query,
            'app_id': app_id,
            'app_key': app_key,
            'from': from_,
            'to': to,
            # 'mealType': 'Breakfast,Lunch,Dinner,Snack',
            # 'diet': 'balanced,high-protein,low-carb,low-fat,low-sodium'
        }
        
        response = requests.get('https://api.edamam.com/search', params=params)
        print(response)
        if response.status_code == 200:
            data = response.json()
            if 'hits' in data:
                all_recipes.extend(data['hits'][:100-len(all_recipes)])  # Solo agregamos las recetas necesarias para llegar a 100
    
    recipes_json = []
    for recipe in all_recipes:
        recipe_data = recipe['recipe']
        
        # Obtener ingredientes y su peso
        ingredients = recipe_data.get('ingredients', [])
        ingredients_info = [{'text': ingredient.get('text', ''),
                             'weight': round(ingredient.get('weight', 0), 2)} for ingredient in ingredients]
        
        # Obtener instrucciones
        
        # Obtener información sobre los nutrientes
        nutrients = recipe_data.get('totalNutrients', {})
        fats = nutrients.get('FAT', {}).get('quantity', 0)
        protein = nutrients.get('PROCNT', {}).get('quantity', 0)
        carbs = nutrients.get('CHOCDF', {}).get('quantity', 0)
        
        recipe_json = {
            'label': recipe_data['label'],
            'image': recipe_data['image'],
            'calories': round(recipe_data['calories'], 2),
            'mealType': recipe_data.get('mealType', []),
            'diet': recipe_data.get('dietLabels', []),
            'fats': round(fats, 2),
            'protein': round(protein, 2),
            'carbs': round(carbs, 2),
            'ingredients': ingredients_info,
        }
        recipes_json.append(recipe_json)
    
    return recipes_json

# Ejemplo de uso
query_words = ['chicken', 'beef', 'fish', 'vegetarian', 'soup', 'curry', 'pasta', 'salad', 'pizza', 'smoothie', 'dessert', 'breakfast', 'sandwich', 'grill', 'stew']
recetas = buscar_recetas(query_words)
print(recetas)