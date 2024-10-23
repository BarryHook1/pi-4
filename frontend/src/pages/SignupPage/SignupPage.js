import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Para redirecionar após o cadastro
import './SignupPage.css';  // Importando o CSS para estilização

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Hook de navegação para redirecionar

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password })  // Enviando dados ao backend
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Usuário registrado com sucesso!');
        // Redirecionar para a HomePage após cadastro
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setMessage(data.message || 'Erro ao registrar usuário');
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
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
        <button type="submit">Cadastrar</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default SignupPage;