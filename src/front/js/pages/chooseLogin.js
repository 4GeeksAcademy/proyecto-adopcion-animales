
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import loginImg from '../../../front/img/Iniciar sesión.png';
import "../../styles/component.css"

export default function ChooseSignUp() {
    const { store, actions } = useContext(Context);

    const handleColor = () => {
        if (store.darkMode) {
            return "bg-dark"
        } else
            return "bg-light"
    }

    return (
        <div className='container my-1 justify-content-center vh-100'>
            <div className="container justify-content-center mb-5">
                <img src={loginImg} className="img shadow-sm" id="loginImagen" style={{ maxWidth: "600px", maxHeight: "200px", display: "block", margin: "0 auto" }} />
            </div>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-sm-6">
                        <div className="card border border-3 rounded-3 shadow-lg rounded-pill" style={{ backgroundColor: "transparent" }}>
                            <div className='card-body text-center'>
                                <h2 className="card-title">¿Soy un Usuario?</h2>
                                <p className="card-text">
                                    ¡Registrado y listo para adoptar a mi nueva mascota!
                                </p>
                                <Link to="/loginUsuario">
                                    <button type="button" className="btn btn-lg shadow-sm" style={{ backgroundColor: "#ff914d", textDecoration: "none", color: "black" }}>Iniciar Sesión</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card border border-3 rounded-3 shadow-lg rounded-pill" style={{ backgroundColor: "transparent" }}>
                            <div className='card-body text-center'>
                                <h2 className="card-title">¿Soy una Asociación?</h2>
                                <p className="card-text">
                                    ¡Registrada como asociación y lista para ayudar a los animales!
                                </p>
                                <Link to="/loginAsociacion">
                                    <button type="button" className="btn btn-lg shadow-sm" style={{ backgroundColor: "#ff914d", textDecoration: "none", color: "black" }}>Iniciar Sesión</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}