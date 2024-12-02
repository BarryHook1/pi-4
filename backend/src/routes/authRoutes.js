const express = require("express");
const { login, register } = require("../controllers/authController");

const router = express.Router();

// Rotas de autenticação
router.post("/login", login);
router.post("/signup", register);

console.log(
  "Rotas registradas:",
  router.stack.map((r) => r.route?.path)
);

module.exports = router;
