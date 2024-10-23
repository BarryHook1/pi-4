import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; 

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('comprador');  // Estado padrão para "comprador"
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Debugging: Mostra o valor do role no console antes de enviar
        console.log('Role selecionado:', role);  // Verifica se o role está sendo atualizado corretamente

        try {
            const isVendedor = role === 'vendedor';  // Converte a string para booleano diretamente aqui

            console.log('Booleano vendedor:', isVendedor);  // Mostra o valor booleano que será enviado ao backend

            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, vendedor: isVendedor })  // Enviando booleano ao backend
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/login');  // Redireciona para o login após cadastro
            } else {
                setMessage(data.message);
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

                <div className="form-group">
                    <label>Tipo de Conta:</label>
                    <div className="role-selection">
                        <label>
                            <input 
                                type="radio" 
                                value="comprador" 
                                checked={role === 'comprador'} 
                                onChange={(e) => setRole(e.target.value)}  // Atualiza o estado corretamente
                            />
                            Comprador
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="vendedor" 
                                checked={role === 'vendedor'} 
                                onChange={(e) => setRole(e.target.value)}  // Atualiza o estado corretamente
                            />
                            Vendedor
                        </label>
                    </div>
                </div>

                <button type="submit">Cadastrar</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default SignupPage;