import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducers, userSignupReducers, userProfileReducers, userCheckProfileReducers, userGetProfileReducers, getProductsReducers, registroConsumoReducers, getUsernameProductsReducers, eliminarProductoReducers, getRecipesReducers, getRutinasReducers, getEjerciciosReducers, addEjerciciosReducers, addRutinaReducers, addRutinaDiariaReducers, getRutinaDiariaReducers, eliminarRutinaReducers, eliminarEjercicioReducers, eliminarRutinaDiariaReducers, getProductsFromExternalPageReducers } from './src/reducers/userReducers';

//Aqui lo que hago es crear el contenedor donde se almacenan los Reducers
//Importante poner en el main.jsx el Provider con el store generado

const reducer = combineReducers({
    userLogin: userLoginReducers,
    userSignup: userSignupReducers,
    userProfile: userProfileReducers,
    userCheckProfile: userCheckProfileReducers,
    userGetProfile: userGetProfileReducers,
    getProducts: getProductsReducers,
    postConsumo: registroConsumoReducers,
    getUsernameProducts: getUsernameProductsReducers,
    removeProducts: eliminarProductoReducers,
    getRecipes: getRecipesReducers,
    getRutinas: getRutinasReducers,
    getEjercicios: getEjerciciosReducers,
    addEjercicios: addEjerciciosReducers,
    addRutina: addRutinaReducers,
    addRutinaDiaria: addRutinaDiariaReducers,
    getRutinaDiaria: getRutinaDiariaReducers,
    eliminarRutina: eliminarRutinaReducers,
    eliminarEjercicio: eliminarEjercicioReducers,
    eliminarRutinaDiaria: eliminarRutinaDiariaReducers,
    getProductsFromExternalPage: getProductsFromExternalPageReducers,
})

const initialState = {}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;