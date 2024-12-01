const express = require("express");
const { login, register } = require("../controllers/authController");

const router = express.Router();

// Rotas de autenticação
router.post("/auth/login", login);
router.post("/auth/signup", register);

module.exports = router;
