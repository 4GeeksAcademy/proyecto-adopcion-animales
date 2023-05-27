
import React from "react";
import { Link } from "react-router-dom";


export default function ChooseSignUp() {

    return (
        <div>
            <h1>Elige el tipo de registro</h1>
            <div>
                <h2>Usuario</h2>

                <Link to="/signup">
                    <button>Registrarse</button>
                </Link>
            </div>
            <div>
                <h2>Asociación</h2>
                <Link to="/signup2">
                    <button>Registrarse</button>
                </Link>
            </div>
        </div>
    )
}