// vendedorpage.js
import React, { useState, useEffect } from 'react';
import './vendedorpage.css';
import { useNavigate } from 'react-router-dom';

const VendedorPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const isVendedor = localStorage.getItem('vendedor') === 'true';
        if (!isVendedor) {
            alert('Você precisa ser um vendedor para acessar esta página.');
            navigate('/');  // Redireciona para a página inicial ou outra página adequada
        } else {
            fetchProducts();
        }
    }, [navigate]);

    const fetchProducts = async () => {
        const vendedorId = localStorage.getItem('vendedorId');
        try {
            const response = await fetch(`http://localhost:8080/vendedor/products/${vendedorId}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8080/products/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Produto excluído com sucesso!');
                // Atualizar a lista de produtos
                setProducts(products.filter(product => product._id !== productId));
            } else {
                const data = await response.json();
                alert(`Erro ao excluir produto: ${data.message}`);
            }
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };

    const handleUpdate = async (productId, updatedStock) => {
        console.log('Atualizando produto:', productId, 'com novo estoque:', updatedStock);
        try {
            const response = await fetch(`http://localhost:8080/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stock: updatedStock }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Estoque atualizado com sucesso!');
                // Atualizar a lista de produtos
                setProducts(products.map(product => 
                    product._id === productId ? { ...product, stock: updatedStock } : product
                ));
            } else {
                alert(`Erro ao atualizar estoque: ${data.message}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar estoque:', error);
            alert('Erro ao atualizar estoque. Verifique o console para mais detalhes.');
        }
    };

    return (
        <div className="vendedor-page">
            <h1>Meus Produtos</h1>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <h3>{product.typePart}</h3>
                            <p><strong>Marca do Carro:</strong> {product.carBrand}</p>
                            <p><strong>Modelo do Carro:</strong> {product.carModel}</p>
                            <p><strong>Ano:</strong> {product.yearFrom} - {product.yearTo}</p>
                            <p><strong>Condição:</strong> {product.condition}</p>
                            <p><strong>Descrição:</strong> {product.description}</p>
                            <p><strong>Quantidade em Estoque:</strong> {product.stock}</p>
                            <div className="actions">
                                <button onClick={() => handleDelete(product._id)}>Excluir</button>
                                <button onClick={() => {
                                    const newStock = prompt('Digite a nova quantidade em estoque:', product.stock);
                                    if (newStock !== null && !isNaN(newStock)) {
                                        handleUpdate(product._id, Number(newStock));
                                    }
                                }}>Atualizar Estoque</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Você não tem produtos cadastrados.</p>
                )}
            </div>
        </div>
    );
};

export default VendedorPage;