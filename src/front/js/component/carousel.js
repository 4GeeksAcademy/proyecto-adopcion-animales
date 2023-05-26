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
                    <img src="https://r4.wallpaperflare.com/wallpaper/644/569/83/animales-baby-cachorros-labrados-wallpaper-a8c6fc7a6f0c37194e3029e262f98bf0.jpg" className="d-block w-100" alt="Perros" id="imgcarousel"/>
                </div>
                <div className="carousel-item" data-bs-interval={2000}>
                    <img src="https://r4.wallpaperflare.com/wallpaper/162/949/183/animales-baby-cachorros-gato-wallpaper-ef21707cbb8f81af3206eec8fa136327.jpg" className="d-block w-100" alt="Perro y Gato" id="imgcarousel"/>
                </div>
                <div className="carousel-item">
                    <img src="https://r4.wallpaperflare.com/wallpaper/202/312/967/acostado-animales-gato-hierba-wallpaper-22113260fdf6be8bcac812d5803889f2.jpg" className="d-block w-100" alt="Gato" id="imgcarousel" />
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