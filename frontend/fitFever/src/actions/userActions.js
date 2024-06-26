import axios from "axios"
import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
    USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_LOGOUT, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL,
    USER_PROFILE_CHECK_FAIL, USER_PROFILE_CHECK_REQUEST, USER_PROFILE_CHECK_SUCCESS, USER_PROFILE_GET_FAIL, USER_PROFILE_GET_REQUEST, USER_PROFILE_GET_SUCCESS,
    GET_PRODUCTS_FAIL, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_REQUEST, REGISTRO_CONSUMO_REQUEST, REGISTRO_CONSUMO_SUCCESS,
    REGISTRO_CONSUMO_FAIL, GET_USERNAME_PRODUCTS_REQUEST, GET_USERNAME_PRODUCTS_SUCCESS, GET_USERNAME_PRODUCTS_FAIL, REMOVE_PRODUCT_REQUEST,
    REMOVE_PRODUCT_SUCCESS, REMOVE_PRODUCT_FAIL, GET_RECIPES_REQUEST, GET_RECIPES_SUCCESS, GET_RECIPES_FAIL, GET_RUTINAS_REQUEST, GET_RUTINAS_SUCCESS,
    GET_RUTINAS_FAIL, GET_EJERCICIOS_REQUEST, GET_EJERCICIOS_SUCCESS, GET_EJERCICIOS_FAIL,
    ADD_EJERCICIOS_REQUEST, ADD_EJERCICIOS_SUCCESS, ADD_EJERCICIOS_FAIL,
    ADD_RUTINA_REQUEST,
    ADD_RUTINA_SUCCESS,
    ADD_RUTINA_FAIL,
    ADD_RUTINA_DIARIA_REQUEST,
    ADD_RUTINA_DIARIA_SUCCESS,
    ADD_RUTINA_DIARIA_FAIL,
    GET_RUTINA_DIARIA_REQUEST,
    GET_RUTINA_DIARIA_SUCCESS,
    GET_RUTINA_DIARIA_FAIL,
    REMOVE_RUTINA_REQUEST,
    REMOVE_RUTINA_SUCCESS,
    REMOVE_RUTINA_FAIL,
    REMOVE_EJERCICIO_REQUEST,
    REMOVE_EJERCICIO_SUCCESS,
    REMOVE_EJERCICIO_FAIL,
    REMOVE_RUTINA_DIARIA_REQUEST,
    REMOVE_RUTINA_DIARIA_SUCCESS,
    REMOVE_RUTINA_DIARIA_FAIL,
    GET_PRODUCTS_FROM_EXTERNAL_PAGE_REQUEST
} from "../constants/userConstants"



export const signup = (username, fname, lname, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNUP_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        //Ver que conecta bien
        const { data } = await axios.post(`${import.meta.env.VITE_URL_API}/FitFever/users/register/`,
            {
                "username": username,
                "fname": fname,
                "lname": lname,
                "email": email,
                "password": password
            }, config)


        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }

}

export const login = (username, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const { data } = await axios.post(`${import.meta.env.VITE_URL_API}/FitFever/users/login/`,
            {
                "username": username,
                "password": password
            }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })




    }
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }

};

export const logout = () => (dispatch) => {
    document.cookie = `userInfo=; path=/;`;
    dispatch({ type: USER_LOGOUT })
}


export const profile = (username, peso, altura, edad, objetivo, sexo, factor_Actividad, foto_perfil, fecha_nacimiento, Calorias) => async (dispatch) => {
    try {
        dispatch({
            type: USER_PROFILE_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const { data, message } = await axios.post(`${import.meta.env.VITE_URL_API}/FitFever/users/profile/`,
            {
                username: username,
                peso: peso,
                altura: altura,
                edad: edad,
                objetivo: objetivo,
                sexo: sexo,
                factor_Actividad: factor_Actividad,
                foto_perfil: foto_perfil,
                fecha_nacimiento: fecha_nacimiento,
                Calorias: Calorias,
            }, config)

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data, message
        })



    }
    catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }

};

//Ver checkeo del perfil problema con la URL y ver que todo el flujo vaya bien
export const checkProfile = (username) => async (dispatch) => {
    try {
        dispatch({ type: USER_PROFILE_CHECK_REQUEST });

        // Configuración de la solicitud
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        // Solicitud para verificar si existe un perfil para el usuario

        const { data } = await axios.get(`${import.meta.env.VITE_URL_API}/FitFever/users/checkUserProfile/${username}/`, config);

        // Dispatch de la acción de éxito con el resultado de la verificación
        dispatch({ type: USER_PROFILE_CHECK_SUCCESS, payload: data });
    } catch (error) {
        // Dispatch de la acción de fallo con el mensaje de error

        dispatch({
            type: USER_PROFILE_CHECK_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        });
    }
};

