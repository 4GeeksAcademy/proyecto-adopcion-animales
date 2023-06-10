// Card para la vista de los animales en la home

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export default function CardHome({ animal }) {
    const { store, actions } = useContext(Context);


    const handleColor = () => {
        if (store.darkMode) {
            return "dark-card"
        } else {
            return "light-card"
        }
    }
    return (
        <Link to={`animal${animal.id}`}>
            <div className={handleColor()}>
                <img src={animal.image_url} alt={animal.nombre} />
                <h2>Nombre: {animal.nombre}</h2>
                <p>Provincia: {animal.asociacion_provincia}</p>
            </div>
        </Link >
    );
}