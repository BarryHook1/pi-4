const bcrypt = require("bcrypt");
const User = require("../models/User");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    res.status(200).json({ message: "Login bem-sucedido", user });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor.", error });
  }
};

const register = async (req, res) => {
  const { name, email, password, vendedor } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      vendedor,
    });
    res.status(201).json({ message: "Usuário registrado com sucesso!", user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário.", error });
  }
};

module.exports = { login, register };
