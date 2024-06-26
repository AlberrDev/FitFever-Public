import React, { useContext, useEffect, useState } from 'react'
import { ModalProducts } from './ModalProducts';
import { UserProvider } from '../context/UserProvider';
import { UserContext } from '../context/UserContext';
import { getUsernameFromCookie } from '../data/getUsernameFromCookie';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarProducto, getUsernameProducts, registroConsumo } from '../actions/userActions';
import { calcularTotalesYObtenerNombres } from "../data/calcularTotalesNombres"
import { obtenerFechaActual } from '../data/convertirFecha';
import { calcularCaloriasTotales } from '../data/caloriasSeccion';
import { FaTrash } from 'react-icons/fa';

const TablaNutricion = () => {

    const { usuarioAuth, setUsuarioAuth, perfilAuth, setPerfilAuth, calories, setCalories, productos, setProductos
        , caloriasRestantes, setCaloriasRestantes, caloriasConsumidas, setCaloriasConsumidas, objetivoCalorias, setObjetivoCalorias
        , showModal, setShowModal, infoDesayuno, setInfoDesayuno,
        totalDesayuno, setTotalDesayuno, infoAlmuerzo, setInfoAlmuerzo, totalAlmuerzo, setTotalAlmuerzo,
        infoComida, setInfoComida, totalComida, setTotalComida, infoMerienda, setInfoMerienda, totalMerienda, setTotalMerienda,
        infoCena, setInfoCena, totalCena, setTotalCena, tipoComida, setTipoComida, fecha, setFecha,
        individualDesayuno, setIndividualDesayuno, individualAlmuerzo, setIndividualAlmuerzo, individualComida, setIndividualComida
        , individualMerienda, setIndividualMerienda, individualCena, setIndividualCena
    } = useContext(UserContext);

    const dispatch = useDispatch();
    let username = getUsernameFromCookie();

    const getUsernameProducts2 = useSelector((state) => state.getUsernameProducts);
    const { usernameProductsLoading, usernameProductsInfo, usernameProductsError, usernameProductsType } = getUsernameProducts2;
    useEffect(() => {
        if (infoDesayuno && infoDesayuno.productos && infoDesayuno.productos.length > 0) {
            setTotalDesayuno([...totalDesayuno, ...infoDesayuno.productos]);
            setIndividualDesayuno([...individualDesayuno, ...infoDesayuno.productos]);
        }

        setInfoDesayuno("");
    }, [infoDesayuno]);

    useEffect(() => {
        if (infoAlmuerzo && infoAlmuerzo.productos && infoAlmuerzo.productos.length > 0) {
            setTotalAlmuerzo([...totalAlmuerzo, ...infoAlmuerzo.productos]);
            setIndividualAlmuerzo([...individualAlmuerzo, ...infoAlmuerzo.productos]);
        }

        setInfoAlmuerzo("");
    }, [infoAlmuerzo]);

    useEffect(() => {
        if (infoComida && infoComida.productos && infoComida.productos.length > 0) {
            setTotalComida([...totalComida, ...infoComida.productos]);
            setIndividualComida([...individualComida, ...infoComida.productos]);
        }

        setInfoComida("");
    }, [infoComida]);

    useEffect(() => {
        if (infoMerienda && infoMerienda.productos && infoMerienda.productos.length > 0) {
            setTotalMerienda([...totalMerienda, ...infoMerienda.productos]);
            setIndividualMerienda([...individualMerienda, ...infoMerienda.productos]);
        }

        setInfoMerienda("");
    }, [infoMerienda]);

    useEffect(() => {
        if (infoCena && infoCena.productos && infoCena.productos.length > 0) {
            setTotalCena([...totalCena, ...infoCena.productos]);
            setIndividualCena([...individualCena, ...infoCena.productos]);
        }

        setInfoCena("");
    }, [infoCena]);

    useEffect(() => {
        dispatch(getUsernameProducts(username, obtenerFechaActual()));

    }, []);


    //El fallo radica aqui ya que siempre entra el otro
    useEffect(() => {
        if (usernameProductsInfo) {
            const desayuno = [];
            const almuerzo = [];
            const comida = [];
            const merienda = [];
            const cena = [];

            usernameProductsInfo.forEach((item) => {
                switch (item.momento) {
                    case "Desayuno":
                        desayuno.push(...item.detalle_consumo_productos);
                        break;
                    case "Almuerzo":
                        almuerzo.push(...item.detalle_consumo_productos);
                        break;
                    case "Comida":
                        comida.push(...item.detalle_consumo_productos);
                        break;
                    case "Merienda":
                        merienda.push(...item.detalle_consumo_productos);
                        break;
                    case "Cena":
                        cena.push(...item.detalle_consumo_productos);
                        break;
                    default:
                        console.log(`No handler for momento: ${item.momento}`);
                        break;
                }
            });

            setTotalDesayuno([...new Set(desayuno)]);
            setTotalAlmuerzo([...new Set(almuerzo)]);
            setTotalComida([...new Set(comida)]);
            setTotalMerienda([...new Set(merienda)]);
            setTotalCena([...new Set(cena)]);
        }
    }, [usernameProductsInfo]);



    const openModal = (categoria) => {
        setShowModal(true);
        setTipoComida(categoria);
    };

    const closeModal = () => {
        setShowModal(false);
        setTipoComida("");
    };

    const handleDelete = (categoria, index, nombre) => {
        const capitalizedCategoria = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        switch (capitalizedCategoria) {
            case "Desayuno":
                let newDesayuno = totalDesayuno.filter((item, i) => i !== index);
                setTotalDesayuno(newDesayuno);
                break;
            case "Almuerzo":
                let newAlmuerzo = totalAlmuerzo.filter((item, i) => i !== index);
                setTotalAlmuerzo(newAlmuerzo);
                break;
            case "Comida":
                let newComida = totalComida.filter((item, i) => i !== index);
                setTotalComida(newComida);
                break;
            case "Merienda":
                let newMerienda = totalMerienda.filter((item, i) => i !== index);
                setTotalMerienda(newMerienda);
                break;
            case "Cena":
                let newCena = totalCena.filter((item, i) => i !== index);
                setTotalCena(newCena);
                break;
            default:
                console.log(`No handler for categoria: ${capitalizedCategoria}`);
                break;
        }
        let fecha_consumo = obtenerFechaActual();

        dispatch(eliminarProducto(username, fecha_consumo, nombre, caloriasConsumidas,
            caloriasRestantes, capitalizedCategoria));
    };


    const onSubmit = (e) => {
        e.preventDefault();
        let fechaFormat = obtenerFechaActual();
        let dispatchActivo = false;

        let momentos = [
            { nombre: 'Desayuno', total: totalDesayuno, individual: individualDesayuno, setIndividual: setIndividualDesayuno },
            { nombre: 'Almuerzo', total: totalAlmuerzo, individual: individualAlmuerzo, setIndividual: setIndividualAlmuerzo },
            { nombre: 'Comida', total: totalComida, individual: individualComida, setIndividual: setIndividualComida },
            { nombre: 'Merienda', total: totalMerienda, individual: individualMerienda, setIndividual: setIndividualMerienda },
            { nombre: 'Cena', total: totalCena, individual: individualCena, setIndividual: setIndividualCena }
        ];

        momentos.forEach((momento) => {
            if (momento.total.length > 0) {
                // Eliminar duplicados basados en el nombre del producto
                let productosUnicos = Array.from(new Set(momento.individual.map(p => p.nombre)))
                    .map(nombre => momento.individual.find(p => p.nombre === nombre));

                productosUnicos.forEach((producto) => {
                    let { proteinasTotales: proteina, carbohidratosTotales: carbohidratos, grasasTotales: grasas } = calcularTotalesYObtenerNombres([producto]).totales;
                    let caloriasProducto = calcularCaloriasTotales([producto]);
                    let caloriasSeccion = calcularCaloriasTotales(momento.total);

                    dispatch(registroConsumo(
                        username,
                        fechaFormat,
                        caloriasConsumidas,
                        caloriasRestantes,
                        proteina,
                        grasas,
                        carbohidratos,
                        momento.nombre,
                        [producto.nombre],
                        "",
                        caloriasProducto,
                        caloriasSeccion
                    ));
                });
                dispatchActivo = true;
                momento.setIndividual([]);
            }
        });

        if (!dispatchActivo) {
            console.log('No se ha realizado ningún dispatch porque no hay productos en ninguna sección.');
        }
    };



    // Función para manejar el nuevo objeto de infoDesayuno y agregarlo a totalDesayuno

    return (
        <div className="mb-14">
            {showModal && (
                <ModalProducts
                    infoDesayuno={infoDesayuno} setInfoDesayuno={setInfoDesayuno}
                    infoAlmuerzo={infoAlmuerzo} setInfoAlmuerzo={setInfoAlmuerzo}
                    infoComida={infoComida} setInfoComida={setInfoComida}
                    infoMerienda={infoMerienda} setInfoMerienda={setInfoMerienda}
                    infoCena={infoCena} setInfoCena={setInfoCena}
                />
            )}

            <div className="flex justify-center overflow-x-auto">
                <table className="w-full max-w-screen-lg border-collapse border border-purple-700">
                    <thead>
                        <tr className="bg-purple-700 text-white">
                            <th className="px-4 py-2 text-xs md:text-sm">Comida</th>
                            <th className="px-4 py-2 text-xs md:text-sm">Alimento</th>
                            <th className="px-4 py-2 text-xs md:text-sm">Kcals</th>
                            <th className="px-4 py-2 text-xs md:text-sm">Proteinas</th>
                            <th className="px-4 py-2 text-xs md:text-sm">Carbohidratos</th>
                            <th className="px-4 py-2 text-xs md:text-sm">Grasas</th>
                            <th className="px-4 py-2 text-xs md:text-sm"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Desayuno */}
                        <tr className="bg-white">
                            <td className="px-4 py-2 text-xs md:text-sm" rowSpan={totalDesayuno.length + 1}>Desayuno</td>
                            <td className="py-2">
                                <button onClick={() => openModal('desayuno')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs md:text-sm">Agregar</button>
                            </td>
                        </tr>
                        {totalDesayuno.map((item, index) => (
                            <tr key={index} className="bg-white">
                                <td className="px-4 py-2 text-xs md:text-sm">{item.nombre}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.calorias}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.proteinas}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.carbohidratos}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.grasas}</td>
                                <td className="px-4 py-2 text-center text-xs md:text-sm">
                                    <button onClick={() => handleDelete('desayuno', index, item.nombre)} className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-white">
                            <td colSpan="7" className="border-t-2 border-purple-700 py-5"></td>
                        </tr>
                        {/* Almuerzo */}
                        <tr className="bg-white">
                            <td className="px-4 py-2 text-xs md:text-sm" rowSpan={totalAlmuerzo.length + 1}>Almuerzo</td>
                            <td className="py-2">
                                <button onClick={() => openModal('almuerzo')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs md:text-sm">Agregar</button>
                            </td>
                        </tr>
                        {totalAlmuerzo.map((item, index) => (
                            <tr key={index} className="bg-white">
                                <td className="px-4 py-2 text-xs md:text-sm">{item.nombre}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.calorias}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.proteinas}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.carbohidratos}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.grasas}</td>
                                <td className="px-4 py-2 text-center text-xs md:text-sm">
                                    <button onClick={() => handleDelete('almuerzo', index, item.nombre)} className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-white">
                            <td colSpan="7" className="border-t-2 border-purple-700 py-5"></td>
                        </tr>
                        {/* Comida */}
                        <tr className="bg-white">
                            <td className="px-4 py-2 text-xs md:text-sm" rowSpan={totalComida.length + 1}>Comida</td>
                            <td className="py-2">
                                <button onClick={() => openModal('comida')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs md:text-sm">Agregar</button>
                            </td>
                        </tr>
                        {totalComida.map((item, index) => (
                            <tr key={index} className="bg-white">
                                <td className="px-4 py-2 text-xs md:text-sm">{item.nombre}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.calorias}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.proteinas}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.carbohidratos}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.grasas}</td>
                                <td className="px-4 py-2 text-center text-xs md:text-sm">
                                    <button onClick={() => handleDelete('comida', index, item.nombre)} className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-white">
                            <td colSpan="7" className="border-t-2 border-purple-700 py-5"></td>
                        </tr>
                        {/* Merienda */}
                        <tr className="bg-white">
                            <td className="px-4 py-2 text-xs md:text-sm" rowSpan={totalMerienda.length + 1}>Merienda</td>
                            <td className="py-2">
                                <button onClick={() => openModal('merienda')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs md:text-sm">Agregar</button>
                            </td>
                        </tr>
                        {totalMerienda.map((item, index) => (
                            <tr key={index} className="bg-white">
                                <td className="px-4 py-2 text-xs md:text-sm">{item.nombre}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.calorias}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.proteinas}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.carbohidratos}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.grasas}</td>
                                <td className="px-4 py-2 text-center text-xs md:text-sm">
                                    <button onClick={() => handleDelete('merienda', index, item.nombre)} className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-white">
                            <td colSpan="7" className="border-t-2 border-purple-700 py-5"></td>
                        </tr>
                        {/* Cena */}
                        <tr className="bg-white">
                            <td className="px-4 py-2 text-xs md:text-sm" rowSpan={totalCena.length + 1}>Cena</td>
                            <td className="py-2">
                                <button onClick={() => openModal('cena')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs md:text-sm">Agregar</button>
                            </td>
                        </tr>
                        {totalCena.map((item, index) => (
                            <tr key={index} className="bg-white">
                                <td className="px-4 py-2 text-xs md:text-sm">{item.nombre}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.calorias}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.proteinas}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.carbohidratos}</td>
                                <td className="px-4 py-2 text-xs md:text-sm">{item.grasas}</td>
                                <td className="px-4 py-2 text-center text-xs md:text-sm">
                                    <button onClick={() => handleDelete('cena', index, item.nombre)} className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-10">
                <button onClick={onSubmit} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Guardar Registro</button>
            </div>
        </div>

    )

}
export default TablaNutricion
