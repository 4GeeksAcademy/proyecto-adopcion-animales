
import React, { useState, useEffect } from "react";

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
                {animals.map((animal, index) => {
                    return (
                        <div key={index}>
                            <h2>Nombre: {animal.nombre}</h2>
                            <h3>Nombre de la asociación: {animal.asociacion_nombre
                            }</h3>
                            <ul>
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