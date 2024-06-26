import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { formatFecha } from '../data/formatFecha';
export const Diary = () => {
  const { fecha, setFecha } = useContext(UserContext);

  const prevSlide = () => {
    const prevDay = new Date(); // Crear un nuevo objeto de fecha basado en la fecha actual
    prevDay.setDate(prevDay.getDate() - 1); // Restar un día al objeto de fecha
    const pedro2 = formatFecha(prevDay); // Formatear la fecha
    setFecha(pedro2); // Establecer la nueva fecha en el estado
};

const nextSlide = () => {
    const nextDay = new Date(); // Crear un nuevo objeto de fecha basado en la fecha actual
    nextDay.setDate(fecha + 1); // Sumar un día al objeto de fecha
    const pedro = formatFecha(nextDay); // Formatear la fecha
    setFecha(pedro); // Establecer la nueva fecha en el estado
};


  return (
    <div className="flex justify-center items-center mt-8 mb-10">
      <div className="bg-purple-100 p-4 rounded-lg shadow-md">
        <h1 className="text-lg text-center font-bold mb-4">Tu registro de comidas para:</h1>
        <div className="flex justify-between items-center">
          <div className="bg-purple-300 px-8 py-3 rounded-lg ml-5 mr-5">
            <p className="text-xl font-semibold">{fecha}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
