import React, { useState } from 'react';

export const AddRutinaDiariaModal = ({ isOpen, onClose, rutinas, onSave, selectedDay, error }) => {
    const [selectedRutina, setSelectedRutina] = useState('');

    const handleSave = () => {
        onSave(selectedRutina, selectedDay);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-0">
            <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-md sm:w-1/3">
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
                {error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}

                <h2 className="text-xl font-bold mb-4">Seleccionar Rutina para {selectedDay}</h2>
                <select
                    className="w-full p-2 mb-4 border rounded-lg"
                    value={selectedRutina}
                    onChange={(e) => setSelectedRutina(e.target.value)}
                >
                    <option value="">Selecciona una rutina</option>
                    {rutinas.map((rutina) => (
                        <option key={rutina.id_rutina} value={rutina.nombre}>
                            {rutina.nombre}
                        </option>
                    ))}
                </select>
                <div className="flex justify-end">

                    <button
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleSave}
                        disabled={!selectedRutina}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};
