// home.js
import React, { useState, useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import bmwLogo from "../../assets/bmw.webp";
import bydLogo from "../../assets/byd.webp";
import chevroletLogo from "../../assets/chevrolet.webp";
import renaultLogo from "../../assets/renault.webp";
import banner from "../../assets/banner3.png";
import turbina from "../../assets/turbina.jpeg";
import paddle from "../../assets/paddle.jpg";
// Importar as marcas e modelos
import { carBrandsWithModels } from "../searchpage/search"; // Ajuste o caminho conforme necessário

const HomePage = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // Selecionar 3 produtos aleatórios
        const shuffled = data.sort(() => 0.5 - Math.random());
        setPopularProducts(shuffled.slice(0, 3));
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Gerar sugestões com base no input
    if (value.length > 0) {
      const allOptions = [
        ...Object.keys(carBrandsWithModels),
        ...Object.values(carBrandsWithModels).flat(),
      ];

      const regex = new RegExp(`^${value}`, "i");
      const newSuggestions = allOptions.sort().filter((v) => regex.test(v));

      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const suggestionSelected = (value) => {
    setSearchInput(value);
    setSuggestions([]);
    setSelectedItem(value);
  };

  return (
    <div className="homepage">
      <section className="banner-section">
        <img src={banner} alt="Banner" />
        <div className="search-container">
          <input
            type="text"
            placeholder="Digite marca ou modelo do carro"
            className="search-input"
            value={searchInput}
            onChange={handleSearchChange}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((item, index) => (
                <li key={index} onClick={() => suggestionSelected(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
          <button
            className="search-btn"
            onClick={() =>
              navigate("/search", { state: { searchItem: selectedItem } })
            }
          >
            Ver Ofertas
          </button>
        </div>
      </section>

      <div className="background-container">
        <section className="official-stores">
          <h3>Lojas Oficiais</h3>
          <div className="store-logos">
            <img src={bmwLogo} alt="BMW" />
            <img src={bydLogo} alt="BYD" />
            <img src={chevroletLogo} alt="Chevrolet" />
            <img src={renaultLogo} alt="Renault" />
          </div>
        </section>
      </div>

      {/* Popular Items Section */}
      <section className="popular-items">
        <h3>Produtos Populares</h3>
        <div className="item-grid">
          {popularProducts.length > 0 ? (
            popularProducts.map((product) => (
              <div className="item-card" key={product._id}>
                {product.images && product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={product.typePart}
                    className="item-image"
                  />
                )}
                <h4>{product.typePart}</h4>
                <p>
                  <strong>Preço:</strong> R$ {product.price}
                </p>
              </div>
            ))
          ) : (
            <p>Carregando produtos populares...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
