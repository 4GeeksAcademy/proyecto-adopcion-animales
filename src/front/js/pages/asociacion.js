

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Asociacion() {
    const [animals, setAnimals] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);

    const [animalUpdate, setAnimalUpdate] = useState(false);

    const [pageNumber, setPageNumber] = useState(1)
    const pageSize = 8

    const token = localStorage.getItem("token");

    const fetchAnimal = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/api/animal?page=${pageNumber}&size=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setAnimals(data);
        console.log(data);
    };


    const deleteAnimal = async (animal) => {
        const confirmDelete = window.confirm("¿Estás seguro de eliminar este animal?");

        if (confirmDelete) {
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/animal/" + animal.id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al eliminar el animal");
                }

                const data = await response.json();
                console.log(data);
                const nombre_asociacion =
                    fetchAnimal();
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 3000);
                setAnimalUpdate(true);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchAnimal();
    }, [pageNumber, animalUpdate]);

    

    return (
        <>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    Animal eliminado correctamente
                </div>
            )}
            <div>
                <h1 className="text-center">Bienvenido </h1>
                <div className="text-center">
                    <Link to="/animalForm">
                        <button type="button" className="btn btn-lg shadow col-4 mt-2 rounded-pill" style={{ backgroundColor: "#a96d60", textDecoration: "none", color: "white" }} >Añadir un nuevo animal</button>
                    </Link>
                </div>
                <div className='container mt-4'>
                    <div className='row g-3 container justify-content-center'>
                        {animals !== null && animals.length > 0 ? (
                            animals.map((animal) => {
                                return (
                                    <div className="col-12 col-md-6 col-lg-4" key={animal.id}>
                                        <div className='card border border-2 shadow' style={{ background: "transparent" }}>
                                            <div className='text-center'>
                                                <img src={animal.animal_image} className='card-img-top ' style={{ maxWidth: '250px', maxHeight: '250px' }} alt={animal.nombre} />
                                            </div>
                                            <div className='card-body'>
                                                <h2 className='card-title' style={{ color: "#ff914d" }}>{animal.nombre}</h2>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Animal: {animal.tipo_animal}</li>
                                                    <li className="list-group-item">Raza: {animal.raza}</li>
                                                    <li className="list-group-item">Edad: {animal.edad}</li>
                                                    <li className="list-group-item">Género: {animal.genero}</li>
                                                    <li className="list-group-item">Descripción: {animal.descripcion}</li>
                                                </ul>
                                                <div className='d-flex justify-content-between'>
                                                    <Link to={`animalData${animal.id}`}><button className='btn btn-lg' style={{ backgroundColor: "#ff914d" }}>Editar</button></Link>
                                                    <button className='btn btn-lg' style={{ backgroundColor: "#a96d60", color: "white" }} onClick={() => deleteAnimal(animal)}>
                                                        <i className="fa-solid fa-trash" ></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <h1>Cargando...</h1>
                        )}
                    </div>
                </div>
                <div className="text-center mt-5">
                    <button className="btn  shadow-sm rounded-pill" style={{ backgroundColor: "#a96d60", textDecoration: "none", color: "white" }} onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>Anterior</button>
                    <button className="btn  shadow-sm rounded-pill" style={{ backgroundColor: "#a96d60", textDecoration: "none", color: "white" }} onClick={() => setPageNumber(pageNumber + 1)} disabled={animals !== null && animals.length < pageSize}>Siguiente</button>
                </div>
            </div>
        </>
    )
}

