

import React from "react";
import { Link } from "react-router-dom";


export default function ChooseSignUp() {

    return (
        <div className="container my-5">
            <h1 className="text-center">Iniciar sesion</h1>
        <div className="row">
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Usuario</h2>
                        <p className="card-text">
                            With supporting text below as a natural lead-in to additional content.
                        </p>
                        <Link to="/loginUsuario">
                            <button className="btn btn-primary">Login</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Asociación</h2>
                        <p className="card-text">
                            With supporting text below as a natural lead-in to additional content.
                        </p>
                        <Link to="/loginAsociacion">
                            <button className="btn btn-primary">Login</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

