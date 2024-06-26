export function calcularTotalesYObtenerNombres(datos) {
    let totalCalorias = 0;
    let totalProteinas = 0;
    let totalCarbohidratos = 0;
    let totalGrasas = 0;
    const nombresProductos = [];

    datos.forEach(alimento => {
        const calorias = parseFloat(alimento.calorias.split(' ')[0]);
        const proteinas = parseFloat(alimento.proteinas.split(' ')[0]);
        const carbohidratos = parseFloat(alimento.carbohidratos.split(' ')[0]);
        const grasas = parseFloat(alimento.grasas.split(' ')[0]);

        totalCalorias += calorias;
        totalProteinas += proteinas;
        totalCarbohidratos += carbohidratos;
        totalGrasas += grasas;

        nombresProductos.push(alimento.nombre);
    });

    const totales = {
        caloriasTotales: parseFloat(totalCalorias.toFixed(2)),
        proteinasTotales: parseFloat(totalProteinas.toFixed(2)),
        carbohidratosTotales: parseFloat(totalCarbohidratos.toFixed(2)),
        grasasTotales: parseFloat(totalGrasas.toFixed(2))
    };

    return { totales, nombresProductos };
}
