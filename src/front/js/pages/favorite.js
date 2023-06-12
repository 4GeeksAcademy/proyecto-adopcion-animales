import React, { useContext, useEffect } from 'react'
import { Context } from "../store/appContext";
import{ BsFillTrash3Fill } from 'react-icons/bs';
import Card from "../component/cardUsuario";


const Favorite = () => {

    const { store, actions } = useContext(Context);

    const fetchUserFavorites = () => {
        fetch(process.env.BACKEND_URL + "/user/favorites", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => response.json())
        .then((result) => {
            actions.setFavorites(result);
            console.log(result);
        })
        .catch((error) => console.log("Error", error));
    }

    useEffect(() => {
        fetchUserFavorites();
    }, []);
      

    console.log(store.favorites);

    return (
        <div className='container-fav'>
            {store.favorites.map((fav, index) => (
            <div>
                <h1>Jona</h1>
            <Card key={index} animal={fav} />
                
            <button className='btn btn-danger' onClick={() => actions.removeFavorite(fav)}>Delete fav: <BsFillTrash3Fill />
            </button>
            </div>




            ))}
        </div>

    )
}

export default Favorite


