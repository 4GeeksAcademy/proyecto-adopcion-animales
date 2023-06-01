
import React, { useState, useEffect } from "react";

export default function Usuario() {
    const [animals, setAnimals] = useState([])

    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/allanimal", {
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
        handleSubmit()
    }, [])

    return (
        <>
            <div>
                <h1>Recuperando todos los animales en la vista de usuario</h1>
                {animals.map((animal, index) => {
                    return (
                        <div key={index}>
                            <h2>{animal.nombre}</h2>
                            <ul>
                                <li>{animal.raza}</li>
                                <li>{animal.edad}</li>
                                <li>{animal.genero}</li>
                                <li>{animal.descripcion}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </>
    )
}