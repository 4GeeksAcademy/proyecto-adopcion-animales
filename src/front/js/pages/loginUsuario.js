import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginUsuario() {
  const initialForm = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/login_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        const token = data.token;
        const nombre = data.nombre;
        const id = data.user_id;
        const email = data.email;
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("id", id);
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
        setForm(initialForm);
        setLoginError(false);
        navigate("/usuario");
      } else {
        const errorData = await response.json();
        setLoginError(true);
        console.error(errorData.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError(true);
    }

  };
  let styles = {
    fontWeight: "bold",
    color: "#dc3545",
  };

  return (
    <section className="vh-100" >
      <div className="container py-2 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card shadow" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-3">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        />
                        <span className="h1 fw-bold mb-0">Usuario</span>
                      </div>

                      {loginError && (
                        <p style={styles}>Usuario o contraseña incorrectos</p>
                      )}
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          placeholder="Email"
                          className="form-control form-control-lg"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                        />
                        {/* <label className="form-label" htmlFor="form2Example17">
                            Email address
                          </label> */}
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          placeholder="Contraseña"
                          className="form-control form-control-lg"
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          required
                        />
                        {/* <label className="form-label" htmlFor="form2Example27">
                            Password
                          </label> */}
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                          Iniciar sesión
                        </button>
                      </div>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        ¿No tienes cuenta?{" "}
                        <a href="/signup" style={{ color: "#393f81" }}>
                          Registrate
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

}


