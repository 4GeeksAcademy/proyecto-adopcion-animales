
import React, { useState } from "react";

export default function FetchAnimal() {

    const [animal, setAnimal] = useState([]);

    const getAnimal = async () => {

        const response = await fetch(process.env.BACKEND_URL + "/api/animal", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json()
        setAnimal(data)
        console.log(data)
    }

    return (
        <div>
            <h1>Fetch Animal</h1>
            <button onClick={getAnimal}>Get Animal</button>
        </div>
    )
}