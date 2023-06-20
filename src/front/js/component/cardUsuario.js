

// // // Card para la vista de usuario, al hacer click en el animal te redirige al componente animalDetail

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export default function Card({ animal, showMessage, setShowMessage }) {
    console.log(process.env.BACKEND_URL, 'COMPROBAR VARIABLE DE ENTORNO');

    const { store, actions } = useContext(Context);

    const handleColor = () => {
        if (store.darkMode) {
            return "dark-card"
        } else {
            return "light-card"
        }
    }

    const cardStyle = {
        maxWidth: "380px",
        maxHeight: "600px",
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

        <div className="border mt-4 rounded-3 shadow border-2 mb-5" style={cardStyle}>
            <Link to={`animal${animal.id}`} style={{ textDecoration: "none" }}>
                <div className="text-center">
                    <img src={animal.animal_image} alt={animal.nombre} style={imageStyle} />
                </div>
                <div className="p-3">
                    <h2 style={{ fontSize: "32px", textDecoration: "none", color: "#FF914D" }}>{animal.nombre}</h2>
                    <Link to={`/asociacion/asociacionDetail/${animal.asociacion_id}`} style={{ textDecoration: "none" }}>
                        <h3 style={{ fontSize: "18px", textDecoration: "none", color: "#FF914D" }}> <i
                            className="fa-solid fa-house me-2"
                        />{animal.asociacion_nombre}</h3>
                    </Link>
                </div>
            </Link >
            <div className=" p-3 d-flex justify-content-between shadow">
                <ul className="list-group fs-6 " style={{ marginLeft: "10px" }}>
                    <li className="list-group">Raza: {animal.raza}</li>
                    <li className="list-group">Edad: {animal.edad}</li>
                    <li className="list-group">Género: {animal.genero}</li>
                    <li className="list-group">Provincia: {animal.asociacion_provincia}</li>
                </ul>
                <div className="d-flex align-items-center">
                    <button className="btn btn-lg rounded-circle shadow" style={{ backgroundColor: "#A96D60" }} onClick={() => {
                        actions.selectId(animal);
                        actions.addFavorite()
                    }}><i className="fa-regular fa-heart fs-1" alt="Me gusta" style={{ color: "white" }} ></i></button>
                </div>
            </div>

        </div>

    );
}
