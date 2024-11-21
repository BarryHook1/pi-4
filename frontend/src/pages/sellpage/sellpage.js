import React, { useState, useContext } from "react";
import "./sellpage.css";
import { AuthContext } from "../../hooks/AuthContext";

const carBrandsWithModels = {
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
  Outro: [],
};

const SellPage = () => {
  const { userId, isVendedor } = useContext(AuthContext);
  const [typeCategory, setTypeCategory] = useState("");
  const [typePart, setTypePart] = useState("");
  const [stock, setStock] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("nova");
  const [description, setDescription] = useState("");

  const handleCarBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setCarBrand(selectedBrand);
    setCarModel(""); // Limpa o modelo quando muda a marca
  };

  // Armazena o nome da peça personalizada
  const [customPart, setCustomPart] = useState("");

  //validação dos campos
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    //valida estoque
    if (
      !stock || //valor deve ser inserido
      isNaN(stock) || // deve ser um número
      parseInt(stock) <= 0 || //numero inteiro maior que zero
      !Number.isInteger(parseFloat(stock)) //numero não possui casas decimais
    ) {
      newErrors.stock =
        "A quantidade no estoque deve ser um número inteiro maior que zero.";
    }
    const currentYear = new Date().getFullYear(); // Obter o ano atual
    //valida categoria personalizada
    if (typeCategory === "Outro") {
      if (!customPart || customPart.trim().length === 0) {
        //está vazio ou contem apenas espaços
        newErrors.customPart = "O nome da categoria é obrigatório.";
      } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(customPart)) {
        //contem apenas letras (acentuadas) e espaços
        newErrors.customPart =
          "O nome da categoria só pode conter letras e espaços.";
      } else if (customPart.length < 3 || customPart.length > 50) {
        //entre 3 e 50 caracteres
        newErrors.customPart =
          "O nome da categoria deve ter entre 3 e 50 caracteres.";
      }
    }
    //valida ano
    if (
      !yearFrom || // Verifica se o campo está vazio
      isNaN(yearFrom) || // Verifica se não é um número
      parseInt(yearFrom) < 1886 || // Verifica se o ano é menor que 1886
      parseInt(yearFrom) > currentYear // Verifica se o ano é maior que o atual
    ) {
      newErrors.yearFrom = `Ano inicial inválido. Deve ser um ano válido até  ${currentYear}.`;
    }
    if (!yearTo || yearTo < yearFrom)
      newErrors.yearTo = "Ano final deve ser maior ou igual ao ano inicial.";
    //valida preço
    if (
      !price || // Verifica se o campo está vazio
      isNaN(price) || // Verifica se não é um número
      parseFloat(price) <= 0 || // Verifica se o valor é maior que zero
      !/^\d+(\.\d{1,2})?$/.test(price) // Verifica se o formato é válido (até duas casas decimais)
    ) {
      newErrors.price =
        "O preço deve ser um número maior que zero e com até duas casas decimais.";
    }
    //valida descrição
    if (!description || description.trim().length === 0) {
      newErrors.description =
        "A descrição é obrigatória e não pode conter apenas espaços.";
    } else if (description.length > 200) {
      newErrors.description = "A descrição deve ter no máximo 200 caracteres.";
    } else if (!/^[a-zA-Z0-9À-ÿ\s.,!?()-]+$/.test(description)) {
      newErrors.description = "A descrição contém caracteres inválidos.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  };

  //envio dos dados
  const handleSubmit = async (e) => {
    e.preventDefault();
    //formulário está validado ?
    if (!validateForm()) {
      alert("Por favor, corrija os erros no formulário.");
      return;
    }
    //é vendedor ?
    if (!isVendedor) {
      alert("Você precisa ser um vendedor para adicionar produtos.");
      return;
    }

    const productData = {
      vendedorId: userId, // Usando userId como vendedorId
      typeCategory: typeCategory === "Outro" ? customPart : typeCategory, // Envia o nome digitado como categoria
      typePart: typeCategory === "Outro" ? customPart : typePart, // Usa o nome digitado também como tipo de peça
      stock,
      carBrand,
      carModel,
      yearFrom,
      yearTo,
      condition,
      description,
      price,
    };

    // Enviar os dados para o backend
    try {
      const response = await fetch("http://localhost:8080/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Produto adicionado com sucesso!");
        // Limpar o formulário ou redirecionar, se necessário
      } else {
        alert(`Erro ao adicionar produto: ${data.message}`);
      }
    } catch (err) {
      console.error("Erro ao enviar produto:", err);
    }
  };

  return (
    <div className="sell-page">
      <h1>Adicionar Peças ao Estoque</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Categoria de Peça:</label>
          <select
            value={typeCategory}
            onChange={(e) => setTypeCategory(e.target.value)}
            required
          >
            <option value="">Selecione a categoria</option>
            {Object.keys(partCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {/* Campo de entrada para "Outro" */}
          {typeCategory === "Outro" && (
            <div className="form-group-person">
              <label>Especifique a categoria:</label>
              <input
                type="text"
                value={customPart}
                onChange={(e) => setCustomPart(e.target.value)}
                required
              />
              {errors.customPart && (
                <p className="error-message">{errors.customPart}</p>
              )}
            </div>
          )}
        </div>
        {typeCategory && typeCategory !== "Outro" && (
          <div className="form-group">
            <label>Tipo de Peça:</label>
            <select
              value={typePart}
              onChange={(e) => setTypePart(e.target.value)}
              required
            >
              <option value="">Selecione o tipo de peça</option>
              {partCategories[typeCategory]?.map((part, index) => (
                <option key={index} value={part}>
                  {part}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Quantidade no Estoque:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          {errors.stock && <p className="error-message">{errors.stock}</p>}
        </div>

        <div className="form-group">
          <label>Marca do Carro:</label>
          <select value={carBrand} onChange={handleCarBrandChange} required>
            <option value="">Selecione a marca</option>
            {Object.keys(carBrandsWithModels).map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {carBrand && (
          <div className="form-group">
            <label>Modelo do Carro:</label>
            <select
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              required
            >
              <option value="">Selecione o modelo</option>
              {carBrandsWithModels[carBrand].map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Ano dos Modelos:</label>
          <div className="year-inputs">
            <input
              type="number"
              placeholder="de"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="até"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              required
            />
          </div>
          {errors.yearFrom && (
            <p className="error-message">{errors.yearFrom}</p>
          )}
          {errors.yearTo && <p className="error-message">{errors.yearTo}</p>}
        </div>

        <div className="form-group">
          <label>Condição:</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="nova">Nova</option>
            <option value="usada">Usada</option>
          </select>
        </div>

        <div className="form-group">
          <label>Preço:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>

        <div className="form-group">
          <label>Breve Descrição (máximo de 200 palavras):</label>
          <textarea
            maxLength="200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </div>

        <button type="submit">Adicionar ao Estoque</button>
      </form>
    </div>
  );
};

export default SellPage;
