import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaQuestionCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

export const RegisterForm = ({ onInputChange, onSubmit, error, message, errorGenerado }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-center text-3xl font-bold mb-5">Página de Registro</h1>
            {error || errorGenerado ? (
                <div>
                    {<p className="text-red-500 mb-2">{message}</p>}
                    {<p className="text-red-500">{error}</p>}
                </div>
            ) : ""}

            <form onSubmit={onSubmit}>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">Usuario</label>
                    <input type="text" className="form-input mt-1 block w-full h-12" id="username" name="username" onChange={onInputChange} placeholder="Introduce tu usuario" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="fname" className="block text-gray-700">Nombre</label>
                    <input type="text" className="form-input mt-1 block w-full h-12" id="fname" name="fname" onChange={onInputChange} placeholder="Introduce tu nombre" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="lname" className="block text-gray-700">Apellidos</label>
                    <input type="text" className="form-input mt-1 block w-full h-12" id="lname" name="lname" onChange={onInputChange} placeholder="Introduce tus apellidos" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" className="form-input mt-1 block w-full h-12" id="email" name="email" onChange={onInputChange} placeholder="Introduce tu email" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">
                        Contraseña
                        <FaExclamationTriangle
                            className="inline-block ml-2 mb-1 text-blue-500 cursor-pointer"
                            onClick={handleModalOpen}
                        />
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-input mt-1 block w-full h-12 pr-10"
                            id="password"
                            name="password"
                            onChange={onInputChange}
                            placeholder="Introduce tu contraseña"
                            required
                        />
                        <button className="absolute inset-y-0 right-0 px-3 py-2 bg-gray-200 text-gray-700" type="button" onClick={toggleShowPassword}>
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                    {/* <small className="text-gray-600">La contraseña debe incluir al menos un dígito, una letra minúscula, una letra mayúscula y uno de los caracteres especiales [_&@*!..], y tener una longitud mínima de 8 caracteres</small> */}
                </div>
                <div className="mb-4">
                    <label htmlFor="passwordConfirm" className="block text-gray-700">Confirmar Contraseña</label>
                    <div className="relative">
                        <input
                            type={showPasswordConfirm ? "text" : "password"}
                            className="form-input mt-1 block w-full h-12 pr-10"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            onChange={onInputChange}
                            placeholder="Confirma tu contraseña"
                            required
                        />
                        <button className="absolute inset-y-0 right-0 px-3 py-2 bg-gray-400 text-gray-700" type="button" onClick={toggleShowPasswordConfirm}>
                            {showPasswordConfirm ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                </div>
                <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-3 w-full">Registrar</button>
                <div className="mt-4">
                    <Link to="/login" className="text-purple-500">¿Ya tienes una cuenta? Inicia sesión aquí</Link>
                </div>
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
                        <h2 className="text-xl font-semibold mb-4">Requisitos de Contraseña</h2>
                        <p className="mb-4">
                            La contraseña debe incluir:
                            <ul className="list-disc list-inside ml-4">
                                <li>Al menos un dígito.</li>
                                <li>Una letra minúscula.</li>
                                <li>Una letra mayúscula.</li>
                                <li>Uno de los caracteres especiales [_&@*!..].</li>
                                <li>Longitud mínima de 8 caracteres.</li>
                            </ul>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
