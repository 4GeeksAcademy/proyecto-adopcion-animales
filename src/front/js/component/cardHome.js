// Card para la vista de los animales en la home, al hacer click en la card se redirige al componente animalHomeDetail

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
    const cardStyle = {
        maxWidth: "350px",
        maxHeight: "450px",
        fontSize: "1px",
        margin: "1px",
        padding: "0px",


    };

    const imageStyle = {
        maxWidth: "250px",
        maxHeight: "250px",
        marginBottom: "10px",
    };

    return (

        <Link to={`animalHome${animal.id}`} style={{ textDecoration: "none" }}>
            <div className={` border border-1 mt-4 rounded-3 shadow border-2`} style={cardStyle}>
                <img src={animal.animal_image} alt={animal.nombre} style={imageStyle} />
                <h2 style={{ fontSize: "24px", textDecoration: "none", color: "#ff914d" }}> {animal.nombre}</h2>
                <p style={{ fontSize: "14px", textDecoration: "none", color: "#ff914d" }}><i className="fa-solid fa-location-dot fa-lg fa-fw" />{animal.asociacion_provincia}</p>
            </div>
        </Link>

    );
}