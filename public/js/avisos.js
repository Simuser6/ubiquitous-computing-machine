const API_URL = "/api/avisos";

async function carregarAvisos() {
  try {
    const res = await fetch(API_URL);
    const avisos = await res.json();
    const container = document.getElementById("avisos-list");

    if (avisos.length === 0) {
      container.innerHTML = "<p>Nenhum aviso publicado.</p>";
      return;
    }

    container.innerHTML = avisos.map(a => `
      <div class="aviso">
        <h3>${a.titulo}</h3>
        <p>${a.descricao}</p>
        <small><b>${a.autor}</b> — ${new Date(a.data_publicacao).toLocaleDateString()}</small>
        ${a.data_expiracao ? `<br><small>Expira em: ${new Date(a.data_expiracao).toLocaleDateString()}</small>` : ""}
      </div>
    `).join("");
  } catch (err) {
    console.error("Erro ao carregar avisos:", err);
  }
}

document.getElementById("aviso-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const aviso = {
    titulo: titulo.value,
    descricao: descricao.value,
    autor: autor.value,
    data_expiracao: data_expiracao.value || null,
    publico_alvo: publico_alvo.value || null
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aviso)
  });

  if (res.ok) {
    alert("Aviso publicado!");
    e.target.reset();
    carregarAvisos();
  } else {
    alert("Erro ao publicar aviso.");
  }
});

carregarAvisos();