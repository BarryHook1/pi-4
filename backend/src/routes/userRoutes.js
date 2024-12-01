const express = require("express");
const {
  getUserById,
  updateUser,
  rateSeller,
  getSellerDetails,
} = require("../controllers/userController");

const router = express.Router();

// Rotas de usuários
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.post("/rate", rateSeller);
router.get("/seller/:sellerId", getSellerDetails);

module.exports = router;
