import React from "react";
import "../../styles/component.css"
import loginImg from '../../../front/img/donarlogo.png';

const InfoAdoption = () => {
  return (
    <div className="container marketing" id="infoAdoption" >
      <div className="row">
        <div className="col-lg-4">
          <svg
            className="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: 140x140"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#777" />
            <text x="50%" y="50%" fill="#777" dy=".3em">
              140x140
            </text>
          </svg>

          <h2>Heading</h2>
          <p>
            Some representative placeholder content for the three columns of text below the carousel. This is the
            first column.
          </p>
          <p>
            <a className="btn btn-secondary" href="#">
              View details &raquo;
            </a>
          </p>
        </div>

        <div className="col-lg-4">
          <svg
            className="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: 140x140"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Donar</title>
            <rect width="100%" height="100%" fill="#777" />
            <text x="50%" y="50%" fill="#777" dy=".3em">
              140x140
            </text>
          </svg>

          <h2>Heading</h2>
          <p>
            Another exciting bit of representative placeholder content. This time, we've moved on to the second
            column.
          </p>
          <p>
            <a className="btn btn-secondary" href="#">
              View details &raquo;
            </a>
          </p>
        </div>

        <div className="col-lg-4">
        <svg
            className="bd-placeholder-img rounded-circle shadow"
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
            <image xlinkHref={loginImg} width="200" height="200" x="0" y="0" />
          </svg>

          <h2>¡Haz una donación!</h2>
          <p>¡Ayuda a los animales hoy! Tu donación marca la diferencia. Juntos, podemos crear un impacto positivo en sus vidas.</p>
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