import React, { useState } from "react";

export default function SingUp() {
  const initialForm = {
    name: "",
    last_name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newError = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

    if (!form.name.trim()) {
      newError.name = "El campo nombre es requerido";
    } else if (!regexName.test(form.name.trim())) {
      newError.name =
        "El campo 'Nombre' sólo acepta letras y espacios en blanco";
    }
    if (!form.last_name.trim()) {
      newError.last_name = "El campo nombre es requerido";
    } else if (!regexName.test(form.last_name.trim())) {
      newError.last_name =
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
            name: form.name,
            lastname: form.last_name,
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
      <h1>Sign Up</h1>
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
          <label htmlFor="lastname">Apellidos:</label>
          <input
            type="text"
            id="lastname"
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            required
          />
          {errors.last_name && <p style={styles}>{errors.last_name}</p>}
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

// if (Object.keys(newError).length === 0) {
//   try {
//     const response = await fetch("/api/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         name: form.name,
//         lastname: form.last_name,
//         email: form.email,
//         password: form.password,
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       // navigate("/demo"); // Redirige a la ruta "/demo" después de completar el registro exitosamente
//     } else {
//       throw new Error("Error al registrar el usuario");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// setErrors(newError);
// setForm({ ...initialForm });
