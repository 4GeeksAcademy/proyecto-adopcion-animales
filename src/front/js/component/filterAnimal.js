// // Filtros para la vista de usuario
import React from "react";
import Card from "./cardUsuario";

export default function FilterAnimal({ animals, filtros }) {

    const animalsFiltered = animals.filter((animal) => {

        if (filtros.provincia && filtros.genero) {
            return (
                animal.asociacion_provincia === filtros.provincia &&
                animal.genero === filtros.genero
            )
        } else if (filtros.provincia) {
            return animal.asociacion_provincia === filtros.provincia
        } else if (filtros.genero) {
            return animal.genero === filtros.genero
        } else {
            return animals
        }
    })
    return (
        <div className='animales'>
            {animalsFiltered.length > 0 ? (
                animalsFiltered.map((animal) => {
                    return <Card key={animal.id} animal={animal} />
                })
            ) : (
                <p>No hay resultados</p>
            )}
        </div>
    )
}