export const getProfile = (username) => async (dispatch) => {
    try {
        dispatch({ type: USER_PROFILE_GET_REQUEST });

        // Configuración de la solicitud
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        // Solicitud para verificar si existe un perfil para el usuario
        const { data } = await axios.get(`${import.meta.env.VITE_URL_API}/FitFever/users/getProfileByUsername/${username}/`, config);
        // Dispatch de la acción de éxito con el resultado de la verificación
        dispatch({ type: USER_PROFILE_GET_SUCCESS, payload: data });
    } catch (error) {
        // Dispatch de la acción de fallo con el mensaje de error
        dispatch({
            type: USER_PROFILE_GET_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        });
    }
};

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCTS_REQUEST });

        // Configuración de la solicitud
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        // Solicitud para verificar si existe un perfil para el usuario
        const { data } = await axios.get(`${import.meta.env.VITE_URL_API}/FitFever/products/getProducts`, config);

        // Dispatch de la acción de éxito con el resultado de la verificación
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        // Dispatch de la acción de fallo con el mensaje de error
        dispatch({
            type: GET_PRODUCTS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        });
    }
};

export const registroConsumo = (username, fecha_consumo, calorias_consumidas,
    calorias_restantes, proteinas, grasas, carbohidratos, momento_dia,
    productos, receta, calorias_producto, calorias_seccion) => async (dispatch) => {
        try {
            dispatch({
                type: REGISTRO_CONSUMO_REQUEST
            })
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const { data } = await axios.post(`${import.meta.env.VITE_URL_API}/FitFever/users/crear_consumo`,
                {
                    username: username,
                    fecha_consumo: fecha_consumo,
                    calorias_consumidas: calorias_consumidas,
                    calorias_restantes: calorias_restantes,
                    proteinas: proteinas,
                    grasas: grasas,
                    carbohidratos: carbohidratos,
                    momento_dia: momento_dia,
                    productos: productos,
                    receta: receta,
                    calorias_producto: calorias_producto,
                    calorias_seccion: calorias_seccion

                }, config)
            dispatch({
                type: REGISTRO_CONSUMO_SUCCESS,
                payload: data
            })



        }
        catch (error) {
            dispatch({
                type: REGISTRO_CONSUMO_FAIL,
                payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
            })
        }

    };

