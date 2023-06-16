

// // // Card para la vista de usuario, al hacer click en el animal te redirige al componente animalDetail

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export default function Card({ animal }) {
    console.log(process.env.BACKEND_URL, 'COMPROBAR VARIABLE DE ENTORNO');

    const { store, actions } = useContext(Context);

    const handleColor = () => {
        if (store.darkMode) {
            return "dark-card"
        } else {
            return "light-card"
        }
    }

    return (
        <div className={handleColor()}>
            <Link to={`/animal/${animal.id}`}>
                <h2>Nombre: {animal.nombre}</h2>
            </Link>
            <Link to={`/asociacion/asociacionDetail/${animal.asociacion.id}`}>
                <h3>Nombre de la Asociación: {animal.asociacion.nombre}</h3>
            </Link>
            <img src={animal.image_url} alt={animal.nombre} />
            <ul>
                <li>Raza: {animal.raza}</li>
                <li>Edad: {animal.edad}</li>
                <li>Género: {animal.genero}</li>
                <li>Provincia: {animal.asociacion.provincia}</li>
                <li>Descripción: {animal.descripcion}</li>
            </ul>
            <button onClick={() => {
                actions.selectId(animal);
                actions.addFavorite();
            }}>Añadir a favoritos</button>
        </div>
    );
}
