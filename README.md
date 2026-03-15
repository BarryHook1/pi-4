# WebPecas 🚗💨

> **WebPecas** é um ecossistema de marketplace auto-parts robusto, full-stack e orientado a microserviços. Conecta fornecedores autônomos e grandes lojistas de peças automotivas diretamente com os consumidores finais, oferecendo um ambiente seguro de transação, um sofisticado gerenciador de painel (dashboard) e processamento em nuvem de mídia.

![WebPecas Banner](https://via.placeholder.com/1000x300.png?text=WebPecas+Marketplace+Architecture)

O projeto se destaca por abraçar uma arquitetura poliglotática, unindo o poder de I/O não-bloqueante e roteamento rápido do **Node.js (Express)**, persistência flexível em NoSQL do **MongoDB**, reatividade robusta e baseada em hooks do **React.js**, e até mesmo delegando fluxos de validação de dados em background para um microserviço HTTP desenvolvido puramente em **Java**.

---

## 🏗️ Arquitetura e Engenharia de Software

O WebPecas transita além do tradicional "MERN stack" estruturado, distribuindo responsabilidades em seu design de backend:

- **Microsserviço de Validação (Java):** Ao invés de centralizar toda a validação de regras de usuário no Thread Pool do Node.js, foi instanciado um microserviço HTTP em Java (usando `com.sun.net.httpserver`) escutando na porta `9000`. Ele responde via GET (`/validateEmail`) validando RegEx pesadas para o Node, permitindo escalabilidade isolada.
- **Concorrência e Orchestration:** O comando principal de subida da aplicação (`npm start`) utiliza `concurrently` para orquestrar e compilar o microserviço Java simultaneamente com o Bootstrap do daemon do Node.js/Nodemon, tudo em uma macro-execução síncrona aos olhos do desenvolvedor.
- **Camada de Scripting (DevOps):** Inclui pipelines limpos escritos em **Python** (`pymongo`) na pasta `/backend/script`, voltados pra o "seeding" de instâncias do Mongo Database em massa, populando objetos *mock* perfeitos que agilizam drasticamente fluxos de teste ponta a ponta.

---

## 🎯 Principais Funcionalidades

### 🔐 Segurança e Autenticação (AuthZ / AuthN)
- **Stateful JWT Auth:** Tokens providos na criação de sessão com verificação em trânsito de payloads de Cargo (*Comprador* vs *Vendedor*).
- **Proteção de Artefatos:** Os Controllers MongoDB filtram por padrão a string do `password` nos métodos de resposta e barraram atualizações (`updateUser`) de vulnerabilidades de **Mass Assignment**, destruindo payloads que tentam sobreescrever hash.
- **Hashing de Alta Entropia:** Uso de `bcrypt` (Salt Rounds 10) garantindo salting randômico às credenciais expostas na ponta de acesso.

### 👥 Sistemas de Usuários e Permissões (RBAC)
- Vendedores possuem chaves primárias e interfaces no front-end em Condicional de Redirecionamento (Dashboards isolados autorizados pelo contexto React).  
- **Feedback & Proof of Stake:** Sistema de repasse de Estrelas/Rating validado pela engine por *Backus-Naur form*. A aplicação checa se o comprador (`buyerId`) de fato emitiu proposta/pagamento em uma Peça transacional antes de autorizar a escrita no banco do vendedor (`sellerId`). Não é possível deixar spam de reviews de concorrentes.

### 🖼️ Cloud e Storage Media
- O upload de arquivos é transportado via **Multer** no middleware direto para o barramento do CaaS **Cloudinary**. Mídias nunca tocam em diretórios na máquina local, garantindo proteção contra vulnerabilidades de upload (e.g., LFI) e permitindo o escalonamento horizontal das instâncias Node (arquitetura *Stateless* pura).

### 🛒 Controle de Domínio e Inventário
- Baixa dinâmica do estoque via controle Atomico no MongoDB com o `purchaseController`.
- Propostas enviadas conectam Vendedor e Comprador por e-mail, mantendo a documentação e histórico gravados em Collections próprias de *PurchaseHistory*.

---

## 🛠️ Stack Tecnológica Completa

**Backend & Microservices:**
- `Node.js` & `Express.js` (API Gateway / Controllers)
- `Java SE` (Microserviço de validação via `HttpServer`)
- `MongoDB Atlas` + `Mongoose` (DBaaS e ORM de Esquema)
- `JsonWebToken` + `Bcrypt` (Segurança)
- `Python 3` + `Random` + `Bson/PyMongo` (Database Seeding Infrastructure)
- `Cloudinary` + `Multer` (Mídia)
- `Concurrently` (Process Manager Multi-thread)
- `Axios` (Server-Side Fetching entre Node e Java)

**Frontend:**
- `React 18` (Interface Base Engine)
- `React Router DOM` (Routing Dinâmico e Controle de Histórico DOM)
- `React Context API` (Gerenciamento de Estados Globais de Sessão)
- `Vanilla CSS` + `FontAwesome` (Estilização e Iconografia)

---

## 🚀 Como Subir o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v16+)
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) (v11+ necessárias para executar o microserviço)
- [Python 3](https://www.python.org/downloads/) (Apenas se quiser popular o banco)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas)
- [Cloudinary Account](https://cloudinary.com/)

### 1. Preparação
Clonando o ecossistema monolítico:
```bash
git clone https://github.com/BarryHook1/pi-4.git
cd pi-4
```

### 2. Configurando o Core (Backend + Java)
```bash
cd backend
npm install
```

Sua camada de persistência precisará de variáveis. Crie um arquivo `.env` na pasta `backend/` contendo exatamente:

```env
PORT=8080
MONGO_URI=sua_connection_string
JWT_SECRET=suachaveseguraparaotoken

# Chaves do painel Cloudinary Settings
CLOUDINARY_CLOUD_NAME=seu_nome
CLOUDINARY_API_KEY=sua_key
CLOUDINARY_API_SECRET=seu_secret
```

Bota pra rodar! (O comando embutido invocará o `Javac`, subirá a JVM na porta 9000 e inicializará o Node na 8080 de uma só vez):
```bash
npm start
```

### 3. Subindo a Interface React
Em uma janela de terminal paralela:
```bash
cd frontend
npm install
npm start
```
A aplicação abrirá instantaneamente em seu `localhost:3000`.

*(Opcional) Dando Seed no DB: Exporte a variável de ambiente `MONGO_URI` no seu terminal Unix e rode o script Python para auto-popular veículos e preços.*
```bash
export MONGO_URI="sua_connection_string"
cd backend/script
pip install pymongo
python3 produtos.py
```

---

<p align="center">
  Arquitetado com 💻 Segurança e Alta Prática de Clean Code.
</p>
