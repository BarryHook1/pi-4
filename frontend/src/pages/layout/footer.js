import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 WebPeças. Todos os direitos reservados.</p>
      <ul className="footer-links">
        <li>
          <a href="/about" aria-label="Sobre Nós">
            Sobre Nós
          </a>
        </li>
        <li>
          <a href="/help" aria-label="Ajuda">
            Ajuda
          </a>
        </li>
        <li>
          <a href="/terms" aria-label="Termos de Uso">
            Termos de Uso
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
