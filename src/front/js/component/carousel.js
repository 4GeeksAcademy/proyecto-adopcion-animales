import React from "react";
import { Link } from "react-router-dom";
import "../../styles/component.css";
import carouselImg1 from '../../../front/img/carousel1.jpg';
import carouselImg2 from '../../../front/img/carousel2.jpg';
import carouselImg3 from '../../../front/img/carousel3.jpg';

export const Carousel = () => {
    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner rounded">
                <div className="carousel-item active" data-bs-interval={10000} >
                    <img src={carouselImg1} className="d-block  img-fluid" alt="Perros"
                    />
                </div>
                <div className="carousel-item" data-bs-interval={2000} >
                    <img src={carouselImg2} className="d-block  img-fluid" alt="Perro y Gato" />
                </div>
                <div className="carousel-item">
                    <img src={carouselImg3} className="d-block  img-fluid" alt="Gato" />
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