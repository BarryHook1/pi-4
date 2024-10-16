const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Função de conexão com o MongoDB
async function connectToDatabase() {
    try {

        const db = await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connecting..'))
        .catch(err => console.log(err));

        console.log("MongoDB connected successfully");

        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        process.exit(1); 
    }
}

async function initDatabase() {
    const db = await connectToDatabase();

    // Verifique se precisa inicializar algo no banco, como seed data
    // Exemplos:
    // await initializeUsersCollection(db);
    // await initializeProductsCollection(db);
}


module.exports = initDatabase;