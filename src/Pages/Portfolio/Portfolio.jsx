import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'; 
import "./portfolio.scss";
// Définition de la fonction Portfolio qui gère la page du portfolio. 
// Initialisation des variables filter et setFilter avec useState. 
// Initialisation du tableau projects avec useState.
function Portfolio() { 
  const [filter, setFilter] = useState("");
const [projects] = useState([
    {
      id: 1, 
      name: "Compteur",
      technology: "HTML, JavaScript, Css",
      image: "images/Compteur.png",
      link: "https://github.com/akamidev/COMPTEUR",
      description:
        "incrementer et decrementer un compteur avec Javascript",
    },
    {
      id: 2,
      name: "Pokedex",
      technology: "HTML, ReactJs, JavaScript, Sass",
      image: "images/Pokedex.png",
      link: "https://github.com/akamidev/Pokedex",
      description:
      "API Pokémon: Explorez les Index"},
    {
      id: 3,
      name: 'Site Web',
      technology: 'HTML, CSS, JavaScript',
      image: "images/Siteweb1.png",
      link: "https://github.com/akamidev/SITEWEB_INTERACTIF",
      description: "Site vitrine sans Framework",
    },
    {
      id: 4,
      name: "Portfolio",
      technology: "HTML, Sass, ReactJs, JavaScript, NodeJs ",
      image: "images/PORTFOLIO-FIGMA.png",
      link: "https://github.com/akamidev/PORTFOLIO-FIGMA",
      description:
        "Clone de Site Figma en React",
    },
    {
      id: 5,
      name: "Countrys",
      technology: "HTML, Sass, ReactJs, JavaScript, API",
      image: "images/Countrys.png",
      link: "https://github.com/akamidev/COUNTRY",
      description:
        "Infos et Drapeaux des Pays via API",
    },
    {
      id: 6,
      name: "Facture",
      technology: "HTML, CSS, JavaScript",
      image: "images/Factures.png",
      link: "https://github.com/akamidev/PROJET_FACTURE",
      description:
        "CRUD factures",
    },
    {
      id: 7,
      name: "UI/UX",
      technology: "Figma",
      image: "images/TP-UI-UX.png",
      link: "https://github.com/akamidev/G-te-Les-Avineaux/tree/main?tab=readme-ov-file",
      description:
        "Créer des maquettes interactives et des wireframes",
    },
    {
      id: 8,
      name: "API Cinema",
      technology: "PHP, MySQL",
      image: "images/ProjetPHP.png",
      link: "https://github.com/akamidev/Projet-Cin-ma-D-tail-Film-et-Liste-Membres",
      description:
      "Gestion des données via SQL",
    },
    {
      id: 9,
      name: "Site Dynamique",
      technology: "PHP, MySQL",
      image: "images/PHP_Ecomerce.png",
      link: "https://github.com/akamidev/Projet-Site-Dynamique-PHP-Sans-BDD",
      description:
      "Gestion contenu via tableaux",
    },
    {
      id: 10,
      name: "LAPCOM",
      technology: "Symfony, MySQL",
      image: "images/Projetsymfony.png",
      link: "https://github.com/akamidev/LAPCOM",
      description:
      "Création site e-commerce dynamique, avec BDD",
    },

    {
      id: 11,
      name: "Controller disk",
      technology: "Python, SMTP",
      image: "images/surveille-disque.png",
      link: "https://github.com/akamidev/surveillance_disque",
      description:
      "Surveillance de l'Espace Disque",
    },

    {
      id: 12,
      name: "%TEMP%",
      technology: "Python, Planificateur de tâches",
      image: "images/Fichiers_Temporaires.png",
      link: "https://github.com/akamidev/python",
      description:
      "Nettoyage Automatique des Fichiers",
    },

    {
      id: 13,
      name: "Cash Changer",
      technology: "Python, API ",
      image: "images/Convertisseur_monnaie.png",
      link: "https://github.com/akamidev/Convertisseur-de-Monnaies",
      description:
      "Logiciel de conversion de devises",
    },

    {
      id: 14,
      name: "WorkCycle",
      technology: "Python, Tkinter",
      image: "images/Promodo.png",
      link: "https://github.com/akamidev/Planificateur-de-Pomodoro-en-Python",
      description:
      "Logiciel de planification de temps",
    },

    {
      id: 15,
      name: "RentaRoom",
      technology: "Symfony, Twig, Bootstrap",
      image: "images/rentaroom.png",
      link: "https://github.com/EmmanuelMendanha/RentaRoom",
      description:
      "Réservation de salles de réunion",
    },

    {
      id: 16,
      name: "ProcessMoniteur",
      technology: "Java, Maven, OSHI, JavaMail",
      image: "images/MonitorProcess.png",
      link: "https://github.com/akamidev/ProcessMoniteur",
      description:
      "Programme Java qui surveille les processus système",
    },
  ]);
  const filteredProjects = projects.filter((project) =>// projects est le tableau de données à filtrer
    project.name.toLowerCase().includes(filter.toLowerCase()) ||
    project.technology.toLowerCase().includes(filter.toLowerCase())// données filtrées
  );
 

  return (
    <div id="portfolio"> 
      <div className="container">
        <h1 className="sub-title">Mes Projets</h1>
        <input
          type="text"
          placeholder="Filtrez par nom du projet ou language..."
          onChange={(e) => setFilter(e.target.value)} //  un événement  qui est déclenché lorsque le champ est modifié
        /> 
        <div className="work-list">
          {filteredProjects.map((project) => ( // Boucle sur le tableau des projets pour afficher chaque projet
            //Ajout de l'id du projet à l'élément
            <div className="work" key={project.id}>  
              <img src={project.image} alt={project.name} />
              <div className="layer">
              <h1 className="attractive-heading">{project.name}</h1> 
              <h2>{project.description}</h2>
              <hr className="separator" />
              <h3>{project.technology}</h3>
              <a href={project.link} className="link-button" target="_blank" rel="noopener noreferrer">
             <FontAwesomeIcon icon={faGithub} />
            </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
}

export default Portfolio;
