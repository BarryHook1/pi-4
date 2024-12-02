import React, { useState, useEffect } from "react";
import "./search.css";
import { useLocation, Link } from "react-router-dom"; // Importar 'Link'

export const carBrandsWithModels = {
  Chevrolet: [
    "Celta",
    "Corsa",
    "Prisma",
    "Onix",
    "Onix Plus",
    "Spin",
    "Tracker",
    "Cruze",
    "Cruze Sport6",
    "Montana",
    "S10",
    "Blazer",
    "Trailblazer",
    "Captiva",
    "Astra",
    "Vectra",
    "Omega",
    "Cobalt",
    "Meriva",
    "Zafira",
    "Agile",
    "Kadett",
    "Opala",
    "Chevette",
    "Monza",
  ],
  Fiat: [
    "Uno",
    "Palio",
    "Palio Weekend",
    "Siena",
    "Grand Siena",
    "Strada",
    "Toro",
    "Mobi",
    "Argo",
    "Cronos",
    "Fiorino",
    "Doblò",
    "Idea",
    "Linea",
    "Bravo",
    "Punto",
    "500",
    "Stilo",
    "Tempra",
    "Tipo",
    "Ducato",
    "147",
    "Oggi",
    "Premio",
    "Elba",
  ],
  Ford: [
    "Ka",
    "Ka Sedan",
    "Fiesta",
    "Fiesta Sedan",
    "EcoSport",
    "Fusion",
    "Focus",
    "Focus Sedan",
    "Ranger",
    "Maverick",
    "Corcel",
    "Del Rey",
    "Escort",
    "Verona",
    "Belina",
    "Pampa",
    "F-1000",
    "F-250",
    "Mustang",
    "Edge",
    "Territory",
  ],
  Honda: [
    "Civic",
    "Fit",
    "City",
    "HR-V",
    "WR-V",
    "CR-V",
    "Accord",
    "NSX",
    "Prelude",
    "Odyssey",
    "Passport",
  ],
  Hyundai: [
    "HB20",
    "HB20S",
    "Creta",
    "Tucson",
    "Santa Fe",
    "i30",
    "Elantra",
    "Azera",
    "Vera Cruz",
    "IX35",
    "Sonata",
    "Galloper",
  ],
  Mitsubishi: [
    "Lancer",
    "ASX",
    "Outlander",
    "Pajero TR4",
    "Pajero Full",
    "Pajero Sport",
    "Eclipse Cross",
    "L200 Triton",
    "Eclipse",
    "Galant",
    "Mirage",
  ],
  Renault: [
    "Kwid",
    "Sandero",
    "Logan",
    "Duster",
    "Oroch",
    "Captur",
    "Megane",
    "Fluence",
    "Scenic",
    "Clio",
    "Symbol",
    "Safrane",
    "Master",
    "Kangoo",
    "Twingo",
  ],
  Toyota: [
    "Corolla",
    "Corolla Cross",
    "Yaris",
    "Yaris Sedan",
    "Etios",
    "Etios Sedan",
    "Hilux",
    "SW4",
    "Camry",
    "Prius",
    "RAV4",
    "Land Cruiser",
    "FJ Cruiser",
    "Bandeirante",
  ],
  Volkswagen: [
    "Fusca",
    "Gol",
    "Voyage",
    "Parati",
    "Saveiro",
    "Kombi",
    "Brasília",
    "Santana",
    "Passat",
    "Pointer",
    "Apollo",
    "Fox",
    "SpaceFox",
    "Polo",
    "Golf",
    "Jetta",
    "Virtus",
    "Tiguan",
    "T-Cross",
    "Taos",
    "Amarok",
    "SP2",
    "CrossFox",
    "Nivus",
    "Up!",
    "Passat Variant",
    "Passat CC",
    "Bora",
    "Constellation",
    "Sharan",
    "Touareg",
    "Eos",
  ],
};

