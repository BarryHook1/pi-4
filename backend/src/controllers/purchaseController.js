const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

const createPurchase = async (req, res) => {
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
};

const getPurchasesByUser = async (req, res) => {
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
};

module.exports = { createPurchase, getPurchasesByUser };
