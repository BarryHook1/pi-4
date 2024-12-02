const express = require("express");
const {
  createProposal,
  getProposalsBySeller,
} = require("../controllers/proposalController");

const router = express.Router();

// Rotas de propostas
router.post("/proposals", createProposal);
router.get("/vendedor/proposals/:sellerId", getProposalsBySeller);

module.exports = router;
