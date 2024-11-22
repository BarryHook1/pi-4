import React, { useState } from "react";
import "./imageUpload.css";

const ImageUpload = ({ onImagesChange }) => {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Cria preview para exibição
    }));

    if (images.length + newImages.length > 5) {
      alert("Você pode adicionar no máximo 5 imagens.");
      return;
    }

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);

    // Atualiza o estado no componente pai
    if (onImagesChange) {
      onImagesChange(updatedImages.map((img) => img.file)); // Passa apenas os arquivos para o estado pai
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    if (onImagesChange) {
      onImagesChange(updatedImages.map((img) => img.file));
    }
  };

  return (
    <div className="image-upload-container">
      <div className="image-upload-grid">
        {images.map((img, index) => (
          <div key={index} className="image-square">
            <img src={img.preview} alt={`Preview ${index}`} />
            <button
              className="remove-button"
              onClick={() => handleRemoveImage(index)}
            >
              ✕
            </button>
          </div>
        ))}
        {images.length < 5 && (
          <label className="image-square upload-placeholder">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <span>+</span>
          </label>
        )}
      </div>
      {images.length >= 5 && (
        <p className="max-images-warning">Máximo de 5 imagens atingido.</p>
      )}
    </div>
  );
};

export default ImageUpload;
