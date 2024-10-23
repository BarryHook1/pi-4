import React, { useState } from 'react';
import './SignupPage.css';  // Importando o CSS para estilização

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de cadastro
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Senha:', password);
    // Aqui você pode adicionar a lógica de envio para o backend
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
      </form>
    </div>
  );
}

export default SignupPage;