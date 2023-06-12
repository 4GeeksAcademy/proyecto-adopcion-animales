import React, { useState, useEffect, useContext } from 'react';
import FilterAnimalHome from '../component/filterAnimalHome';

export const SearchBar = () => {


  const [animals, setAnimals] = useState([]);
  const [filtros, setFiltros] = useState({
    provincia: '',
    tipo_animal: '',
  });

  const fetchAnimals = async () => {
    const response = await fetch(process.env.BACKEND_URL + '/api/animal_public', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();
    setAnimals(data);
    console.log(data);
  };
  useEffect(() => {
    fetchAnimals();
  }, []);

  return (
    <>
      <form>
        <label htmlFor='provincia'>Provincia: </label>
        <select
          onChange={(e) =>
            setFiltros({ ...filtros, provincia: e.target.value })
          }
          name='provincia'
          id='provincia'>
          <option value="">Selecciona una provincia</option>
          <option value="A Coruña">A Coruña</option>
          <option value="Álava">Álava</option>
          <option value="Albacete">Albacete</option>
          <option value="Alicante">Alicante</option>
          <option value="Almería">Almería</option>
          <option value="Asturias">Asturias</option>
          <option value="Ávila">Ávila</option>
          <option value="Badajoz">Badajoz</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Burgos">Burgos</option>
          <option value="Cáceres">Cáceres</option>
          <option value="Cádiz">Cádiz</option>
          <option value="Cantabria">Cantabria</option>
          <option value="Castellón">Castellón</option>
          <option value="Ciudad Real">Ciudad Real</option>
          <option value="Córdoba">Córdoba</option>
          <option value="Cuenca">Cuenca</option>
          <option value="Girona">Girona</option>
          <option value="Granada">Granada</option>
          <option value="Guadalajara">Guadalajara</option>
          <option value="Gipuzkoa">Gipuzkoa</option>
          <option value="Huelva">Huelva</option>
          <option value="Huesca">Huesca</option>
          <option value="Jaén">Jaén</option>
          <option value="La Rioja">La Rioja</option>
          <option value="Las Palmas">Las Palmas</option>
          <option value="León">León</option>
          <option value="Lleida">Lleida</option>
          <option value="Lugo">Lugo</option>
          <option value="Madrid">Madrid</option>
          <option value="Málaga">Málaga</option>
          <option value="Murcia">Murcia</option>
          <option value="Navarra">Navarra</option>
          <option value="Ourense">Ourense</option>
          <option value="Palencia">Palencia</option>
          <option value="Pontevedra">Pontevedra</option>
          <option value="Salamanca">Salamanca</option>
          <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
          <option value="Segovia">Segovia</option>
          <option value="Sevilla">Sevilla</option>
          <option value="Soria">Soria</option>
          <option value="Tarragona">Tarragona</option>
          <option value="Teruel">Teruel</option>
          <option value="Toledo">Toledo</option>
          <option value="Valencia">Valencia</option>
          <option value="Valladolid">Valladolid</option>
          <option value="Vizcaya">Vizcaya</option>
          <option value="Zamora">Zamora</option>
          <option value="Zaragoza">Zaragoza</option>
        </select>
        <label htmlFor='tipo_animal'>Tipo de Animal: </label>
        <select
          onChange={(e) => setFiltros({ ...filtros, tipo_animal: e.target.value })}
          name='tipo_animal'
          id='tipo_animal'>
          <option value=''>Seleccione un tipo de animal</option>
          <option value='Perro'>Perro</option>
          <option value='Gato'>Gato</option>
        </select>
      </form>
      <div>
        <h2>Estos son los últimos animeles añadidos a la plataforma:</h2>
        <FilterAnimalHome animals={animals} filtros={filtros} />
      </div>
    </>
  );
};
