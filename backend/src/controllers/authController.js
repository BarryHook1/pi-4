const bcrypt = require("bcrypt");
const User = require("../models/User");
const axios = require("axios");
const net = require("net");

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

// Função para validar um e-mail no servidor Java
async function validateEmailWithJavaServer(email) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    client.connect(9000, "localhost", () => {
      console.log("Conectado ao servidor Java");
      client.write(email + "\n"); // Envia o e-mail com uma nova linha
    });

    client.on("data", (data) => {
      const response = data.toString().trim();
      console.log("Resposta do servidor Java:", response);
      client.destroy(); // Fecha a conexão após receber a resposta

      if (response === "VALID") {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    client.on("error", (err) => {
      console.error("Erro na conexão com o servidor Java:", err.message);
      reject(err);
    });

    client.on("close", () => {
      console.log("Conexão com o servidor Java encerrada");
    });
  });
}

const register = async (req, res) => {
  const { name, email, password, vendedor } = req.body;

  try {
    // Valida o e-mail usando o servidor Java
    const isEmailValid = await validateEmailWithJavaServer(email);

    if (!isEmailValid) {
      return res.status(400).json({ message: "Email inválido." });
    }

    // Verifica no MongoDB se o e-mail já está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Gera um hash da senha do usuário para armazená-la de forma segura
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário no banco de dados
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Senha em hash
      vendedor,
    });

    // Salva o novo usuário no banco de dados
    await newUser.save();

    // Retorna sucesso ao cliente
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err.message);

    // Resposta de erro genérica
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { login, register };
