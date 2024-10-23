import React, { useState, useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import bmwLogo from '../../assets/bmw.webp';
import bydLogo from '../../assets/byd.webp';
import chevroletLogo from '../../assets/chevrolet.webp';
import renaultLogo from '../../assets/renault.webp';
import logo from '../../assets/logo.png';
import banner from '../../assets/bannerteste.png';
import turbina from '../../assets/turbina.jpeg';
import paddle from '../../assets/paddle.jpg';

const HomePage = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');

        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('vendedor');
        setUserName('');
        navigate('/');  // Redireciona para a página inicial
    };

    // Função que agora permite qualquer usuário acessar a página de vendas
    const handleSellClick = () => {
        navigate('/sellpage');  // Redireciona diretamente para a página de vendas
    };

    return (
        <div className="homepage">
            <header className="header">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav className="nav">
                    <ul>
                        <li className="header-text"><a href="#">Comprar</a></li>
                        <li className="header-text">
                            <a href="#" onClick={handleSellClick}>Vender</a>  {/* Sem verificação de vendedor */}
                        </li>
                        <li className="header-text"><a href="#">Ajuda</a></li>
                    </ul>
                </nav>
                <div className="login">
                    {userName ? (
                        <div>
                            <span>Bem-vindo, {userName}</span>
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <button className="login-btn" onClick={() => navigate('/login')}>Entrar</button>
                    )}
                </div>
            </header>

            {/* Main Banner Section */}
            <section className="banner-section">
                <img src={banner} alt="Banner" />
                <div className="search-container">
                    <input type="text" placeholder="Digite marca ou modelo do carro" className="search-input" />
                    <button className="search-btn" onClick={() => navigate('/search')}>Ver Ofertas</button>
                </div>
            </section>

            {/* Official Stores Section */}
            <div className="background-container">
                <section className="official-stores">
                    <h3>Lojas Oficiais</h3>
                    <div className="store-logos">
                        <img src={bmwLogo} alt="BMW" />
                        <img src={bydLogo} alt="BYD" />
                        <img src={chevroletLogo} alt="Chevrolet" />
                        <img src={renaultLogo} alt="Renault" />
                    </div>
                </section>
            </div>

            {/* Popular Items Section */}
            <section className="popular-items">
                <h3>Peças Populares</h3>
                <div className="item-grid">
                    <div className="item-card">
                        <img src={turbina} alt="Turbina" />
                        <p>Turbina IS38 - Avaliações: ★★★★☆</p>
                    </div>
                    <div className="item-card">
                        <img src={paddle} alt="Paddle Shift" />
                        <p>Paddle Shift Extender - Avaliações: ★★★★☆</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;