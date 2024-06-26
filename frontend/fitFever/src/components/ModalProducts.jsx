import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export const ModalProducts = () => {
    const { productos, setShowModal, infoDesayuno, setInfoDesayuno,
        infoAlmuerzo, setInfoAlmuerzo, infoComida, setInfoComida, infoMerienda,
        setInfoMerienda, infoCena, setInfoCena, tipoComida
    } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [grams, setGrams] = useState("");

    const closeModal = () => {
        setSelectedProduct(null);
        setGrams("");
        setShowModal(false);
    };

    const handleAddProduct = (producto) => {
        setSelectedProduct(producto);
        setGrams("");
    };

    const handleGramsChange = (e) => {
        let value = e.target.value;
        if (value > 10000) {
            value = 10000;
        }
        setGrams(value);
    };

    const handleSubmit = () => {
        if (selectedProduct && grams !== "") {
            let updatedInfoComida;

            switch (tipoComida) {
                case 'desayuno':
                    updatedInfoComida = { ...infoDesayuno };
                    break;
                case 'almuerzo':
                    updatedInfoComida = { ...infoAlmuerzo };
                    break;
                case 'comida':
                    updatedInfoComida = { ...infoComida };
                    break;
                case 'merienda':
                    updatedInfoComida = { ...infoMerienda };
                    break;
                case 'cena':
                    updatedInfoComida = { ...infoCena };
                    break;
                default:
                    break;
            }

            const selectedProductsList = updatedInfoComida.productos ? [...updatedInfoComida.productos] : [];

            const existingProductIndex = selectedProductsList.findIndex(product => product.id === selectedProduct.id);

            const caloriasNumerico = parseFloat(selectedProduct.calorias.split(' ')[0]);
            const proteinasNumerico = parseFloat(selectedProduct.proteinas.split(' ')[0]);
            const carbohidratosNumerico = parseFloat(selectedProduct.carbohidratos.split(' ')[0]);
            const grasasNumerico = parseFloat(selectedProduct.grasas.split(' ')[0]);

            const newProduct = {
                id: selectedProduct.id,
                nombre: selectedProduct.nombre,
                calorias: `${(caloriasNumerico * (grams / 100)).toFixed(2)} kcal`,
                proteinas: `${(proteinasNumerico * (grams / 100)).toFixed(2)} g`,
                carbohidratos: `${(carbohidratosNumerico * (grams / 100)).toFixed(2)} g`,
                grasas: `${(grasasNumerico * (grams / 100)).toFixed(2)} g`,
                grams: parseInt(grams)
            };

            if (existingProductIndex > -1) {
                selectedProductsList[existingProductIndex] = newProduct;
            } else {
                selectedProductsList.push(newProduct);
            }

            updatedInfoComida.productos = selectedProductsList;

            switch (tipoComida) {
                case 'desayuno':
                    setInfoDesayuno(updatedInfoComida);
                    break;
                case 'almuerzo':
                    setInfoAlmuerzo(updatedInfoComida);
                    break;
                case 'comida':
                    setInfoComida(updatedInfoComida);
                    break;
                case 'merienda':
                    setInfoMerienda(updatedInfoComida);
                    break;
                case 'cena':
                    setInfoCena(updatedInfoComida);
                    break;
                default:
                    break;
            }
            setSelectedProduct(null);
            setGrams("");
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
                <button onClick={closeModal} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900">
                    X
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">Agregar Alimento</h2>
                <div className="mb-4 flex flex-col sm:flex-row">
                    <input
                        type="text"
                        placeholder="Buscar alimento..."
                        className="flex-grow py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-2 sm:mb-0"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <button className="sm:ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Buscar
                    </button>
                </div>
                <div className="overflow-y-auto max-h-60">
                    {productos
                        .filter((producto) =>
                            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((producto) => (
                            <div key={producto.id} className="border-b border-gray-200 py-2 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{producto.nombre}</p>
                                    <p className="text-sm">Calorías: {producto.calorias}</p>
                                    <p className="text-sm">Proteínas: {producto.proteinas}</p>
                                    <p className="text-sm">Grasas: {producto.grasas}</p>
                                    <p className="text-sm">Carbohidratos: {producto.carbohidratos}</p>
                                </div>
                                <button onClick={() => handleAddProduct(producto)} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    +
                                </button>
                            </div>
                        ))}
                </div>
                {selectedProduct && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">{selectedProduct.nombre}</h3>
                        <label htmlFor="grams" className="mr-2">Gramos:</label>
                        <input
                            type="number"
                            id="grams"
                            value={grams}
                            onChange={handleGramsChange}
                            max="10000"
                            className="w-full sm:w-64 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        <button onClick={handleSubmit} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2 sm:mt-0 sm:ml-4">
                            Agregar
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
};
