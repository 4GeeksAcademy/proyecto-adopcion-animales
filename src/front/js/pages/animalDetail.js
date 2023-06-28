import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";


export default function AnimalHomeDetail() {
    const { id } = useParams();
    const [animal, setAnimal] = useState([]);

    const token = localStorage.getItem("token");

    const user = {
        nombre: localStorage.getItem("nombre"),
        id: localStorage.getItem("id"),
        email: localStorage.getItem("email"),
    }
    console.log(user);

    const fetchAnimal = async () => {
        const response = await fetch(process.env.BACKEND_URL + `/api/animal/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await response.json();
        setAnimal(data);
        console.log(data);
    };
    useEffect(() => {
        fetchAnimal();
    }, [id]);


    const cardStyle = {
        maxWidth: "650px",
        backgroundColor: "transparent",
        padding: "0"

    };

    return (
        <>
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center m-2">
                    <div className="card border border-2 rounded-3 shadow" style={cardStyle}>
                        <img src={animal.animal_image} className="img-fluid" alt={animal.nombre} />
                        <div className="card-body">
                            <h3 className="card-title">{animal.nombre}</h3>
                            <h6 className="card-subtitle mb-2 text-muted">Asociación: {animal.asociacion_nombre}</h6>
                        </div>
                        <div className=" border-2  border-top p-3 pb-0">
                            <p><i className="fas fa-paw fa-lg me-2 fa-fw" style={{ color: "#a96d60" }} />{animal.raza}</p>
                            <p><i className="fas fa-calendar-days fa-lg me-2 fa-fw" style={{ color: "#a96d60" }} />{animal.edad} años</p>
                            <p><i className="fas fa-venus-mars fa-lg me-1 fa-fw" style={{ color: "#a96d60" }} /> {animal.genero}</p>
                            <p><i className="fa-solid fa-location-dot fa-lg me-2 fa-fw" style={{ color: "#a96d60" }} />Provincia: {animal.asociacion_provincia}</p>
                        </div>
                        <div className="p-3 pt-0">
                            <h3>Descripción</h3>
                            <p className="mt-2 fs-5 text-muted">{animal.descripcion}</p>
                        </div>
                        <div className="card-body d-flex justify-content-between">
                            <button type="button" className="btn btn-lg shadow-sm" style={{ backgroundColor: "#ff914d" }} >
                                <a href="/usuario" className="card-link" style={{ textDecoration: "none", color: "black" }}>Volver Atrás</a>
                            </button>
                            <div className="mx-3"></div>
                            <button type="button" className="btn btn-lg shadow-sm" style={{ backgroundColor: "#ff914d" }} >
                                <Link to={`contacto`} style={{ textDecoration: "none", color: "black" }}>Contactar con la Asociación</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

