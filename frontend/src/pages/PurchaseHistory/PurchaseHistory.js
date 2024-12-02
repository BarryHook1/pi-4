import React, { useState, useEffect, useContext } from "react";
import "./PurchaseHistory.css";
import { AuthContext } from "../../hooks/AuthContext";

const PurchaseHistory = () => {
  const { userId } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await fetch(`http://localhost:8080/purchases/${userId}`);
      const data = await response.json();
      setPurchases(data);
    } catch (error) {
      console.error("Erro ao buscar compras:", error);
    }
  };

  const handleRate = (purchase) => {
    setSelectedPurchase(purchase);
  };

  const submitRating = async () => {
    if (rating < 1 || rating > 5) {
      alert("Por favor, selecione uma avaliação entre 1 e 5 estrelas.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/rateSeller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sellerId: selectedPurchase.product.vendedor._id,
          buyerId: userId,
          rating,
          comment,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Avaliação enviada com sucesso.");
        setSelectedPurchase(null);
        setRating(0);
        setComment("");
      } else {
        alert(`Erro ao enviar avaliação: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
    }
  };

  return (
    <div className="purchase-history">
      <h1>Minhas Compras</h1>
      {purchases.length > 0 ? (
        <div className="purchase-grid">
          {purchases.map((purchase) => (
            <div key={purchase._id} className="purchase-card">
              <h3>{purchase.product.typePart}</h3>
              <p>
                <strong>Data:</strong>{" "}
                {new Date(purchase.date).toLocaleString()}
              </p>
              <p>
                <strong>Método de Pagamento:</strong> {purchase.paymentMethod}
              </p>
              <p>
                <strong>Preço:</strong> R$ {purchase.product.price.toFixed(2)}
              </p>
              <button onClick={() => handleRate(purchase)}>
                Avaliar Vendedor
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Você ainda não fez nenhuma compra.</p>
      )}

      {selectedPurchase && (
        <div className="rating-modal">
          <div className="modal-content">
            <h2>Avaliar Vendedor</h2>
            <p>Vendedor: {selectedPurchase.product.vendedor.name}</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? "star selected" : "star"}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Deixe um comentário (opcional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button onClick={submitRating}>Enviar Avaliação</button>
            <button onClick={() => setSelectedPurchase(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
