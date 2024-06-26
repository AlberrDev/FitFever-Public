import axios from 'axios';

export const buscarRecetas = async (queryWords, from = 0, to = 50) => {
  // const appId = 'b63de69c'; // Reemplaza 'TU_APP_ID' con tu ID de aplicación de Edamam
  // const appKey = '2abe9e4f39cbf75c327bcffe8086b7e4'; // Reemplaza 'TU_APP_KEY' con tu clave de API de Edamam

  try {
    const allRecipes = [];

    // Itera sobre cada palabra clave de búsqueda
    for (const query of queryWords) {
      const response = await axios.get('https://api.edamam.com/search', {
        params: {
          q: query, // Consulta de búsqueda
          app_id: appId,
          app_key: appKey,
          from: from, // Índice de inicio de los resultados
          to: to,
          // Otros parámetros de búsqueda opcionales según tus necesidades
          // mealType: 'Breakfast,Lunch,Dinner,Snack',
          // diet: 'balanced,high-protein,low-carb,low-fat,low-sodium',
        },
      });

      // Agrega las recetas de esta consulta a la lista de recetas
      if (response.data && response.data.hits) {
        allRecipes.push(...response.data.hits);
      }
    }

    // Formato de salida JSON
    const recipesJSON = allRecipes.map((receta) => ({
      label: receta.recipe.label,
      image: receta.recipe.image,
      calories: receta.recipe.calories.toFixed(2),
      mealType: receta.recipe.mealType, // Agregando el campo mealType
      diet: receta.recipe.dietLabels, // Agregando el campo diet
    }));

    return recipesJSON;
  } catch (error) {
    console.error('Error al buscar recetas:', error);
    return null;
  }
};
