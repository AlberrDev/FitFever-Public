import React, { useState } from 'react';

export const AddRutinaModal = ({ newRutina, onChange, onClose, onSave, ejercicios, error }) => {
    const [errorCampos, setErrorCampos] = useState('');
    const [nombreError, setNombreError] = useState('');

    const handleSave = () => {
        // Verificar que todos los campos estén completos
        if (
            !newRutina.nombre ||
            !newRutina.descripcion ||
            !newRutina.ejercicios.length ||
            !newRutina.objetivo ||
            !newRutina.duracion ||
            !newRutina.nivel
        ) {
            setErrorCampos('Por favor, completa todos los campos antes de guardar.');
            setTimeout(() => {
                setErrorCampos('');
            }, 3000);
            return;
        }

        // Verificar la longitud del nombre
        if (newRutina.nombre.length > 25) {
            setNombreError('El nombre no puede tener más de 25 letras.');
            setTimeout(() => {
                setNombreError('');
            }, 3000);
            return;
        }

        onSave();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'nombre' && value.length > 25) {
            setNombreError('El nombre no puede tener más de 25 letras.');
            setTimeout(() => {
                setNombreError('');
            }, 3000);
        }

        onChange(e);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg relative">
                <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">Crear Nueva Rutina</h2>
                {errorCampos && <div className="bg-red-500 text-white p-2 mb-4 rounded">{errorCampos}</div>}
                {error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}
                {nombreError && <div className="bg-red-500 text-white p-2 mb-4 rounded">{nombreError}</div>}

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={newRutina.nombre}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Descripción</label>
                        <textarea
                            name="descripcion"
                            value={newRutina.descripcion}
                            onChange={onChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Ejercicios</label>
                        <select
                            name="ejercicios"
                            value={newRutina.ejercicios}
                            onChange={(e) =>
                                onChange({
                                    target: {
                                        name: 'ejercicios',
                                        value: Array.from(e.target.selectedOptions, (option) => option.textContent),
                                    },
                                })
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            multiple
                            required
                        >
                            {ejercicios.map((ejercicio) => (
                                <option key={ejercicio.id_ejercicio} value={ejercicio.nombre}>
                                    {ejercicio.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Objetivo</label>
                        <select
                            name="objetivo"
                            value={newRutina.objetivo}
                            onChange={onChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="">Selecciona un objetivo</option>
                            <option value="Perder Peso">Perder Peso</option>
                            <option value="Ganar Masa Muscular">Ganar Masa Muscular</option>
                            <option value="Mantener Peso">Mantener Peso</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Duración (minutos)</label>
                        <input
                            type="number"
                            name="duracion"
                            value={newRutina.duracion}
                            onChange={onChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nivel</label>
                        <select
                            name="nivel"
                            value={newRutina.nivel}
                            onChange={onChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="">Selecciona un nivel</option>
                            <option value="Principiante">Principiante</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Avanzado">Avanzado</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-200"
                            onClick={handleSave}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
