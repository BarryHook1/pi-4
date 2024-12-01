const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDatabase } = require("./config/db");

dotenv.config();

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());

// Conectar ao banco de dados
connectDatabase();

// Registrar rotas
const uploadRoutes = require("./routes/uploadRoutes");
const productRoutes = require("./routes/productRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes"); // Adicionado

app.use(uploadRoutes);
app.use(productRoutes);
app.use(proposalRoutes);
app.use(purchaseRoutes);
app.use(userRoutes);
app.use(authRoutes); // Registrar a rota de autenticação

module.exports = app;
