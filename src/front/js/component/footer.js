import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faDog, faHandsHelping, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Footer = () => (
  <div className="container mt-4">
    <footer className="p-2 m-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <a href="/" className="nav-link px-2 text-muted">
            <FontAwesomeIcon icon={faHome} />
            &nbsp;Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/signup" className="nav-link px-2 text-muted">
            <FontAwesomeIcon icon={faUserPlus} />
            &nbsp;Registro
          </a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link px-2 text-muted">
            <FontAwesomeIcon icon={faDog} />
            &nbsp;Adoptar
          </a>
        </li>
        <li className="nav-item">
          <a href="/donacion" className="nav-link px-2 text-muted">
            <FontAwesomeIcon icon={faHandsHelping} />
            &nbsp;Quiero ayudar!
          </a>
        </li>
        <li className="nav-item">
          <a href="/about" className="nav-link px-2 text-muted">
            <FontAwesomeIcon icon={faInfoCircle} />
            &nbsp;About
          </a>
        </li>
      </ul>
      <p className="text-center text-muted">© 2021 APPATITAS</p>
    </footer>
  </div>
);

export default Footer;
