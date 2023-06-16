
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AnimalForm() {
  const initialForm = {
    nombre: "",
    tipo_animal: "",
    raza: "",
    edad: "",
    genero: "",
    descripcion: "",
  };
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");


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
    if (!form.tipo_animal.trim()) {
      newError.tipo_animal = "El campo tipo de animal es requerido";
    } else if (!regexName.test(form.tipo_animal.trim())) {
      newError.tipo_animal =
        "El campo tipo de animal sólo acepta letras y espacios en blanco";
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
    if (Object.keys(newError).length === 0) {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/api/animal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        const data = await response.json();
        console.log(data);

      } catch (error) {
        console.log(error);
      }
    }
    setErrors(newError);
    setForm({ ...initialForm });
    setSuccessMessage(true);

    setTimeout(() => {
      navigate("/asociacion");
    }, 2000); // Retraso de 2 segundos para redirigir a la página de inicio

  };
  let styles = {
    fontWeight: "bold",
    color: "#dc3545",
  };

  return (
    <>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          El animal ha sido registrado exitosamente
        </div>
      )}
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
            {errors.nombre && <p style={styles}>{errors.nombre}</p>}
          </div>
          <div>
            <label htmlFor="tipo_animal">Tipo de Animal:</label>
            <input
              type="text"
              id="tipo_animal"
              value={form.tipo_animal}
              onChange={(e) => setForm({ ...form, tipo_animal: e.target.value })}
              required
            />
            {errors.tipo_animal && <p style={styles}>{errors.tipo_animal}</p>}
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
            {errors.raza && <p style={styles}>{errors.raza}</p>}
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
            {errors.edad && <p style={styles}>{errors.edad}</p>}
          </div>
          <div>
            <span>Género</span>
            <div>
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="Macho"
                  checked={form.genero === "Macho"}
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
                  value="Hembra"
                  checked={form.genero === "Hembra"}
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
        <Link to="/asociacion">Volver Atras</Link>
      </div>
    </>
  );
}





