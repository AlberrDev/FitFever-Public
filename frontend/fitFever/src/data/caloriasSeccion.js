export function calcularCaloriasTotales(productos) {
    let totalCalorias = 0;
    for (const producto of productos) {
        // Extraer el número de calorías del string y convertirlo a número
        const calorias = parseFloat(producto.calorias.replace(' kcal', ''));
        // Sumar las calorías del producto al total
        totalCalorias += calorias;
    }
    // Devolver las calorías totales con la unidad "kcal"
    return totalCalorias.toFixed(2) + " kcal";
}