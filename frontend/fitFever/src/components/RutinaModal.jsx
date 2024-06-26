import React from 'react';

export const RutinaModal = ({ rutina, onClose, openEjercicioModal }) => (
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
      <h2 className="text-2xl font-bold mb-4 text-center">{rutina.nombre}</h2>
      <p className="mb-4 text-center">{rutina.descripcion}</p>
      <div className="overflow-x-auto">
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-purple-200 text-left">Nombre del Ejercicio</th>
              <th className="py-2 px-4 bg-purple-200 text-left">Grupo Muscular</th>
              <th className="py-2 px-4 bg-purple-200 text-left">Series</th>
              <th className="py-2 px-4 bg-purple-200 text-left">Repeticiones</th>
            </tr>
          </thead>
          <tbody>
            {rutina.ejercicios.map(ejercicio => (
              <tr key={ejercicio.id_ejercicio}>
                <td className="py-2 px-4 border-b cursor-pointer text-blue-500" onClick={() => openEjercicioModal(ejercicio)}>
                  {ejercicio.nombre}
                </td>
                <td className="py-2 px-4 border-b">{ejercicio.grupo_muscular}</td>
                <td className="py-2 px-4 border-b">{ejercicio.series}</td>
                <td className="py-2 px-4 border-b">{ejercicio.repeticiones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
