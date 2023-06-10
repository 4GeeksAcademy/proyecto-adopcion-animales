import react, { useContext } from react
import { Context } from "../store/appContext";
import{ BsFillTrash3Fill } from 'react-icons/bs';
import Card from "../component/cardUsuario";


const Favorite = () => {

    const { store, actions } = useContext(Context);

    return (
        <div className='container-fav'>
            {store.favorites.map((fav, index) => (
            <div>
            <Card key={index} animal={fav} />
                /* Pasa el objeto 'fav' como prop 'animal' al componente Card */
            <button className='btn btn-danger' onClick={() => actions.removeFavorite(fav)}>Delete fav: <BsFillTrash3Fill />
            </button>
            </div>




            ))}
        </div>

    )
}

export default Favorite