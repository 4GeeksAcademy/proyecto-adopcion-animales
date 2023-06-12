import React from "react";
import { Link } from "react-router-dom";

export default function CardAsociacion({ animal }) {
    return (
        <>
            <div key={animal.id}>
                <h2>Nombre: {animal.nombre}</h2>
                <img src={animal.image_url} alt={animal.nombre} />
                <ul>
                    <li>Animal: {animal.tipo_animal}</li>
                    <li>Raza: {animal.raza}</li>
                    <li>Edad: {animal.edad}</li>
                    <li>Género: {animal.genero}</li>
                    <li>Descripción: {animal.descripcion}</li>
                </ul>
                <Link to={`animalData${animal.id}`}>
                    <button className="btn btn-primary">Editar</button>
                </Link>
            </div>
        </>
    );
}
