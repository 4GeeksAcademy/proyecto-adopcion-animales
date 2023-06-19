
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import editImg from '../../../front/img/editLogo.png';

export default function AnimalData() {
    const { id } = useParams();
    const [animal, setAnimal] = useState({
        nombre: "",
        tipo_animal: "",
        raza: "",
        edad: "",
        genero: "",
        descripcion: "",
    });

    const [successMessage, setSuccessMessage] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnimal = async () => {
            const response = await fetch(process.env.BACKEND_URL + "/api/animal/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setAnimal({
                nombre: data.nombre,
                tipo_animal: data.tipo_animal,
                raza: data.raza,
                edad: data.edad,
                genero: data.genero,
                descripcion: data.descripcion,
            });
        };

        fetchAnimal();
    }, [id, token]);

    const handleInputChange = (e) => {
        setAnimal({ ...animal, [e.target.name]: e.target.value });
    };

    const updateAnimal = async (e) => {
        e.preventDefault();
        const response = await fetch(process.env.BACKEND_URL + "/api/animal/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(animal),
        });
        const data = await response.json();
        console.log(data);
        setSuccessMessage(true);
        setTimeout(() => {
            navigate("/asociacion");
        }, 2000);
    };

    return (
        <>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    El animal ha sido modificado exitosamente
                </div>
            )}
            {animal.nombre ? (
                <div>
                    
                    <div className="container">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-lg-12 col-xl-11">
                                    <div className="card shadow" style={{ borderRadius: 25, backgroundColor: "transparent" }}>
                                        <div className="card-body p-md-5">
                                            <div className="row justify-content-center">
                                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                                    <p className="text-center h1 mb-5 mx-1 mx-md-4 mt-4">
                                                    Modificar los datos del Animal
                                                    </p>
                                                    <form className="mx-1 mx-md-4" onSubmit={updateAnimal}>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-paw fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                                                            <div className="form-outline flex-fill mb-0">
                                                                <label htmlFor="nombre">Nombre</label>
                                                                <input
                                                                    type="text"
                                                                    id="nombre"
                                                                    name="nombre"
                                                                    className="form-control"
                                                                    value={animal.nombre}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-dog fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                                                            <div className="form-outline flex-fill mb-0">
                                                                <label htmlFor="tipo_animal">Tipo de animal</label>
                                                                <select
                                                                    type="text"
                                                                    id="tipo_animal"
                                                                    name="tipo_animal"
                                                                    className="form-select" aria-label="Default select example"
                                                                    value={animal.tipo_animal}
                                                                    onChange={handleInputChange}

                                                                ><option value=''>Seleccione un tipo de animal</option>
                                                                    <option value='Perro'>Perro</option>
                                                                    <option value='Gato'>Gato</option></select>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-cat fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                                                            <div className="form-outline flex-fill mb-0">
                                                                <label htmlFor="raza">Raza</label>
                                                                <input
                                                                    type="text"
                                                                    id="raza"
                                                                    name="raza"
                                                                    className="form-control"
                                                                    value={animal.raza}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-calendar-days fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                                                            <div className="form-outline flex-fill mb-0">
                                                                <label htmlFor="edad">Edad</label>
                                                                <input
                                                                    type="text"
                                                                    id="edad"
                                                                    name="edad"
                                                                    className="form-control"
                                                                    value={animal.edad}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-venus-mars fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                                                            <div className="form-outline flex-fill mb-0">
                                                                <label htmlFor="genero">Género</label>
                                                                <select
                                                                    type="text"
                                                                    id="genero"
                                                                    name="genero"
                                                                    className="form-select" aria-label="Default select example"
                                                                    value={animal.genero}
                                                                    onChange={handleInputChange}

                                                                >
                                                                    <option value=''>Seleccione el género</option>
                                                                    <option value='Macho'>Macho</option>
                                                                    <option value='Hembra'>Hembra</option>
                                                                </select>

                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-info fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                                                            <div className="form-outline flex-fill mb-0">
                                                                <label htmlFor="descripcion">Descripción</label>
                                                                <textarea
                                                                    type="text"
                                                                    id="descripcion"
                                                                    name="descripcion"
                                                                    className="form-control"
                                                                    value={animal.descripcion}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                            <button className="btn btn-lg btn-block shadow-sm" type="submit" style={{ backgroundColor: "#ff914d" }}>
                                                                Guardar cambios
                                                            </button>
                                                        </div>
                                                    </form>

                                                    <Link to="/asociacion" className="text-muted" style={{ textDecoration: "none" }}>Volver Atrás</Link>
                                                </div>
                                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                                    <img
                                                        src={editImg}
                                                        className="img-fluid"
                                                        alt="Sample image"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Cargando...</h1>
                </div>
            )}

        </>
    );
}
