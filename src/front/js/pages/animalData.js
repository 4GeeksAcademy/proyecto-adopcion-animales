import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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

    const token = localStorage.getItem("token");

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
    };

    return (
        <>
            {animal.nombre ? (
                <div>
                    <h1>Modificar los datos del Animal</h1>
                    <form onSubmit={updateAnimal}>
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={animal.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="tipo_animal">Tipo de animal</label>
                            <input
                                type="text"
                                id="tipo_animal"
                                name="tipo_animal"
                                value={animal.tipo_animal}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="raza">Raza</label>
                            <input
                                type="text"
                                id="raza"
                                name="raza"
                                value={animal.raza}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="edad">Edad</label>
                            <input
                                type="text"
                                id="edad"
                                name="edad"
                                value={animal.edad}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="genero">Género</label>
                            <input
                                type="text"
                                id="genero"
                                name="genero"
                                value={animal.genero}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="descripcion">Descripción</label>
                            <textarea
                                type="text"
                                id="descripcion"
                                name="descripcion"
                                value={animal.descripcion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Guardar cambios</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>Cargando...</h1>
                </div>
            )}
            <Link to="/asociacion">Volver Atras</Link>
        </>
    );
}