
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
        <div className={handleColor()}>
            <h2>Nombre de la Asociación: {asociacion.nombre}</h2>
            <img src={asociacion.image_url} alt={asociacion.nombre} />
            <ul>
                {/* <li>Descripción: {asociacion.descripcion}</li> */}
                <li>Descripción: {asociacion['descripcion']}</li>
                <li>Email: {asociacion.email}</li>
                <li>Provincia: {asociacion.provincia}</li>
            </ul>
        </div>
    );
};

export default AsociacionDetail;

