import React, { useState, useEffect } from 'react';
import './search.css';

const carBrandsWithModels = {
    Chevrolet: [
        'Celta', 'Corsa', 'Prisma', 'Onix', 'Onix Plus', 'Spin', 'Tracker', 'Cruze', 'Cruze Sport6', 
        'Montana', 'S10', 'Blazer', 'Trailblazer', 'Captiva', 'Astra', 'Vectra', 'Omega', 'Cobalt', 
        'Meriva', 'Zafira', 'Agile', 'Kadett', 'Opala', 'Chevette', 'Monza'
    ],
    Fiat: [
        'Uno', 'Palio', 'Palio Weekend', 'Siena', 'Grand Siena', 'Strada', 'Toro', 'Mobi', 
        'Argo', 'Cronos', 'Fiorino', 'Doblò', 'Idea', 'Linea', 'Bravo', 'Punto', '500', 'Stilo', 
        'Tempra', 'Tipo', 'Ducato', '147', 'Oggi', 'Premio', 'Elba'
    ],
    Ford: [
        'Ka', 'Ka Sedan', 'Fiesta', 'Fiesta Sedan', 'EcoSport', 'Fusion', 'Focus', 'Focus Sedan', 
        'Ranger', 'Maverick', 'Corcel', 'Del Rey', 'Escort', 'Verona', 'Belina', 'Pampa', 'F-1000', 
        'F-250', 'Mustang', 'Edge', 'Territory'
    ],
    Honda: [
        'Civic', 'Fit', 'City', 'HR-V', 'WR-V', 'CR-V', 'Accord', 'NSX', 'Prelude', 'Odyssey', 
        'Passport'
    ],
    Hyundai: [
        'HB20', 'HB20S', 'Creta', 'Tucson', 'Santa Fe', 'i30', 'Elantra', 'Azera', 'Vera Cruz', 
        'IX35', 'Sonata', 'Galloper'
    ],
    Mitsubishi: [
        'Lancer', 'ASX', 'Outlander', 'Pajero TR4', 'Pajero Full', 'Pajero Sport', 'Eclipse Cross', 
        'L200 Triton', 'Eclipse', 'Galant', 'Mirage'
    ],
    Renault: [
        'Kwid', 'Sandero', 'Logan', 'Duster', 'Oroch', 'Captur', 'Megane', 'Fluence', 'Scenic', 
        'Clio', 'Symbol', 'Safrane', 'Master', 'Kangoo', 'Twingo'
    ],
    Toyota: [
        'Corolla', 'Corolla Cross', 'Yaris', 'Yaris Sedan', 'Etios', 'Etios Sedan', 'Hilux', 'SW4', 
        'Camry', 'Prius', 'RAV4', 'Land Cruiser', 'FJ Cruiser', 'Bandeirante'
    ],
    Volkswagen: [
        'Fusca', 'Gol', 'Voyage', 'Parati', 'Saveiro', 'Kombi', 'Brasília', 'Santana', 'Passat', 
        'Pointer', 'Apollo', 'Fox', 'SpaceFox', 'Polo', 'Golf', 'Jetta', 'Virtus', 'Tiguan', 'T-Cross', 
        'Taos', 'Amarok', 'SP2', 'CrossFox', 'Nivus', 'Up!', 'Passat Variant', 'Passat CC', 'Bora', 
        'Constellation', 'Sharan', 'Touareg', 'Eos'
    ]
};

