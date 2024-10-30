// PurchaseHistory.js
import React, { useState, useEffect, useContext } from 'react';
import './PurchaseHistory.css';
import { AuthContext } from '../../context/AuthContext';

const PurchaseHistory = () => {
  const { userId } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await fetch(`http://localhost:8080/purchases/${userId}`);
      const data = await response.json();
      setPurchases(data);
    } catch (error) {
      console.error('Erro ao buscar compras:', error);
    }
  };

  return (
    <div className="purchase-history">
      <h1>Minhas Compras</h1>
      {purchases.length > 0 ? (
        purchases.map((purchase) => (
          <div key={purchase._id} className="purchase-card">
            <h3>{purchase.product.typePart}</h3>
            <p>
              <strong>Data:</strong> {new Date(purchase.date).toLocaleString()}
            </p>
            <p>
              <strong>Método de Pagamento:</strong> {purchase.paymentMethod}
            </p>
            <p>
              <strong>Preço:</strong> R$ {purchase.product.price.toFixed(2)}
            </p>
          </div>
        ))
      ) : (
        <p>Você ainda não fez nenhuma compra.</p>
      )}
    </div>
  );
};

export default PurchaseHistory;