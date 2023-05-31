

import React from "react";
import { Link } from "react-router-dom";


export default function ChooseSignUp() {

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <div>
                <h2>Usuario</h2>
                <Link to="/loginUsuario">
                    <button>Usuario</button>
                </Link>
            </div>
            <div>
                <h2>Asociación</h2>
                <Link to="/loginAsociacion">
                    <button>Login</button>
                </Link>
            </div>
        </div>
    )
}