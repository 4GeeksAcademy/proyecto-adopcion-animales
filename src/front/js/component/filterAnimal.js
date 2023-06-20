

import React from "react";
import Card from "./cardUsuario";

export default function FilterAnimal({ animals, filtros }) {
    const animalsFiltered = animals.filter((animal) => {

        if (filtros.provincia && filtros.genero && filtros.tipo_animal) {
            return (
                animal.asociacion_provincia === filtros.provincia &&
                animal.genero === filtros.genero &&
                animal.tipo_animal === filtros.tipo_animal
            );
        } else if (filtros.provincia) {
            return animal.asociacion_provincia === filtros.provincia;
        } else if (filtros.genero) {
            return animal.genero === filtros.genero;
        } else if (filtros.tipo_animal) {
            return animal.tipo_animal === filtros.tipo_animal;
        } else
            return true;
    });



    return (
        <div className="row container justify-content-center">
            {animalsFiltered.length > 0 ? (
                animalsFiltered.map((animal) => (
                    <Card key={animal.id} animal={animal} />
                ))
            ) : (
                <h2>No hay resultados</h2>
            )}
        </div>
    );
}
