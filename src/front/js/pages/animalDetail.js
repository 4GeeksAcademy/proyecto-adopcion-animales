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

    const imageStyle = {
        maxWidth: "500px",
        maxHeight: "500px",
        marginBottom: "10px",

    };

    return (
        <>
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center ">
                    <div className="card border border-3 rounded-3 shadow" style={{ width: "700px", backgroundColor: "transparent" }}>
                        <img src={animal.animal_image} className="card-img-top p-2 mt-2 mx-auto" style={imageStyle} alt={animal.nombre} />
                        <div className="card-body">
                            <h3 className="card-title">{animal.nombre}</h3>
                            <h6 className="card-subtitle mb-2 text-muted">Asociación: {animal.asociacion_nombre}</h6>
                        </div>
                        <ul className="list-group list-group-flush p-3">
                            <li className="list-group-item rounded-pill " style={{ backgroundColor: "#f9e4df" }}>Raza: {animal.raza}</li>
                            <li className="list-group-item rounded-pill " style={{ backgroundColor: "#f9e4df" }}>Edad: {animal.edad}</li>
                            <li className="list-group-item rounded-pill " style={{ backgroundColor: "#f9e4df" }}>Género: {animal.genero}</li>
                            <li className="list-group-item rounded-pill " style={{ backgroundColor: "#f9e4df" }}>Provincia: {animal.asociacion_provincia}</li>
                        </ul>
                        <h4 className="p-3">Descripción
                            <p className="p-1 mt-1 text-muted">{animal.descripcion}</p>
                        </h4>
                        <div className="card-body d-flex justify-content-between">
                            <button type="button" className="btn btn-lg shadow-sm" style={{ backgroundColor: "#ff914d" }} ><a href="/usuario" className="card-link" style={{ textDecoration: "none", color: "black" }}>Volver Atrás</a></button>
                            <div className="mx-3"></div>
                            <button type="button" className="btn btn-lg shadow-sm" style={{ backgroundColor: "#ff914d" }} ><Link to={`contacto`} style={{ textDecoration: "none", color: "black" }}>Contactar con la Asociación</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

