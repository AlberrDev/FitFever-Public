import { MainRouter } from "./routes/MainRouter"
import './index.css';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const MainApp = () => {


    const firebaseConfig = {
        apiKey: "AIzaSyD8ZOuwAVwcaUIZQaEMusmyJbK6LtEb07w",
        authDomain: "fitfeverstorage.firebaseapp.com",
        projectId: "fitfeverstorage",
        storageBucket: "fitfeverstorage.appspot.com",
        messagingSenderId: "684676075234",
        appId: "1:684676075234:web:2f0243db43cbd7eceb98bb",
        measurementId: "G-08DX51TK2N"
      };

    const app = initializeApp(firebaseConfig);
    return (
        <>
            <MainRouter />
        </>
    )
}

