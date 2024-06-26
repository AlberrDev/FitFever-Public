import { useContext, useState, useEffect } from "react"
import { RegisterForm } from "./RegisterForm"
import { UserContext } from "../context/UserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader";
import Message from "./Message";
import { validEmail } from "../data/Regex";
import { validPassword } from "../data/Regex";
import { LoginForm } from "./LoginForm";
import { checkProfile, login } from "../actions/userActions";
import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_PROFILE_CHECK_FAIL, USER_PROFILE_CHECK_REQUEST, USER_PROFILE_CHECK_SUCCESS } from "../constants/userConstants";
import { userCheckProfileReducers } from "../reducers/userReducers";


export const LoginPage = () => {

  const { usuario, setUsuario } = useContext(UserContext);
  //Agregamos estados para validacion del campo
  //Se valida que no esten vacios en el html con el "required"
  const [noEmailValid, setNoEmailValid] = useState(false)
  const [noPasswordValid, setNoPasswordValid] = useState(false)
  const [message, setMessage] = useState("")
  const { usuarioAuth, setUsuarioAuth } = useContext(UserContext);
  const { perfilAuth, setPerfilAuth } = useContext(UserContext);



  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate()

  const redirect = location.search ? location.search.split("=")[1] : "/"
  const userLogin = useSelector((state) => state.userLogin);
  const { loadingLogin, userInfo, errorLogin, typeLogin } = userLogin;

  const userCheckProfile = useSelector((state) => state.userCheckProfile);
  const { error, loading, userProfileInfo, type } = userCheckProfile;

  //Este error se lo pasamos al form para que indique de este

  //Lo que hago en este use Effect es mediante el Reducer saber cuando tiene un porfil asociado o no
  //MEdiante la respuesta de los state
  useEffect(() => {
    if (userInfo) {
      const valorDeLaCookie = JSON.stringify(userInfo);
      document.cookie = `userInfo=${valorDeLaCookie}; path=/;`;
      setUsuarioAuth(document.cookie);

      if (userProfileInfo.message === 'El usuario aún no tiene un perfil asociado.') {
        setPerfilAuth(true);

        navigate("/profile", { state: { username: userLogeado.username }, replace: true });
      } else {
        navigate("/home/home");
      }
    }

  }, [userInfo, redirect]);



  const [userLogeado, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const onInputChange = (e) => {

    const { name, value } = e.target

    setUserLogin({
      ...userLogeado,
      [name]: value
    })
  }




  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login(userLogeado.username, userLogeado.password))
      .then(() => {

        if (USER_LOGIN_FAIL) {
          setMessage("Datos de inicio de sesión incorrectos o cuenta no creada. Verifica tus credenciales o regístrate.");

          setTimeout(() => {
            setMessage("");
          }, 5000);
        }
        //Importate para cambiar el estado de usuarioAuth
        
        //Generando cookies temporales //Probarlo

      })
      .catch((error) => {

        setMessage("Datos de inicio de sesión incorrectos o cuenta no creada. Verifica tus credenciales o regístrate.");

        setTimeout(() => {
          setMessage("");
        }, 5000);
      });

    dispatch(checkProfile(userLogeado.username));
  }



  return (
    <div>
      <LoginForm onInputChange={onInputChange} onSubmit={onSubmit} error={error} message={message} errorLogin={errorLogin} />

    </div>
  )
}


