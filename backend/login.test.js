// login.test.js
require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { app, User } = require("./server"); // Ajuste o caminho se necessário

console.log("MONGO_URI_TEST:", process.env.MONGO_URI_TEST);

jest.setTimeout(10000); // Ajusta o timeout para 10 segundos

// Mock de usuário para testes
const mockUser = {
  name: "Test User",
  email: "testuser@example.com",
  password: "password123",
  vendedor: false,
};

beforeAll(async () => {
  // Conectar ao banco de dados de teste
  await mongoose.connect(
    process.env.MONGO_URI_TEST,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    1000
  );

  // Criar usuário de teste
  const hashedPassword = await bcrypt.hash(mockUser.password, 10);
  await User.create({
    ...mockUser,
    password: hashedPassword,
  });
});

afterAll(async () => {
  // Deletar apenas o usuário de teste
  await User.deleteOne({ email: mockUser.email });
  await mongoose.connection.close();
});

describe("Teste da rota POST /login", () => {
  it("Deve fazer login com sucesso com credenciais válidas", async () => {
    const response = await request(app).post("/login").send({
      email: mockUser.email,
      password: mockUser.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Login bem-sucedido");
    expect(response.body).toHaveProperty("name", mockUser.name);
    expect(response.body).toHaveProperty("vendedor", mockUser.vendedor);
    expect(response.body).toHaveProperty("userId");
  });

  it("Deve retornar erro com email não cadastrado", async () => {
    const response = await request(app).post("/login").send({
      email: "emailnaoexiste@example.com",
      password: "qualquerSenha",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Usuário não encontrado");
  });

  it("Deve retornar erro com senha incorreta", async () => {
    const response = await request(app).post("/login").send({
      email: mockUser.email,
      password: "senhaIncorreta",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Senha incorreta");
  });
});
