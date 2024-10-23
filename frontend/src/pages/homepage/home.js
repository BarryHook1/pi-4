// src/pages/HomePage.js

import React from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';  // Importando useNavigate para redirecionamento
import bmwLogo from '../../assets/bmw.webp';
import bydLogo from '../../assets/byd.webp';
import chevroletLogo from '../../assets/chevrolet.webp';
import renaultLogo from '../../assets/renault.webp';
import logo from '../../assets/logo.png';
import banner from '../../assets/bannerteste.png';
import turbina from '../../assets/turbina.jpeg';
import paddle from '../../assets/paddle.jpg';

const HomePage = () => {
    const navigate = useNavigate();  // Hook de navegação

    // Função para redirecionar para a página de login
    const handleLoginClick = () => {
        navigate('/login');  // Redireciona para a página de login
    };

    return (
        <div className="homepage">
            {/* Header */}
            <header className="header">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav className="nav">
                    <ul>
                        <li className="header-text"><a href="#">Comprar</a></li>
                        <li className="header-text"><a href="#">Vender</a></li>
                        <li className="header-text"><a href="#">Ajuda</a></li>
                    </ul>
                </nav>
                <div className="login">
                    <button className="login-btn" onClick={handleLoginClick}>Entrar</button> {/* Redireciona ao clicar */}
                </div>
            </header>

            {/* Main Banner Section */}
            <section className="banner-section">
                <img src={banner} alt="Banner" />
                <div className="search-container">
                    <div className="search-box">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input type="text" placeholder="Digite marca ou modelo do carro" className="search-input" />
                    </div>
                    <button className="search-btn">Ver Ofertas (376.171)</button>
                </div>
            </section>

            {/* Official Stores Section */}
            <div className="background-container">
                <section className="official-stores">
                    <h3>Lojas Oficiais</h3>
                    <div className="store-logos">
                        <img src={bmwLogo} alt="Marca 1" />
                        <img src={bydLogo} alt="Marca 2" />
                        <img src={chevroletLogo} alt="Marca 3" />
                        <img src={renaultLogo} alt="Marca 4" />
                    </div>
                </section>
            </div>

            {/* Popular Items Section */}
            <section className="popular-items">
                <h3>Peças Populares</h3>
                <div className="item-grid">
                    <div className="item-card">
                        <img src={turbina} alt="Peça 1" />
                        <p>Turbina IS38  Avaliações: ★★★★☆</p>
                    </div>
                    <div className="item-card">
                        <img src={paddle} alt="Peça 2" />
                        <p>Paddle Shift Extender  Avaliações: ★★★★☆</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;