const calculateCalories = (userProfile, allFieldsCompleted, setCalories) => {
    const weight = parseFloat(userProfile.peso);
    const height = parseFloat(userProfile.altura);
    const age = parseInt(userProfile.edad);
    const factor = parseFloat(userProfile.factor_Actividad);
    const gender = userProfile.sexo.toLowerCase(); // Convertir a minúsculas para hacer la comparación
    const objetivo = userProfile.objetivo.toLowerCase(); // Convertir a minúsculas para hacer la comparación

    if (allFieldsCompleted && !isNaN(weight) && !isNaN(height) && !isNaN(age) && !isNaN(factor) && (gender === 'masculino' || gender === 'femenino') && (objetivo === 'mantener peso' || objetivo === 'ganar masa muscular' || objetivo === 'perder peso')) {
        let calculatedCalories;
        if (gender === 'masculino') {
            calculatedCalories = Math.round((66 + (13.7 * weight)) + ((5 * height) - (6.8 * age)) * factor);
        } else if (gender === 'femenino') {
            calculatedCalories = Math.round((655 + (9.6 * weight)) + ((1.8 * height) - (4.7 * age)) * factor);
        }

        // Ajustar calorías según el objetivo
        if (objetivo === 'mantener peso') {
            // No se hace nada, se quedan igual las calorías calculadas
        } else if (objetivo === 'ganar masa muscular') {
            calculatedCalories += 300; // Sumar 300 calorías
        } else if (objetivo === 'perder peso') {
            calculatedCalories -= 300; // Restar 300 calorías
        }

        setCalories(calculatedCalories.toString());
    } else {
        setCalories("");
    }
};

export default calculateCalories;
