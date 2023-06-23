

// // // Card para la vista de usuario, al hacer click en el animal te redirige al componente animalDetail

import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export default function Card({ animal, showMessage, setShowMessage }) {
    console.log(process.env.BACKEND_URL, 'COMPROBAR VARIABLE DE ENTORNO');

    const { store, actions } = useContext(Context);


    useEffect(() => {
        if (showMessage) {
            console.log("animal añadido a favoritos");
        }
    }, [showMessage])

    const handleColor = () => {
        if (store.darkMode) {
            return "dark-card"
        } else {
            return "light-card"
        }
    }

    return (
        <div className='col-12 col-md-6 col-lg-4'>
            <div className='card border border-1 shadow-sm' style={{ background: "transparent" }}>
                <div className="text-center">
                    <Link to={`animal${animal.id}`} style={{ textDecoration: "none" }}>
                        <img src={animal.animal_image} alt={animal.nombre} className="img-fluid" />
                    </Link>
                </div>
                <div className='card-body p-3'>
                    <Link to={`animal${animal.id}`} style={{ textDecoration: "none" }}>
                        <h2 className='card-title' style={{ fontSize: "32px", textDecoration: "none", color: "#FF914D" }}>{animal.nombre}</h2>
                    </Link>
                    <Link to={`/asociacion/asociacionDetail/${animal.asociacion_id}`} style={{ textDecoration: "none" }}>
                        <h3 style={{ fontSize: "18px", textDecoration: "none", color: "#FF914D" }}>
                            <i className="fa-solid fa-house me-2" />{animal.asociacion_nombre}
                        </h3>
                    </Link>
                    <div className="d-flex align-items-center justify-content-between">
                        <ul className="list-group fs-6 mt-3">
                            <li className="list-group">Raza: {animal.raza}</li>
                            <li className="list-group">Edad: {animal.edad}</li>
                            <li className="list-group">Género: {animal.genero}</li>
                            <li className="list-group">Provincia: {animal.asociacion_provincia}</li>
                        </ul>
                        <button className="btn" style={{ backgroundColor: "#A96D60" }} onClick={() => {
                            actions.selectId(animal);
                            actions.addFavorite()
                        }}><i className="fa-regular fa-heart fs-2" alt="Me gusta" style={{ color: "white" }} ></i></button>
                    </div>

                </div>
            </div>
        </div>

    );
}
