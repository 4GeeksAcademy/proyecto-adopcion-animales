import React, { useState } from "react";

export default function Asociacion() {

    const [animal, setAnimal] = useState(null)

    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/allanimal", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setAnimal(data);
        console.log(data);
    };

    return (
        <div>
            <h1>Fetch Animal</h1>
            <button onClick={handleSubmit}>Fetch Animal</button>
        </div>
    )
}