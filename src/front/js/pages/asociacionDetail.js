
// Cuando el user hace click en la asociación , te lleva a esta View con los detalles de la asociación


import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

const AsociacionDetail = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); // Obtener el parámetro 'id' de la URL
    const [asociacion, setAsociacion] = useState(null)

    useEffect(() => {
        const fetchAsociacion = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/asociacion/${id}`);
                const data = await response.json();
                setAsociacion(data);
            } catch (error) {
                console.error("Error fetching asociacion:", error);
            }
        };
        fetchAsociacion();
    }, [id]);


    const imageStyle = {
        maxWidth: "500px",
        maxHeight: "500px",
        marginBottom: "10px",

    };

    const handleColor = () => {
        if (store.darkMode) {
            return "dark-card";
        } else {
            return "light-card";
        }
    };

    const cardStyle = {
        maxWidth: "650px",
        backgroundColor: "transparent",
        padding: "0"

    };


    if (!asociacion) {
        return <div>Loading...</div>;
    }
    console.log(asociacion)
    return (
        <>
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center ">
                    <div className="card border border-2 rounded-3 shadow" style={cardStyle}>
                        <img src={asociacion.image_url} alt={asociacion.nombre} className="img-fluid" />
                        <div className="card-body">
                            <h3 className="card-title">{asociacion.nombre}</h3>
                        </div>
                        <div className=" border-2  border-top p-3 pb-0">
                        <p><i className="fa-solid fa-envelope fa-lg me-2 fa-fw" style={{ color: "#a96d60" }} />{asociacion.email}</p>
                            <p><i className="fa-solid fa-location-dot fa-lg me-1 fa-fw" style={{ color: "#a96d60" }} /> {asociacion.provincia}</p>
                        </div>
                        <div className="p-3 pt-0">
                        <h3>Descripción</h3>
                            <p className="mt-2 fs-5 text-muted">{asociacion['descripcion']}</p>
                        
                        </div>
                        <div className="card-body d-flex justify-content-between">
                            <button type="button" className="btn btn-lg shadow-sm" style={{ backgroundColor: "#ff914d" }} ><a href="/usuario" className="card-link" style={{ textDecoration: "none", color: "black" }}>Volver Atrás</a></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AsociacionDetail;

