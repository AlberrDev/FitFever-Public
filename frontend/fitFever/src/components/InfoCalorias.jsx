import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../actions/userActions';
import { getUsernameFromCookie } from '../data/getUsernameFromCookie';

export const InfoCalorias = () => {
  const { productos, setProductos, caloriasRestantes, setCaloriasRestantes, caloriasConsumidas,
    setCaloriasConsumidas, objetivoCalorias, setObjetivoCalorias,
    totalDesayuno, totalAlmuerzo, totalComida, totalMerienda, totalCena 
  } = useContext(UserContext);

  const userGetProfile = useSelector(state => state.userGetProfile);
  const { GetProfileInfo } = userGetProfile;
  const dispatch = useDispatch();

  useEffect(() => {
    let username = getUsernameFromCookie();
    if (username) {
      dispatch(getProfile(username));
    }
  }, [dispatch]);

  useEffect(() => {
    if (GetProfileInfo) {
      setObjetivoCalorias(parseFloat(GetProfileInfo.Calorias).toFixed(2));
    }
  }, [GetProfileInfo, setObjetivoCalorias]);

  useEffect(() => {
    const totalCalories = 
      totalDesayuno.reduce((acc, item) => acc + parseFloat(item.calorias), 0) + 
      totalAlmuerzo.reduce((acc, item) => acc + parseFloat(item.calorias), 0) + 
      totalComida.reduce((acc, item) => acc + parseFloat(item.calorias), 0) + 
      totalMerienda.reduce((acc, item) => acc + parseFloat(item.calorias), 0) + 
      totalCena.reduce((acc, item) => acc + parseFloat(item.calorias), 0);

    setCaloriasConsumidas(totalCalories.toFixed(2));
  }, [totalDesayuno, totalAlmuerzo, totalComida, totalMerienda, totalCena, setCaloriasConsumidas]);

  useEffect(() => {
    setCaloriasRestantes((objetivoCalorias - caloriasConsumidas).toFixed(2));
  }, [objetivoCalorias, caloriasConsumidas, setCaloriasRestantes]);

  return (
    <div className="flex justify-center mt-8 mb-6">
      <div className="text-center">
        <div className="rounded-full bg-blue-300 w-20 h-20 flex justify-center items-center ">
          <span className={`text-black text-${objetivoCalorias > 10000 ? 'sm' : 'md'}`}>{objetivoCalorias}</span>
        </div>
        <p className="mt-2 text-gray-700">Objetivo</p>
      </div>
      <div className="text-center">
        <div className="rounded-full bg-green-300 w-20 h-20 flex justify-center items-center ml-14 mr-14">
          <span className={`text-black text-${caloriasConsumidas > 10000 ? 'sm' : 'md'}`}>{caloriasConsumidas}</span>
        </div>
        <p className="mt-2 text-gray-700">Consumidas</p>
      </div>
      <div className="text-center">
        <div className="rounded-full bg-yellow-300 w-20 h-20 flex justify-center items-center">
          <span className={`text-black text-${caloriasRestantes > 9000 ? 'sm' : 'md'}`}>{caloriasRestantes}</span>
        </div>
        <p className="mt-2 text-gray-700">Restantes</p>
      </div>
    </div>
  );
}; 
