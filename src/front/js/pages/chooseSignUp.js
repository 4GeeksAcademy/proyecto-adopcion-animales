import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import loginImg from '../../../front/img/Regístrate.png';
import "../../styles/component.css"

export default function ChooseSignUp() {
    const { store, actions } = useContext(Context);

    const handleColor = () => {
        if (store.darkMode) {
            return "dark"
        } else
            return "light"
    }

    return (
        <div className='container my-1 justify-content-center vh-100'>
            <div className="container justify-content-center mb-5">
                <img src={loginImg} className="img" id="loginImagen" style={{ maxWidth: "600px", maxHeight: "200px", display: "block", margin: "0 auto" }} />
            </div>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-sm-6">
                        <div className="card border border-1 shadow-sm mt-2" style={{ backgroundColor: "transparent" }}>
                            <div className='card-body text-center'>
                                <h2 className="card-title">¿Soy un Usuario?</h2>
                                <p className="card-text">
                                    ¡Regístrate como usuario y encuentra a tu compañero perfecto!
                                </p>
                                <Link to="/signup">
                                    <button type="button" className="btn btn-lg shadow-sm mt-2" style={{ backgroundColor: "#ff914d", textDecoration: "none", color: "black" }}>Regístrate</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card border border-1 shadow-sm mt-2" style={{ backgroundColor: "transparent" }}>
                            <div className='card-body text-center'>
                                <h2 className="card-title">¿Soy una Asociación?</h2>
                                <p className="card-text">
                                    ¡Registra tu asociación y ayúdanos a cuidar a los animales!
                                </p>
                                <Link to="/signup2">
                                    <button type="button" className="btn btn-lg shadow-sm mt-2" style={{ backgroundColor: "#ff914d", textDecoration: "none", color: "black" }}>Regístrate</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


