import React, { useState } from "react";

export default function SingUpUsuario() {
  const initialForm = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newError = {};
    let regexNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

    if (!form.nombre.trim()) {
      newError.nombre = "El campo nombre es requerido";
    } else if (!regexNombre.test(form.nombre.trim())) {
      newError.nombre =
        "El campo 'Nombre' sólo acepta letras y espacios en blanco";
    }
    if (!form.apellido.trim()) {
      newError.apellido = "El campo nombre es requerido";
    } else if (!regexNombre.test(form.apellido.trim())) {
      newError.apellido =
        "El campo 'Apellidos' sólo acepta letras y espacios en blanco";
    }
    if (!form.email.trim()) {
      newError.email = "El campo 'Email' es requerido";
    } else if (!regexEmail.test(form.email.trim())) {
      newError.email = "El campo 'Email' es incorrecto";
    }
    if (form.password !== form.passwordConfirmation) {
      newError.password =
        "El campo 'Contraseña' y 'Confirmar contraseña' no coinciden";
    }

    if (Object.keys(newError).length === 0) {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            nombre: form.nombre,
            apellido: form.apellido,
            email: form.email,
            password: form.password,
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

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
          {errors.nombre && <p style={styles}>{errors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="lastname">Apellidos:</label>
          <input
            type="text"
            id="lastname"
            value={form.apellido}
            onChange={(e) => setForm({ ...form, apellido: e.target.value })}
            required
          />
          {errors.apellido && <p style={styles}>{errors.apellido}</p>}
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
