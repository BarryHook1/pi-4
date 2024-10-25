// home.js
import React, { useState, useEffect } from "react";
import "./home.css";
import { Link, useNavigate } from 'react-router-dom';
import bmwLogo from "../../assets/bmw.webp";
import bydLogo from "../../assets/byd.webp";
import chevroletLogo from "../../assets/chevrolet.webp";
import renaultLogo from "../../assets/renault.webp";
import logo from "../../assets/logo.png";
import banner from "../../assets/bannerteste.png";
import turbina from "../../assets/turbina.jpeg";
import paddle from "../../assets/paddle.jpg";
// Importar as marcas e modelos
import { carBrandsWithModels } from "../searchpage/search"; // Ajuste o caminho conforme necessário

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [isVendedor, setIsVendedor] = useState(false);

  // Novo estado para o campo de busca
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  // Função para lidar com a mudança no campo de busca
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Gerar as sugestões com base no input
    if (value.length > 0) {
      const allOptions = [
        ...Object.keys(carBrandsWithModels), // Marcas
        ...Object.values(carBrandsWithModels).flat(), // Modelos
      ];

      const regex = new RegExp(`^${value}`, "i");
      const newSuggestions = allOptions.sort().filter((v) => regex.test(v));

      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Função para selecionar uma sugestão
  const suggestionSelected = (value) => {
    setSearchInput(value);
    setSuggestions([]);
    setSelectedItem(value);
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedVendedor = localStorage.getItem("vendedor");

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (storedVendedor) {
      setIsVendedor(storedVendedor === "true"); // Converter string para boolean
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("vendedor");
    localStorage.removeItem("vendedorId");
    setUserName("");
    setIsVendedor(false);
    navigate("/"); // Redireciona para a página inicial
  };

  // Função que permite apenas vendedores acessarem a página de venda
  const handleSellClick = () => {
    if (isVendedor) {
      navigate("/sellpage"); // Redireciona para a página de vendas
    } else {
      alert("Você precisa ser um vendedor para acessar esta página.");
    }
  };

  const handleProfileClick = () => {
    navigate("/vendedorpage"); // Redireciona para a página do vendedor
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="nav">
          <ul>
            <li className="header-text">
              <Link to="/search">Comprar</Link>
            </li>
            <li className="header-text">
              <a href="#" onClick={handleSellClick}>
                Vender
              </a>
            </li>
            <li className="header-text">
              <Link to="/help">Ajuda</Link>
            </li>
          </ul>
        </nav>
        <div className="login">
          {userName ? (
            <div className="user-menu">
              {isVendedor ? (
                <div className="dropdown">
                  <button className="profile-btn" onClick={handleProfileClick}>
                    Meu Perfil
                  </button>
                  <div className="dropdown-content">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              ) : (
                <div>
                  <span>Bem-vindo, {userName}</span>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>
              Entrar
            </button>
          )}
        </div>
      </header>

      {/* Main Banner Section */}
      <section className="banner-section">
        <img src={banner} alt="Banner" />
        <div className="search-container">
          <input
            type="text"
            placeholder="Digite marca ou modelo do carro"
            className="search-input"
            value={searchInput}
            onChange={handleSearchChange}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((item, index) => (
                <li key={index} onClick={() => suggestionSelected(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
          <button
            className="search-btn"
            onClick={() =>
              navigate("/search", { state: { searchItem: selectedItem } })
            }
          >
            Ver Ofertas
          </button>
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
