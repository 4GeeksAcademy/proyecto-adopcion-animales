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
        maxWidth: "300px",
        maxHeight: "350px",
        fontSize: "1px",
        margin: "1px",
        padding: "10px",
        border:"1px"
        
    };

    const imageStyle = {
        maxWidth: "80%",
        maxHeight: "80%",
        marginBottom: "10px"
    };

    return (
        
        <Link to={`animalHome${animal.id}`}>
            <div className={`${handleColor()}`} style={cardStyle}>
                <img src={animal.image_url} alt={animal.nombre} style={imageStyle} />
                <h5 style={{ fontSize: "18px" }}>Nombre: {animal.nombre}</h5>
                <p style={{ fontSize: "14px" }}>Provincia: {animal.asociacion_provincia}</p>
            </div>
        </Link>
        
    );
}