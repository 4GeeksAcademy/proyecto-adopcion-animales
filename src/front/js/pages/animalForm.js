
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsSubmitted(true);

  };
  let styles = {
    fontWeight: "bold",
    color: "#dc3545",
  };

  return (
    <>
      {isSubmitted && (
        <div className="alert alert-success" role="alert">
          Animal registrado con exito
        </div>
      )}
      <div className="container">
        <div className="container h-100">
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
                          <select
                            id="tipo_animal"
                            value={form.tipo_animal}
                            onChange={(e) => setForm({ ...form, tipo_animal: e.target.value })}
                            required
                            className="form-select" aria-label="Default select example"
                          >
                            <option selected>Seleccione un tipo de animal</option>
                            <option value="Perro">Perro</option>
                            <option value="Gato">Gato</option>
                          </select>
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
                  </div>
      
    </>
  );
}


{/* <div className="container">
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className={`${handleColor()} card text-black shadow`} style={{ borderRadius: 25 }}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className={`${handleColor()} text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4`}>
                  Registro de mascota
                </p>
                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw" />
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
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                    <input
                            type="text"
                            id="raza"
                            value={form.raza}
                            onChange={(e) => setForm({ ...form, raza: e.target.value })}
                            required
                          />
                          {errors.raza && <p style={styles}>{errors.raza}</p>}
                        </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fa-solid fa-location-dot fa-lg me-3 fa-fw" />
                    <div className="form-input flex-fill mb-0">
                    <select
                            id="tipo_animal"
                            value={form.tipo_animal}
                            onChange={(e) => setForm({ ...form, tipo_animal: e.target.value })}
                            required
                            className="form-select" aria-label="Default select example"
                          >
                            <option selected>Seleccione un tipo de animal</option>
                            <option value="Perro">Perro</option>
                            <option value="Gato">Gato</option>
                          </select>
                          {errors.tipo_animal && <p style={styles}>{errors.tipo_animal}</p>}
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
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
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
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
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                    <label htmlFor="descripcion">Descripción:</label>
                          <textarea
                            id="descripcion"
                            value={form.descripcion}
                            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                          />
                    </div>
                  </div>
                  <p className={`${handleColor()} text-center  mb-5`}>Have already an account? <a href="/loginAsociacion"
                    className={`${handleColor()} fw-bold text-body`}><u>Login here</u></a></p>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-dark btn-lg btn-block">
                      Registrarse
                    </button>
                  </div>
                </form>
                <Link to="/asociacion">Volver Atras</Link>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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
</div>

 */}
