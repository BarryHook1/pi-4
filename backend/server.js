const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definir esquema de produto
const productSchema = new mongoose.Schema({
  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  typeCategory: { type: String, required: true },
  typePart: { type: String, required: true },
  stock: { type: Number, required: true },
  carBrand: { type: String, required: true },
  carModel: { type: String, required: true },
  yearFrom: { type: Number, required: true },
  yearTo: { type: Number, required: true },
  condition: { type: String, required: true },
  description: { type: String, maxLength: 200 },
});

const Product = mongoose.model('Product', productSchema);

// Definir o esquema de usuário
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    vendedor: { type: Boolean, required: true }  // Adicionando o status de vendedor
});

// Definir o modelo "User"
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

        // Retornar o nome do usuário, o status de vendedor e o userId
        res.status(200).json({
            message: 'Login bem-sucedido',
            name: user.name,
            vendedor: user.vendedor,
            userId: user._id  // Adicionando o userId aqui
        });
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

// Rota para adicionar produto
app.post("/addProduct", async (req, res) => {
  try {
    // Criando o produto com as informações recebidas
    const novoProduto = {
      vendedor: req.body.vendedorId,  // Usando o vendedorId diretamente
      typeCategory: req.body.typeCategory,
      typePart: req.body.typePart,
      stock: req.body.stock,
      carBrand: req.body.carBrand,
      carModel: req.body.carModel,
      yearFrom: req.body.yearFrom,
      yearTo: req.body.yearTo,
      condition: req.body.condition,
      description: req.body.description,
    };

    // Salvando o produto na coleção de produtos
    const produtoSalvo = await Product.create(novoProduto);

    res.status(200).json({ message: "Produto adicionado com sucesso", produtoSalvo });
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    res.status(500).json({ message: "Erro ao adicionar produto." });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});