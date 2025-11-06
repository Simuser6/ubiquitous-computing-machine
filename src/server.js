const express = require("express");
const path = require("path");
const app = express(); // 👈 agora visível globalmente
const { connectDB, getPool } = require("./config/db");
const avisosRoutes = require("./routes/avisosRoutes");
const departamentosRoutes = require("./routes/departamentos");

const PORT = process.env.PORT || 3000; // ✅ DECLARE AQUI

(async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../public")));

  try {
    // 1️⃣ Conecta ao banco e cria o pool
    await connectDB();
    const pool = getPool();
    console.log("✅ Pool criado:", !!pool);

    // 2️⃣ Cria um middleware que injeta o pool no Router também
    app.use((req, res, next) => {
      req.pool = pool;
      console.log("✅ Middleware de pool executado");
      next();
    });

    // 3️⃣ Usa o router de avisos
    app.use("/api/avisos", (req, res, next) => {
      // garante que as rotas dentro do router também herdam o pool
      req.pool = pool;
      next();
    }, avisosRoutes);

    // 4️⃣ Inicia o servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📱 Acesse: http://localhost:${PORT}`);
      console.log(`🔗 API disponível em: http://localhost:${PORT}/api/avisos`);
    });
  } catch (err) {
    console.error("❌ Erro ao iniciar servidor:", err);
  }
})();
// =====================================================
// ROTAS DA API
// =====================================================
app.use("/api/departamentos", require("./routes/departamentos"));
app.use("/api/cursos", require("./routes/cursos"));
app.use("/api/turmas", require("./routes/turmas"));
app.use("/api/alunos", require("./routes/alunos"));
app.use("/api/matriculas", require("./routes/matriculas"));
app.use("/api/pagamentos", require("./routes/pagamentos"));
app.use("/api/avisos", avisosRoutes);

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rotas movidas para módulos em ./routes

// Rota para servir a aplicação
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Inicialização do servidor
async function startServer() {
  await connectDB();
  pool = getPool();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📱 Acesse: http://localhost:${PORT}`);
    console.log(`🔗 API disponível em: http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
