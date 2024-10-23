const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors()); // Permitir requisições de outras origens (React)

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definir o esquema de usuário
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vendedor: { type: Boolean, required: true } // Certifique-se de adicionar o campo role aqui
});

// Definir o modelo "User" e garantir que a variável seja declarada uma única vez
let User;
try {
  User = mongoose.model('User');
} catch (error) {
  User = mongoose.model('User', userSchema);
}

// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar o usuário no banco de dados pelo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Comparar a senha recebida com a senha armazenada (criptografada)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Se email e senha estiverem corretos, você pode gerar um token JWT ou simplesmente retornar sucesso
    res.status(200).json({ message: 'Login bem-sucedido', name: user.name })
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rota de registro
app.post('/signup', async (req, res) => {
  const { name, email, password, vendedor } = req.body;

  console.log('Recebido no backend - Vendedor:', vendedor);  // Verifica o valor booleano recebido

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'Email já cadastrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
          name,
          email,
          password: hashedPassword,
          vendedor  // Agora estamos armazenando o booleano corretamente
      });

      await newUser.save();
      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
      res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});