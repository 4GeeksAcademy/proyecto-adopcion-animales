
// //Componente para mandar el correo a la asociación
// //Para poder usarlo hay que hacer un npm install emailjs-com
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [animal, setAnimal] = useState({});
  const [formValues, setFormValues] = useState({
    nombreUsuario: localStorage.getItem("nombre"),
    emailUsuario: localStorage.getItem("email"),
    nombreAsociacion: "",
    emailAsociacion: "",
    nombreAnimal: "",
    mensaje: "",

  });
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const fetchAnimal = async () => {
    const response = await fetch(process.env.BACKEND_URL + `/api/animal/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setAnimal(data);
    console.log(data);

    // Completar el campo emailAsociacion con el valor de asociacion_email
    if (data.asociacion_email) {
      setFormValues((prevValues) => ({
        ...prevValues,
        emailAsociacion: data.asociacion_email,
        nombreAsociacion: data.asociacion_nombre,
        nombreAnimal: data.nombre,
      }));
    }
  };

  useEffect(() => {
    fetchAnimal();
  }, [id]);

  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar el formulario utilizando EmailJS
    emailjs
      .sendForm(
        "service_hpqq7hk",
        "template_25g128r",
        formRef.current,
        "4QZzQVYfNzMN7L8T2"
      )
      .then((response) => {
        console.log("Correo electrónico enviado:", response);
        // Restablecer el campo emailAsociacion con el valor de asociacion_email
        if (animal.asociacion_email) {
          setFormValues((prevValues) => ({
            ...prevValues,
            emailAsociacion: animal.asociacion_email,
          }));
        }
      })
      .catch((error) => {
        console.error("Error al enviar el correo electrónico:", error);
      });

    // Restablecer los valores del formulario
    setFormValues((prevValues) => ({
      ...prevValues,
      mensaje: "",
    }));
    setSuccessMessage(true);
    setTimeout(() => {
      navigate('/usuario');
    }, 2000);
  };

  return (
    <>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          El mensaje se ha enviado correctamente.
        </div>
      )}
      <div className="container py-2 vh-100">
        <Link className="btn btn-lg btn-block shadow-sm" style={{ backgroundColor: "#ff914d" }} to="/usuario">Volver Atrás</Link>
        <form ref={formRef} onSubmit={handleSubmit}>
          <label className="none">
            Nombre del Usuario:
            <input
              type="text"
              name="nombreUsuario"
              value={formValues.nombreUsuario}
              onChange={handleChange}
            />
          </label>
          <label className="none">
            Email de la Asociación:
            <input
              type="email"
              name="emailUsuario"
              value={formValues.emailUsuario}
              onChange={handleChange}
            />
          </label>
          <label className="none">
            Email de la Asociación:
            <input
              type="email"
              name="emailAsociacion"
              value={formValues.emailAsociacion}
              onChange={handleChange}
            />
          </label>
          <label className="none">
            Nombre de la Asociación:
            <input
              type="text"
              name="nombreAsociacion"
              value={formValues.nombreAsociacion}
              onChange={handleChange}
            />
          </label>
          <label className="none">
            Nombre del Animal:
            <input
              type="text"
              name="nombreAnimal"
              value={formValues.nombreAnimal}
              onChange={handleChange}
            />
          </label>
          <div className="card shadow px-2 my-3" style={{ borderRadius: "1rem", backgroundColor: "transparent" }}>
            <div className="d-flex flex-column justify-content-start align-items-center py-3">
              <textarea className="form-control"
                rows="3"
                placeholder="Escribe aquí tu mensaje para hacérselo llegar a la Asociación:"
                name="mensaje"
                value={formValues.mensaje}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-lg btn-block shadow-sm" type="submit" style={{ backgroundColor: "#A96D60" }}>Enviar correo electrónico</button>
          </div>
        </form>
      </div>
    </>
  );
}

