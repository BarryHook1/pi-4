const User = require("../models/User");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter usuário.", error });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json({ message: "Usuário atualizado com sucesso.", user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário.", error });
  }
};

const rateSeller = async (req, res) => {
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
};

const getSellerDetails = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const seller = await User.findById(sellerId).exec();

    if (!seller) {
      console.log("Vendedor não encontrado.");
      return res.status(404).json({ message: "Vendedor não encontrado." });
    }

    res.status(200).json(seller);
  } catch (error) {
    console.error("Erro ao obter informações do vendedor:", error);
    res.status(500).json({ message: "Erro ao obter informações do vendedor." });
  }
};

const getSellerProducts = async (req, res) => {
  try {
    const { vendedorId } = req.params;
    const products = await Product.find({ vendedor: vendedorId });
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao obter produtos do vendedor:", error);
    res.status(500).json({ message: "Erro ao obter produtos." });
  }
};

module.exports = {
  getUserById,
  updateUser,
  rateSeller,
  getSellerDetails,
  getSellerProducts,
};
