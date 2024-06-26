import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
    USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_LOGOUT, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL,
    USER_PROFILE_CHECK_FAIL, USER_PROFILE_CHECK_REQUEST, USER_PROFILE_CHECK_SUCCESS, USER_PROFILE_GET_FAIL, USER_PROFILE_GET_REQUEST, USER_PROFILE_GET_SUCCESS,
    GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL, REGISTRO_CONSUMO_REQUEST, REGISTRO_CONSUMO_SUCCESS, REGISTRO_CONSUMO_FAIL,
    GET_USERNAME_PRODUCTS_REQUEST, GET_USERNAME_PRODUCTS_SUCCESS, GET_USERNAME_PRODUCTS_FAIL, REMOVE_PRODUCT_REQUEST, REMOVE_PRODUCT_SUCCESS,
    REMOVE_PRODUCT_FAIL, GET_RECIPES_REQUEST,GET_RECIPES_SUCCESS,GET_RECIPES_FAIL,GET_RUTINAS_REQUEST,GET_RUTINAS_SUCCESS,GET_RUTINAS_FAIL,GET_EJERCICIOS_REQUEST,
    GET_EJERCICIOS_SUCCESS,GET_EJERCICIOS_FAIL,ADD_EJERCICIOS_REQUEST, ADD_EJERCICIOS_SUCCESS,ADD_EJERCICIOS_FAIL,ADD_RUTINA_REQUEST,ADD_RUTINA_SUCCESS,
    ADD_RUTINA_FAIL,ADD_RUTINA_DIARIA_REQUEST,ADD_RUTINA_DIARIA_SUCCESS,ADD_RUTINA_DIARIA_FAIL,GET_RUTINA_DIARIA_REQUEST,GET_RUTINA_DIARIA_SUCCESS,GET_RUTINA_DIARIA_FAIL,REMOVE_RUTINA_REQUEST,
    REMOVE_RUTINA_SUCCESS, REMOVE_RUTINA_FAIL,REMOVE_EJERCICIO_REQUEST,REMOVE_EJERCICIO_SUCCESS,REMOVE_EJERCICIO_FAIL,REMOVE_RUTINA_DIARIA_REQUEST,REMOVE_RUTINA_DIARIA_SUCCESS,
    REMOVE_RUTINA_DIARIA_FAIL,GET_PRODUCTS_FROM_EXTERNAL_PAGE_REQUEST,GET_PRODUCTS_FROM_EXTERNAL_PAGE_SUCCESS,GET_PRODUCTS_FROM_EXTERNAL_PAGE_FAIL
} from "../constants/userConstants";

//Generamos el UseReducers para el SignUP y Login, dependiendo de las distintas constantes
export const userSignupReducers = (state = {}, action) => {

    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true }
        case USER_SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }

}

export const userLoginReducers = (state = {}, action) => {

    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload, typeLogin: action.type }
        case USER_LOGIN_FAIL:
            return { loadingLogin: false, errorLogin: action.payload, typeLogin: action.type }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }

}

export const userProfileReducers = (state = {}, action) => {

    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { loading: true }
        case USER_PROFILE_SUCCESS:
            return { loading: false, userInfo: action.payload, type: action.type }
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload, type: action.type }
        default:
            return state
    }

}

export const userCheckProfileReducers = (state = {}, action) => {

    switch (action.type) {
        case USER_PROFILE_CHECK_REQUEST:
            return { loading: true, userProfileInfo: action.payload, type: action.type }
        case USER_PROFILE_CHECK_SUCCESS:
            return { loading: false, userProfileInfo: action.payload, type: action.type }
        case USER_PROFILE_CHECK_FAIL:
            return { loading: false, error: action.payload, type: action.type }
        default:
            return state
    }

}

export const userGetProfileReducers = (state = {}, action) => {

    switch (action.type) {
        case USER_PROFILE_GET_REQUEST:
            return { GetProfileloading: true, GetProfileInfo: action.payload, GetProfiletype: action.type }
        case USER_PROFILE_GET_SUCCESS:
            return { GetProfileloading: false, GetProfileInfo: action.payload, GetProfiletype: action.type }
        case USER_PROFILE_GET_FAIL:
            return { GetProfileloading: false, GetProfileError: action.payload, GetProfiletype: action.type }
        default:
            return state
    }

}

