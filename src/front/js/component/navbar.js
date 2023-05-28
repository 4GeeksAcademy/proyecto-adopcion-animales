import React from "react";
import { Link } from "react-router-dom";
import"../../styles/component.css"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light" id="navbar">
			<div className="container-fluid" >
				<a className="navbar-brand" href="/" >
					
						<span className="navbar-brand mb-0 h1">No Tenemos Nombre Muchachos</span>
					
				</a>
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
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<a className="nav-link m-1" aria-current="page" href="#">
							Perros
						</a>
						<a className="nav-link m-1" href="#">
							Gatos
						</a>
						<Link to="/demo">
							<button className="btn btn-light m-1">Iniciar Sesión</button>
						</Link>
						<Link to="/demo">
							<button className="btn btn-light m-1">Registrase</button>
						</Link>
					</div>
				</div>
			</div>
		</nav>

	);
};


