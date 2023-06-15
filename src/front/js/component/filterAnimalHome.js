
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

    const latestThreeResults = animalsFiltered.slice(-3);

    return (
        <div className="container-fluid justify-content-center">
            <div className="row justify-content-center">
                {latestThreeResults.length > 0 ? (
                    latestThreeResults.map((animal) => (
                        <div className="col-md-4 col-sm-6" key={animal.id}>
                            <CardHome animal={animal} />
                        </div>
                    ))
                ) : (
                    <h5>No hay resultados</h5>
                )}
            </div>
        </div>
    );
}
