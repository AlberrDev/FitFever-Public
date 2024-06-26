import React from 'react';

export const EjercicioModal = ({ ejercicio, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={onClose}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">{ejercicio.nombre}</h2>
      <p className="mb-2"><strong>Grupo Muscular:</strong> {ejercicio.grupo_muscular}</p>
      <p className="mb-2"><strong>Descripción:</strong> {ejercicio.descripcion}</p>
      <p className="mb-2"><strong>Series:</strong> {ejercicio.series}</p>
      <p className="mb-2"><strong>Repeticiones:</strong> {ejercicio.repeticiones}</p>
    </div>
  </div>
);
