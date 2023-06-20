import React from "react";
import { Link } from "react-router-dom";
import "../../styles/component.css";

export const Carousel = () => {
    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner rounded text-center justify-content-center">
                <div className="carousel-item active" data-bs-interval={10000}>
                    <img src="https://via.placeholder.com/600x400" className="d-block w-100 img-fluid" alt="Perros" style={{ maxWidth: "80%", maxHeight: "770px" }} />
                </div>
                <div className="carousel-item" data-bs-interval={2000}>
                    <img src="https://via.placeholder.com/600x400" className="d-block w-100 img-fluid" alt="Perro y Gato" />
                </div>
                <div className="carousel-item">
                    <img src="https://via.placeholder.com/600x400" className="d-block w-100 img-fluid" alt="Gato" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};