const partCategories = {
  "Motor e Sistema de Alimentação": [
    "Bloco do motor",
    "Cabeçote",
    "Velas de ignição",
    "Pistões",
    "Anéis de pistão",
    "Bielas",
    "Virabrequim",
    "Cárter",
    "Coletor de admissão",
    "Filtro de ar",
    "Turbocompressor",
    "Intercooler",
    "Injetores de combustível",
    "Bomba de combustível",
    "Filtro de combustível",
    "Válvulas de admissão e escape",
    "Corrente de distribuição",
    "Correia dentada",
    "Tuchos hidráulicos",
    "Radiador",
    "Ventoinha",
    "Termostato",
    "Bomba d’água",
    "Mangueiras de radiador",
    "Reservatório de expansão",
  ],
  "Transmissão e Embreagem": [
    "Caixa de câmbio (manual ou automática)",
    "Embreagem",
    "Disco de embreagem",
    "Placa de pressão",
    "Rolamento de embreagem",
    "Cabo de embreagem",
    "Conversor de torque",
    "Eixo de transmissão",
    "Diferencial",
    "Cardã",
    "Semi-eixos",
    "Juntas homocinéticas",
  ],
  Suspensão: [
    "Amortecedores",
    "Molas helicoidais",
    "Molas a ar",
    "Barras estabilizadoras",
    "Braços de suspensão",
    "Buchas de suspensão",
    "Pivôs de suspensão",
    "Bieletas",
    "Mancais de roda",
    "Rolamentos de roda",
    "Batentes de suspensão",
  ],
  Freios: [
    "Discos de freio",
    "Pastilhas de freio",
    "Tambor de freio",
    "Sapatas de freio",
    "Cilindro mestre",
    "Servo-freio",
    "Cilindro de roda",
    "Pinças de freio",
    "Fios e cabos de freio",
    "Mangueiras de freio",
    "Fluido de freio",
    "ABS (Sistema de freio antibloqueio)",
  ],
  Direção: [
    "Caixa de direção (mecânica ou hidráulica)",
    "Coluna de direção",
    "Volante",
    "Braços de direção",
    "Barras de direção",
    "Caixa de direção elétrica (EPS)",
    "Juntas universais de direção",
    "Bomba da direção hidráulica",
    "Reservatório de fluido de direção",
    "Manga de eixo",
  ],
  "Rodas e Pneus": [
    "Rodas",
    "Pneus",
    "Câmaras de ar (para pneus com câmaras)",
    "Calotas",
    "Parafusos de roda",
    "Porcas de roda",
    "Macaco hidráulico",
    "Estepe",
    "Sensor de pressão dos pneus (TPMS)",
  ],
  "Sistema Elétrico": [
    "Alternador",
    "Bateria",
    "Motor de arranque",
    "Relés",
    "Fusíveis",
    "Caixa de fusíveis",
    "Velas de ignição",
    "Cabos de vela",
    "Chicote elétrico",
    "Central de injeção eletrônica (ECU)",
    "Sensor de oxigênio (sonda lambda)",
    "Sensor de temperatura",
    "Sensor de rotação",
    "Sensor MAP",
    "Sensor MAF",
    "Bobinas de ignição",
    "Interruptores e chaves (faróis, vidro elétrico, etc.)",
  ],
  "Iluminação e Sinalização": [
    "Faróis dianteiros",
    "Lâmpadas de farol",
    "Lanternas traseiras",
    "Faróis de neblina",
    "Pisca-pisca",
    "Luz de ré",
    "Luz de freio",
    "Luz de placa",
    "Farol alto/baixo",
    "Faróis de LED ou Xenon",
    "Refletores traseiros",
  ],
  "Interior e Acessórios": [
    "Painel de instrumentos",
    "Bancos",
    "Cintos de segurança",
    "Volante",
    "Alavanca de câmbio",
    "Pedais (acelerador, freio, embreagem)",
    "Tapetes automotivos",
    "Porta-luvas",
    "Console central",
    "Ar-condicionado",
    "Aquecedor",
    "Sistema de som",
    "Central multimídia",
    "Retrovisores internos",
    "Retrovisores externos",
    "Vidros elétricos",
    "Travas elétricas",
    "Chave de ignição",
    "Airbags",
  ],
  "Carroceria e Estrutura": [
    "Parachoques",
    "Capô",
    "Portas",
    "Porta-malas",
    "Paralamas",
    "Teto solar",
    "Pára-brisas",
    "Vidros laterais",
    "Vidro traseiro",
    "Retrovisores",
    "Estrutura do chassi",
    "Assoalho",
    "Colunas A, B e C",
    "Vigas de impacto lateral",
  ],
  "Sistema de Escape": [
    "Escapamento",
    "Catalisador",
    "Sonda lambda",
    "Silenciador",
    "Coletor de escape",
    "Tubo intermediário",
    "Filtro de partículas (DPF)",
  ],
  "Outros Componentes": [
    "Reservatório de óleo",
    "Macaco",
    "Triângulo de sinalização",
    "Extintor de incêndio",
    "Limpadores de para-brisa",
    "Palhetas",
    "Reservatório de fluido de para-brisa",
    "Buzina",
  ],
};

