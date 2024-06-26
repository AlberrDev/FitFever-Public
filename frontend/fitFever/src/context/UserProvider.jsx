
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext"
import { useDispatch } from "react-redux";
import { getProducts } from "../actions/userActions";
import { formatFecha } from '../data/formatFecha';


export const UserProvider = ({ children }) => {
    //Guardar los datos del token en el estado y si hay datos
    //Accede
    let [usuarioAuth, setUsuarioAuth] = useState(false);

    let [perfilAuth, setPerfilAuth] = useState(false);

    const [calories, setCalories] = useState("");


    //GESTION PRODUCTOS DESDE SCRAPPING
    const [productos, setProductos] = useState([]);

    //GESTION MODALES
    const [showModal, setShowModal] = useState(false);
    const [tipoComida, setTipoComida] = useState("");


    //GESTION CALORIAS
    const [caloriasRestantes, setCaloriasRestantes] = useState();
    const [caloriasConsumidas, setCaloriasConsumidas] = useState();
    const [objetivoCalorias, setObjetivoCalorias] = useState();
    const [caloriasPorSeccion, setCaloriasPorSeccion] = useState();

    const [infoDesayuno, setInfoDesayuno] = useState([{
        comida: "desayuno",
        nombre: "",
        calorias: "",
        proteinas: "",
        carbohidratos: "",
        grasas: ""
    }]);
    const [infoAlmuerzo, setInfoAlmuerzo] = useState([{
        comida: "almuerzo",
        nombre: "",
        calorias: "",
        proteinas: "",
        carbohidratos: "",
        grasas: ""
    }]);
    const [infoComida, setInfoComida] = useState([{
        comida: "comida",
        nombre: "",
        calorias: "",
        proteinas: "",
        carbohidratos: "",
        grasas: ""
    }]);
    const [infoMerienda, setInfoMerienda] = useState([{
        comida: "merienda",
        nombre: "",
        calorias: "",
        proteinas: "",
        carbohidratos: "",
        grasas: ""
    }]);
    const [infoCena, setInfoCena] = useState([{
        comida: "cena",
        nombre: "",
        calorias: "",
        proteinas: "",
        carbohidratos: "",
        grasas: ""
    }]);

    const [totalDesayuno, setTotalDesayuno] = useState([]);
    const [totalAlmuerzo, setTotalAlmuerzo] = useState([]);
    const [totalComida, setTotalComida] = useState([]);
    const [totalMerienda, setTotalMerienda] = useState([]);
    const [totalCena, setTotalCena] = useState([]);
    const [individualDesayuno, setIndividualDesayuno] = useState([]);
    const [individualAlmuerzo, setIndividualAlmuerzo] = useState([]);
    const [individualComida, setIndividualComida] = useState([]);
    const [individualMerienda, setIndividualMerienda] = useState([]);
    const [individualCena, setIndividualCena] = useState([]);




    //FECHA PARA DIARIO
    let fechaActual = formatFecha(new Date());
    const [fecha, setFecha] = useState(fechaActual);

    return (
        <UserContext.Provider value={{
            usuarioAuth, setUsuarioAuth, perfilAuth, setPerfilAuth, calories, setCalories, productos, setProductos
            , caloriasRestantes, setCaloriasRestantes, caloriasConsumidas, setCaloriasConsumidas, objetivoCalorias, setObjetivoCalorias
            , showModal, setShowModal, infoDesayuno, setInfoDesayuno,
            totalDesayuno, setTotalDesayuno, infoAlmuerzo, setInfoAlmuerzo, totalAlmuerzo, setTotalAlmuerzo,
            infoComida, setInfoComida, totalComida, setTotalComida, infoMerienda, setInfoMerienda, totalMerienda, setTotalMerienda,
            infoCena, setInfoCena, totalCena, setTotalCena, tipoComida, setTipoComida, fecha, setFecha, caloriasPorSeccion, setCaloriasPorSeccion
            , individualDesayuno, setIndividualDesayuno, individualAlmuerzo, setIndividualAlmuerzo, individualComida, setIndividualComida
            , individualMerienda, setIndividualMerienda, individualCena, setIndividualCena
        }} >
            {children}
        </UserContext.Provider >
    )
}
