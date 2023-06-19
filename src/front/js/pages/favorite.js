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

    return (
        <>
            <Link to="/usuario">Volver Atras</Link>
            {showMessage && (
                <div className="alert alert-success" role="alert">
                    Animal eliminado de favoritos
                </div>
            )}
            <div className='container-fav row'>
                {store.favorites.map((fav, index) => (
                    <div key={index} className='col-3'>
                        <h2>Nombre: {fav.animal.nombre}</h2>
                        <h3>Nombre de la Asociación: {fav.animal.asociacion_nombre}</h3>
                        <img src={fav.animal.animal_image} alt={fav.animal.nombre} />
                        <ul>
                            <li>Raza: {fav.animal.raza}</li>
                            <li>Edad: {fav.animal.edad} años</li>
                            <li>Género: {fav.animal.genero}</li>
                            <li>Provincia: {fav.animal.asociacion_provincia}</li>
                            <li>Descripción: {fav.animal.descripcion}</li>
                        </ul>

                        <button onClick={() => actions.selectId(fav)}>Agregar</button>
                        <button
                            className='btn btn-danger'
                            onClick={() => {
                                const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este animal de tus favoritos?');
                                if (confirmDelete) {
                                    actions.removeFavorite(fav.id);
                                    setShowMessage(true);
                                    setTimeout(() => {
                                        navigate('/usuario')
                                    }, 2000);
                                }
                            }}
                        >
                            Delete fav: <BsFillTrash3Fill />
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Favorite