export const getProductsReducers = (state = {}, action) => {

    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return { GetProductsLoading: true, GetProductsInfo: action.payload, GetProductsType: action.type }
        case GET_PRODUCTS_SUCCESS:
            return { GetProductsLoading: false, GetProductsInfo: action.payload, GetProductsType: action.type }
        case GET_PRODUCTS_FAIL:
            return { GetProductsLoading: false, GetProductsError: action.payload, GetProductsType: action.type }
        default:
            return state
    }

}

export const registroConsumoReducers = (state = {}, action) => {

    switch (action.type) {
        case REGISTRO_CONSUMO_REQUEST:
            return { registroConsumoLoading: true, registroConsumoInfo: action.payload, registroConsumoType: action.type }
        case REGISTRO_CONSUMO_SUCCESS:
            return { registroConsumoLoading: false, registroConsumoInfo: action.payload, registroConsumoType: action.type }
        case REGISTRO_CONSUMO_FAIL:
            return { registroConsumoLoading: false, registroConsumoError: action.payload, registroConsumoType: action.type }
        default:
            return state
    }

}

export const getUsernameProductsReducers = (state = {}, action) => {

    switch (action.type) {
        case GET_USERNAME_PRODUCTS_REQUEST:
            return { usernameProductsLoading: true, usernameProductsInfo: action.payload, usernameProductsType: action.type }
        case GET_USERNAME_PRODUCTS_SUCCESS:
            return { usernameProductsLoading: false, usernameProductsInfo: action.payload, usernameProductsType: action.type }
        case GET_USERNAME_PRODUCTS_FAIL:
            return { usernameProductsLoading: false, usernameProductsError: action.payload, usernameProductsType: action.type }
        default:
            return state
    }

}

export const eliminarProductoReducers = (state = {}, action) => {

    switch (action.type) {
        case REMOVE_PRODUCT_REQUEST:
            return { removeProductsLoading: true, removeProductsInfo: action.payload, removeProductsType: action.type }
        case REMOVE_PRODUCT_SUCCESS:
            return { removeProductsLoading: false, removeProductsInfo: action.payload, removeProductsType: action.type }
        case REMOVE_PRODUCT_FAIL:
            return { removeProductsLoading: false, removeProductsError: action.payload, removeProductsType: action.type }
        default:
            return state
    }

}

export const getRecipesReducers = (state = {}, action) => {

    switch (action.type) {
        case GET_RECIPES_REQUEST:
            return { getRecipesLoading: true, getRecipesInfo: action.payload, getRecipesType: action.type }
        case GET_RECIPES_SUCCESS:
            return { getRecipesLoading: false, getRecipesInfo: action.payload, getRecipesType: action.type }
        case GET_RECIPES_FAIL:
            return { getRecipesLoading: false, getRecipesError: action.payload, getRecipesType: action.type }
        default:
            return state
    }

}

export const getRutinasReducers = (state = {}, action) => {

    switch (action.type) {
        case GET_RUTINAS_REQUEST:
            return { getRutinasLoading: true, getRutinasInfo: action.payload, getRutinasType: action.type }
        case GET_RUTINAS_SUCCESS:
            return { getRutinasLoading: false, getRutinasInfo: action.payload, getRutinasType: action.type }
        case GET_RUTINAS_FAIL:
            return { getRutinasLoading: false, getRutinasError: action.payload, getRutinasType: action.type }
        default:
            return state
    }

}

export const getEjerciciosReducers = (state = {}, action) => {

    switch (action.type) {
        case GET_EJERCICIOS_REQUEST:
            return { getEjerciciosLoading: true, getEjerciciosInfo: action.payload, getEjerciciosType: action.type }
        case GET_EJERCICIOS_SUCCESS:
            return { getEjerciciosLoading: false, getEjerciciosInfo: action.payload, getEjerciciosType: action.type }
        case GET_EJERCICIOS_FAIL:
            return { getEjerciciosLoading: false, getEjerciciosError: action.payload, getEjerciciosType: action.type }
        default:
            return state
    }

}

export const addEjerciciosReducers = (state = {}, action) => {

    switch (action.type) {
        case ADD_EJERCICIOS_REQUEST:
            return { addEjerciciosLoading: true, addEjerciciosInfo: action.payload, addEjerciciosType: action.type }
        case ADD_EJERCICIOS_SUCCESS:
            return { addEjerciciosLoading: false, addEjerciciosInfo: action.payload, addEjerciciosType: action.type }
        case ADD_EJERCICIOS_FAIL:
            return { addEjerciciosLoading: false, addEjerciciosError: action.payload, addEjerciciosType: action.type }
        default:
            return state
    }

}

