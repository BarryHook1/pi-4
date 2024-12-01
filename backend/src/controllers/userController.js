const User = require("../models/User");

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
    const seller = await User.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Vendedor não encontrado." });
    }

    seller.ratings.push({ buyer: buyerId, rating, comment });
    await seller.save();

    res.status(200).json({ message: "Avaliação enviada com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao enviar avaliação.", error });
  }
};

const getSellerDetails = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const seller = await User.findById(sellerId).populate(
      "ratings.buyer",
      "name"
    );
    if (!seller) {
      return res.status(404).json({ message: "Vendedor não encontrado." });
    }
    res.status(200).json(seller);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter informações do vendedor.", error });
  }
};

module.exports = { getUserById, updateUser, rateSeller, getSellerDetails };
