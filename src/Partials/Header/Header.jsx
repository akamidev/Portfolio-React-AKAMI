import React, { useState, useEffect, useCallback, useRef } from 'react'; // Ajout de useRef
import "./style.scss";
import { NavLink } from "react-router-dom";
import logo from '../../Logo/logo_m_red.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const sidemenuRef = useRef(null); // Utilisation de useRef
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    if (sidemenuRef.current) {
      setIsMenuOpen(true);
      sidemenuRef.current.style.right = "0";
    }
  };

  const closeMenu = useCallback(() => {
    if (sidemenuRef.current) {
      setIsMenuOpen(false);
      sidemenuRef.current.style.right = "-200px";
    }
  }, []);

  // Gestionnaire d'événements pour détecter les clics en dehors du menu
  const handleClickOutside = useCallback((event) => {
    if (sidemenuRef.current && !sidemenuRef.current.contains(event.target)) {
      closeMenu();
    }
  }, [closeMenu]);

  // Utiliser useEffect pour ajouter et supprimer le gestionnaire d'événements
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, handleClickOutside]);

  return (
    <div id="header">
      <div className="container">
        <nav>
          <header>
            <NavLink to="/">
              <img src={logo} className="logo" alt="Logo" />
            </NavLink>
            <ul id="sidemenu" ref={sidemenuRef} className={isMenuOpen ? 'open' : ''}>
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/Competence" className={({ isActive }) => (isActive ? "active" : "")}>Compétences</NavLink>
              </li>
              <li>
                <NavLink to="/portfolio" className={({ isActive }) => (isActive ? "active" : "")}>Portfolio</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink>
              </li>
              <FontAwesomeIcon icon={faTimes} className="fa-solid fa-xmark" onClick={() => closeMenu()} />
            </ul>
            <FontAwesomeIcon icon={faBars} className="fa-solid fa-bars" onClick={() => openMenu()} />
          </header>
        </nav>
      </div>
    </div>
  );
}