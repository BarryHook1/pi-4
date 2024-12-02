// VendedorPage.js
import React, { useState, useEffect, useContext } from "react";
import "./vendedorpage.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";

const VendedorPage = () => {
  const navigate = useNavigate();
  const { isVendedor, userId } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("produtos");

  useEffect(() => {
    if (!isVendedor) {
      alert("Você precisa ser um vendedor para acessar esta página.");
      navigate("/");
    } else {
      fetchProducts();
      fetchProposals();
      fetchSellerInfo();
    }
  }, [navigate, isVendedor]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/vendedor/products/${userId}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const fetchProposals = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/vendedor/proposals/${userId}`
      );
      const data = await response.json();
      setProposals(data);
    } catch (error) {
      console.error("Erro ao buscar propostas:", error);
    }
  };

  const fetchSellerInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/seller/${userId}`);
      const data = await response.json();
      setSellerInfo(data);
    } catch (error) {
      console.error("Erro ao obter informações do vendedor:", error);
    }
  };

  // Função atualizada: define o estoque como zero em vez de deletar
  const handleDelete = async (productId) => {
    try {
      const updatedStock = 0; // Definimos o estoque para zero
      const response = await fetch(
        `http://localhost:8080/products/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stock: updatedStock }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Estoque definido como zero com sucesso!");
        // Atualizar a lista de produtos
        setProducts(
          products.map((product) =>
            product._id === productId
              ? { ...product, stock: updatedStock }
              : product
          )
        );
      } else {
        alert(`Erro ao atualizar estoque: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error);
      alert(
        "Erro ao atualizar estoque. Verifique o console para mais detalhes."
      );
    }
  };

  const handleUpdate = async (productId, updatedStock) => {
    try {
      const response = await fetch(
        `http://localhost:8080/products/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stock: updatedStock }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Estoque atualizado com sucesso!");
        // Atualizar a lista de produtos
        setProducts(
          products.map((product) =>
            product._id === productId
              ? { ...product, stock: updatedStock }
              : product
          )
        );
      } else {
        alert(`Erro ao atualizar estoque: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error);
      alert(
        "Erro ao atualizar estoque. Verifique o console para mais detalhes."
      );
    }
  };

  return (
    <div className="vendedor-page">
      <h1>Área do Vendedor</h1>
      {sellerInfo && (
        <div className="seller-info">
          <h2>Minha Avaliação: {sellerInfo.averageRating.toFixed(1)} / 5</h2>
          <div className="ratings-list">
            {sellerInfo.ratings.length > 0 ? (
              sellerInfo.ratings.map((rating) => (
                <div key={rating._id} className="rating-item">
                  <p>
                    <strong>Comprador:</strong> {rating.buyer.name}
                  </p>
                  <p>
                    <strong>Avaliação:</strong> {rating.rating} / 5
                  </p>
                  {rating.comment && (
                    <p>
                      <strong>Comentário:</strong> {rating.comment}
                    </p>
                  )}
                  <p>
                    <strong>Data:</strong>{" "}
                    {new Date(rating.date).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p>Você ainda não recebeu avaliações.</p>
            )}
          </div>
        </div>
      )}

      <div className="tab-menu">
        <button
          className={activeTab === "produtos" ? "active" : ""}
          onClick={() => setActiveTab("produtos")}
        >
          Meus Produtos
        </button>
        <button
          className={activeTab === "propostas" ? "active" : ""}
          onClick={() => setActiveTab("propostas")}
        >
          Propostas
        </button>
      </div>

      {activeTab === "produtos" && (
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className={`product-card ${
                  product.stock === 0 ? "out-of-stock" : ""
                }`}
              >
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
                {product.stock === 0 && (
                  <p className="out-of-stock-message">
                    Este produto está fora do ar porque o estoque está zerado.
                  </p>
                )}
                <div className="actions">
                  <button onClick={() => handleDelete(product._id)}>
                    Excluir
                  </button>
                  <button
                    onClick={() => {
                      const newStock = prompt(
                        "Digite a nova quantidade em estoque:",
                        product.stock
                      );
                      if (newStock !== null && !isNaN(newStock)) {
                        handleUpdate(product._id, Number(newStock));
                      }
                    }}
                  >
                    Atualizar Estoque
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Você não tem produtos cadastrados.</p>
          )}
        </div>
      )}

      {activeTab === "propostas" && (
        <div className="proposal-list">
          {proposals.length > 0 ? (
            proposals.map((proposal) => (
              <div key={proposal._id} className="proposal-card">
                <h3>Proposta para: {proposal.product.typePart}</h3>
                <p>
                  <strong>Email:</strong> {proposal.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {proposal.phone}
                </p>
                <p>
                  <strong>Mensagem:</strong> {proposal.message}
                </p>
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(proposal.date).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>Você não tem propostas.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VendedorPage;