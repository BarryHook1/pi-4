import React, { useState } from 'react';
import './search.css';

const SearchPage = () => {
  // Estado para os filtros selecionados
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);

  // Função para lidar com mudanças nos filtros
  const handleFilterChange = () => {
    // Atualizar os produtos filtrados aqui
  };

  return (
    <div className="search-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Marcas de Carro</h2>
        <div className="car-brands">
          <label><input type="checkbox" value="chevrolet" onChange={handleFilterChange}/> Chevrolet</label>
          <label><input type="checkbox" value="fiat" onChange={handleFilterChange}/> Fiat</label>
          <label><input type="checkbox" value="ford" onChange={handleFilterChange}/> Ford</label>
          <label><input type="checkbox" value="honda" onChange={handleFilterChange}/> Honda</label>
          <label><input type="checkbox" value="hyundai" onChange={handleFilterChange}/> Hyundai</label>
          <label><input type="checkbox" value="mitsubishi" onChange={handleFilterChange}/> Mitsubishi</label>
          <label><input type="checkbox" value="renault" onChange={handleFilterChange}/> Renault</label>
          <label><input type="checkbox" value="toyota" onChange={handleFilterChange}/> Toyota</label>
          <label><input type="checkbox" value="volkswagen" onChange={handleFilterChange}/> Volkswagen</label>
        </div>

        <h2>Peças Novas ou Usadas</h2>
        <div className="part-condition">
          <label><input type="checkbox" value="new" onChange={handleFilterChange}/> Novas</label>
          <label><input type="checkbox" value="used" onChange={handleFilterChange}/> Usadas</label>
        </div>

        <h2>Peças Essenciais</h2>
        <div className="essential-parts">
          <label><input type="checkbox" value="motor" onChange={handleFilterChange}/> Motor</label>
          <label><input type="checkbox" value="turbina" onChange={handleFilterChange}/> Turbina</label>
          <label><input type="checkbox" value="bomba-agua" onChange={handleFilterChange}/> Bomba de Água</label>
          <label><input type="checkbox" value="rodas" onChange={handleFilterChange}/> Rodas</label>
          <label><input type="checkbox" value="pneus" onChange={handleFilterChange}/> Pneus</label>
          <label><input type="checkbox" value="filtro-oleo" onChange={handleFilterChange}/> Filtro de Óleo</label>
          <label><input type="checkbox" value="bateria" onChange={handleFilterChange}/> Bateria</label>
          <label><input type="checkbox" value="freios" onChange={handleFilterChange}/> Freios</label>
        </div>

        <button type="button" className="clear-button" onClick={() => {
          // Lógica para limpar os filtros
          setSelectedBrands([]);
          setSelectedCondition([]);
          setSelectedParts([]);
        }}>Limpar Filtros</button>
      </div>

      {/* Área principal para exibição dos produtos */}
      <div className="product-area">
        <h1>Peças Disponíveis</h1>
        {/* Aqui você pode adicionar a lógica para exibir os produtos filtrados */}
      </div>
    </div>
  );
};

export default SearchPage;