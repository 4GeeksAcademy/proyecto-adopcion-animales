import React from "react";
import juan from "../../img/equipo/juan.jpg";
import jonathan from "../../img/equipo/jonathan.jpg";
import miguelinho from "../../img/equipo/miguelinho.jpg";

export const About = (props) => {
  return (
    <div className="jumbotron">
      <div className="container">
        <div className="row">
          <div className="col-md-12 pt-5 pb-2 ourTeam-hedding text-center">
            <h1>Equipo APPATITAS</h1>
            <br />
            <p>
              Nuestro equipo en <strong>APPATITAS</strong> está formado por individuos <strong>apasionados</strong> y <strong>comprometidos</strong> con el bienestar animal. Desde expertos en tecnología hasta amantes de los animales, cada miembro aporta habilidades únicas para crear una experiencia excepcional en nuestro sitio web de adopción. Trabajamos juntos para conectar a los animales necesitados con hogares amorosos y brindar un seguimiento continuo para garantizar que cada adopción sea un éxito.
            </p>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="row section-success ourTeam-box text-center">
              <div className="col-md-12 section1">
                <img src={juan} style={{ objectFit: "cover", height: "500px", width: "100%" }} />
              </div>
              <div className="col-md-12 section2 pb-3 pt-4">
                <h3>Juan Silva</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="row section-info ourTeam-box text-center">
              <div className="col-md-12 section1">
                <img src={jonathan} style={{ objectFit: "cover", height: "500px", width: "100%" }} />
              </div>
              <div className="col-md-12 section2 pb-3 pt-4">
                <h3>Jonathan Gutiérrez</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="row section-info ourTeam-box text-center">
              <div className="col-md-12 section1">
                <img src={miguelinho} style={{ objectFit: "cover", height: "500px", width: "100%" }} />
              </div>
              <div className="col-md-12 section2 pb-3 pt-4">
                <h3>Miguel Ramirez</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="row section-danger ourTeam-box text-center">
              <div className="col-md-12 section1">
                <img
                  src="#"
                  style={{ objectFit: "cover", height: "500px", width: "100%" }}
                />
              </div>
              <div className="col-md-12 section2 pb-3 pt-4">
                <h3>Jose Verdugo</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
