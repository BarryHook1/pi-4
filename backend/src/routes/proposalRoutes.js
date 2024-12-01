const express = require("express");
const {
  createProposal,
  getProposalsBySeller,
} = require("../controllers/proposalController");

const router = express.Router();

// Rotas de propostas
router.post("/", createProposal);
router.get("/seller/:sellerId", getProposalsBySeller);

module.exports = router;
