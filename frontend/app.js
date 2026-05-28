/* =============================================
   COSTINHA SOUNDBOARD — app.js
   Consome a API REST do backend
   ============================================= */

// URL base da API — troque pela URL do seu servidor em produção
const API_URL = "http://localhost:3000/api";

// ── ESTADO ──────────────────────────────────
let audioAtual = null;
let btnAtual   = null;

// ── INICIALIZAÇÃO ────────────────────────────
document.addEventListener("DOMContentLoaded", carregarPiadas);

// ── BUSCAR PIADAS DA API ─────────────────────
async function carregarPiadas() {
  mostrarEstado("loading");

  try {
    const res = await fetch(`${API_URL}/piadas`);

    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);

    const piadas = await res.json();
    renderizarGrade(piadas);
    mostrarEstado("grade");

  } catch (err) {
    console.error("Falha ao carregar piadas:", err);
    mostrarEstado("erro");
  }
}

// ── RENDERIZAR GRADE ─────────────────────────
function renderizarGrade(piadas) {
  const grade = document.getElementById("grade");
  grade.innerHTML = "";

  piadas.forEach((piada, i) => {
    const corIdx = i % 10;
    const delay  = `${i * 50}ms`;

    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = delay;

    card.innerHTML = `
      <button
        class="btn-audio cor-${corIdx}"
        id="btn-${piada.id}"
        onclick="tocarAudio(${piada.id}, '${escapar(piada.titulo)}')"
        title="${escapar(piada.titulo)}"
        aria-label="Piada ${piada.id}: ${escapar(piada.titulo)}"
      >
        <span class="card-numero">${piada.id}</span>
        ${piada.emoji}
      </button>
      <div class="card-label">${piada.titulo}</div>
    `;

    grade.appendChild(card);
  });
}

// ── TOCAR ÁUDIO ──────────────────────────────
async function tocarAudio(id, titulo) {
  // Para o áudio em andamento
  if (audioAtual) {
    audioAtual.pause();
    audioAtual.currentTime = 0;
    if (btnAtual) btnAtual.classList.remove("tocando");
  }

  // Clicou no mesmo botão que estava tocando → apenas para
  if (btnAtual && btnAtual.id === `btn-${id}`) {
    esconderStatus();
    audioAtual = null;
    btnAtual   = null;
    return;
  }

  // Busca a URL do áudio na API
  try {
    const res = await fetch(`${API_URL}/audio/${id}`);
    if (!res.ok) throw new Error("Áudio não encontrado");

    const { url } = await res.json();

    const audio = new Audio(url);
    audioAtual  = audio;
    btnAtual    = document.getElementById(`btn-${id}`);

    btnAtual.classList.add("tocando");
    lancarConfetes(btnAtual);

    document.getElementById("status-texto").textContent = `🎙️ ${id}. ${titulo}`;
    document.getElementById("status-bar").classList.add("visivel");

    audio.play();

    audio.addEventListener("ended", () => {
      btnAtual?.classList.remove("tocando");
      esconderStatus();
      audioAtual = null;
      btnAtual   = null;
    });

  } catch (err) {
    console.error("Erro ao buscar áudio:", err);
    document.getElementById("status-texto").textContent = `⚠️ Áudio ${id} não disponível`;
    document.getElementById("status-bar").classList.add("visivel");
    setTimeout(esconderStatus, 3000);
  }
}

// ── PARAR ÁUDIO ──────────────────────────────
function pararAudio() {
  if (audioAtual) {
    audioAtual.pause();
    audioAtual.currentTime = 0;
    audioAtual = null;
  }
  if (btnAtual) {
    btnAtual.classList.remove("tocando");
    btnAtual = null;
  }
  esconderStatus();
}

// ── HELPERS ──────────────────────────────────
function mostrarEstado(estado) {
  document.getElementById("loading").style.display = estado === "loading" ? "block" : "none";
  document.getElementById("erro").style.display    = estado === "erro"    ? "block" : "none";
  document.getElementById("grade").style.display   = estado === "grade"   ? "grid"  : "none";
}

function esconderStatus() {
  document.getElementById("status-bar").classList.remove("visivel");
}

function escapar(str) {
  return String(str).replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

const coresCfete = ["#FFD600","#E53935","#1565C0","#2E7D32","#F57C00","#C2185B","#fff"];

function lancarConfetes(el) {
  const rect = el.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;

  for (let i = 0; i < 10; i++) {
    const c = document.createElement("div");
    c.className = "confete";
    c.style.cssText = `
      left: ${cx + (Math.random() - 0.5) * 60}px;
      top:  ${cy + (Math.random() - 0.5) * 60}px;
      background: ${coresCfete[Math.floor(Math.random() * coresCfete.length)]};
      animation-delay: ${Math.random() * 0.2}s;
    `;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1200);
  }
}
