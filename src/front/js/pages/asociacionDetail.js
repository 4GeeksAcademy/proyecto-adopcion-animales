
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

    if (!asociacion) {
        return <div>Loading...</div>;
    }
    console.log(asociacion)
    return (
        <>
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center ">
                    <div className="card border border-3 rounded-3 shadow" style={{ width: "700px", backgroundColor: "transparent" }}>
                        <img src={asociacion.image_url} alt={asociacion.nombre} className="card-img-top p-2 mt-2 mx-auto" style={imageStyle} />
                        <div className="card-body">
                            <h3 className="card-title">{asociacion.nombre}</h3>
                        </div>
                        <ul className="list-group list-group-flush p-3">
                            <li className="list-group-item rounded-pill " style={{ backgroundColor: "#f9e4df" }}>Email: {asociacion.email}</li>
                            <li className="list-group-item rounded-pill " style={{ backgroundColor: "#f9e4df" }}>Provincia: {asociacion.provincia}</li>
                        </ul>
                        <h4 className="p-3">Descripción
                            <p className="p-1 mt-1 text-muted">{asociacion['descripcion']}</p>
                        </h4>
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

