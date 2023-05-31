import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function LoginUsuario() {
  const initialForm = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/login_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        setForm(initialForm);
        setLoginError(false);
      } else {
        const errorData = await response.json();
        setLoginError(true);
        console.error(errorData.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError(true);
    }

  };
  let styles = {
    fontWeight: "bold",
    color: "#dc3545",
  };

  return (
    <div>
      <h1>Login Usuario</h1>
      {loginError && <p style={styles}>Usuario o contraseña incorrectos</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
