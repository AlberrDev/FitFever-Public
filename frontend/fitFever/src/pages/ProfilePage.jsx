import { useContext, useEffect, useState } from "react";
import { ProfileForm } from "./ProfileForm"
import { profile } from "../actions/userActions";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../context/UserContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


//Import uuid para gestionar la foto de perfil
import { v4 as uuidv4 } from 'uuid';


//Importamos la libreria de Dropbox
//Para gestion de las imagenes de Perfil

import { getStorage } from "firebase/storage";
import { getUsernameFromCookie } from "../data/getUsernameFromCookie";


export const ProfilePage = ({ onClose }) => {
    const location = useLocation();

    //Obtenemos del context el estado de perfilAuth
    const [perfilCreationAuth, setPerfilCreationAuth] = useState(false);
    const username = getUsernameFromCookie();
    const { calories, setCalories } = useContext(UserContext);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const today = new Date();
    const fechaActualFormateada = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    //Obtenemos del redux el estado de userProfile
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const redirect = location.search ? location.search.split("=")[1] : "/"
    const userProfileSelec = useSelector((state) => state.userProfile);
    const { error_profile, loading, userInfo } = userProfileSelec;
    //Este error se lo pasamos al form para que indique de este

    useEffect(() => {

        if (userInfo) {
            navigate("/home/home", { replace: true });
            window.location.reload();
        }
    }, [userInfo, redirect])



    const [userProfile, setUserProfile] = useState({
        username: username,
        peso: "",
        altura: "",
        edad: "",
        objetivo: "",
        sexo: "",
        factor_Actividad: "",
        foto_perfil: "",
        fecha_nacimiento: "",
        Calorias: "",
    });
    useEffect(() => {

        if (typeof userProfile.foto_perfil === 'string' && userProfile.foto_perfil !== "") {
            dispatch(
                profile(userProfile.username, userProfile.peso, userProfile.altura, userProfile.edad, userProfile.objetivo,
                    userProfile.sexo, userProfile.factor_Actividad, userProfile.foto_perfil, userProfile.fecha_nacimiento, userProfile.Calorias)
            );
        }
    }, [userProfile.foto_perfil]);

    const onInputChange = (e) => {

        const { name, value, type } = e.target;

        // Si el tipo de entrada es 'file', manejar el cambio de la imagen de perfil
        if (type === "file") {
            const file = e.target.files[0];
            setUserProfile({
                ...userProfile,
                foto_perfil: file
            });
        } else {
            setUserProfile({
                ...userProfile,
                [name]: value
            });
        }
    }

    const uploadImageToFireBase = async (file) => {
        const extension = file.type.split('/')[1];

        const storage = getStorage();
        let imageUrl = "fotos_perfil/" + uuidv4() + "." + extension;
        const referencia = ref(storage, imageUrl);

        uploadBytes(referencia, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(ref(storage, `${imageUrl}`))
                .then((url) => {
                    console.log('File available at', url);
                    setUserProfile(prevState => ({
                        ...prevState,
                        foto_perfil: url
                    }))
                })
        })
            .catch(error => {
                console.error('Error al cargar la imagen a FireBase:', error);
            });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        // Realizamos validaciones tanto de la fecha de nacimiento como de la altura, hay que validar el factor actividad
        if (userProfile.fecha_nacimiento < fechaActualFormateada) {
            // Comprobamos que la altura esté en cm
            if (/^\d+$/.test(userProfile.altura)) {
                try {
                    await uploadImageToFireBase(userProfile.foto_perfil);
                    setPerfilCreationAuth(true);
                } catch (error) {
                    setError(true);
                    setMessage("Es obligatorio subir una imagen de perfil");
                    console.error("Es obligatorio subir una imagen de perfil:", error);
                    setTimeout(() => {
                        setError(false);
                    }, 5000);
                }
            } else {
                setError(true);
                setMessage("La altura debe estar en centímetros (cm) y ser un valor válido");
                setTimeout(() => {
                    setError(false);
                }, 5000);
            }
        } else {
            setError(true);
            setMessage("La fecha de nacimiento no puede ser mayor a la fecha actual");
            setTimeout(() => {
                setError(false);
            }, 5000);
        }
        setTimeout(() => {
            onClose();
        }, 2000);
    };


    return (
        <div>
            {
                <ProfileForm onInputChange={onInputChange} onSubmit={onSubmit} username={username} userProfile={userProfile}
                    setUserProfile={setUserProfile} error={error} message={message} />
            }
        </div>
    )
}

