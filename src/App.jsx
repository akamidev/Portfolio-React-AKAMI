import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Competence from "./Pages/Competence/Competence";
import Portfolio from "./Pages/Portfolio/Portfolio";
import Contact from "./Pages/Contact/Contact";
import Footer from "./Partials/Footer/Footer";
import Header from "./Partials/Header/Header";
import ChatGPT from "./Pages/ChatGPT/ChatGPT"; // Importer le composant 

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/Competence" element={<Competence />} />
        <Route path="/Portfolio" element={<Portfolio />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/AssistantIA" element={<ChatGPT />} /> {/* Ajouter la route  */}
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// Composant pour gérer le défilement et ajouter une classe spécifique au body
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pathname === "/AssistantIA") {
      document.body.classList.add("no-scroll-to-top");
    } else {
      document.body.classList.remove("no-scroll-to-top");
    }
  }, [pathname]);

  return null;
}

export default App;