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
router.post("/addProduct", addProduct); // Adiciona middleware de upload
router.get("/products", getProducts);
router.get("/products/:productId", getProductById);
router.put("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

module.exports = router;
