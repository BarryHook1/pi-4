import React, { useState } from 'react';
import './login.css';  // Importar o arquivo CSS para estilização
import { useNavigate } from 'react-router-dom';  // Para redirecionamento

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook de navegação

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação
    console.log('Email:', email);
    console.log('Password:', password);
    // Enviar os dados para o backend ou validar localmente
  };

  const handleSignupRedirect = () => {
    navigate('/signup');  // Redireciona para a página de cadastro
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
      </form>

      <div className="signup-link">
        <p>Não tem cadastro?</p>
        <button onClick={handleSignupRedirect}>Cadastre-se</button> {/* Redireciona para a página de cadastro */}
      </div>
    </div>
  );
}

export default LoginPage;