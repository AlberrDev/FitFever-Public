import React, { useState, useEffect, useContext } from 'react';
import calculateCalories from '../data/caloriesCalculator';
import { UserContext } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { getUsernameFromCookie } from '../data/getUsernameFromCookie';
import { getProfile } from '../actions/userActions';
import { useNavigate } from 'react-router';
import { FaQuestionCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

export const ProfileForm = ({ onInputChange, onSubmit, error, message, username, userProfile, setUserProfile, onClose }) => {
    const [userName, setUserName] = useState("");
    const { calories, setCalories } = useContext(UserContext);
    const [allFieldsCompleted, setAllFieldsCompleted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const userGetProfile = useSelector(state => state.userGetProfile);
    const { GetProfileInfo } = userGetProfile;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let username = getUsernameFromCookie();
        if (username) {
            dispatch(getProfile(username))
        }
    }, [dispatch]);

    useEffect(() => {
        if (GetProfileInfo) {
            setShowCloseButton(true);
        }
    }, [GetProfileInfo]);

    useEffect(() => {
        if (username && userProfile.peso !== "" && userProfile.altura !== "" && userProfile.factor_Actividad !== "") {
            setAllFieldsCompleted(true);
        } else {
            setAllFieldsCompleted(false);
        }
    }, [username, userProfile.peso, userProfile.altura, userProfile.factor_Actividad]);

    useEffect(() => {
        calculateCalories(userProfile, allFieldsCompleted, setCalories);
    }, [userProfile, allFieldsCompleted, setCalories]);

    useEffect(() => {
        setUserProfile(prevUserProfile => ({
            ...prevUserProfile,
            Calorias: calories
        }));
    }, [calories, setUserProfile]);

    const [showCloseButton, setShowCloseButton] = useState(false);

    const handleClose = () => {
        setShowCloseButton(false);
        navigate("/home/home", { replace: true });
        window.location.reload();
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg relative overflow-y-auto max-h-screen">
            {showCloseButton && (
                <button className="absolute top-0 right-0 m-4 text-lg" onClick={handleClose}>X</button>
            )}
            {GetProfileInfo && GetProfileInfo.peso ? (
                <h1 className="text-center text-3xl font-bold mb-5">Editar Perfil</h1>
            ) : <h1 className="text-center text-3xl font-bold mb-5">Crear Perfil</h1>}

            {error && (
                <div className="mb-4">
                    {message && <p className="text-red-500">{message}</p>}
                </div>
            )}
            <form onSubmit={onSubmit} className="space-y-4 z-10">
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <label htmlFor="username" className="block text-gray-700">Nombre de Usuario</label>
                        <input type="text" className="form-input mt-1 block w-full h-12" id="username" name="username" value={username} readOnly required />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <label htmlFor="peso" className="block text-gray-700">Peso (kg)</label>
                        <input type="text" className="form-input mt-1 block w-full h-12" id="peso" name="peso" onChange={onInputChange} placeholder={GetProfileInfo && GetProfileInfo.peso ? GetProfileInfo.peso : "Introduce tu peso"} required />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <label htmlFor="altura" className="block text-gray-700">Altura (cm)</label>
                        <input type="text" className="form-input mt-1 block w-full h-12" id="altura" name="altura" onChange={onInputChange} placeholder={GetProfileInfo && GetProfileInfo.altura ? GetProfileInfo.altura : "Introduce tu altura"} required />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <label htmlFor="edad" className="block text-gray-700">Edad</label>
                        <input type="text" className="form-input mt-1 block w-full h-12" id="edad" name="edad" onChange={onInputChange} placeholder={GetProfileInfo && GetProfileInfo.edad ? GetProfileInfo.edad : "Introduce tu edad"} required />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <label htmlFor="objetivo" className="block text-gray-700">Objetivo</label>
                        <select className="form-select mt-1 block w-full h-12" id="objetivo" name="objetivo" onChange={onInputChange} required>
                            <option value="">Selecciona tu objetivo</option>
                            <option value="Perder Peso">Perder Peso</option>
                            <option value="Ganar Masa Muscular">Ganar Masa Muscular</option>
                            <option value="Mantener Peso">Mantener Peso</option>
                        </select>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <label htmlFor="sexo" className="block text-gray-700">Sexo</label>
                        <select className="form-select mt-1 block w-full h-12" id="sexo" name="sexo" onChange={onInputChange} required>
                            <option value="">Selecciona tu sexo</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <label htmlFor="factor_Actividad" className="block text-gray-700">
                            Factor de Actividad (1-2)
                            <FaQuestionCircle
                                className="inline-block ml-2 text-blue-500 cursor-pointer"
                                onClick={handleModalOpen}
                            />
                        </label>
                        <input type="number" step="0.01" min="1" max="2" className="form-input mt-1 block w-full h-12" id="factor_Actividad" name="factor_Actividad" onChange={onInputChange} placeholder={GetProfileInfo && GetProfileInfo.factor_Actividad ? GetProfileInfo.factor_Actividad : "Introduce tu factor de actividad"} required />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <label htmlFor="foto_perfil" className="block text-gray-700">Foto de Perfil</label>
                        <input accept='.png, .jpg' type="file" className="form-input mt-1 block w-full h-12" id="foto_perfil" name="foto_perfil" onChange={onInputChange} required />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <label htmlFor="fecha_nacimiento" className="block text-gray-700">Fecha de Nacimiento</label>
                        <input type="date" className="form-input mt-1 block w-full h-12" id="fecha_nacimiento" name="fecha_nacimiento" onChange={onInputChange} required />
                    </div>
                    <div className="w-full px-3 mb-4">
                        <label htmlFor="Calorias" className="block text-gray-700">Calorías</label>
                        <input type="text" className="form-input mt-1 block w-full h-12" id="Calorias" name="Calorias" value={calories} placeholder="Calorías calculadas" disabled />
                        <p className="text-sm text-gray-600 mt-1">Por favor, rellena los datos para este cálculo.</p>
                    </div>
                </div>
                {GetProfileInfo && GetProfileInfo.peso ? (
                    <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-3 w-full">Editar Perfil</button>
                ) : <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-3 w-full">Crear Perfil</button>}
            </form>


            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative z-50">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
                            onClick={handleModalClose}
                        >
                            <IoClose />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">¿Qué es el Factor de Actividad?</h2>
                        <p className="mb-4">
                            El factor de actividad representa tu nivel de actividad física semanal:
                            <ul className="list-disc list-inside ml-4">
                                <li><strong>1:</strong> Realizas ejercicio 1-2 días a la semana.</li>
                                <li><strong>1.5:</strong> Realizas ejercicio 3-5 días a la semana.</li>
                                <li><strong>2:</strong> Realizas ejercicio 5-7 días a la semana.</li>
                            </ul>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
