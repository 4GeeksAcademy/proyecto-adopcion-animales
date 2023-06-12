
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Asociacion() {
    const [animals, setAnimals] = useState([])

    const token = localStorage.getItem("token");

    const fetchAnimal = async (e) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/animal", {
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
    useEffect(() => {
        fetchAnimal()
    }, [])

    return (
        <>
            <div>
                <h1>Recuperando todos los animales de la Asociación que hizo login</h1>
                <Link to="/animalForm">
                    <button className="btn btn-primary">Añadir animal</button>
                </Link>
                {animals.map((animal) => {
                    return (
                        <div key={animal.id}>
                            <h2>Nombre: {animal.nombre}</h2>
                            <h3>Nombre de la asociación: {animal.asociacion_nombre
                            }</h3>
                            <img src={animal.image_url} alt={animal.nombre} />
                            <ul>
                                <li>Animal: {animal.tipo_animal}</li>
                                <li>Raza: {animal.raza}</li>
                                <li>Edad: {animal.edad}</li>
                                <li>Género: {animal.genero}</li>
                                <li>Descripción: {animal.descripcion}</li>
                            </ul>
                            <hr ></hr>
                        </div>
                    )
                })}
            </div>
        </>
    )
}