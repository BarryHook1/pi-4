const Proposal = require("../models/Proposal");

const createProposal = async (req, res) => {
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
};

const getProposalsBySeller = async (req, res) => {
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
};

module.exports = { createProposal, getProposalsBySeller };
