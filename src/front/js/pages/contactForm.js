
// //Componente para mandar el correo a la asociación
// //Para poder usarlo hay que hacer un npm install emailjs-com
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [animal, setAnimal] = useState({});
  const [formValues, setFormValues] = useState({
    nombreUsuario: localStorage.getItem("nombre"),
    emailUsuario: localStorage.getItem("email"),
    emailAsociacion: "",
    mensaje: "",
    imagen: "",
  });

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
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label className="none">
        Nombre del remitente:
        <input
          type="text"
          name="nombreUsuario"
          value={formValues.nombreUsuario}
          onChange={handleChange}
        />
      </label>
      <label className="none">
        Email del remitente:
        <input
          type="email"
          name="emailUsuario"
          value={formValues.emailUsuario}
          onChange={handleChange}
        />
      </label>
      <label className="none">
        Email del destinatario:
        <input
          type="email"
          name="emailAsociacion"
          value={formValues.emailAsociacion}
          onChange={handleChange}
        />
      </label>
      <label>
        Mensaje:
        <textarea
          name="mensaje"
          value={formValues.mensaje}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Enviar correo electrónico</button>
    </form>
  );
}
