import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, Outlet } from "react-router";

export const PrivateRouter = () => {
    const { usuarioAuth, setUsuarioAuth } = useContext(UserContext);

    //Logica para gestionar las cookies
    
    let TokensUser = ""

    const cookies = document.cookie;

    if (document.cookie.indexOf("userInfo") !== -1) {
        TokensUser = cookies
            .split('; ')
            .find(row => row.startsWith('userInfo='))
            .split('=')[1];
        TokensUser = JSON.parse(TokensUser)

    } else {
        console.log('No se encontró la cookie.');

    }
    
    
    return (
        usuarioAuth | TokensUser != "" ? <Outlet /> : <Navigate to="/login" />
    )
}

export const PrivateRouterProfile = () => {
    const { perfilAuth } = useContext(UserContext);
    return (
        perfilAuth ? <Outlet /> : <Navigate to="/home/home" />
    )
}

