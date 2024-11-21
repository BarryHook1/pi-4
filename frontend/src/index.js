// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./services/reportWebVitals";
import { AuthProvider } from "./hooks/AuthContext";

// index.js
document.title = "WebPeças";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// Registrar métricas do Web Vitals e exibir no console
reportWebVitals((metric) => {
  console.log(metric); // Loga as métricas no console
});

reportWebVitals();
