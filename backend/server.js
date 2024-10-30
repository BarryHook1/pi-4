// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Definir esquema de produto
const productSchema = new mongoose.Schema({
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  typeCategory: { type: String, required: true },
  typePart: { type: String, required: true },
  stock: { type: Number, required: true },
  carBrand: { type: String, required: true },
  carModel: { type: String, required: true },
  yearFrom: { type: Number, required: true },
  yearTo: { type: Number, required: true },
  condition: { type: String, required: true },
  description: { type: String, maxLength: 200 },
  price: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

// Definir o esquema de usuário
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vendedor: { type: Boolean, required: true }, // Adicionando o status de vendedor
});

// Definir o modelo "User"
let User;
try {
  User = mongoose.model("User");
} catch (error) {
  User = mongoose.model("User", userSchema);
}

// Rota de login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar o usuário no banco de dados pelo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    // Comparar a senha recebida com a senha armazenada (criptografada)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    // Retornar o nome do usuário, o status de vendedor e o userId
    res.status(200).json({
      message: "Login bem-sucedido",
      name: user.name,
      vendedor: user.vendedor, // Deve ser um booleano
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// Rota de registro
app.post("/signup", async (req, res) => {
  const { name, email, password, vendedor } = req.body;

  console.log("Recebido no backend - Vendedor:", vendedor); // Verifica o valor booleano recebido

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      vendedor, // Agora estamos armazenando o booleano corretamente
    });

    await newUser.save();
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// Rota para adicionar produto
app.post("/addProduct", async (req, res) => {
  try {
    const vendedorId = req.body.vendedorId;

    // Verificar se o vendedorId existe e se o usuário é um vendedor
    const vendedor = await User.findById(vendedorId);
    if (!vendedor || !vendedor.vendedor) {
      return res
        .status(403)
        .json({ message: "Acesso negado. Você não é um vendedor." });
    }

    // Criando o produto com as informações recebidas
    const novoProduto = {
      vendedor: vendedorId,
      typeCategory: req.body.typeCategory,
      typePart: req.body.typePart,
      stock: req.body.stock,
      carBrand: req.body.carBrand,
      carModel: req.body.carModel,
      yearFrom: req.body.yearFrom,
      yearTo: req.body.yearTo,
      condition: req.body.condition,
      description: req.body.description,
      price: req.body.price,
    };

    // Salvando o produto na coleção de produtos
    const produtoSalvo = await Product.create(novoProduto);

    res
      .status(200)
      .json({ message: "Produto adicionado com sucesso", produtoSalvo });
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    res.status(500).json({ message: "Erro ao adicionar produto." });
  }
});

// Rota para obter produtos de um vendedor específico
app.get("/vendedor/products/:vendedorId", async (req, res) => {
  try {
    const { vendedorId } = req.params;
    const products = await Product.find({ vendedor: vendedorId });
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao obter produtos do vendedor:", error);
    res.status(500).json({ message: "Erro ao obter produtos." });
  }
});

// Rota para excluir um produto
app.delete("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    // Verificar se o produto existe
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    // Excluir o produto
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Produto excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ message: "Erro ao excluir produto." });
  }
});

// Rota para atualizar um produto
app.put("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { stock } = req.body;
    console.log(
      `Requisição para atualizar o produto ${productId} com estoque ${stock}`
    );

    // Verificar se o produto existe
    const product = await Product.findById(productId);
    if (!product) {
      console.log("Produto não encontrado no banco de dados.");
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    // Atualizar o estoque do produto
    product.stock = stock;
    try {
      await product.save();
      console.log("Produto atualizado com sucesso:", product);
      res.status(200).json({ message: "Produto atualizado com sucesso." });
    } catch (saveError) {
      console.error("Erro ao salvar o produto:", saveError);
      res
        .status(500)
        .json({
          message: "Erro ao salvar o produto.",
          error: saveError.message,
        });
    }
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
    res.status(500).json({ message: "Erro ao atualizar o produto." });
  }
});

// Rota para obter produtos
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find().populate("vendedor", "name");
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    res.status(500).json({ message: "Erro ao obter produtos." });
  }
});

// Rota para obter um produto por ID
app.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate(
      "vendedor",
      "name"
    );
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Erro ao obter produto:", error);
    res.status(500).json({ message: "Erro ao obter produto." });
  }
});

// Definir esquema de proposta
const proposalSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Proposal = mongoose.model("Proposal", proposalSchema);

// Rota para enviar uma proposta
app.post("/proposals", async (req, res) => {
  try {
    const { productId, sellerId, email, phone, message } = req.body;

    const newProposal = new Proposal({
      product: productId,
      seller: sellerId,
      email,
      phone,
      message,
    });

    await newProposal.save();
    res.status(201).json({ message: "Proposta enviada com sucesso." });
  } catch (error) {
    console.error("Erro ao enviar proposta:", error);
    res.status(500).json({ message: "Erro ao enviar proposta." });
  }
});

// Rota para obter propostas de um vendedor
app.get("/vendedor/proposals/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;
    const proposals = await Proposal.find({ seller: sellerId }).populate(
      "product"
    );
    res.status(200).json(proposals);
  } catch (error) {
    console.error("Erro ao obter propostas:", error);
    res.status(500).json({ message: "Erro ao obter propostas." });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
