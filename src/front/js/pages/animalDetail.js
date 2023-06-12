import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";


export default function AnimalHomeDetail() {
    const { id } = useParams();
    const [animal, setAnimal] = useState([]);

    const token = localStorage.getItem("token");

    const fetchAnimal = async () => {
        const response = await fetch(process.env.BACKEND_URL + `/api/animal/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await response.json();
        setAnimal(data);
        console.log(data);
    };
    useEffect(() => {
        fetchAnimal();
    }, [id]);

    return (
        <>
            <Link to="/usuario">Volver Atrás</Link>
            <div>
                <h1>Card Usuario</h1>
                <h2>Nombre: {animal.nombre}</h2>
                <h3>Nombre de la Asociación: {animal.asociacion_nombre}</h3>
                <img src={animal.image_url} alt={animal.nombre} />
                <ul>
                    <li>Raza: {animal.raza}</li>
                    <li>Edad: {animal.edad}</li>
                    <li>Género: {animal.genero}</li>
                    <li>Provincia: {animal.asociacion_provincia}</li>
                    <li>Descripción: {animal.descripcion}</li>
                </ul>
            </div>
        </>
    );
}