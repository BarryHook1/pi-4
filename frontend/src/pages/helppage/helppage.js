// helppage.js
import React from 'react';
import './helppage.css';

const HelpPage = () => {
  return (
    <div className="help-page">
      <h1>Bem-vindo ao Nosso Site de Peças Automotivas</h1>
      <p>
        Somos uma plataforma dedicada à venda de peças automotivas de alta qualidade. Nosso objetivo é conectar compradores e vendedores de peças automotivas, proporcionando segurança, confiabilidade e facilidade de uso.
      </p>
      <h2>Nossa Missão</h2>
      <p>
        Fornecer um marketplace confiável onde você possa encontrar as peças que precisa para seu veículo, seja ele de qualquer marca ou modelo.
      </p>
      <h2>Por que Escolher Nosso Site?</h2>
      <ul>
        <li><strong>Segurança:</strong> Valorizamos a segurança de nossos usuários, garantindo transações seguras e protegidas.</li>
        <li><strong>Confiabilidade:</strong> Trabalhamos apenas com vendedores confiáveis para assegurar a qualidade das peças oferecidas.</li>
        <li><strong>Variedade:</strong> Oferecemos uma ampla gama de peças para diversas marcas e modelos de veículos.</li>
        <li><strong>Suporte:</strong> Nossa equipe está pronta para ajudar com qualquer dúvida ou problema que você possa ter.</li>
      </ul>
      <h2>Como Funciona</h2>
      <p>
        Navegue pelo nosso catálogo de peças usando a opção "Comprar" no menu. Você pode filtrar as peças por marca, modelo, condição e categoria. Quando encontrar a peça que precisa, entre em contato com o vendedor através da página de detalhes do produto.
      </p>
      <p>
        Se você é um vendedor, pode cadastrar suas peças clicando em "Vender" e acessando sua área de vendedor.
      </p>
      <h2>Entre em Contato</h2>
      <p>
        Se tiver alguma dúvida ou precisar de assistência, não hesite em entrar em contato conosco através do email.
      </p>
    </div>
  );
};

export default HelpPage;