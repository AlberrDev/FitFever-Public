
import piramide from "../../static/img/piramide.png";
import motivacion from "../../static/img/motivacion.png";



export const Recetas = () => {
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-2">Recetas e inspiración</h2>
                    <p className="text-gray-600">Consigue recetas aprobadas por nutricionistas y muy fáciles de realizar</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <a href="#">
                            <img src={piramide} alt="Descripción de la imagen" className="mx-auto mb-5 w-full max-w-xs" />
                            <h3 className="text-xl font-semibold mb-2">Infinitas Recetas Saludables</h3>
                            <p className="text-gray-700">Descubre una selección de recetas nutritivas y deliciosas para mejorar tu salud y energía.</p>
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <a href="#">
                            <img src={motivacion} alt="Descripción de la imagen" className="mx-auto mb-5 w-full max-w-xs" />
                            <h3 className="text-xl font-semibold mb-2">Descubre tu potencial</h3>
                            <p className="text-gray-700">Encuentra tu motivación interna, visualiza tus metas y recuerda que cada paso te acerca más a tu mejor versión. ¡Tú puedes lograrlo!</p>
                        </a>
                    </div>
                </div>
            </div>

        </>
    )
}
