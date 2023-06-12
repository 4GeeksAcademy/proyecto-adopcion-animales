
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardAsociacion from "../component/cardAsociacion";

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
                        <CardAsociacion key={animal.id} animal={animal} />
                    )
                })}
            </div>
        </>
    )
}