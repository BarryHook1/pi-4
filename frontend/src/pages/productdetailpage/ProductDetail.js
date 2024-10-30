// ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    // Estados para o formulário de contato
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [submitMessage, setSubmitMessage] = useState('');

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:8080/products/${productId}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Enviar proposta para o backend
        try {
            const response = await fetch(`http://localhost:8080/proposals`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product._id,
                    sellerId: product.vendedor._id,
                    email,
                    phone,
                    message,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setSubmitMessage('Sua proposta foi enviada com sucesso!');
                // Limpar os campos do formulário
                setEmail('');
                setPhone('');
                setMessage('');
            } else {
                setSubmitMessage(`Erro ao enviar proposta: ${data.message}`);
            }
        } catch (error) {
            console.error('Erro ao enviar proposta:', error);
            setSubmitMessage('Erro ao enviar proposta. Por favor, tente novamente.');
        }
    };

    if (!product) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-info">
                <h1>{product.typePart}</h1>
                <p><strong>Marca do Carro:</strong> {product.carBrand}</p>
                <p><strong>Modelo do Carro:</strong> {product.carModel}</p>
                <p><strong>Ano:</strong> {product.yearFrom} - {product.yearTo}</p>
                <p><strong>Condição:</strong> {product.condition}</p>
                <p><strong>Descrição:</strong> {product.description}</p>
                <p><strong>Quantidade em Estoque:</strong> {product.stock}</p>
                <p><strong>Preço:</strong> {product.price}</p>
                <p><strong>Vendedor:</strong> {product.vendedor.name}</p>
                {/* Adicione outras informações ou imagens do produto aqui */}
            </div>

            <div className="contact-column">
                <div className="price-card">
                    <div className="price">R$ {product.price}</div>
                    
                </div>

                <div className="contact-form">
                    <h2>Entre em Contato com o Vendedor</h2>
                    <form>
                        <div className="form-group">
                            <label>Nome*</label>
                            <input type="text" required />
                        </div>
                        <div className="form-group">
                            <label>Email*</label>
                            <input type="email" required />
                        </div>
                        <div className="form-group">
                            <label>Telefone*</label>
                            <input type="tel" required />
                        </div>
                        <div className="form-group">
                            <label>Mensagem*</label>
                            <textarea required defaultValue="Olá, tenho interesse na peça. Por favor entre em contato." />
                        </div>
                        <button type="submit">Enviar Mensagem</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;