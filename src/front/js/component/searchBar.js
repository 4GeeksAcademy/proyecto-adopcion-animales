import React from 'react';

export const SearchBar = () => {
    return (
        <form>
        <div className='row m-5 bg-dark'>
            <div className='col-4 m-3'>
                <select className="form-select" aria-label="Default select example">
                    <option selected="">Mira nuestros animales!</option>
                    <option value={1}>Perro</option>
                    <option value={2}>Gato</option>
                    <option value={3}>Otro</option>
                </select>
            </div>
            <div className='col-4 m-3'>
                <select className="form-select" aria-label="Default select example">
                    <option selected="">Provincia</option>
                    <option value={1}>Perro</option>
                    <option value={2}>Gato</option>
                    <option value={3}>Otro</option>
                </select>
            </div>
            <div className='col-2'>
                <button type="button" className="btn btn-primary" disabled>Buscar</button>
            </div>
        </div>
        </form>
    );
};