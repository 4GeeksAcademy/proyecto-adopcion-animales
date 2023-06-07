import React, { useState } from "react";

export default function SingUpUsuario() {
  const initialForm = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newError = {};
    let regexNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

    if (!form.nombre.trim()) {
      newError.nombre = "El campo nombre es requerido";
    } else if (!regexNombre.test(form.nombre.trim())) {
      newError.nombre =
        "El campo 'Nombre' sólo acepta letras y espacios en blanco";
    }
    if (!form.apellido.trim()) {
      newError.apellido = "El campo nombre es requerido";
    } else if (!regexNombre.test(form.apellido.trim())) {
      newError.apellido =
        "El campo 'Apellidos' sólo acepta letras y espacios en blanco";
    }
    if (!form.email.trim()) {
      newError.email = "El campo 'Email' es requerido";
    } else if (!regexEmail.test(form.email.trim())) {
      newError.email = "El campo 'Email' es incorrecto";
    }
    if (form.password !== form.passwordConfirmation) {
      newError.password =
        "El campo 'Contraseña' y 'Confirmar contraseña' no coinciden";
    }

    if (Object.keys(newError).length === 0) {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            nombre: form.nombre,
            apellido: form.apellido,
            email: form.email,
            password: form.password,
          }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    setErrors(newError);
    setForm({ ...initialForm });
  };

  let styles = {
    fontWeight: "bold",
    color: "#dc3545",
  };

  return (
    <div className="container">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black shadow" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Registro de Usuariosgi
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
                          {/* <label className="form-label" htmlFor="nombre">
                        Nombre
                      </label> */}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="lastnombre"
                            placeholder="Apellidos"
                            className="form-control"
                            value={form.apellido}
                            onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                            required
                          />
                          {errors.apellido && <p style={styles}>{errors.apellido}</p>}
                          {/* <label className="form-label" htmlFor="nombre">
                        Apellidos
                      </label> */}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="form-control"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                          />
                          {errors.email && <p style={styles}>{errors.email}</p>}
                          {/* <label className="form-label" htmlFor="form3Example3c">
                        Email
                      </label> */}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="password"
                            placeholder="Contraseña"
                            className="form-control"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                          />
                          {/* <label className="form-label" htmlFor="form3Example4c">
                        Contraseña
                      </label> */}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="passwordConfirmation"
                            placeholder="Confirmar contraseña"
                            className="form-control"
                            value={form.passwordConfirmation}
                            onChange={(e) =>
                              setForm({ ...form, passwordConfirmation: e.target.value })
                            }
                            required
                          />
                          {errors.password && <p style={styles}>{errors.password}</p>}
                          {/* <label className="form-label" htmlFor="form3Example4cd">
                      Confirmar Contraseña
                      </label> */}
                        </div>
                      </div>
                      <p className="text-center text-muted mb-5">Have already an account? <a href="/loginUsuario"
                        className="fw-bold text-body"><u>Login here</u></a></p>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Registrarse
                        </button>
                      </div>
                    </form>
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
      </div>
    </div>
  );
}



