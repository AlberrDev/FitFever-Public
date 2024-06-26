import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../context/UserContext';
import { formatFecha } from '../data/formatFecha';
import { Footer } from '../components/Footer';
import { addEjercicios, addRutinas, addRutinasDiarias, eliminarEjercicio, eliminarRutina, eliminarRutinaDiaria, getEjercicios, getRutinas, getRutinasDiarias } from '../actions/userActions';
import { EjercicioModal } from '../components/EjercicioModal';
import { AddEjercicioModal } from '../components/AddEjercicioModal';
import { RutinaModal } from '../components/RutinaModal';
import { getUsernameFromCookie } from '../data/getUsernameFromCookie';
import { AddRutinaModal } from '../components/AddRutinaModal';
import { AddRutinaDiariaModal } from '../components/AddRutinaDiariaModal';
import { useNavigate } from 'react-router';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export const EntrenamientoPage = () => {
  // const { fecha, setFecha } = useContext(UserContext);
  //FIX FECHAS
  const navigate = useNavigate();
  const [fecha, setFecha] = useState(new Date());
  const [weekRange, setWeekRange] = useState('');
  const [selectedRutina, setSelectedRutina] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEjercicio, setSelectedEjercicio] = useState(null);
  const [isAddEjercicioModalOpen, setIsAddEjercicioModalOpen] = useState(false);
  const [isAddRutinaModalOpen, setIsAddRutinaModalOpen] = useState(false);
  const [newEjercicio, setNewEjercicio] = useState({
    grupo_muscular: '',
    descripcion: '',
    series: '',
    repeticiones: ''
  });
  const [newRutina, setNewRutina] = useState({
    nombre: '',
    descripcion: '',
    ejercicios: [],
    objetivo: '',
    duracion: '',
    nivel: ''
  });



  const [username, setUsername] = useState(getUsernameFromCookie());

  // Pagination state
  const [rutinaPage, setRutinaPage] = useState(1);
  const [ejercicioPage, setEjercicioPage] = useState(1);
  const rutinasPerPage = 10;
  const ejerciciosPerPage = 10;

  const dispatch = useDispatch();
  const rutinasState = useSelector((state) => state.getRutinas);
  const { getRutinasError, getRutinasLoading, getRutinasInfo } = rutinasState;

  const ejerciciosState = useSelector((state) => state.getEjercicios);
  const { getEjerciciosError, getEjerciciosLoading, getEjerciciosInfo } = ejerciciosState;

  const rutinaDiariaState = useSelector((state) => state.getRutinaDiaria);
  const { getRutinaDiariaError, getRutinaDiariaLoading, getRutinaDiariaInfo, getRutinaDiariaType } = rutinaDiariaState;


  const [addEjercicioError, setAddEjercicioError] = useState(null);
  const [addRutinaDiariaError, setAddRutinaDiariaError] = useState(null);
  const [addRutinaError, setAddRutinaError] = useState(null);

  const [isAddRutinaDiariaModalOpen, setIsAddRutinaDiariaModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    dispatch(getRutinas(username));
    dispatch(getEjercicios(username));
    dispatch(getRutinasDiarias(username));
  }, [dispatch]);
  console.log(getRutinaDiariaInfo, "rutinaDiariaInfo");

  if (getRutinaDiariaInfo) {
    console.log(getRutinaDiariaInfo, "rutinaDiariaInfo");
  }

  useEffect(() => {
    const currentDay = new Date(fecha);
    const dayOfWeek = currentDay.getDay();
    const firstDayOfWeek = currentDay.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Adjust to get Monday
    const lastDayOfWeek = firstDayOfWeek + 6;
    const startOfWeek = new Date(currentDay.setDate(firstDayOfWeek));
    const endOfWeek = new Date(currentDay.setDate(lastDayOfWeek));
    setWeekRange(`${formatFecha(startOfWeek)} - ${formatFecha(endOfWeek)}`);
  }, [fecha, formatFecha]);



  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const openModal = (rutina) => {
    setSelectedRutina(rutina);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRutina(null);
  };

  const openEjercicioModal = (ejercicio) => {
    setSelectedEjercicio(ejercicio);
  };

  const closeEjercicioModal = () => {
    setSelectedEjercicio(null);
  };

  const openAddEjercicioModal = () => {
    setIsAddEjercicioModalOpen(true);
  };
  const closeAddEjercicioModal = () => {
    setIsAddEjercicioModalOpen(false);
    setNewEjercicio({
      grupo_muscular: '',
      descripcion: '',
      series: '',
      repeticiones: ''
    });
    setAddEjercicioError(null); // Limpia el error
  };



  const openAddRutinaModal = () => {
    setIsAddRutinaModalOpen(true);
  };

  const closeAddRutinaModal = () => {
    setIsAddRutinaModalOpen(false);
    setNewRutina({
      nombre: '',
      descripcion: '',
      ejercicios: []
    });
    setAddRutinaError(null); // Limpia el error
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEjercicio((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEjercicio = () => {
    dispatch(addEjercicios(username, newEjercicio.nombre, newEjercicio.grupo_muscular, newEjercicio.descripcion,
      newEjercicio.series, newEjercicio.repeticiones))
      .then(() => {
        dispatch(getEjercicios(username));
        closeAddEjercicioModal(); // Cierra el modal solo si se ha agregado correctamente
      })
      .catch((error) => {
        setAddEjercicioError(error.message);
        setTimeout(() => {
          setAddEjercicioError(null);
        }, 4000);
      });
  };

  const handleAddRutina = () => {

    dispatch(addRutinas(
      username,
      newRutina.nombre,
      newRutina.descripcion,
      newRutina.ejercicios,
      newRutina.objetivo,
      newRutina.duracion,
      newRutina.nivel
    ))
      .then(() => {
        dispatch(getRutinas(username));
        closeAddRutinaModal();
      })
      .catch((error) => {
        console.log(error, "error");
        setAddRutinaError(error.message);
        setTimeout(() => {
          setAddRutinaError(null);
        }, 4000);
      });
  };

  const handleRutinaChange = (e) => {
    const { name, value } = e.target;
    setNewRutina((prev) => ({
      ...prev,
      [name]: value
    }));
  };



  console.log(getEjerciciosError, "error");

  const handleRutinaPageChange = (newPage) => {
    setRutinaPage(newPage);
  };

  const handleEjercicioPageChange = (newPage) => {
    setEjercicioPage(newPage);
  };

  const paginatedRutinas = getRutinasInfo ? getRutinasInfo.slice((rutinaPage - 1) * rutinasPerPage, rutinaPage * rutinasPerPage) : [];
  const paginatedEjercicios = getEjerciciosInfo ? getEjerciciosInfo.slice((ejercicioPage - 1) * ejerciciosPerPage, ejercicioPage * ejerciciosPerPage) : [];

  const handleAddRutinaDiaria = (nombre, dia) => {
    console.log(dia, "day");
    console.log(nombre, "nombre");

    const selectedDate = new Date();

    const dayIndex = daysOfWeek.indexOf(dia);

    selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay() + dayIndex);

    const anyo = selectedDate.getFullYear();
    const mes = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const diaDelMes = String(selectedDate.getDate()).padStart(2, '0');
    const fecha = `${anyo}-${mes}-${diaDelMes}`;

    // Mostrar la fecha formateada en la consola
    console.log(`Adding routine for ${dia} (${fecha})`);

    dispatch(addRutinasDiarias(username, nombre, fecha, dia))
      .then(() => {
        dispatch(getRutinasDiarias(username));
        closeAddRutinaDiariaModal();

      })
      .catch((error) => {
        console.log(error, "error");
        setAddRutinaDiariaError(error.message);
        setTimeout(() => {
          setAddRutinaDiariaError(null);
        }, 4000);
      });
  };

  const openAddRutinaDiariaModal = (day) => {
    setSelectedDay(day);
    setIsAddRutinaDiariaModalOpen(true);
  };

  const closeAddRutinaDiariaModal = () => {
    setIsAddRutinaDiariaModalOpen(false);
    setSelectedDay(null);
    setAddRutinaDiariaError(null);
  };

  const handleDeleteEjercicio = (nombre_ejercicio) => {
    dispatch(eliminarEjercicio(username, nombre_ejercicio))
      .then(() => {
        dispatch(getEjercicios(username));
        dispatch(getRutinasDiarias(username));
        dispatch(getRutinas(username));

      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const handleDeleteRutina = (nombre_rutina) => {
    console.log("entra");
    console.log(nombre_rutina, "nombre_rutina");
    dispatch(eliminarRutina(username, nombre_rutina))
      .then(() => {
        dispatch(getRutinas(username));
        dispatch(getRutinasDiarias(username));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteRutinaDiaria = (nombre_rutina, fecha, dia) => {
    dispatch(eliminarRutinaDiaria(username, nombre_rutina, fecha, dia))
      .then(() => {
        dispatch(getRutinasDiarias(username));
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex flex-col items-center space-y-12 w-full px-4 py-8">
          <div className="w-full max-w-5xl space-y-8">
            <div className="bg-purple-100 p-6 rounded-lg shadow-md">
              <h1 className="text-2xl text-center font-bold mb-6">Tu entrenamiento Semanal</h1>
              <div className="flex justify-center items-center mb-8">
                <div className="bg-purple-300 px-10 py-3 rounded-lg mx-auto text-center">
                  <p className="text-xl font-semibold">{weekRange}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full mb-6">
                  <thead>
                    <tr>
                      {daysOfWeek.map(day => (
                        <th key={day} className="py-4 px-4 bg-purple-200 text-lg">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {daysOfWeek.map(day => {
                        const rutinasDiarias = getRutinaDiariaInfo && getRutinaDiariaInfo.filter(rutina => rutina.dia_semana === day);
                        const rutinasMostradas = rutinasDiarias && rutinasDiarias.slice(0, 3);
                        const hayMasRutinas = rutinasDiarias && rutinasDiarias.length > 3;

                        return (
                          <td key={day} className="relative h-48 text-center border">
                            <div className="flex flex-col items-center justify-start h-full space-y-2 mt-2 px-2">
                              {rutinasDiarias && rutinasDiarias.length > 0 ? (
                                <>
                                  {rutinasMostradas.map((rutinaDiaria, index) => (
                                    <div key={index} className="flex items-center justify-between w-full">
                                      <p
                                        className="cursor-pointer text-blue-500 flex-grow text-left truncate"
                                        onClick={() => openModal(rutinaDiaria.rutina)}
                                      >
                                        {rutinaDiaria.rutina.nombre}
                                      </p>
                                      <FaTrash
                                        className="text-red-500 cursor-pointer ml-2"
                                        onClick={() => handleDeleteRutinaDiaria(rutinaDiaria.rutina.nombre, rutinaDiaria.fecha_asociada, rutinaDiaria.dia_semana)}
                                      />
                                    </div>
                                  ))}
                                  {hayMasRutinas && (
                                    <p className="text-gray-500">...y más</p>
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="absolute bottom-2 inset-x-0 flex justify-center">
                              <button
                                className="bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 focus:outline-none"
                                onClick={() => openAddRutinaDiariaModal(day)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full max-w-5xl space-y-8 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div className="bg-purple-100 p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
                <div className="overflow-auto h-96">
                  <h2 className="text-xl font-bold mb-4">Ejercicios</h2>
                  {getEjerciciosLoading ? (
                    <p>Cargando...</p>
                  ) : getEjerciciosError ? (
                    <p>Error: {getEjerciciosError}</p>
                  ) : (
                    <div>
                      {paginatedEjercicios && paginatedEjercicios.map(ejercicio => (
                        <div key={ejercicio.id_ejercicio} className="mb-2 flex items-center justify-between">
                          <p
                            className="cursor-pointer text-blue-500 inline-block"
                            onClick={() => openEjercicioModal(ejercicio)}
                          >
                            {ejercicio.nombre}
                          </p>
                          <FaTrash
                            className="text-red-500 cursor-pointer ml-2"
                            onClick={() => handleDeleteEjercicio(ejercicio.nombre)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-8 flex justify-center">
                  <button
                    className={`px-3 py-1 mx-1 ${ejercicioPage === 1 ? 'bg-gray-300' : 'bg-purple-500 text-white'} rounded`}
                    onClick={() => handleEjercicioPageChange(ejercicioPage - 1)}
                    disabled={ejercicioPage === 1}
                  >
                    Anterior
                  </button>
                  <button
                    className={`px-3 py-1 mx-1 ${ejercicioPage * ejerciciosPerPage >= (getEjerciciosInfo ? getEjerciciosInfo.length : 0) ? 'bg-gray-300' : 'bg-purple-500 text-white'} rounded`}
                    onClick={() => handleEjercicioPageChange(ejercicioPage + 1)}
                    disabled={ejercicioPage * ejerciciosPerPage >= (getEjerciciosInfo ? getEjerciciosInfo.length : 0)}
                  >
                    Siguiente
                  </button>
                </div>
                <button
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 mt-5 self-start"
                  onClick={openAddEjercicioModal}
                >
                  Agregar Ejercicio
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div className="bg-purple-100 p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
                <div className="overflow-auto h-96">
                  <h2 className="text-xl font-bold mb-4">Rutinas</h2>
                  {getRutinasLoading ? (
                    <p>Cargando...</p>
                  ) : getRutinasError ? (
                    <p>Error: {getRutinasError}</p>
                  ) : (
                    <div>
                      {paginatedRutinas && paginatedRutinas.map(rutina => (
                        <div key={rutina.id_rutina} className="mb-2 flex items-center justify-between">
                          <p
                            className="cursor-pointer text-blue-500 inline-block"
                            onClick={() => openModal(rutina)}
                          >
                            {rutina.nombre}
                          </p>
                          <FaTrash
                            className="text-red-500 cursor-pointer ml-2"
                            onClick={() => handleDeleteRutina(rutina.nombre)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-8 flex justify-center">
                  <button
                    className={`px-3 py-1 mx-1 ${rutinaPage === 1 ? 'bg-gray-300' : 'bg-purple-500 text-white'} rounded`}
                    onClick={() => handleRutinaPageChange(rutinaPage - 1)}
                    disabled={rutinaPage === 1}
                  >
                    Anterior
                  </button>
                  <button
                    className={`px-3 py-1 mx-1 ${rutinaPage * rutinasPerPage >= (getRutinasInfo ? getRutinasInfo.length : 0) ? 'bg-gray-300' : 'bg-purple-500 text-white'} rounded`}
                    onClick={() => handleRutinaPageChange(rutinaPage + 1)}
                    disabled={rutinaPage * rutinasPerPage >= (getRutinasInfo ? getRutinasInfo.length : 0)}
                  >
                    Siguiente
                  </button>
                </div>
                <button
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 mt-5 self-start"
                  onClick={openAddRutinaModal}
                >
                  Crear Rutina
                </button>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-purple-700 text-white py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
          <div className="flex justify-center sm:justify-start">
            <svg className="h-12 mt-5" alt="logo" viewBox="0 0 10240 10240">
              <path xmlns="http://www.w3.org/2000/svg" d="M8284 9162 c-2 -207 -55 -427 -161 -667 -147 -333 -404 -644 -733 -886 -81 -59 -247 -169 -256 -169 -3 0 -18 -9 -34 -20 -26 -19 -344 -180 -354 -180 -3 0 -29 -11 -58 -24 -227 -101 -642 -225 -973 -290 -125 -25 -397 -70 -480 -80 -22 -3 -76 -9 -120 -15 -100 -13 -142 -17 -357 -36 -29 -2 -98 -7 -153 -10 -267 -15 -436 -28 -525 -40 -14 -2 -45 -7 -70 -10 -59 -8 -99 -14 -130 -20 -14 -3 -41 -7 -60 -11 -19 -3 -39 -7 -45 -8 -5 -2 -28 -6 -50 -10 -234 -45 -617 -165 -822 -257 -23 -10 -45 -19 -48 -19 -7 0 -284 -138 -340 -170 -631 -355 -1107 -842 -1402 -1432 -159 -320 -251 -633 -308 -1056 -26 -190 -27 -635 -1 -832 3 -19 7 -59 10 -89 4 -30 11 -84 17 -120 6 -36 12 -77 14 -91 7 -43 33 -174 39 -190 3 -8 7 -28 9 -45 6 -35 52 -221 72 -285 7 -25 23 -79 35 -120 29 -99 118 -283 189 -389 67 -103 203 -244 286 -298 75 -49 178 -103 196 -103 16 0 27 16 77 110 124 231 304 529 485 800 82 124 153 227 157 230 3 3 28 36 54 74 116 167 384 497 546 671 148 160 448 450 560 542 14 12 54 45 90 75 88 73 219 172 313 238 42 29 77 57 77 62 0 5 -13 34 -29 66 -69 137 -149 405 -181 602 -7 41 -14 82 -15 90 -1 8 -6 46 -10 83 -3 37 -8 77 -10 88 -2 11 -7 65 -11 122 -3 56 -8 104 -9 107 -2 3 0 12 5 19 6 10 10 8 15 -10 10 -34 167 -346 228 -454 118 -210 319 -515 340 -515 4 0 40 18 80 40 230 128 521 255 787 343 118 40 336 102 395 113 28 5 53 11 105 23 25 5 59 12 75 15 17 3 41 8 55 11 34 7 274 43 335 50 152 18 372 29 565 29 194 0 481 -11 489 -19 2 -3 -3 -6 -12 -6 -9 -1 -20 -2 -24 -3 -33 -8 -73 -16 -98 -21 -61 -10 -264 -56 -390 -90 -649 -170 -1243 -437 -1770 -794 -60 -41 -121 -82 -134 -93 l-24 -18 124 -59 c109 -52 282 -116 404 -149 92 -26 192 -51 220 -55 17 -3 64 -12 105 -21 71 -14 151 -28 230 -41 19 -3 46 -7 60 -10 14 -2 45 -7 70 -10 25 -4 56 -8 70 -10 14 -2 53 -7 88 -10 35 -4 71 -8 81 -10 10 -2 51 -6 92 -9 101 -9 141 -14 147 -21 3 -3 -15 -5 -39 -6 -24 0 -52 -2 -62 -4 -21 -4 -139 -12 -307 -22 -242 -14 -700 -7 -880 13 -41 4 -187 27 -250 39 -125 23 -274 68 -373 111 -43 19 -81 34 -86 34 -4 0 -16 -8 -27 -17 -10 -10 -37 -33 -59 -52 -166 -141 -422 -395 -592 -586 -228 -257 -536 -672 -688 -925 -21 -36 -43 -66 -47 -68 -4 -2 -8 -7 -8 -11 0 -5 -24 -48 -54 -97 -156 -261 -493 -915 -480 -935 2 -3 47 -21 101 -38 54 -18 107 -36 118 -41 58 -25 458 -138 640 -181 118 -27 126 -29 155 -35 14 -2 45 -9 70 -14 66 -15 137 -28 300 -55 37 -7 248 -33 305 -39 28 -3 84 -9 125 -13 163 -16 792 -8 913 12 12 2 58 9 102 15 248 35 423 76 665 157 58 19 134 46 170 60 86 33 344 156 348 166 2 4 8 7 13 7 14 0 205 116 303 184 180 126 287 216 466 396 282 281 511 593 775 1055 43 75 178 347 225 455 100 227 236 602 286 790 59 220 95 364 120 485 6 28 45 245 50 275 2 14 7 41 10 60 3 19 8 49 10 65 2 17 6 46 9 65 15 100 35 262 40 335 3 39 8 89 10 112 22 225 33 803 21 1043 -3 41 -7 129 -11 195 -3 66 -8 136 -10 155 -2 19 -6 76 -10 125 -3 50 -8 101 -10 115 -2 14 -6 57 -10 95 -7 72 -12 113 -20 175 -2 19 -7 55 -10 80 -6 46 -43 295 -51 340 -2 14 -9 54 -15 90 -5 36 -16 97 -24 135 -8 39 -17 84 -20 100 -12 68 -18 97 -50 248 -19 87 -47 204 -61 260 -14 56 -27 109 -29 117 -30 147 -232 810 -253 832 -4 4 -7 -23 -8 -60z"></path>

            </svg>
          </div>
          <div className="text-center flex flex-col items-center">
            <h2 className="text-xl font-bold">FitFever</h2>
            <p className="text-sm">Tu aliado en el camino hacia el bienestar</p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <div className="flex flex-col sm:flex-row">
              <Link to="/home/recetas" className="text-white hover:text-gray-200 mb-2 sm:mb-0">Recetas</Link>
              <Link to="/home/nutricion" className="text-white hover:text-gray-200 sm:ml-4 mb-2 sm:mb-0">Nutrición</Link>
              <Link to="/home/entrenamiento" className="text-white hover:text-gray-200 sm:ml-4">Rutinas</Link>
            </div>
          </div>
        </div>
      </footer>
      </div>

      {isModalOpen && selectedRutina && (
        <RutinaModal
          rutina={selectedRutina}
          onClose={closeModal}
          openEjercicioModal={openEjercicioModal}
        />
      )}

      {selectedEjercicio && (
        <EjercicioModal
          ejercicio={selectedEjercicio}
          onClose={closeEjercicioModal}
        />
      )}

      {isAddEjercicioModalOpen && (
        <AddEjercicioModal
          newEjercicio={newEjercicio}
          onChange={handleChange}
          onClose={closeAddEjercicioModal}
          onSave={handleAddEjercicio}
          error={addEjercicioError}
        />
      )}
      {isAddRutinaModalOpen && (
        <AddRutinaModal
          newRutina={newRutina}
          onChange={handleRutinaChange}
          onClose={closeAddRutinaModal}
          onSave={handleAddRutina}
          ejercicios={getEjerciciosInfo}
          error={addRutinaError}
        />
      )}
      <AddRutinaDiariaModal
        isOpen={isAddRutinaDiariaModalOpen}
        onClose={closeAddRutinaDiariaModal}
        rutinas={getRutinasInfo}
        onSave={handleAddRutinaDiaria}
        selectedDay={selectedDay}
        error={addRutinaDiariaError}
      />
    </>
  );
};