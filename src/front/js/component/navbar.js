

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/component.css"
import logoImg from '../../../front/img/Appatitas-Logo.png';



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
			return "navbar-dark bg-dark"
		} else {
			return "navbar-light"
		}
	}


	return (
		<nav className={`navbar navbar-expand-lg ${handleColor()}`} id="navbar">
			<div className="container-fluid" >
				<Link to='/' className="navbar-brand">
					<span className="navbar-brand mb-0 h1"><img src={logoImg} className="navbar-logo roudend" alt="Logo"></img></span>
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
				<div className="collapse navbar-collapse justify-content-end text-center" id="navbarNavAltMarkup">
					{!tokenExists && (
						<div className="navbar-nav">
							<Link to="/chooselogin">
								<button className="btn m-1" style={{backgroundColor:"#f9e4df"}} >Iniciar Sesión</button>
							</Link>
							<Link to="/choosesignup">
								<button className="btn m-1" style={{backgroundColor:"#f9e4df"}}>Registrarse</button>
							</Link>
						</div>
					)}
					{tokenExists && (
						<div>
							<div className="navbar-nav">
							<Link to="/favorite">
									<button className="btn m-1" style={{backgroundColor:"#f9e4df"}}>Mis Favoritos</button>
								</Link>
								<Link to="/">
									<button onClick={handleLogout} className="btn m-1" style={{backgroundColor:"#f9e4df"}}>Cerrar Sesión</button>
								</Link>
							</div>
						</div>
					)}
					<div className="navbar-nav">
							<Link to="/donacion">
								<button className="btn  m-1" style={{backgroundColor:"#f9e4df"}}>Haz una donación</button>
							</Link>
						</div>
					<button onClick={handleToggleDarkMode} className="btn m-1" style={{backgroundColor:"#A96D60"}}>
						{store.darkMode ? (
							<>
								<i className="fas fa-sun" alt="Modo claro" style={{ color:"white"}} ></i>
							</>
						) : (
							<>
								<i className="fas fa-moon"></i>
							</>
						)}
					</button>
				</div>
			</div>
		</nav>
	);
};


