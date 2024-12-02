import React, { useState, useContext } from "react";
import "./PaymentModal.css";
import { AuthContext } from "../../hooks/AuthContext";

const PaymentModal = ({ product, onClose }) => {
  const { userId } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Por favor, selecione um método de pagamento.");
      return;
    }

    // Simular o processamento do pagamento
    setTimeout(async () => {
      // Chamada ao backend para registrar a compra
      try {
        const response = await fetch("http://localhost:8080/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product._id,
            userId: userId,
            paymentMethod: paymentMethod,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setPaymentSuccess(true);
        } else {
          alert(`Erro ao registrar compra: ${data.message}`);
          onClose();
        }
      } catch (error) {
        console.error("Erro ao registrar compra:", error);
        alert("Erro ao registrar compra.");
        onClose();
      }
    }, 20);
  };

  return (
    <div className="payment-modal">
      <div className="modal-content">
        <h2>Pagamento</h2>
        <p>Você está comprando: {product.typePart}</p>
        <p>Preço: R$ {product.price.toFixed(2)}</p>

        {!paymentSuccess ? (
          <>
            <h3>Selecione o método de pagamento:</h3>
            <div className="payment-methods">
              <label>
                <input
                  type="radio"
                  value="cartao"
                  checked={paymentMethod === "cartao"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cartão de Crédito
              </label>
              <label>
                <input
                  type="radio"
                  value="boleto"
                  checked={paymentMethod === "boleto"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Boleto Bancário
              </label>
              <label>
                <input
                  type="radio"
                  value="pix"
                  checked={paymentMethod === "pix"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Pix
              </label>
            </div>
            <button onClick={handlePayment}>Pagar</button>
            <button onClick={onClose}>Cancelar</button>
          </>
        ) : (
          <>
            <h3>Pagamento realizado com sucesso!</h3>
            <button onClick={onClose}>Fechar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
