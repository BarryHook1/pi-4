import React, { useState } from 'react';
import './helppage.css';

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="help-page">
      <h1>Bem-vindo ao Nosso Site de Peças Automotivas</h1>

      {/* Accordion Section: Nossa Missão */}
      <div className={`accordion-section ${activeIndex === 0 ? 'active' : ''}`}>
        <div className="accordion-header" onClick={() => toggleAccordion(0)}>
          <span>Nossa Missão</span>
          <span className="icon">+</span>
        </div>
        <div className="accordion-content" style={{ maxHeight: activeIndex === 0 ? '500px' : '0' }}>
          <p>Fornecer um marketplace confiável onde você possa encontrar as peças que precisa para seu veículo, seja ele de qualquer marca ou modelo.</p>
        </div>
      </div>

      {/* Accordion Section: Por que Escolher Nosso Site? */}
      <div className={`accordion-section ${activeIndex === 1 ? 'active' : ''}`}>
        <div className="accordion-header" onClick={() => toggleAccordion(1)}>
          <span>Por que Escolher Nosso Site?</span>
          <span className="icon">+</span>
        </div>
        <div className="accordion-content" style={{ maxHeight: activeIndex === 1 ? '500px' : '0' }}>
          <ul>
            <li><strong>Segurança:</strong> Valorizamos a segurança de nossos usuários, garantindo transações seguras e protegidas.</li>
            <li><strong>Confiabilidade:</strong> Trabalhamos apenas com vendedores confiáveis para assegurar a qualidade das peças oferecidas.</li>
            <li><strong>Variedade:</strong> Oferecemos uma ampla gama de peças para diversas marcas e modelos de veículos.</li>
            <li><strong>Suporte:</strong> Nossa equipe está pronta para ajudar com qualquer dúvida ou problema que você possa ter.</li>
          </ul>
        </div>
      </div>

      {/* Accordion Section: Como Funciona */}
      <div className={`accordion-section ${activeIndex === 2 ? 'active' : ''}`}>
        <div className="accordion-header" onClick={() => toggleAccordion(2)}>
          <span>Como Funciona</span>
          <span className="icon">+</span>
        </div>
        <div className="accordion-content" style={{ maxHeight: activeIndex === 2 ? '500px' : '0' }}>
          <p>Navegue pelo nosso catálogo de peças usando a opção "Comprar" no menu. Você pode filtrar as peças por marca, modelo, condição e categoria. Quando encontrar a peça que precisa, entre em contato com o vendedor através da página de detalhes do produto.</p>
          <p>Se você é um vendedor, pode cadastrar suas peças clicando em "Vender" e acessando sua área de vendedor.</p>
        </div>
      </div>

      {/* Accordion Section: Entre em Contato */}
      <div className={`accordion-section ${activeIndex === 3 ? 'active' : ''}`}>
        <div className="accordion-header" onClick={() => toggleAccordion(3)}>
          <span>Entre em Contato</span>
          <span className="icon">+</span>
        </div>
        <div className="accordion-content" style={{ maxHeight: activeIndex === 3 ? '300px' : '0' }}>
          <p>Se tiver alguma dúvida ou precisar de assistência, não hesite em entrar em contato conosco através do email.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;