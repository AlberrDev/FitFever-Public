import React, { useState } from 'react';

export const AddEjercicioModal = ({ newEjercicio, onChange, onClose, onSave, error }) => {
    const [nombreError, setNombreError] = useState('');

    const handleSave = () => {
        // Verificar la longitud del nombre
        if (newEjercicio.nombre.length > 25) {
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

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
            onChange(e);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full relative">
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
                <h2 className="text-2xl font-bold mb-4 text-center">Agregar Ejercicio</h2>
                {error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}
                {nombreError && <div className="bg-red-500 text-white p-2 mb-4 rounded">{nombreError}</div>}
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={newEjercicio.nombre}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Grupo Muscular</label>
                    <input
                        type="text"
                        name="grupo_muscular"
                        value={newEjercicio.grupo_muscular}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                        name="descripcion"
                        value={newEjercicio.descripcion}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 mt-1"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Series</label>
                    <input
                        type="text"
                        name="series"
                        value={newEjercicio.series}
                        onChange={handleNumberChange}
                        inputMode="numeric"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Repeticiones</label>
                    <input
                        type="text"
                        name="repeticiones"
                        value={newEjercicio.repeticiones}
                        onChange={handleNumberChange}
                        inputMode="numeric"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 mt-1"
                    />
                </div>
                <div className="flex justify-end">
                    <button onClick={handleSave} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-200">Guardar</button>
                </div>
            </div>
        </div>
    );
};
