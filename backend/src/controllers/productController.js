const Product = require("../models/Product");
const User = require("../models/User");

const addProduct = async (req, res) => {
  try {
    const vendedorId = req.body.vendedorId;
    console.log(vendedorId);
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
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendedor", "name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter produtos.", error });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId).populate(
      "vendedor",
      "name"
    );
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter produto.", error });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Produto atualizado com sucesso.", product });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar produto.", error });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Produto excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir produto.", error });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
