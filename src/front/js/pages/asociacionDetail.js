
// Cuando el user hace click en la asociación , te lleva a esta View con los detalles de la asociación


import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

const AsociacionDetail = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); // Obtener el parámetro 'id' de la URL
    const asociacion = store.idAnimal; // Accede a los datos de la asociación a través de store.idAnimal

    const handleColor = () => {
        if (store.darkMode) {
            return "dark-card";
        } else {
            return "light-card";
        }
    };

    return (
        <div className={handleColor()}>
            <h2>Nombre de la Asociación: {asociacion.nombre}</h2>
            <img src={asociacion.image_url} alt={asociacion.nombre} />
            <ul>
                <li>Email: {asociacion.email}</li>
                <li>Provincia: {asociacion.provincia}</li>
            </ul>
        </div>
    );
};

export default AsociacionDetail;

