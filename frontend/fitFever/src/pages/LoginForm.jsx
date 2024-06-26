import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const LoginForm = ({ onInputChange, onSubmit, error, loading, message,errorLogin }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
  

    return (
        <div className="container mx-auto mt-20">
            <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
                <h1 className="text-center text-3xl font-bold mb-5">Inicio de Sesión</h1>
                {errorLogin ? (
                    <div>
                        {errorLogin && <p className="text-red-500">{message}</p>}
                    </div>
                ) : ""}
                <form className="mt-4" onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Usuario</label>
                        <input type="text" className="form-input mt-1 block w-full rounded-md shadow-sm h-12" id="username" name="username" onChange={onInputChange} placeholder="Introduce tu usuario" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-input mt-1 block w-full rounded-md shadow-sm h-12 pr-10"
                                id="password"
                                name="password"
                                onChange={onInputChange}
                                placeholder="Introduce tu contraseña"
                                required
                            />
                            <button className="absolute inset-y-0 right-0 px-3 py-2 bg-gray-200 text-gray-700 rounded-md" type="button" onClick={toggleShowPassword}>
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="bg-purple-500 text-white rounded px-4 py-2 mt-3 w-full">Iniciar Sesión</button>
                    <div className="mt-4 text-center">
                        <Link to="/register" className="text-purple-500">¿No tienes una cuenta? Regístrate aquí</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
