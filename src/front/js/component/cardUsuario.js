// // Card para la vista de usuario

import React from "react";

export default function Card({ animal }) {
    return (
        <div className='animal'>
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
    )
}
