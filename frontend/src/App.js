import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importando Routes e Route
import './App.css';
import HomePage from './pages/homepage/home';
import LoginPage from './pages/login/login';  // Importando a página de Login
import SignupPage from './pages/SignupPage/SignupPage';  // Importando a página de Cadastro
import SearchPage from './pages/searchpage/search';
import SellPage from './pages/sellpage/sellpage';
import VendedorPage from './pages/vendedorpage/vendedorpage';
import ProductDetail from './pages/productdetailpage/ProductDetail';
import HelpPage from './pages/helppage/helppage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>  {/* Envolver Route dentro de Routes */}
          <Route path="/" element={<HomePage />} />  {/* Rota para a HomePage */}
          <Route path="/login" element={<LoginPage />} />  {/* Rota para a LoginPage */}
          <Route path="/signup" element={<SignupPage />} />  {/* Rota para a SignupPage */}
          <Route path="/search" element={<SearchPage />} />  {/* Rota para a SearchPage */}
          <Route path="/sellpage" element={<SellPage />} />  {/* Rota para a SellPage */}
          <Route path="/vendedorpage" element={<VendedorPage />} />  {/* Rota para a VendedorPage */}
          <Route path="/help" element={<HelpPage />} /> {/* Rota para a página de ajuda */}
          <Route path="/product/:productId" element={<ProductDetail />} />     
        </Routes>
      </Router>
    </div>
  );
}

export default App;