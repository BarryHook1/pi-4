const express = require("express");
const {
  createPurchase,
  getPurchasesByUser,
} = require("../controllers/purchaseController");

const router = express.Router();

// Rotas de compras
router.post("/", createPurchase);
router.get("/:userId", getPurchasesByUser);

module.exports = router;
