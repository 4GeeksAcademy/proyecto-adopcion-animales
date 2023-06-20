import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import hogarImg from '../../../front/img/hogarLogo.png';

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
        <div className="container">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card shadow" style={{ borderRadius: 25, backgroundColor: "transparent" }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 mb-5 mx-1 mx-md-4 mt-4">
                          Registro de Mascotas
                        </p>
                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-paw fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="nombre"
                                placeholder="Nombre"
                                className="form-control"
                                value={form.nombre}
                                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                required
                              />
                              {errors.nombre && <p style={styles}>{errors.nombre}</p>}
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-dog fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                            <div className="form-outline flex-fill mb-0">
                              <select
                                name='tipo_animal'
                                id='tipo_animal'
                                value={form.tipo_animal}
                                className="form-select" aria-label="Default select example"
                                onChange={(e) =>
                                  setForm({ ...form, tipo_animal: e.target.value })
                                }
                                required>
                                <option value=''>Seleccione un tipo de animal</option>
                                <option value='Perro'>Perro</option>
                                <option value='Gato'>Gato</option>
                              </select>
                              {errors.tipo_animal && <p style={styles}>{errors.tipo_animal}</p>}
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-cat fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="raza"
                                placeholder="Raza"
                                className="form-control"
                                value={form.raza}
                                onChange={(e) => setForm({ ...form, raza: e.target.value })}
                                required
                              />
                              {errors.raza && <p style={styles}>{errors.raza}</p>}
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-calendar-days fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="number"
                                id="edad"
                                placeholder="Edad"
                                className="form-control"
                                value={form.edad}
                                onChange={(e) => setForm({ ...form, edad: e.target.value })}
                                required
                              />
                              {errors.edad && <p style={styles}>{errors.edad}</p>}
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4 ">
                            <i className="fas fa-venus-mars fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                            <div className="form-check">
                              <label>
                                <input
                                  type="radio"
                                  name="genero"
                                  value="Macho"
                                  className="form-check-input"
                                  checked={form.genero === "Macho"}
                                  onChange={(e) => setForm({ ...form, genero: e.target.value })}
                                />
                                Macho  
                              </label>
                            </div>
                            <div className="form-check">
                            <label>
                              <input
                                type="radio"
                                name="genero"
                                value="Hembra"
                                className="form-check-input"
                                checked={form.genero === "Hembra"}
                                onChange={(e) => setForm({ ...form, genero: e.target.value })}
                              />
                              Hembra
                            </label>
                            </div>
                            {errors.genero && <p className="danger">{errors.genero}</p>}
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-info fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                            <div className="form-outline flex-fill mb-0">
                              <textarea
                                id="descripcion"
                                value={form.descripcion}
                                placeholder="Descripción"
                                className="form-control"
                                onChange={(e) =>
                                  setForm({ ...form, descripcion: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-camera fa-lg me-3 fa-fw" style={{ color: "#a96d60" }} />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="file"
                                id="imagen"
                                className="form-control"
                                onChange={handleImageChange}
                                accept="image/*"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button className="btn btn-lg btn-block shadow-sm" type="submit" style={{ backgroundColor: "#ff914d" }}>
                                Registrar animal
                              </button>
                            </div>
                          </div>
                        </form>
                        <Link to="/asociacion" className="text-muted" style={{ textDecoration: "none" }}>Volver Atrás</Link>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src={hogarImg}
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >
      </div >
    </>
  );
};

export default AnimalForm;
