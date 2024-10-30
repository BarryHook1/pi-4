// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './pages/layout/header'; // Ajuste o caminho conforme necessário
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';

// index.js
document.title = "WebPeças";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Header />
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
