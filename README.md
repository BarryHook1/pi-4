# WebPecas 🚗💨

> Um marketplace full-stack inovador que conecta vendedores de peças automotivas com compradores, garantindo transparência, rapidez e segurança.

![WebPecas Banner](https://via.placeholder.com/1000x300.png?text=WebPecas+Marketplace)

**WebPecas** é uma aplicação moderna baseada na **MERN stack** (MongoDB, Express, React, Node.js). O sistema foi arquitetado para lidar com o ciclo completo de negociações automotivas virtuais: desde a renderização dinâmica de produtos em estoque e comunicação através de propostas, até o processamento de imagens escalável e um sistema robusto de avaliações.

---

## 🎯 Principais Funcionalidades

- **Autenticação Segura (JWT):** Login e cadastro contendo proteções de validação e perfis de acesso separados (Comprador vs Vendedor). As senhas são todas protegidas com hash (`bcrypt`).
- **Dashboard de Parceiros (Vendedores):** Vendedores autorizados podem gerenciar seu estoque e adicionar novos componentes associando marcas, tipos de peças e modelos de veículos.
- **Armazenamento de Imagens em Nuvem:** Integração nativa com a **Cloudinary** para upload e otimização das fotos das peças em tempo real.
- **Sistema de Propostas Diretas:** Compradores enviam intenções de compra diretamente da página do produto.
- **Reputação e Transparência:** Sistema rigoroso de **Avaliações 5-Estrelas**, restrito apenas para usuários que efetivaram compras verificadas na plataforma.
- **Controle Dinâmico de Estoque:** Atualização automática do inventário durante a efetivação das compras.

---

## 🛠️ Tecnologias Utilizadas

### Backend (API REST)
- **Node.js** & **Express**
- **MongoDB** (Banco de dados não relacional em nuvem via Atlas)
- **Mongoose** (Modelagem de esquemas)
- **Bcrypt & JSONWebToken (JWT)** (Segurança)
- **Cloudinary** (Armazenamento de mídia CaaS)
- **Multer** (Gerenciamento de multipart/form-data)

### Frontend (User Interface)
- **React.js** 
- **React Router Dom** (SPA Navigation)
- **Context API** (Gerenciamento de estado de usuário global)
- **Vanilla CSS** (Componentização de estilo com alta performance)

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v16+)
- [Git](https://git-scm.com/)

### 1. Clonar o Repositório
```bash
git clone https://github.com/BarryHook1/pi-4.git
cd pi-4
```

### 2. Configurar o Backend
Acesse a pasta do backend e instale as dependências:
```bash
cd backend
npm install
```

Crie um arquivo `.env` na raiz da pasta `backend/` contendo as variáveis padrão. (Você precisará de uma conta no MongoDB Atlas e na Cloudinary):
```env
PORT=8080
MONGO_URI=Sua_String_De_Conexão_MongoDB
JWT_SECRET=Um_Segredo_Forte_Para_Seus_Tokens

CLOUDINARY_CLOUD_NAME=Seu_Cloudinary_Name
CLOUDINARY_API_KEY=Sua_Cloudinary_Key
CLOUDINARY_API_SECRET=Seu_Cloudinary_Secret
```

Inicie o servidor de desenvolvimento:
```bash
npm start
# O servidor rodará em http://localhost:8080
```

### 3. Configurar o Frontend
Abra outra aba no terminal, acesse a pasta do frontend e inicie a interface:
```bash
cd frontend
npm install
npm start
# A interface rodará em http://localhost:3000
```

---

## 🛡️ Segurança e Boas Práticas
Este repositório foi revisado para assegurar as melhores práticas:
- O histórico não rastreia nenhuma credencial de desenvolvimento (`.gitignore` blindado).
- Endpoints de busca não enviam artefatos vitais de usuários (como hashes de senhas).
- Proteções contra Injeção Indevida em requisições de atualização de perfis (*Mass Assignment Protection* implementada em `/updateUser`).

---

<p align="center">
  Desenvolvido com 💻 e ☕.
</p>
