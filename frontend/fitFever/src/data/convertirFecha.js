export function obtenerFechaActual() {
    const fecha_actual = new Date();
    const fecha_formateada = fecha_actual.toISOString().split('T')[0];
    
    return fecha_formateada;
}

