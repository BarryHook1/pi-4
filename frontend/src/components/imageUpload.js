import React, { useState } from "react";
import "./imageUpload.css";

const ImageUpload = () => {
  const [images, setImages] = useState([null]); // Inicializa com um quadrado vazio

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = reader.result; // Atualiza o quadrado com a imagem carregada

          // Adiciona um novo quadrado vazio, se ainda não houver e o limite de 5 não foi atingido
          if (!newImages.includes(null) && newImages.length < 5) {
            newImages.push(null);
          }

          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLast = () => {
    setImages((prevImages) => {
      const newImages = [...prevImages];

      // Localizar o índice da última imagem preenchida
      const lastFilledIndex = newImages
        .map((image, index) => (image !== null ? index : null))
        .filter((index) => index !== null)
        .pop();

      if (lastFilledIndex !== undefined) {
        newImages[lastFilledIndex] = null; // Remove a última imagem preenchida
      }

      // Adiciona um quadrado vazio se não houver um
      if (!newImages.includes(null) && newImages.length < 5) {
        newImages.push(null);
      }

      return newImages;
    });
  };

  return (
    <div>
      <div className="image-upload-grid">
        {images.map((image, index) => (
          <div key={index} className="image-square">
            {image ? (
              <img
                src={image}
                alt={`Preview ${index}`}
                className="image-preview"
              />
            ) : (
              <label
                htmlFor={`file-input-${index}`}
                className="image-placeholder"
              >
                <span>+</span>
                <input
                  type="file"
                  id={`file-input-${index}`}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, index)}
                  className="file-input"
                />
              </label>
            )}
          </div>
        ))}
      </div>
      {images.filter((image) => image !== null).length > 0 && (
        <button onClick={handleRemoveLast} className="remove-button">
          <span className="trash-icon">🗑️</span> Remover Última Imagem
        </button>
      )}
      {images.filter((image) => image !== null).length >= 5 && (
        <p className="max-images-warning">Limite de 5 Fotos</p>
      )}
    </div>
  );
};

export default ImageUpload;
