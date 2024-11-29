// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { upload, uploadToCloudinary } = require("./cloudinaryConfig");

const cloudinary = require("cloudinary").v2;

// Carregar variáveis de ambiente
dotenv.config({ override: false });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Inicializar o app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI)
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
  images: {
    type: [String], // Aceita um array de strings
    required: true, // Garante que ao menos uma imagem seja necessária
  },
});

const Product = mongoose.model("Product", productSchema);

// Definir esquema de usuário com avaliações
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vendedor: { type: Boolean, required: true }, // Status de vendedor
  ratings: {
    type: [
      {
        buyer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, maxlength: 500 },
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});

// Campo virtual para a média de avaliações
userSchema.virtual("averageRating").get(function () {
  if (!this.ratings || this.ratings.length === 0) return 0;
  const total = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
  return total / this.ratings.length;
});

// Incluir campos virtuais quando convertido em JSON
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

app.post("/upload", upload.single("image"), uploadToCloudinary, (req, res) => {
  try {
    console.log("Dados recebidos:", req.body);
    console.log("URLs das imagens:", req.body.images);
    if (!req.file || !req.file.url) {
      return res.status(400).json({ message: "Erro ao processar imagem." });
    }
    res.status(200).json({ url: req.file.url });
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    console.error("Erro ao fazer upload:", error.message);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

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

  console.log("Recebido no backend - Vendedor:", vendedor);

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
      vendedor,
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
      images: req.body.images,
    };

    console.log("Img :%s", novoProduto.img);

    // Salvando o produto na coleção de produtos
    const produtoSalvo = await Product.create(novoProduto);

    console.log("Produto Novo", novoProduto);

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
      res.status(500).json({
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
    const products = await Product.find({ stock: { $gt: 0 } }).populate(
      "vendedor",
      "name"
    );
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

// Definir esquema de compra
const purchaseSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

// Rota para registrar uma compra
app.post("/purchase", async (req, res) => {
  try {
    const { productId, userId, paymentMethod } = req.body;

    // Verificar se o produto existe
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    // Verificar se há estoque disponível
    if (product.stock <= 0) {
      return res.status(400).json({ message: "Produto esgotado." });
    }

    // Criar registro de compra
    const newPurchase = new Purchase({
      product: productId,
      buyer: userId,
      paymentMethod,
    });
    await newPurchase.save();

    // Atualizar o estoque do produto
    product.stock -= 1;
    await product.save();

    res.status(201).json({ message: "Compra realizada com sucesso." });
  } catch (error) {
    console.error("Erro ao registrar compra:", error);
    res.status(500).json({ message: "Erro ao registrar compra." });
  }
});

// Rota para obter as compras de um usuário
app.get("/purchases/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchase.find({ buyer: userId }).populate({
      path: "product",
      populate: { path: "vendedor", select: "name" },
    });
    res.status(200).json(purchases);
  } catch (error) {
    console.error("Erro ao obter compras:", error);
    res.status(500).json({ message: "Erro ao obter compras." });
  }
});

// Rota para enviar uma avaliação
app.post("/rateSeller", async (req, res) => {
  const { sellerId, buyerId, rating, comment } = req.body;

  try {
    // Validar a avaliação
    if (!sellerId || !buyerId || !rating) {
      return res.status(400).json({ message: "Dados incompletos." });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "A avaliação deve ser entre 1 e 5." });
    }

    // Verificar se o comprador já comprou algo do vendedor
    const purchases = await Purchase.find({
      buyer: buyerId,
      product: {
        $in: await Product.find({ vendedor: sellerId }).select("_id"),
      },
    });

    if (purchases.length === 0) {
      return res.status(403).json({
        message: "Você não pode avaliar um vendedor com quem não comprou.",
      });
    }

    // Verificar se o comprador já avaliou este vendedor
    const existingRating = await User.findOne({
      _id: sellerId,
      "ratings.buyer": buyerId,
    });

    if (existingRating) {
      return res
        .status(400)
        .json({ message: "Você já avaliou este vendedor." });
    }

    // Adicionar a nova avaliação
    const seller = await User.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Vendedor não encontrado." });
    }

    seller.ratings.push({ buyer: buyerId, rating, comment });
    await seller.save();

    res.status(200).json({ message: "Avaliação enviada com sucesso." });
  } catch (error) {
    console.error("Erro ao enviar avaliação:", error);
    res.status(500).json({ message: "Erro ao enviar avaliação." });
  }
});

// Rota para obter informações do vendedor, incluindo avaliações
app.get("/seller/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;
    const seller = await User.findById(sellerId)
      .populate("ratings.buyer", "name")
      .exec();

    if (!seller) {
      return res.status(404).json({ message: "Vendedor não encontrado." });
    }

    res.status(200).json(seller);
  } catch (error) {
    console.error("Erro ao obter informações do vendedor:", error);
    res.status(500).json({ message: "Erro ao obter informações do vendedor." });
  }
});

// Iniciar o servidor apenas se não estiver em modo de teste
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = { app, User };
