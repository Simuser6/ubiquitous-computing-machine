const express = require("express");
const path = require("path");
const { connectDB, getPool } = require("./config/db");
const app = express(); 

const avisosRoutes = require("./routes/avisosRoutes");
const departamentosRoutes = require("./routes/departamentos");
const cursosRoutes = require("./routes/cursos");
const turmasRoutes = require("./routes/turmas");
const alunosRoutes = require("./routes/alunos");
const matriculasRoutes = require("./routes/matriculas");
const pagamentosRoutes = require("./routes/pagamentos");


// (adicione outras rotas aqui, se houver)

(async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware padrão
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../public")));

  try {
    // Conecta ao banco
    await connectDB();
    const pool = getPool();

    // Injeta pool em todas as requisições
    app.use((req, res, next) => {
      req.pool = pool;
      next();
    });

    // Define rotas da API
    app.use("/api/avisos", avisosRoutes);
    app.use("/api/departamentos", departamentosRoutes);
    app.use("/api/cursos", cursosRoutes)
    app.use("/api/turmas", turmasRoutes)
    app.use("/api/alunos", alunosRoutes)
    app.use("/api/matriculas", matriculasRoutes)
    app.use("/api/pagamentos", pagamentosRoutes)

    // Rota padrão para testar
    app.get("/api/teste", (req, res) => {
      res.send("Servidor funcionando ✅");
    });

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`🔗 Teste em: http://localhost:${PORT}/api/teste`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
  }
})();


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
