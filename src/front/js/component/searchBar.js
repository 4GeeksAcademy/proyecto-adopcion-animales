import React, { useState } from 'react';

export const SearchBar = () => {
  const [animal, setAnimal] = useState('');
  const [provincia, setProvincia] = useState('');

  const handleAnimalChange = (event) => {
    setAnimal(event.target.value);
  };

  const handleProvinciaChange = (event) => {
    setProvincia(event.target.value);
  };

  const handleSearch = () => {
    console.log('Animal seleccionado:', animal);
    console.log('Provincia seleccionada:', provincia);
  };

  return (
    <form>
      <div className='row m-5 bg-dark'>
        <div className='col-4 m-3'>
            <h5 className='text-light'>Mira nuestros animales!</h5>
          <select className="form-select" aria-label="Seleccionar animal" value={animal} onChange={handleAnimalChange}>
            <option value="">Animales...</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className='col-4 m-3'>
        <h5 className='text-light'>Localizacion</h5>
          <select className="form-select" aria-label="Seleccionar provincia" value={provincia} onChange={handleProvinciaChange}>
            <option value="">Provincia...</option>
            <option value="Provincia 1">Provincia 1</option>
            <option value="Provincia 2">Provincia 2</option>
            <option value="Provincia 3">Provincia 3</option>
          </select>
        </div>
        <div className='col-2'>
          <button type="button" className="btn btn-primary" onClick={handleSearch} >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
};
