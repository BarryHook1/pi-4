import React, { useState } from 'react';
import './sellpage.css';

const SellPage = () => {
    const [type, setType] = useState('Motor');
    const [stock, setStock] = useState('');
    const [carBrand, setCarBrand] = useState('');
    const [carModels, setCarModels] = useState('');
    const [carYears, setCarYears] = useState('');
    const [condition, setCondition] = useState('nova');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState([]);

    const handleFileChange = (e) => {
        setPhotos(e.target.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aqui você pode processar e enviar os dados do formulário para o backend
        console.log({
            type,
            stock,
            carBrand,
            carModels,
            carYears,
            condition,
            description,
            photos
        });
    };

    return (
        <div className="sell-page">
            <h1>Adicionar Peças ao Estoque</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tipo de Peça:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Motor">Motor</option>
                        <option value="Turbina">Turbina</option>
                        <option value="Bomba de Água">Bomba de Água</option>
                        <option value="Rodas">Rodas</option>
                        <option value="Pneus">Pneus</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Quantidade no Estoque:</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Marca do Carro:</label>
                    <input
                        type="text"
                        value={carBrand}
                        onChange={(e) => setCarBrand(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Modelos de Carro (separados por vírgula):</label>
                    <input
                        type="text"
                        value={carModels}
                        onChange={(e) => setCarModels(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Anos dos Modelos (separados por vírgula):</label>
                    <input
                        type="text"
                        value={carYears}
                        onChange={(e) => setCarYears(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Condição:</label>
                    <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                        <option value="nova">Nova</option>
                        <option value="usada">Usada</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Breve Descrição (máximo de 200 palavras):</label>
                    <textarea
                        maxLength="200"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Fotos da Peça:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>

                <button type="submit">Adicionar ao Estoque</button>
            </form>
        </div>
    );
};

export default SellPage;