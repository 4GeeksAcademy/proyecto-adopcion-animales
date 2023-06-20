

import React, { useState, useEffect } from "react";
import FilterAnimal from "../component/filterAnimal";

export default function Usuario() {
    const [animals, setAnimals] = useState([])
    const [filtros, setFiltros] = useState({
        provincia: "",
        genero: "",
        tipo_animal: "",
    })

    const [showMessage, setShowMessage] = useState(false);
    const showDuration = 2000;
    const [pageNumber, setPageNumber] = useState(1)
    const pageSize = 8

    const token = localStorage.getItem("token");

    const fetchAnimal = async (e) => {
        const response = await fetch(
            `${process.env.BACKEND_URL}/api/animal?page=${pageNumber}&size=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setAnimals(data);
        console.log(data);

        if (e.target) {
            const animalId = e.target.value;
            // Lógica para agregar el animal a favoritos

            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, showDuration);
        }
    };
    useEffect(() => {
        fetchAnimal()
    }, [pageNumber])
    const [colWidth, setColWidth] = useState('col-4');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 576) {
                setColWidth('col-10');
            } else {
                setColWidth('col-4');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div>
                {/* <h1>Recuperando todos los animales en la vista de usuario</h1> */}
                <div className='container mt-1 py-2 text-center'>
                    <div className='container border border-3 p-1 rounded-pill shadow ' id='containersearch'>
                        <div className='row justify-content-center align-items-center'>
                            <form>
                                <div className={`d-inline-flex p-2 align-items-center ${colWidth}`}>
                                    <i className="fa-solid fa-location-dot fa-lg me-3 fa-fw" />
                                    {/* <label htmlFor='provincia'>Provincia: </label> */}
                                    <select
                                        onChange={(e) =>
                                            setFiltros({ ...filtros, provincia: e.target.value })
                                        }
                                        name='provincia'
                                        id='provincia'
                                        className="form-select" aria-label="Default select example">
                                        <option value="">Selecciona una provincia</option>
                                        <option value="A Coruña">A Coruña</option>
                                        <option value="Álava">Álava</option>
                                        <option value="Albacete">Albacete</option>
                                        <option value="Alicante">Alicante</option>
                                        <option value="Almería">Almería</option>
                                        <option value="Asturias">Asturias</option>
                                        <option value="Ávila">Ávila</option>
                                        <option value="Badajoz">Badajoz</option>
                                        <option value="Barcelona">Barcelona</option>
                                        <option value="Burgos">Burgos</option>
                                        <option value="Cáceres">Cáceres</option>
                                        <option value="Cádiz">Cádiz</option>
                                        <option value="Cantabria">Cantabria</option>
                                        <option value="Castellón">Castellón</option>
                                        <option value="Ciudad Real">Ciudad Real</option>
                                        <option value="Córdoba">Córdoba</option>
                                        <option value="Cuenca">Cuenca</option>
                                        <option value="Girona">Girona</option>
                                        <option value="Granada">Granada</option>
                                        <option value="Guadalajara">Guadalajara</option>
                                        <option value="Gipuzkoa">Gipuzkoa</option>
                                        <option value="Huelva">Huelva</option>
                                        <option value="Huesca">Huesca</option>
                                        <option value="Jaén">Jaén</option>
                                        <option value="La Rioja">La Rioja</option>
                                        <option value="Las Palmas">Las Palmas</option>
                                        <option value="León">León</option>
                                        <option value="Lleida">Lleida</option>
                                        <option value="Lugo">Lugo</option>
                                        <option value="Madrid">Madrid</option>
                                        <option value="Málaga">Málaga</option>
                                        <option value="Murcia">Murcia</option>
                                        <option value="Navarra">Navarra</option>
                                        <option value="Ourense">Ourense</option>
                                        <option value="Palencia">Palencia</option>
                                        <option value="Pontevedra">Pontevedra</option>
                                        <option value="Salamanca">Salamanca</option>
                                        <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
                                        <option value="Segovia">Segovia</option>
                                        <option value="Sevilla">Sevilla</option>
                                        <option value="Soria">Soria</option>
                                        <option value="Tarragona">Tarragona</option>
                                        <option value="Teruel">Teruel</option>
                                        <option value="Toledo">Toledo</option>
                                        <option value="Valencia">Valencia</option>
                                        <option value="Valladolid">Valladolid</option>
                                        <option value="Vizcaya">Vizcaya</option>
                                        <option value="Zamora">Zamora</option>
                                        <option value="Zaragoza">Zaragoza</option>
                                    </select>
                                </div>
                                {/* <label htmlFor='tipo_animal'>Tipo de Animal: </label> */}
                                <div className={`d-inline-flex p-2 align-items-center ${colWidth}`}>
                                    <i className="fa-solid fa-paw fa-lg me-3 fa-fw"></i>
                                    <select
                                        onChange={(e) => setFiltros({ ...filtros, tipo_animal: e.target.value })}
                                        name='tipo_animal'
                                        id='tipo_animal'
                                        className="form-select" aria-label="Default select example">
                                        <option value=''>Seleccione un tipo de animal</option>
                                        <option value='Perro'>Perro</option>
                                        <option value='Gato'>Gato</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">

                    <FilterAnimal animals={animals} filtros={filtros} showMessage={showMessage} setShowMessage={setShowMessage} />

                </div>
            </div>
            <div className="text-center">
                <button className="btn  shadow-sm rounded-pill" style={{ backgroundColor: "#a96d60", textDecoration: "none", color: "white" }} onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>Anterior</button>
                <button className="btn  shadow-sm rounded-pill" style={{ backgroundColor: "#a96d60", textDecoration: "none", color: "white" }} onClick={() => setPageNumber(pageNumber + 1)} disabled={animals.length < pageSize}>Siguiente</button>
            </div>
        </>
    )
}


