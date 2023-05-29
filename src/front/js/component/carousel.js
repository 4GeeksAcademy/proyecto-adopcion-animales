import React from "react";
import { Link } from "react-router-dom";
import "../../styles/component.css"

export const Carousel = () => {
    return (
        
        <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
        >
            <div className="carousel-inner rounded">
                <div className="carousel-item active" data-bs-interval={10000}>
                    <img src="https://via.placeholder.com/600x400" className="d-block w-100" alt="Perros" id="imgcarousel"/>
                </div>
                <div className="carousel-item" data-bs-interval={2000}>
                    <img src="https://via.placeholder.com/600x400" className="d-block w-100" alt="Perro y Gato" id="imgcarousel"/>
                </div>
                <div className="carousel-item">
                    <img src="https://via.placeholder.com/600x400" className="d-block w-100" alt="Gato" id="imgcarousel" />
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
       
    )
}