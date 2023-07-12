

import React from "react";
import Card from "./cardUsuario";

export default function FilterAnimal({ animals, filtros, showMessage, setShowMessage }) {
    const animalsFiltered = animals.filter((animal) => {

        if (filtros.provincia && filtros.genero && filtros.tipo_animal) {
            return (
                animal.asociacion_provincia === filtros.provincia &&
                animal.genero === filtros.genero &&
                animal.tipo_animal === filtros.tipo_animal
            );
        } else if (filtros.provincia && filtros.genero) {
            return (
                animal.asociacion_provincia === filtros.provincia &&
                animal.genero === filtros.genero
            );
        } else if (filtros.provincia && filtros.tipo_animal) {
            return (
                animal.asociacion_provincia === filtros.provincia &&
                animal.tipo_animal === filtros.tipo_animal
            );
        } else if (filtros.genero && filtros.tipo_animal) {
            return (
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
        <div className="container">
        <div className='row g-4 pt-4'>
            {animalsFiltered.length > 0 ? (
                animalsFiltered.map((animal) => (
                    <Card key={animal.id} animal={animal} showMessage={showMessage} setShowMessage={setShowMessage} />
                ))
            ) : (
                <h2>No hay resultados</h2>
            )}
        </div>
        </div>
    );
}