export const getUsernameProducts = (username, fecha_consumo) => async (dispatch) => {
    try {
        dispatch({ type: GET_USERNAME_PRODUCTS_REQUEST });

        // Configuración de la solicitud
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        // Solicitud para verificar si existe un perfil para el usuario
        const { data } = await axios.get(`${import.meta.env.VITE_URL_API}/FitFever/users/getUsernameProducts/${username}/${fecha_consumo}`, config);

        // Dispatch de la acción de éxito con el resultado de la verificación
        dispatch({ type: GET_USERNAME_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        // Dispatch de la acción de fallo con el mensaje de error
        dispatch({
            type: GET_USERNAME_PRODUCTS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        });
    }
};

export const eliminarProducto = (username, fecha_consumo, producto,
    calorias_consumidas, calorias_restantes, momento_dia,
) => async (dispatch) => {
    try {
        dispatch({
            type: REMOVE_PRODUCT_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`${import.meta.env.VITE_URL_API}/FitFever/products/deleteProducts`,
            {
                username: username,
                fecha_consumo: fecha_consumo,
                producto: producto,
                calorias_consumidas: calorias_consumidas,
                calorias_restantes: calorias_restantes,
                momento_dia: momento_dia,

            }, config)
        dispatch({
            type: REMOVE_PRODUCT_SUCCESS,
            payload: data
        })



    }
    catch (error) {
        dispatch({
            type: REMOVE_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }

};

export const getRecipes = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_RECIPES_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.get(`${import.meta.env.VITE_URL_API}/FitFever/recipes/getRecipes`, config)
        dispatch({
            type: GET_RECIPES_SUCCESS,
            payload: data
        })



    }
    catch (error) {
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }

};

export const getRutinas = (username) => async (dispatch) => {
    try {
        dispatch({
            type: GET_RUTINAS_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.get(`${import.meta.env.VITE_URL_API}/FitFever/entrenamiento/getRutinas/${username}/`, config)
        dispatch({
            type: GET_RUTINAS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: GET_RUTINAS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }

};

export const getEjercicios = (username) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EJERCICIOS_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.get(`${import.meta.env.VITE_URL_API}/FitFever/entrenamiento/getEjercicios/${username}/`, config)
        dispatch({
            type: GET_EJERCICIOS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: GET_EJERCICIOS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
};

export const addEjercicios = (usuario, nombre, grupo_muscular, descripcion, series, repeticiones) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_EJERCICIOS_REQUEST
        });

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const { data, message } = await axios.post(`${import.meta.env.VITE_URL_API}/FitFever/entrenamiento/addEjercicios`,
            {
                usuario: usuario,
                grupo_muscular: grupo_muscular,
                nombre: nombre,
                descripcion: descripcion,
                series: series,
                repeticiones: repeticiones
            }, config);

        dispatch({
            type: ADD_EJERCICIOS_SUCCESS,
            payload: { data, message }
        });
    } catch (error) {
        dispatch({
            type: ADD_EJERCICIOS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        });
        throw new Error(error.response && error.response.data.detail ? error.response.data.detail : error.message);
    }
};


export const addRutinas = (usuario, nombre, descripcion, ejercicios, objetivo, duracion, nivel) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_RUTINA_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const { data, message } = await axios.post(`${import.meta.env.VITE_URL_API}/FitFever/entrenamiento/addRutinas`,
            {
                usuario: usuario,
                nombre: nombre,
                descripcion: descripcion,
                ejercicios: ejercicios,
                objetivo: objetivo,
                duracion: duracion,
                nivel: nivel
            }, config)

        dispatch({
            type: ADD_RUTINA_SUCCESS,
            payload: { data, message }
        })



    }
    catch (error) {
        dispatch({
            type: ADD_RUTINA_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
        throw new Error(error.response && error.response.data.detail ? error.response.data.detail : error.message);
    }

};

export const addRutinasDiarias = (usuario, nombre, fecha, dia) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_RUTINA_DIARIA_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const { data, message } = await axios.post(`${import.meta.env.VITE_URL_API}/FitFever/entrenamiento/addRutinaDiaria`,
            {
                usuario: usuario,
                nombre: nombre,
                fecha: fecha,
                dia: dia
            }, config)

        
        dispatch({
            type: ADD_RUTINA_DIARIA_SUCCESS,
            payload: { data, message }
        })




    }
    catch (error) {
        dispatch({
            type: ADD_RUTINA_DIARIA_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
        throw new Error(error.response && error.response.data.detail ? error.response.data.detail : error.message);

    }

};

export const getRutinasDiarias = (username) => async (dispatch) => {
    try {
        dispatch({
            type: GET_RUTINA_DIARIA_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.get(`${import.meta.env.VITE_URL_API}/FitFever/entrenamiento/getRutinasDiarias/${username}/`, config)
        dispatch({
            type: GET_RUTINA_DIARIA_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: GET_RUTINA_DIARIA_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
};

export const eliminarRutina = (username,nombre_rutina) => async (dispatch) => {
    try {
        dispatch({
            type: REMOVE_RUTINA_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`${import.meta.env.VITE_URL_API}/FitFever/entrenamiento/eliminarRutina`,
            {
                username: username,
                nombre_rutina: nombre_rutina

            }, config)
        dispatch({
            type: REMOVE_RUTINA_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: REMOVE_RUTINA_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }

};

export const eliminarEjercicio = (username,nombre_ejercicio) => async (dispatch) => {
    try {
        dispatch({
            type: REMOVE_EJERCICIO_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`${import.meta.env.VITE_URL_API}/FitFever/entrenamiento/eliminarEjercicio`,
            {
                username: username,
                nombre_ejercicio: nombre_ejercicio

            }, config)
        dispatch({
            type: REMOVE_EJERCICIO_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: REMOVE_EJERCICIO_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }

};

export const eliminarRutinaDiaria = (username,nombre_rutina,fecha,dia) => async (dispatch) => {
    try {
        dispatch({
            type: REMOVE_RUTINA_DIARIA_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`${import.meta.env.VITE_URL_API}/FitFever/entrenamiento/eliminarRutinaDiaria`,
            {
                username: username,
                nombre_rutina: nombre_rutina,
                fecha: fecha,
                dia: dia
                

            }, config)
        dispatch({
            type: REMOVE_RUTINA_DIARIA_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: REMOVE_RUTINA_DIARIA_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }

};

export const getProductsFromExternalPage = (username) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCTS_FROM_EXTERNAL_PAGE_REQUEST
        })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`${import.meta.env.VITE_URL_API}/FitFever/users/scrapping`,
            {
                username: username,
            }, config)
        dispatch({
            type: GET_PRODUCTS_FROM_EXTERNAL_PAGE_REQUEST,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: GET_PRODUCTS_FROM_EXTERNAL_PAGE_REQUEST,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }

};
