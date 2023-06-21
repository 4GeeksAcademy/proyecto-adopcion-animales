import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { BsFillTrash3Fill } from 'react-icons/bs';
import Card from "../component/cardUsuario";


const Favorite = () => {

    const { store, actions } = useContext(Context);
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        actions.fetchUserFavorite();
    }, []);


    console.log(store.idAnimal, 'soy el ID del animal');

    const handleRemoveFavorite = (id) => {
        const confirmed = window.confirm('¿Estás seguro que deseas eliminar al animal de favoritos?');
        if (confirmed) {
            actions.removeFavorite(id);
        }
    };

    return (
        <>

            <div className='container mt-4'>
                <Link to="/usuario"><button className='btn btn-lg' style={{ backgroundColor: "#ff914d" }}>Volver Atrás</button></Link>
                <div className='row g-3 pt-3'>
                    {store.favorites.map((fav, index) => (
                        <div key={index} className='col-12 col-md-6 col-lg-4'>
                            <div className='card border border-2 shadow' style={{ background: "transparent" }}>
                                <div className='text-center'>
                                    <img
                                        src={fav.animal.animal_image}
                                        className='card-img-top '
                                        alt={fav.animal.nombre}
                                        style={{ maxWidth: '250px', maxHeight: '250px' }}
                                    />
                                </div>
                                <div className='card-body'>
                                    <h2 className='card-title' style={{ color: "#ff914d" }}> {fav.animal.nombre}</h2>
                                    <p className='card-text'><i
                                        className="fa-solid fa-house fa-lg fa-fw me-1" style={{ color: "#ff914d" }}
                                    />{fav.animal.asociacion_nombre}</p>
                                    <p className='card-text'><i className="fa-solid fa-location-dot fa-lg fa-fw" style={{ color: "#ff914d" }} /> {fav.animal.asociacion_provincia}</p>
                                    {/* <button onClick={() => actions.selectId(fav)}>Agregar</button> */}
                                    <div className='d-flex justify-content-start'>
                                        <button className='btn btn-lg' style={{ backgroundColor: "#a96d60", color: "white" }} onClick={() => handleRemoveFavorite(fav.id)}>
                                            <i className="fa-solid fa-trash" ></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Favorite


