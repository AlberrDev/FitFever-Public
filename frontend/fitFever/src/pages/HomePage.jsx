import { Link } from "react-router-dom"
import Carousel from "../components/Carusel"
import { CardsHome } from "../components/CardsHome";
import { Recetas } from "../components/Recetas";
import gente from "../../static/img/gente.png";
import comida from "../../static/img/comida.png";
import comida2 from "../../static/img/comida2.png";
import dieta from "../../static/img/dieta.png";
import fitness from "../../static/img/fitness.png";
import recetas from "../../static/img/recetas.png";
import { Footer } from "../components/Footer";

export const HomePage = () => {
  const images = [
    dieta,
    gente,
    comida2,
    fitness,
    recetas
  ];
  return (
    <>
      <div className="flex flex-col items-center mt-10 px-4 md:px-0">
        <div className="flex flex-col md:flex-row md:space-x-10 mt-10 items-center">
          <div className="flex flex-col items-center max-w-lg text-center md:text-left">
            <h2 className="text-3xl md:text-5xl mb-4 leading-normal font-bold">
              Alcanza tus objetivos de salud con una dieta equilibrada y un estilo de vida activo
            </h2>
            <Link
              to="/register"
              className="text-lg mt-4 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-200"
            >
              FitFever es tu aliado en el camino hacia el bienestar
            </Link>
          </div>
          <div className="flex justify-center max-w-lg mt-6 md:mt-0">
            <img src={comida} alt="Comida saludable" className="w-full h-auto" />
          </div>
        </div>
        <div className="flex flex-col items-center mt-16 mb-10 px-4 md:px-0">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">Qué Es FitFever?</h2>
          <Carousel images={images} />
        </div>
      </div>
      <CardsHome />
      <Recetas />
      <Footer />
    </>
  )
}
