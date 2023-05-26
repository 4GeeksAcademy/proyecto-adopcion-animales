import React, { useState } from "react";

export default function AnimalForm() {
  const initialForm = {
    nombre: "",
    raza: "",
    edad: "",
    genero: "",
    descripcion: "",
  };
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newError = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if (!form.nombre.trim()) {
      newError.nombre = "El campo nombre es requerido";
    } else if (!regexName.test(form.nombre.trim())) {
      newError.nombre =
        "El campo 'Nombre' sólo acepta letras y espacios en blanco";
    }
    if (!form.raza.trim()) {
      newError.raza = "El campo raza es requerido";
    } else if (!regexName.test(form.raza.trim())) {
      newError.raza = "El campo 'Raza' sólo acepta letras y espacios en blanco";
    }
    if (!form.edad.trim()) {
      newError.edad = "El campo edad es requerido";
    }
    if (!form.genero.trim()) {
      newError.genero = "El campo genero es requerido";
    }
    
  };

  return (
    <div>
      <h1>Formulario de registro de mascotas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
          {errors.nombre && <p className="danger">{errors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="raza">Raza:</label>
          <input
            type="text"
            id="raza"
            value={form.raza}
            onChange={(e) => setForm({ ...form, raza: e.target.value })}
            required
          />
          {errors.raza && <p className="danger">{errors.raza}</p>}
        </div>
        <div>
          <label htmlFor="edad">Edad:</label>
          <input
            type="number"
            id="edad"
            value={form.edad}
            onChange={(e) => setForm({ ...form, edad: e.target.value })}
            required
          />
          {errors.edad && <p className="danger">{errors.edad}</p>}
        </div>
        <div>
          <span>Género</span>
          <div>
            <label>
              <input
                type="radio"
                name="genero"
                value="macho"
                checked={form.genero === "macho"}
                onChange={(e) => setForm({ ...form, genero: e.target.value })}
              />
              Macho
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="genero"
                value="hembra"
                checked={form.genero === "hembra"}
                onChange={(e) => setForm({ ...form, genero: e.target.value })}
              />
              Hembra
            </label>
          </div>
          {errors.genero && <p className="danger">{errors.genero}</p>}
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}
