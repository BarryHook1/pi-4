import React, { useState } from 'react';
import './login.css';  
import { useNavigate } from 'react-router-dom';  

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })  // Enviar email e senha ao backend
      });

      const data = await response.json();
      if (response.ok) {
        // Armazenar o nome do usuário, o vendedorId e o status de vendedor no localStorage
        localStorage.setItem('userName', data.name);
        localStorage.setItem('vendedorId', data.userId);  // Adicionando o vendedorId ao localStorage
        localStorage.setItem('vendedor', data.vendedor);  // Armazenando o status de vendedor
        navigate('/');  // Redireciona para a página inicial
      } else {
        setMessage(data.message || 'Erro ao fazer login');
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Entrar</button>
        {message && <p>{message}</p>}
      </form>

      <div className="signup-link">
        <p>Não tem cadastro?</p>
        <button onClick={() => navigate('/signup')}>Cadastre-se</button> {/* Redireciona para a página de cadastro */}
      </div>
    </div>
  );
}

export default LoginPage;