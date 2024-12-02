const express = require("express");
const {
  createPurchase,
  getPurchasesByUser,
} = require("../controllers/purchaseController");

const router = express.Router();

// Rotas de compras
router.post("/purchase", createPurchase);
router.get("/purchases/:userId", getPurchasesByUser);

module.exports = router;
