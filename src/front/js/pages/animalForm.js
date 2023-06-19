import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const AnimalForm = () => {
  const { store, actions } = useContext(Context);
  const initialForm = {
    nombre: "",
    tipo_animal: "",
    raza: "",
    edad: "",
    genero: "",
    descripcion: "",
    imagen: null,
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
        const formData = new FormData();
        formData.append("nombre", form.nombre);
        formData.append("tipo_animal", form.tipo_animal);
        formData.append("raza", form.raza);
        formData.append("edad", form.edad);
        formData.append("genero", form.genero);
        formData.append("descripcion", form.descripcion);
        formData.append("imagen", form.imagen);

        const response = await fetch(process.env.BACKEND_URL + "/api/animal", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
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

  const handleImageChange = (e) => {
    setForm({ ...form, imagen: e.target.files[0] });
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
            <span htmlFor="tipo_animal">Tipo de Animal:</span>
            <div>
              <label>
                <input
                  type="radio"
                  name="tipo_animal"
                  value="Gato"
                  checked={form.tipo_animal === "Gato"}
                  onChange={(e) => setForm({ ...form, tipo_animal: e.target.value })}
                />
                Gato
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="tipo_animal"
                  value="Perro"
                  checked={form.tipo_animal === "Perro"}
                  onChange={(e) => setForm({ ...form, tipo_animal: e.target.value })}
                />
                Perro
              </label>
            </div>
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
            <span>Género:</span>
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
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="imagen">Imagen:</label>
            <input
              type="file"
              id="imagen"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>
          <div>
            <button type="submit">Enviar</button>
          </div>
        </form>
        <Link to="/asociacion">Volver Atrás</Link>
      </div>
    </>
  );
};

export default AnimalForm;
