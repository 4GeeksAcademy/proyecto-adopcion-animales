
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import CardAsociacion from "../component/cardAsociacion";

// export default function Asociacion() {
//     const [animals, setAnimals] = useState([])

//     const token = localStorage.getItem("token");

//     const fetchAnimal = async (e) => {
//         const response = await fetch(process.env.BACKEND_URL + "/api/animal", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         const data = await response.json();
//         setAnimals(data);
//         console.log(data);
//     };
//     useEffect(() => {
//         fetchAnimal()
//     }, [])

//     return (
//         <>
//             <div>
//                 <h1>Recuperando todos los animales de la Asociación que hizo login</h1>
//                 <Link to="/animalForm">
//                     <button className="btn btn-primary">Añadir animal</button>
//                 </Link>
//                 {animals.map((animal) => {
//                     return (
//                         <CardAsociacion key={animal.id} animal={animal} />
//                     )
//                 })}
//             </div>
//         </>
//     )
// }





import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Asociacion() {
    const [animals, setAnimals] = useState(null);

    const token = localStorage.getItem("token");

    const fetchAnimal = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/animal", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setAnimals(data);
        console.log(data);
    };

    const deleteAnimal = async (animal) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/animal/" + animal.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log(data);
        fetchAnimal();
    };

    useEffect(() => {
        fetchAnimal();
    }, []);

    return (
        <>
            <div>
                <h1>Recuperando todos los animales de la Asociación que hizo login</h1>
                <Link to="/animalForm">
                    <button className="btn btn-primary">Añadir animal</button>
                </Link>
                {animals !== null && animals.length > 0 ? (
                    animals.map((animal) => {
                        return (
                            <div key={animal.id}>
                                <h2>{animal.nombre}</h2>
                                <img src={animal.image_url} alt={animal.nombre} />
                                <ul>
                                    <li>Animal: {animal.tipo_animal}</li>
                                    <li>Raza: {animal.raza}</li>
                                    <li>Edad: {animal.edad}</li>
                                    <li>Género: {animal.genero}</li>
                                    <li>Descripción: {animal.descripcion}</li>
                                </ul>
                                <Link to={`animalData${animal.id}`}>
                                    <button className="btn btn-primary">Editar</button>
                                </Link>
                                <button className="btn btn-danger" onClick={() => deleteAnimal(animal)}>Eliminar</button>
                            </div>
                        )
                    })
                ) : (
                    <h1>No hay animales</h1>
                )}
            </div>
        </>
    )
}
