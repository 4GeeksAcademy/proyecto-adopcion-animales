
import React from "react";
import CardHome from "./cardHome";

export default function FilterAnimalHome({ animals, filtros }) {
    const animalsFiltered = animals.filter((animal) => {
        if (filtros.provincia && filtros.tipo_animal) {
            return (
                animal.asociacion_provincia === filtros.provincia && animal.tipo_animal === filtros.tipo_animal
            );
        } else if (filtros.provincia) {
            return animal.asociacion_provincia === filtros.provincia;
        } else if (filtros.tipo_animal) {
            return animal.tipo_animal === filtros.tipo_animal;
        } else
            return animals;
    });

    return (
        <div>
            {animalsFiltered.length > 0 ? (
                animalsFiltered.map((animal) => (
                    <CardHome key={animal.id} animal={animal} />
                ))
            ) : (
                <h2>No hay resultados</h2>
            )}
        </div>
    );
}
