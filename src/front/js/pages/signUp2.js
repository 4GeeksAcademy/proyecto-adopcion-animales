import React, { useState } from "react";
export default function SignUp2() {

    const initialForm = {
        name: "",
        email: "",
        provincia: "",
        NIF: "",
        password: "",
        passwordConfirmation: "",
    }

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newError = {};
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        let regexNIF = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;

        if (!form.name.trim()) {
            newError.name = "El campo nombre es requerido";
        } else if (!regexName.test(form.name.trim())) {
            newError.name =
                "El campo 'Nombre' sólo acepta letras y espacios en blanco";
        }
        if (!form.email.trim()) {
            newError.email = "El campo 'Email' es requerido";
        } else if (!regexEmail.test(form.email.trim())) {
            newError.email = "El campo 'Email' es incorrecto";
        }
        if (!form.provincia.trim()) {

            if (!form.NIF.trim()) {
                newError.NIF = "El campo 'NIF' es requerido";
            } else if (!regexNIF.test(form.NIF.trim())) {
                newError.NIF = "El campo 'NIF' es incorrecto";
            }
            if (form.password !== form.passwordConfirmation) {
                newError.password =
                    "El campo 'Contraseña' y 'Confirmar contraseña' no coinciden";
            }

            if (Object.keys(newError).length === 0) {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/asociation", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            name: form.name,
                            last_name: form.last_name,
                            email: form.email,
                            password: form.password,
                            // Cambiar los nombres según el back
                        }),
                    });

                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            }

            setErrors(newError);
            setForm({ ...initialForm });
        };

        let styles = {
            fontWeight: "bold",
            color: "#dc3545",
        };
    }


    return (
        <div>
            <h1>Registro de Asociación</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    {errors.name && <p style={styles}>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                    {errors.email && <p style={styles}>{errors.email}</p>}
                </div>
                <div>
                    <select value={form.provincia} onChange={(e) => setForm({ ...form, provincia: e.target.value })}>
                        <option value="">Selecciona una provincia</option>
                        <option value="A Coruña">A Coruña</option>
                        <option value="Álava">Álava</option>
                        <option value="Albacete">Albacete</option>
                        <option value="Alicante">Alicante</option>
                        <option value="Almería">Almería</option>
                        <option value="Asturias">Asturias</option>
                        <option value="Ávila">Ávila</option>
                        <option value="Badajoz">Badajoz</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Burgos">Burgos</option>
                        <option value="Cáceres">Cáceres</option>
                        <option value="Cádiz">Cádiz</option>
                        <option value="Cantabria">Cantabria</option>
                        <option value="Castellón">Castellón</option>
                        <option value="Ciudad Real">Ciudad Real</option>
                        <option value="Córdoba">Córdoba</option>
                        <option value="Cuenca">Cuenca</option>
                        <option value="Girona">Girona</option>
                        <option value="Granada">Granada</option>
                        <option value="Guadalajara">Guadalajara</option>
                        <option value="Gipuzkoa">Gipuzkoa</option>
                        <option value="Huelva">Huelva</option>
                        <option value="Huesca">Huesca</option>
                        <option value="Jaén">Jaén</option>
                        <option value="La Rioja">La Rioja</option>
                        <option value="Las Palmas">Las Palmas</option>
                        <option value="León">León</option>
                        <option value="Lleida">Lleida</option>
                        <option value="Lugo">Lugo</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Málaga">Málaga</option>
                        <option value="Murcia">Murcia</option>
                        <option value="Navarra">Navarra</option>
                        <option value="Ourense">Ourense</option>
                        <option value="Palencia">Palencia</option>
                        <option value="Pontevedra">Pontevedra</option>
                        <option value="Salamanca">Salamanca</option>
                        <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
                        <option value="Segovia">Segovia</option>
                        <option value="Sevilla">Sevilla</option>
                        <option value="Soria">Soria</option>
                        <option value="Tarragona">Tarragona</option>
                        <option value="Teruel">Teruel</option>
                        <option value="Toledo">Toledo</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Valladolid">Valladolid</option>
                        <option value="Vizcaya">Vizcaya</option>
                        <option value="Zamora">Zamora</option>
                        <option value="Zaragoza">Zaragoza</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="NIF">NIF:</label>
                    <input
                        type="text"
                        id="NIF"
                        value={form.NIF}
                        onChange={(e) => setForm({ ...form, NIF: e.target.value })}
                        required
                    />
                    {errors.NIF && <p style={styles}>{errors.NIF}</p>}
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="passwordConfirmation">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        id="passwordConfirmation"
                        value={form.passwordConfirmation}
                        onChange={(e) =>
                            setForm({ ...form, passwordConfirmation: e.target.value })
                        }
                        required
                    />
                    {errors.password && <p style={styles}>{errors.password}</p>}
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}
