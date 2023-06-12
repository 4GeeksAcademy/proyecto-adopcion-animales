import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export default function SignUpAsociacion() {
    const initialForm = {
        nombre: "",
        email: "",
        provincia: "",
        CIF: "",
        password: "",
        passwordConfirmation: "",
    };

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();

    const { store, actions } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newError = {};
        let regexNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        let regexCIF = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;

        if (!form.nombre.trim()) {
            newError.nombre = "El campo nombre es requerido";
        } else if (!regexNombre.test(form.nombre.trim())) {
            newError.nombre =
                "El campo 'Nombre' sólo acepta letras y espacios en blanco";
        }
        if (!form.email.trim()) {
            newError.email = "El campo 'Email' es requerido";
        } else if (!regexEmail.test(form.email.trim())) {
            newError.email = "El campo 'Email' es incorrecto";
        }
        if (!form.provincia.trim()) {
            if (!form.CIF.trim()) {
                newError.CIF = "El campo 'CIF' es requerido";
            } else if (!regexCIF.test(form.CIF.trim())) {
                newError.CIF = "El campo 'CIF' es incorrecto";
            }
            if (form.password !== form.passwordConfirmation) {
                newError.password =
                    "El campo 'Contraseña' y 'Confirmar contraseña' no coinciden";
            }
        }

        if (Object.keys(newError).length === 0) {
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/asociacion", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        nombre: form.nombre,
                        email: form.email,
                        provincia: form.provincia,
                        CIF: form.CIF,
                        password: form.password,
                        // Cambiar los nombres según el back
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
        setIsSubmitted(true);

        setTimeout(() => {
            navigate("/");
        }, 2000); // Retraso de 2 segundos para redirigir a la home
    };


    let styles = {
        fontWeight: "bold",
        color: "#dc3545",
    };

    const handleColor = () => {
        if (store.darkMode) {
            return "dark"
        } else {
            return "light"
        }
    }

    return (
        <>
            {isSubmitted && (
                <div className="alert alert-success" role="alert">
                    Usuario registrado con exito
                </div>
            )}
            <div className="container">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className={`${handleColor()} card text-black shadow`} style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className={`${handleColor()} text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4`}>
                                                Registro de Asociacion
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
                                                        {/* <label className="form-label" htmlFor="name">
                  Nombre
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
                                                    <i className="fa-solid fa-location-dot fa-lg me-3 fa-fw" />
                                                    <div className="form-input flex-fill mb-0">
                                                        <select
                                                            className="form-select" aria-label="Default select example"
                                                            value={form.provincia} onChange={(e) => setForm({ ...form, provincia: e.target.value })}>
                                                            <option selected>Selecciona una provincia</option>
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
                                                        {/* <label className="form-label" htmlFor="form3Example3c">
                  Provincia
                </label> */}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="lastname"
                                                            placeholder="CIF"
                                                            className="form-control"
                                                            value={form.CIF}
                                                            onChange={(e) => setForm({ ...form, CIF: e.target.value })}
                                                            required
                                                        />
                                                        {errors.CIF && <p style={styles}>{errors.CIF}</p>}
                                                        {/* <label className="form-label" htmlFor="name">
                  CIF
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
                                                <p className={`${handleColor()} text-center  mb-5`}>Have already an account? <a href="/loginAsociacion"
                                                    className={`${handleColor()} fw-bold text-body`}><u>Login here</u></a></p>

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
            </div >
        </>
    )
}
