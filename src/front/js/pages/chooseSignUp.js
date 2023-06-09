import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export default function ChooseSignUp() {
    const { store, actions } = useContext(Context);

    const handleColor = () => {
        if (store.darkMode) {
            return "dark"
        } else
            return "light"
    }

    return (
        <div className={`${store.darkMode ? "dark-mode" : ""} container my-5`}>
            <h1 className="text-center">Elige el tipo de registro</h1>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className={`${handleColor()} card-body`}>
                            <h2 className="card-title">Usuario</h2>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <Link to="/signup">
                                <button className="btn btn-primary">Registrarse</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className={`${handleColor()} card-body`}>
                            <h2 className="card-title">Asociación</h2>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <Link to="/signup2">
                                <button className="btn btn-primary">Registrarse</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