const partCategories = {
    'Motor e Sistema de Alimentação': [
        'Bloco do motor', 'Cabeçote', 'Velas de ignição', 'Pistões', 'Anéis de pistão', 'Bielas',
        'Virabrequim', 'Cárter', 'Coletor de admissão', 'Filtro de ar', 'Turbocompressor', 
        'Intercooler', 'Injetores de combustível', 'Bomba de combustível', 'Filtro de combustível',
        'Válvulas de admissão e escape', 'Corrente de distribuição', 'Correia dentada', 'Tuchos hidráulicos',
        'Radiador', 'Ventoinha', 'Termostato', 'Bomba d’água', 'Mangueiras de radiador', 'Reservatório de expansão'
    ],
    'Transmissão e Embreagem': [
        'Caixa de câmbio (manual ou automática)', 'Embreagem', 'Disco de embreagem', 'Placa de pressão', 
        'Rolamento de embreagem', 'Cabo de embreagem', 'Conversor de torque', 'Eixo de transmissão', 
        'Diferencial', 'Cardã', 'Semi-eixos', 'Juntas homocinéticas'
    ],
    'Suspensão': [
        'Amortecedores', 'Molas helicoidais', 'Molas a ar', 'Barras estabilizadoras', 
        'Braços de suspensão', 'Buchas de suspensão', 'Pivôs de suspensão', 'Bieletas', 
        'Mancais de roda', 'Rolamentos de roda', 'Batentes de suspensão'
    ],
    'Freios': [
        'Discos de freio', 'Pastilhas de freio', 'Tambor de freio', 'Sapatas de freio', 'Cilindro mestre',
        'Servo-freio', 'Cilindro de roda', 'Pinças de freio', 'Fios e cabos de freio', 
        'Mangueiras de freio', 'Fluido de freio', 'ABS (Sistema de freio antibloqueio)'
    ],
    'Direção': [
        'Caixa de direção (mecânica ou hidráulica)', 'Coluna de direção', 'Volante', 
        'Braços de direção', 'Barras de direção', 'Caixa de direção elétrica (EPS)', 
        'Juntas universais de direção', 'Bomba da direção hidráulica', 
        'Reservatório de fluido de direção', 'Manga de eixo'
    ],
    'Rodas e Pneus': [
        'Rodas', 'Pneus', 'Câmaras de ar (para pneus com câmaras)', 'Calotas', 'Parafusos de roda', 
        'Porcas de roda', 'Macaco hidráulico', 'Estepe', 'Sensor de pressão dos pneus (TPMS)'
    ],
    'Sistema Elétrico': [
        'Alternador', 'Bateria', 'Motor de arranque', 'Relés', 'Fusíveis', 'Caixa de fusíveis', 
        'Velas de ignição', 'Cabos de vela', 'Chicote elétrico', 'Central de injeção eletrônica (ECU)', 
        'Sensor de oxigênio (sonda lambda)', 'Sensor de temperatura', 'Sensor de rotação', 
        'Sensor MAP', 'Sensor MAF', 'Bobinas de ignição', 'Interruptores e chaves (faróis, vidro elétrico, etc.)'
    ],
    'Iluminação e Sinalização': [
        'Faróis dianteiros', 'Lâmpadas de farol', 'Lanternas traseiras', 'Faróis de neblina', 'Pisca-pisca',
        'Luz de ré', 'Luz de freio', 'Luz de placa', 'Farol alto/baixo', 'Faróis de LED ou Xenon', 
        'Refletores traseiros'
    ],
    'Interior e Acessórios': [
        'Painel de instrumentos', 'Bancos', 'Cintos de segurança', 'Volante', 
        'Alavanca de câmbio', 'Pedais (acelerador, freio, embreagem)', 'Tapetes automotivos', 
        'Porta-luvas', 'Console central', 'Ar-condicionado', 'Aquecedor', 'Sistema de som', 
        'Central multimídia', 'Retrovisores internos', 'Retrovisores externos', 
        'Vidros elétricos', 'Travas elétricas', 'Chave de ignição', 'Airbags'
    ],
    'Carroceria e Estrutura': [
        'Parachoques', 'Capô', 'Portas', 'Porta-malas', 'Paralamas', 'Teto solar', 
        'Pára-brisas', 'Vidros laterais', 'Vidro traseiro', 'Retrovisores', 
        'Estrutura do chassi', 'Assoalho', 'Colunas A, B e C', 'Vigas de impacto lateral'
    ],
    'Sistema de Escape': [
        'Escapamento', 'Catalisador', 'Sonda lambda', 'Silenciador', 'Coletor de escape', 
        'Tubo intermediário', 'Filtro de partículas (DPF)'
    ],
    'Outros Componentes': [
        'Reservatório de óleo', 'Macaco', 'Triângulo de sinalização', 'Extintor de incêndio', 
        'Limpadores de para-brisa', 'Palhetas', 'Reservatório de fluido de para-brisa', 'Buzina'
    ]
};

