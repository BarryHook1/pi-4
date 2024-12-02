import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import "./login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { user } = data; // Extracting the `user` object from the response
        const { name, vendedor, id } = user; // Extracting specific values from the `user` object

        console.log("Resposta front login", data);

        // Call the `login` function from AuthContext with correct values
        login(name, vendedor, id);

        // Navigate to the home page
        navigate("/");
      } else {
        alert(`Erro ao fazer login: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Por favor, tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {/* Formulário de login */}
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <div className="signup-link">
        <p>
          Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
