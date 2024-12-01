const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res
      .status(201)
      .json({ message: "Produto adicionado com sucesso.", product });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar produto.", error });
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