const SearchPage = () => {
  // Estados para os filtros selecionados
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);

  // Estado para os produtos
  const [products, setProducts] = useState([]);

  // useEffect para buscar os produtos quando o componente monta
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para buscar os produtos do backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Função para lidar com mudanças nos filtros
  const handleFilterChange = (e) => {
    const { value, checked, dataset } = e.target;
    const filterType = dataset.filterType;

    if (filterType === 'brand') {
      setSelectedBrands((prev) => {
        const updatedBrands = checked ? [...prev, value] : prev.filter((b) => b !== value);
        // Se a marca for desmarcada, remover os modelos correspondentes
        if (!checked) {
          setSelectedModels((prevModels) => prevModels.filter((model) => !carBrandsWithModels[value].includes(model)));
        }
        return updatedBrands;
      });
    } else if (filterType === 'model') {
      setSelectedModels((prev) => (checked ? [...prev, value] : prev.filter((m) => m !== value)));
    } else if (filterType === 'condition') {
      setSelectedCondition((prev) => (checked ? [...prev, value] : prev.filter((c) => c !== value)));
    } else if (filterType === 'part') {
      setSelectedParts((prev) => (checked ? [...prev, value] : prev.filter((p) => p !== value)));
    }
  };

  // Filtrar os produtos com base nos filtros selecionados
  const filteredProducts = products.filter((product) => {
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.carBrand);
    const modelMatch = selectedModels.length === 0 || selectedModels.includes(product.carModel);
    const conditionMatch = selectedCondition.length === 0 || selectedCondition.includes(product.condition);
    const partMatch = selectedParts.length === 0 || selectedParts.includes(product.typePart);
    return brandMatch && modelMatch && conditionMatch && partMatch;
  });

  return (
    <div className="search-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Marcas de Carro</h2>
        <div className="car-brands">
          {Object.keys(carBrandsWithModels).map((brand) => (
            <label key={brand}>
              <input
                type="checkbox"
                value={brand}
                data-filter-type="brand"
                onChange={handleFilterChange}
              />
              {brand}
            </label>
          ))}
        </div>

        {selectedBrands.length > 0 && (
          <div className="car-models">
            <h2>Modelos</h2>
            {selectedBrands.map((brand) => (
              <div key={brand}>
                <h3>{brand}</h3>
                {carBrandsWithModels[brand].map((model) => (
                  <label key={model}>
                    <input
                      type="checkbox"
                      value={model}
                      data-filter-type="model"
                      onChange={handleFilterChange}
                    />
                    {model}
                  </label>
                ))}
              </div>
            ))}
          </div>
        )}

        <h2>Peças Novas ou Usadas</h2>
        <div className="part-condition">
          <label>
            <input
              type="checkbox"
              value="nova"
              data-filter-type="condition"
              onChange={handleFilterChange}
            />{' '}
            Novas
          </label>
          <label>
            <input
              type="checkbox"
              value="usada"
              data-filter-type="condition"
              onChange={handleFilterChange}
            />{' '}
            Usadas
          </label>
        </div>

        <h2>Peças</h2>
        <div className="part-categories">
          {Object.keys(partCategories).map((category) => (
            <div key={category}>
              <h3>{category}</h3>
              {partCategories[category].map((part) => (
                <label key={part}>
                  <input
                    type="checkbox"
                    value={part}
                    data-filter-type="part"
                    onChange={handleFilterChange}
                  />
                  {part}
                </label>
              ))}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="clear-button"
          onClick={() => {
            // Lógica para limpar os filtros
            setSelectedBrands([]);
            setSelectedModels([]);
            setSelectedCondition([]);
            setSelectedParts([]);
            // Desmarcar todas as checkboxes
            const checkboxes = document.querySelectorAll('.sidebar input[type="checkbox"]');
            checkboxes.forEach((checkbox) => (checkbox.checked = false));
          }}
        >
          Limpar Filtros
        </button>
      </div>

      {/* Área principal para exibição dos produtos */}
      <div className="product-area">
        <h1>Peças Disponíveis</h1>
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                {/* Aqui você pode exibir as informações do produto */}
                <h3>{product.typePart}</h3>
                <p>
                  <strong>Marca do Carro:</strong> {product.carBrand}
                </p>
                <p>
                  <strong>Modelo do Carro:</strong> {product.carModel}
                </p>
                <p>
                  <strong>Ano:</strong> {product.yearFrom} - {product.yearTo}
                </p>
                <p>
                  <strong>Condição:</strong> {product.condition}
                </p>
                <p>
                  <strong>Descrição:</strong> {product.description}
                </p>
                <p>
                  <strong>Quantidade em Estoque:</strong> {product.stock}
                </p>
                <p>
                  <strong>Vendedor:</strong> {product.vendedor.name}
                </p>
              </div>
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;