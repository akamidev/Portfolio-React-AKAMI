import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPhoneSquare } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import emailjs from 'emailjs-com';
import "./contact.scss";

function Contact() {
  const [msg, setMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // État pour le champ honeypot

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifiez si le champ honeypot est rempli
    if (honeypot) {
      console.log("Spam détecté !");
      return;
    }

    const templateParams = {
      from_name: name,
      reply_to: email,
      message: message,
    };

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setMsg(true);
        setErrorMsg("");
        setTimeout(() => {
          setMsg(false);
          setName("");
          setEmail("");
          setMessage("");
        }, 3000);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setErrorMsg("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer plus tard.");
      });
  };

  return (
    <>
      <div id="contact">
        <div className="container">
          <div className="row">
            <div className="contact-left">
              <h1 className="sub-title">Contactez-moi</h1>
              <p>
                <FontAwesomeIcon icon={faPaperPlane} className="fa-solid" />{" "}
                akamimehdi.dev@gmail.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhoneSquare} className="fa-solid" />{" "}
                +33 6 99 85 80 05
              </p>
              <div className="social-icons">
              <a href="https://www.linkedin.com/in/mehdi-akami-1912a51a9/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className="fa-brands" />
              </a>
              <a href="https://github.com/akamidev" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} className="fa-brands" />
              </a>
              <a href="https://x.com/akamimehdi" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} className="fa-brands" />
              </a>
              </div>
              <a href="images/CV_AKAMI_Mehdi.pdf" className="btn btn2" target="_blank" rel="noopener noreferrer">
               Téléchargez Mon CV
              </a>
            </div>
            <div className="contact-right">
              <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
                <input type="hidden" name="form-name" value="contact" />
                <input
                  className="name"
                  type="text"
                  name="name"
                  placeholder="Votre Nom"
                  pattern="[A-Za-z\s]+"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="email"
                  type="email"
                  name="email"
                  placeholder="Votre E-mail"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  className="message"
                  placeholder="Votre Message"
                  rows="6"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                {/* Champ honeypot caché */}
                <input
                  type="text"
                  name="honeypot"
                  style={{ display: 'none' }}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
                  {msg && (
                <span className="msg" id="msg">
                  Message envoyé avec succès !
                </span>
              )}
              {errorMsg && (
                <span className="error-msg" id="error-msg">
                  {errorMsg}
                </span>
              )}
                <button type="submit" className="btn btn2" aria-label="Envoyer votre message">
                  Envoyez
                </button>
              </form>
            
              <div className="google-map"></div>
            </div>
          </div>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10476.958965051013!2d2.2746841250599785!3d48.96796057816373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66627e3fe4405%3A0x40b82c3688b2db0!2s95210%20Saint-Gratien!5e0!3m2!1sfr!2sfr!4v1705407374987!5m2!1sfr!2sfr"
        width="1680"
        height="550"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </>
  );
}

export default Contact;