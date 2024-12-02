const bcrypt = require("bcrypt");
const User = require("../models/User");
const axios = require("axios");

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
  // Extrai os dados enviados no corpo da requisição
  const { name, email, password, vendedor } = req.body;
  try {
    // Faz uma requisição ao servidor em Java para validar o e-mail
    // O servidor Java valida o formato ou disponibilidade do e-mail
    const javaServerResponse = await axios.get(
      `http://localhost:9000/validateEmail?email=${email}`,
      { timeout: 10000 } // Define um tempo limite de 10 segundos para evitar requisições pendentes
    );

    console.log("Resposta do servidor Java:", javaServerResponse.data);

    // Se o servidor Java não retornar sucesso, o e-mail é considerado inválido
    if (javaServerResponse.status !== 200) {
      return res.status(400).json({ message: "Email inválido." });
    }

    // Verifica no banco de dados local (MongoDB) se o e-mail já está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Gera um hash da senha do usuário para armazená-la de forma segura
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria uma nova instância do modelo User com os dados fornecidos
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Armazena a senha como hash
      vendedor,
    });

    // Salva o novo usuário no banco de dados
    await newUser.save();

    // Responde com sucesso ao cliente
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (err) {
    // Loga qualquer erro que ocorra durante o processo
    console.error("Erro ao registrar usuário:", err.message);

    // Se o erro foi causado pelo servidor Java, responde com o status apropriado
    if (err.response) {
      console.error("Erro na resposta do servidor Java:", err.response.data);
      return res
        .status(err.response.status)
        .json({ message: err.response.data || "Erro no servidor Java" });
    }

    // Caso contrário, responde com erro genérico do servidor
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { login, register };
