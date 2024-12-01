// header.js
import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./header.css";
import { AuthContext } from "../../hooks/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Importamos useLocation para obter a rota atual
  const { userName, isVendedor, logout } = useContext(AuthContext);

  // Verifica se a rota atual é a página inicial
  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSellClick = () => {
    if (isVendedor) {
      navigate("/sellpage");
    } else {
      alert("Você precisa ser um vendedor para acessar esta página.");
    }
  };

  const handleProfileClick = () => {
    navigate("/vendedorpage");
  };

  return (
    // Adicionamos a classe 'home-header' se estivermos na página inicial
    <header className={`header fixed-header ${isHomePage ? "home-header" : ""}`}>
      <div className="Logo" onClick={() => navigate("/")}>
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
          {userName && (
            <li className="header-text">
              <Link to="/purchase-history">Minhas Compras</Link>
            </li>
          )}
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
  );
};

export default Header;