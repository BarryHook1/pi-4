// Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './layout';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { userName, isVendedor, logout } = useContext(AuthContext);
  
    const handleLogout = () => {
      logout();
      navigate('/');
    };
  
    const handleSellClick = () => {
      if (isVendedor) {
        navigate('/sellpage');
      } else {
        alert('Você precisa ser um vendedor para acessar esta página.');
      }
    };
  
    const handleProfileClick = () => {
      navigate('/vendedorpage');
    };
  
    return (
      <header className="header">
        <div className="logo" onClick={() => navigate('/')}>
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
            <button className="login-btn" onClick={() => navigate('/login')}>
              Entrar
            </button>
          )}
        </div>
      </header>
    );
  };
  
  export default Header;