export const addRutinaReducers = (state = {}, action) => {

    switch (action.type) {
        case ADD_RUTINA_REQUEST:
            return { addRutinaLoading: true, addRutinaInfo: action.payload, addRutinaType: action.type }
        case ADD_RUTINA_SUCCESS:
            return { addRutinaLoading: false, addRutinaInfo: action.payload, addRutinaType: action.type }
        case ADD_RUTINA_FAIL:
            return { addRutinaLoading: false, addRutinaError: action.payload, addRutinaType: action.type }
        default:
            return state
    }

}

export const addRutinaDiariaReducers = (state = {}, action) => {

    switch (action.type) {
        case ADD_RUTINA_REQUEST:
            return { addRutinaDiariaLoading: true, addRutinaDiariaInfo: action.payload, addRutinaDiariaType: action.type }
        case ADD_RUTINA_SUCCESS:
            return { addRutinaDiariaLoading: false, addRutinaDiariaInfo: action.payload, addRutinaDiariaType: action.type }
        case ADD_RUTINA_FAIL:
            return { addRutinaDiariaLoading: false, addRutinaDiariaError: action.payload, addRutinaDiariaType: action.type }
        default:
            return state
    }

}

export const getRutinaDiariaReducers = (state = {}, action) => {

    switch (action.type) {
        case GET_RUTINA_DIARIA_REQUEST:
            return { getRutinaDiariaLoading: true, getRutinaDiariaInfo: action.payload, getRutinaDiariaType: action.type }
        case GET_RUTINA_DIARIA_SUCCESS:
            return { getRutinaDiariaLoading: false, getRutinaDiariaInfo: action.payload, getRutinaDiariaType: action.type }
        case GET_RUTINA_DIARIA_FAIL:
            return { getRutinaDiariaLoading: false, getRutinaDiariaError: action.payload, getRutinaDiariaType: action.type }
        default:
            return state
    }

}

export const eliminarRutinaReducers = (state = {}, action) => {

    switch (action.type) {
        case REMOVE_RUTINA_REQUEST:
            return { removeRutinaLoading: true, removeRutinaInfo: action.payload, removeRutinaType: action.type }
        case REMOVE_RUTINA_SUCCESS:
            return { removeRutinaLoading: false, removeRutinaInfo: action.payload, removeRutinaType: action.type }
        case REMOVE_RUTINA_FAIL:
            return { removeRutinaLoading: false, removeRutinaError: action.payload, removeRutinaType: action.type }
        default:
            return state
    }
}

export const eliminarEjercicioReducers = (state = {}, action) => {

    switch (action.type) {
        case REMOVE_EJERCICIO_REQUEST:
            return { removeEjercicioLoading: true, removeEjercicioInfo: action.payload, removeEjercicioType: action.type }
        case REMOVE_EJERCICIO_SUCCESS:
            return { removeEjercicioLoading: false, removeEjercicioInfo: action.payload, removeEjercicioType: action.type }
        case REMOVE_EJERCICIO_FAIL:
            return { removeEjercicioLoading: false, removeEjercicioError: action.payload, removeEjercicioType: action.type }
        default:
            return state
    }
}

export const eliminarRutinaDiariaReducers = (state = {}, action) => {

    switch (action.type) {
        case REMOVE_RUTINA_DIARIA_REQUEST:
            return { removeRutinaDiariaLoading: true, removeRutinaDiariaInfo: action.payload, removeRutinaDiariaType: action.type }
        case REMOVE_RUTINA_DIARIA_SUCCESS:
            return { removeRutinaDiariaLoading: false, removeRutinaDiariaInfo: action.payload, removeRutinaDiariaType: action.type }
        case REMOVE_RUTINA_DIARIA_FAIL:
            return { removeRutinaDiariaLoading: false, removeRutinaDiariaError: action.payload, removeRutinaDiariaType: action.type }
        default:
            return state
    }
}

export const getProductsFromExternalPageReducers = (state = {}, action) => {

    switch (action.type) {
        case REMOVE_RUTINA_DIARIA_REQUEST:
            return { getProductsFromExternalPageLoading: true, getProductsFromExternalPageInfo: action.payload, removeRutinaDiariaType: action.type }
        case REMOVE_RUTINA_DIARIA_SUCCESS:
            return { removeRutinaDiariaLoading: false, getProductsFromExternalPageInfo: action.payload, getProductsFromExternalPageType: action.type }
        case REMOVE_RUTINA_DIARIA_FAIL:
            return { getProductsFromExternalPageLoading: false, getProductsFromExternalPageError: action.payload, removeRutinaDiariaType: action.type }
        default:
            return state
    }
}




