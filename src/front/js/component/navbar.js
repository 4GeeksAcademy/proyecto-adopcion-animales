

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/component.css"

export const Navbar = () => {
	const [tokenExists, setTokenExists] = useState(false);
	const navigate = useNavigate();

	const { store, actions } = React.useContext(Context);

	const handleToggleDarkMode = () => {
		actions.toggleDarkMode();
	};

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			setTokenExists(true);
		} else {
			setTokenExists(false);
		}
	});
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
		setTokenExists(false);
	};

	const handleColor = () => {
		if (store.darkMode) {
			return "navbar"
		} else {
			return "navbar-light"
		}
	}


	return (
		<nav className="navbar navbar-expand-lg navbar-light" id="navbar">
			<div className="container-fluid" >
				<Link to='/' className="navbar-brand">
					<span className="navbar-brand mb-0 h1">Appatitas</span>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<button onClick={handleToggleDarkMode}>
					{store.darkMode ? "Modo Claro" : "Modo Oscuro"}
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
					{!tokenExists && (
						<div className="navbar-nav">
							<Link to="/chooselogin">
								<button className="btn btn-light m-1">Iniciar Sesión</button>
							</Link>
							<Link to="/choosesignup">
								<button className="btn btn-light m-1">Registrarse</button>
							</Link>
						</div>
					)}
					{tokenExists && (
						<div className="navbar-nav">
							<Link to="/">
								<button onClick={handleLogout} className="btn btn-light m-1">Cerrar Sesión</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};