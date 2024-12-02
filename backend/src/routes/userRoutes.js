const express = require("express");
const {
  getUserById,
  updateUser,
  rateSeller,
  getSellerDetails,
  getSellerProducts,
} = require("../controllers/userController");

const router = express.Router();

// Rotas de usuários
router.get("/vendedor/products/:vendedorId", getSellerProducts);
router.get("/seller/:sellerId", getSellerDetails);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.post("/rateSeller", rateSeller);

/*console.log(
  "Rotas registradas:",
  router.stack.map((r) => r.route?.path)
);*/

module.exports = router;
