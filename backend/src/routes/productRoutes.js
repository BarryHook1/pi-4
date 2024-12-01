const express = require("express");
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { upload, uploadToCloudinary } = require("../config/cloudinaryConfig");

const router = express.Router();

// Rotas de produtos
router.post("/", upload.single("image"), uploadToCloudinary, addProduct); // Adiciona middleware de upload
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
