const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const initDatabase = require('./database/init');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect
initDatabase().then(() => {
    // Iniciar o servidor apenas após o banco de dados ser inicializado
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});
