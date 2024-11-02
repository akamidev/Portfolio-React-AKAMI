import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  useEffect(() => {
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    const checkScroll = () => {
      if (window.pageYOffset > 100) {
        scrollToTopButton.style.display = 'block';
      } else {
        scrollToTopButton.style.display = 'none';
      }
    };

    const adjustForScrollbar = () => {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.marginRight = `${scrollbarWidth}px`;
    };

    const handleScroll = () => {
      if (window.pageYOffset === 0) {
        scrollToTopButton.style.display = 'none';
      } else {
        scrollToTopButton.style.display = 'block';
      }
    };

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', adjustForScrollbar);
    window.addEventListener('resize', adjustForScrollbar);
    window.addEventListener('scroll', handleScroll);

    // Nettoyage après le démontage
    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('load', adjustForScrollbar);
      window.removeEventListener('resize', adjustForScrollbar);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Le tableau vide signifie que useEffect s'exécute une fois au montage et au démontage

  return (
    <div className="portfolio-Copyright Copyright">
      <p>
        Copyright &copy; 2024
         akamimehdi.dev@gmail.com.
        Tous droits réservés.
        <a href="#header" className="scroll-to-top">
        <FontAwesomeIcon icon={faArrowUp} className="fa-solid fa-arrow-up" />
      </a>
      </p>
      <NavLink to="/"></NavLink>
    </div>
  );
}

export default Footer;