const SearchPage = () => {
  const location = useLocation();

  // Estados para os filtros selecionados
  const [selectedBrand, setSelectedBrand] = useState(""); // Agora apenas uma marca
  const [selectedModel, setSelectedModel] = useState(""); // Agora apenas um modelo
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);

  // Estado para os produtos
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();

    // Se houver um item pesquisado, pré-selecionar os filtros
    if (location.state && location.state.searchItem) {
      const searchItem = location.state.searchItem;
      // Verificar se o item é uma marca
      if (carBrandsWithModels[searchItem]) {
        setSelectedBrand(searchItem);
      } else {
        // Verificar se o item é um modelo
        const foundBrand = Object.keys(carBrandsWithModels).find((brand) =>
          carBrandsWithModels[brand].includes(searchItem)
        );
        if (foundBrand) {
          setSelectedBrand(foundBrand);
          setSelectedModel(searchItem);
        }
      }
    }
  }, [location.state]);

  //lida com estados de janelas inicialmente retraídas
  const [expandedCategories, setExpandedCategories] = useState({
    brand: true, // Marca está aberta inicialmente
    model: false,
    condition: true, //condição está inicialmente aberta
    ...Object.keys(partCategories).reduce((acc, category) => {
      acc[category] = false; // Todas as outras categorias iniciam fechadas
      return acc;
    }, {}),
  });
  //alterna entre estado fechado e aberto da aba de filtro
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category], // Inverte o estado da categoria clicada
    }));
  };

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();

      console.log("Fetched products:", data); // Debug log to inspect response

      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Expected an array of products, received:", data);
        setProducts([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProducts([]); // Fallback to an empty array in case of error
    }
  };

  // Função para lidar com mudanças nos filtros
  const handleFilterChange = (e) => {
    const { value, checked, dataset } = e.target;
    const filterType = dataset.filterType;

    if (filterType === "brand") {
      if (checked) {
        setSelectedBrand(value);
        setSelectedModel(""); // Limpar modelo ao selecionar nova marca
      } else {
        setSelectedBrand("");
        setSelectedModel("");
      }
    } else if (filterType === "model") {
      if (checked) {
        setSelectedModel(value);
      } else {
        setSelectedModel("");
      }
    } else if (filterType === "condition") {
      setSelectedCondition((prev) =>
        checked ? [...prev, value] : prev.filter((c) => c !== value)
      );
    } else if (filterType === "part") {
      setSelectedParts((prev) =>
        checked ? [...prev, value] : prev.filter((p) => p !== value)
      );
    }
  };

  // Filtrar os produtos com base nos filtros selecionados
  const filteredProducts = products.filter((product) => {
    const brandMatch = !selectedBrand || product.carBrand === selectedBrand;
    const modelMatch = !selectedModel || product.carModel === selectedModel;
    const conditionMatch =
      selectedCondition.length === 0 ||
      selectedCondition.includes(product.condition);
    const partMatch =
      selectedParts.length === 0 || selectedParts.includes(product.typePart);
    return brandMatch && modelMatch && conditionMatch && partMatch;
  });

  // Função para limpar os filtros
  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedCondition([]);
    setSelectedParts([]);
    // Desmarcar todas as checkboxes
    const checkboxes = document.querySelectorAll(
      '.sidebar input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  };

  return (
    <div className="search-page">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Marcas de Carro */}
        <h2
          onClick={() => toggleCategory("brand")}
          className={`clickable-header ${
            expandedCategories.brand ? "" : "collapsed"
          }`}
        >
          Marcas de Carro
          <span
            className={`arrow ${expandedCategories.brand ? "down" : "right"}`}
          >
            ▼
          </span>
        </h2>
        {expandedCategories.brand &&
          (selectedBrand === "" ? (
            Object.keys(carBrandsWithModels).map((brand) => (
              <label key={brand}>
                <input
                  type="checkbox"
                  value={brand}
                  data-filter-type="brand"
                  onChange={handleFilterChange}
                  checked={selectedBrand === brand}
                />
                {brand}
              </label>
            ))
          ) : (
            <label>
              <input
                type="checkbox"
                value={selectedBrand}
                data-filter-type="brand"
                onChange={handleFilterChange}
                checked={true}
              />
              {selectedBrand}
            </label>
          ))}

        {/* Modelos de Carro */}
        {selectedBrand && (
          <div className="car-models">
            <h2>Modelos</h2>
            <div className="brand-models visible">
              {selectedModel === "" ? (
                carBrandsWithModels[selectedBrand].map((model) => (
                  <label key={model}>
                    <input
                      type="checkbox"
                      value={model}
                      data-filter-type="model"
                      onChange={handleFilterChange}
                      checked={selectedModel === model}
                    />
                    {model}
                  </label>
                ))
              ) : (
                <label>
                  <input
                    type="checkbox"
                    value={selectedModel}
                    data-filter-type="model"
                    onChange={handleFilterChange}
                    checked={true}
                  />
                  {selectedModel}
                </label>
              )}
            </div>
          </div>
        )}

        {/* Estado da Peça */}
        <h2
          onClick={() => toggleCategory("condition")}
          className={`clickable-header ${
            expandedCategories.condition ? "" : "collapsed"
          }`}
        >
          Peças Novas ou Usadas
          <span
            className={`arrow ${
              expandedCategories.condition ? "down" : "right"
            }`}
          >
            ▼
          </span>
        </h2>
        {expandedCategories.condition && (
          <div className="part-condition">
            <label>
              <input
                type="checkbox"
                value="nova"
                data-filter-type="condition"
                onChange={handleFilterChange}
                checked={selectedCondition.includes("nova")}
              />{" "}
              Novas
            </label>
            <label>
              <input
                type="checkbox"
                value="usada"
                data-filter-type="condition"
                onChange={handleFilterChange}
                checked={selectedCondition.includes("usada")}
              />{" "}
              Usadas
            </label>
          </div>
        )}

        {/* Tipo de Peça */}
        <h2
          onClick={() => toggleCategory("parts")}
          className={`clickable-header ${
            expandedCategories.parts ? "" : "collapsed"
          }`}
        >
          Tipo de Peça
          <span
            className={`arrow ${expandedCategories.parts ? "down" : "right"}`}
          >
            ▼
          </span>
        </h2>
        {expandedCategories.parts ? (
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
                      checked={selectedParts.includes(part)}
                    />
                    {part}
                  </label>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="selected-parts">
            {selectedParts.length > 0 ? (
              selectedParts.map((part) => <span key={part}>{part}</span>)
            ) : (
              <p>Nenhum item selecionado</p>
            )}
          </div>
        )}

        <div className="clear-button-container">
          <button type="button" className="clear-button" onClick={clearFilters}>
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Área principal para exibição dos produtos */}
      <div className="product-area">
        <h1>Peças Disponíveis</h1>
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="product-card-link"
              >
                <div className="product-card">
                  {/* Aqui você pode exibir as informações do produto */}
                  <h3>{product.typePart}</h3>
                  <p>
                    <strong>Marca do Carro: </strong> {product.carBrand}
                  </p>
                  <p>
                    <strong>Modelo do Carro: </strong> {product.carModel}
                  </p>
                  <p>
                    <strong>Ano: </strong> {product.yearFrom} - {product.yearTo}
                  </p>
                  <p>
                    <strong>Condição: </strong> {product.condition}
                  </p>
                  <p>
                    <strong>Descrição: </strong> {product.description}
                  </p>
                  <p>
                    <strong>Quantidade em Estoque: </strong> {product.stock}
                  </p>
                  <p>
                    <strong>Vendedor: </strong> {product.vendedor.name}
                  </p>
                  <p>
                    <strong>Preço: </strong> R$ {product.price}
                  </p>
                </div>
              </Link>
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
