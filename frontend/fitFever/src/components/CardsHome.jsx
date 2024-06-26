import diarioIcon from "../../static/img/tarjetas_home/diario.png";
import zapatoIcon from "../../static/img/tarjetas_home/zapato.png";
import comunidadIcon from "../../static/img/tarjetas_home/community.png";

export const CardsHome = () => {
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-2">Recetas saludables y planes de entrenamiento personalizados</h2>
                    <p className="text-gray-600">¿Quieres mejorar tu salud y alcanzar tus metas de fitness? FitFever te ofrece las herramientas que necesitas para lograrlo.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 rounded-lg shadow-md flex items-center bg-white">
                        <img src={diarioIcon} alt="diario icono" className="w-12 h-12 mr-4" />
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Registro de comidas</h3>
                            <p>Mantén un diario de tus comidas para comprender mejor tus hábitos alimenticios y mejorar tu dieta.</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-lg shadow-md flex items-center bg-white">
                        <img src={zapatoIcon} alt="zapato icono" className="w-12 h-12 mr-4" />
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Planes de entrenamiento</h3>
                            <p>Organiza y almacena tus rutinas y ejercicios diarios y semanales de manera eficiente, para mantenerte en camino hacia tus metas de fitness.</p>                            </div>
                    </div>

                    <div className="p-6 rounded-lg shadow-md flex items-center bg-white">
                        <img src={comunidadIcon} alt="comunidad icono" className="w-12 h-12 mr-4" />
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Comunidad activa</h3>
                            <p>Únete a nuestra comunidad activa para recibir apoyo, consejos y motivación de otros usuarios y expertos en fitness.</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
