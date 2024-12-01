const express = require("express");
const { upload, uploadToCloudinary } = require("../config/cloudinaryConfig");

const router = express.Router();

// Rota para upload de imagens
router.post(
  "/image",
  upload.single("image"),
  uploadToCloudinary,
  (req, res) => {
    if (!req.file || !req.file.url) {
      return res
        .status(400)
        .json({ message: "Erro ao fazer upload da imagem." });
    }

    res.status(200).json({ imageUrl: req.file.url });
  }
);

module.exports = router;
