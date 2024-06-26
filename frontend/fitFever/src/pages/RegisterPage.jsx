import { useContext, useState, useEffect } from "react"
import { RegisterForm } from "./RegisterForm"
import { UserContext } from "../context/UserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader";
import Message from "./Message";
import { validEmail } from "../data/Regex";
import { validPassword } from "../data/Regex";
import { signup } from "../actions/userActions";

export const RegisterPage = () => {

  const { usuario, setUsuario } = useContext(UserContext);
  //Agregamos estados para validacion del campo
  //Se valida que no esten vacios en el html con el "required"
  const [errorGenerado, setError] = useState(false)
  const [message, setMessage] = useState(false)
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/home"

  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;

  useEffect(() => {
    if (userInfo) {
      setError(true)
      setMessage(userInfo.details)
      setTimeout(() => {
        setError(false)
        setMessage("")
      }, 5000);
    }
  }, [userInfo, redirect])



  let navigate = useNavigate()

  //Genero mi username mediante los dos nombres


  const [userRegis, setUserRegis] = useState({
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onInputChange = (e) => {

    const { name, value } = e.target

    setUserRegis({
      ...userRegis,
      [name]: value
    })
  }

  //Aqui dentro verificamos los datos que hacemos en el Submit y le pasamos
  //A nuestro (action) Signup los valores validos del registro
  const onSubmit = (e) => {
    e.preventDefault();
    //Validaciones que hacemos
    //Que el email y password sea regex correcto
    //Que ambas password sean identicas

    if (userRegis.password !== userRegis.passwordConfirm) {
      setMessage("Las contraseñas no coinciden")
      setError(true)
      setTimeout(() => {
        setMessage("")
        setError(false)

      }, 3000);
      //Aqui queremos hacer que cuando no sean iguales las contraseñas solo se vacie estos dos campos
    } else if (!validPassword.test(userRegis.password)) {
      setMessage("La contraseñas tienen que seguir el formato requerido")
      setError(true)
      setTimeout(() => {
        setMessage("")
        setError(false)

      }, 3000);

    } else if (!validEmail.test(userRegis.email)) {
      setMessage("El email no es valido")
      setError(true)
      setTimeout(() => {
        setMessage("")
        setError(false)

      }, 3000);
    } else {
      //Aqui para un futuro en vez de que genere que lo pueda poner
      //Por pantalla y importante el orden de los datos
      //Aqui llevara al dispatch y saldran distintos mensajes
      dispatch(signup(userRegis.username, userRegis.fname, userRegis.lname, userRegis.email,
        userRegis.password))

    }
  }

  return (
    <div>
      <RegisterForm onInputChange={onInputChange} onSubmit={onSubmit} error={error} message={message} errorGenerado={errorGenerado} 
      />


    </div>
  )


}

