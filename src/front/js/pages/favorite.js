import React, { useContext, useEffect } from 'react'
import { Context } from "../store/appContext";
import { BsFillTrash3Fill } from 'react-icons/bs';
import Card from "../component/cardUsuario";


const Favorite = () => {

    const { store, actions } = useContext(Context);


    useEffect(() => {
        actions.fetchUserFavorite();
    }, []);


    console.log(store.idAnimal, 'soy el ID del animal');

    return (
        <div className='container-fav row'>
            {store.favorites.map((fav, index) => (
                <div key={index} className='col-3'>
                    <h2>Nombre: {fav.animal.nombre}</h2>
                    <h3>Nombre de la Asociación: {fav.animal.asociacion_nombre}</h3>
                    <img src={fav.animal.image_url} alt={fav.animal.nombre} />
                    <ul>
                        <li>Raza: {fav.animal.raza}</li>
                        <li>Edad: {fav.animal.edad}</li>
                        <li>Género: {fav.animal.genero}</li>
                        <li>Provincia: {fav.animal.asociacion_provincia}</li>
                        <li>Descripción: {fav.animal.descripcion}</li>
                    </ul>

                    <button onClick={()=>actions.selectId(fav)}>Agregar</button>
                    <button className='btn btn-danger' onClick={() => actions.removeFavorite(fav.id)}>Delete fav: <BsFillTrash3Fill />
                    </button>
                </div>




            ))}
        </div>

    )
}

export default Favorite


