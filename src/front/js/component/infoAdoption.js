import React from "react";
import "../../styles/component.css"
import donarImg from '../../../front/img/donarlogo.png';
import hogarImg from '../../../front/img/hogarLogo.png';
import usuarioImg from '../../../front/img/usuarioLogo.png';

const InfoAdoption = () => {
  return (
    <div className="container marketing" id="infoAdoption" >
      <div className="row">
        <div className="col-lg-4">
        <svg
            className="bd-placeholder-img rounded-circle shadow mb-3"
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: 140x140"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Asociación</title>
            <circle cx="70" cy="70" r="70" fill="none" />
            <image xlinkHref={hogarImg} width="200" height="200" x="0" y="0" />
          </svg>

          <h2>Soy una Asociación</h2>
          <p>
          ¡Inicia sesión y sigue salvando vidas! Únete a nuestra comunidad de asociaciones de animales.
          </p>
          <p>
          <a className="btn btn-lg shadow rounded-pill " href="/loginAsociacion" style={{ backgroundColor: "#a96d60" ,textDecoration: "none", color: "white" }}>
            Iniciar Sesión
            </a>
          </p>
        </div>

        <div className="col-lg-4">
        <svg
            className="bd-placeholder-img rounded-circle shadow mb-3"
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: 140x140"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Usuario</title>
            <circle cx="70" cy="70" r="70" fill="none" />
            <image xlinkHref={usuarioImg} width="200" height="200" x="0" y="0" />
          </svg>

          <h2>Adopta una mascota</h2>
          <p>
          ¡Adopta y salva vidas! Únete a nuestra comunidad de amantes de los animales.
          </p>
          <p>
          <a className="btn btn-lg shadow rounded-pill" href="/loginUsuario" style={{ backgroundColor: "#a96d60" ,textDecoration: "none", color: "white" }}>
          Conecta y adopta
            </a>
          </p>
        </div>

        <div className="col-lg-4">
        <svg
            className="bd-placeholder-img rounded-circle shadow mb-3"
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: 140x140"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Donar</title>
            <circle cx="70" cy="70" r="70" fill="none" />
            <image xlinkHref={donarImg} width="200" height="200" x="0" y="0" />
          </svg>

          <h2>¡Haz una donación!</h2>
          <p>¡Ayuda a los animales hoy! Tu donación marca la diferencia. Juntos, podemos crear un impacto.</p>
          <p>
            <a className="btn btn-lg shadow rounded-pill" href="/donacion" style={{ backgroundColor: "#a96d60" ,textDecoration: "none", color: "white" }}>
            ¡Dona ahora!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoAdoption;