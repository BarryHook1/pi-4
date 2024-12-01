const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

const createPurchase = async (req, res) => {
  const { productId, buyerId, paymentMethod } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    if (product.stock <= 0) {
      return res.status(400).json({ message: "Produto esgotado." });
    }

    const purchase = await Purchase.create({
      product: productId,
      buyer: buyerId,
      paymentMethod,
    });
    product.stock -= 1;
    await product.save();

    res
      .status(201)
      .json({ message: "Compra realizada com sucesso.", purchase });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar compra.", error });
  }
};

const getPurchasesByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const purchases = await Purchase.find({ buyer: userId }).populate({
      path: "product",
      populate: { path: "vendedor", select: "name" },
    });
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter compras.", error });
  }
};

module.exports = { createPurchase, getPurchasesByUser };
