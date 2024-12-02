const express = require("express");
const { upload, uploadToCloudinary } = require("../config/cloudinaryConfig");

const router = express.Router();

// Rota para upload de imagens
router.post(
  "/upload",
  upload.single("image"),
  uploadToCloudinary,
  (req, res) => {
    try {
      console.log("Dados recebidos:", req.body);
      console.log("URLs das imagens:", req.body.images);
      if (!req.file || !req.file.url) {
        return res.status(400).json({ message: "Erro ao processar imagem." });
      }
      res.status(200).json({ url: req.file.url });
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      console.error("Erro ao fazer upload:", error.message);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
);

module.exports = router;
