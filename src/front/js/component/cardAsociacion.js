import React from "react";

export default function CardAsociacion({ animals }) {
    return (
        <>
            {animals && animals.map((animal) => (
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
                </div>
            ))}
        </>
    );
}
