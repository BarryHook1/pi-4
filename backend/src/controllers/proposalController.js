const Proposal = require("../models/Proposal");

const createProposal = async (req, res) => {
  try {
    const proposal = await Proposal.create(req.body);
    res
      .status(201)
      .json({ message: "Proposta enviada com sucesso.", proposal });
  } catch (error) {
    res.status(500).json({ message: "Erro ao enviar proposta.", error });
  }
};

const getProposalsBySeller = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const proposals = await Proposal.find({ seller: sellerId }).populate(
      "product"
    );
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter propostas.", error });
  }
};

module.exports = { createProposal, getProposalsBySeller };
