import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/component.css";

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "dark-mode" : ""}`} id="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <span className="navbar-brand mb-0 h1">No Tenemos Nombre Muchachos</span>
        </a>
        <button
          className={`navbar-toggler ${darkMode ? "dark-mode" : ""}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav text-center">
            <a className="nav-link m-1" aria-current="page" href="#">
              Perros
            </a>
            <a className="nav-link m-1" href="#">
              Gatos
            </a>
            <Link to="/demo">
              <button className={`btn ${darkMode ? "btn-dark" : "btn-light"} m-1`}>Iniciar Sesión</button>
            </Link>
            <Link to="/demo">
              <button className={`btn ${darkMode ? "btn-dark" : "btn-light"} m-1`}>Registrarse</button>
            </Link>
            <button className={`btn ${darkMode ? "btn-dark" : "btn-light"} m-1`} onClick={toggleDarkMode}>
              {darkMode ? (
                <i className="fa-regular fa-sun"></i>
              ) : (
                <i className="fa-regular fa-moon"></i>
              )}
              {darkMode ? "" : ""}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
