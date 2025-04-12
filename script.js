// === ATENÇÃO: NÚMERO DE WHATSAPP (Mantenha o seu) ===
const seuNumeroWhatsApp = '55119XXXXXXXX';
// ======================================================

const formularioPopup = document.getElementById('formularioPopup');
const infoPopup = document.getElementById('infoPopup'); // Modal que agora terá o vídeo
const formFeedback = document.getElementById('formFeedback');
const btnEnviarSimulacao = document.getElementById('btnEnviarSimulacao');

// --- Funções do Modal de Formulário (Sem alterações) ---
function abrirFormulario() {
  limparFeedback();
  formularioPopup.style.display = 'flex';
}

function fecharFormulario() {
  formularioPopup.style.display = 'none';
}

function enviarSimulacao() {
  limparFeedback();
  const nome = document.getElementById('nome').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const modelo = document.getElementById('modelo').value.trim();
  const placa = document.getElementById('placa').value.trim();

  if (!nome || !numero || !cidade || !modelo || !placa) {
    mostrarFeedback('Por favor, preencha todos os campos.');
    return;
  }

  btnEnviarSimulacao.disabled = true;
  btnEnviarSimulacao.textContent = 'Enviando...';

  const mensagem = `Olá! Gostaria de fazer uma simulação.\n\n*Nome:* ${nome}\n*Telefone:* ${numero}\n*Cidade:* ${cidade}\n*Modelo:* ${modelo}\n*Placa:* ${placa}`;
  const url = `https://wa.me/${seuNumeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, '_blank');

  setTimeout(() => {
    btnEnviarSimulacao.disabled = false;
    btnEnviarSimulacao.textContent = 'Enviar via WhatsApp';
    fecharFormulario();
  }, 1500);
}

// --- Funções do Modal Informativo/Vídeo (ALTERADAS para tag <video>) ---

function abrirInfoModal() {
  // Apenas exibe o modal. O atributo 'preload="metadata"' no HTML
  // já cuida de carregar as infos básicas do vídeo.
  // O navegador cuidará do play/pause via controles do usuário.
  infoPopup.style.display = 'flex';
}

function fecharInfoModal() {
  // Encontra o elemento <video> dentro do modal de informação
  const videoElement = infoPopup.querySelector('video');

  // Se encontrou o elemento de vídeo...
  if (videoElement) {
    // PAUSA a reprodução
    videoElement.pause();
    // VOLTA o vídeo para o início (tempo 0)
    videoElement.currentTime = 0;
  }
  // Esconde o modal
  infoPopup.style.display = 'none';
}


// --- Função do Botão Falar com Consultor (Sem alterações) ---
function falarComConsultor() {
  const mensagem = 'Olá, quero falar com um consultor!';
  const url = `https://wa.me/${seuNumeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

// --- Funções Auxiliares de Feedback (Sem alterações) ---
function mostrarFeedback(mensagem) {
    formFeedback.textContent = mensagem;
}

function limparFeedback() {
    formFeedback.textContent = '';
}

// --- Fechar modal ao clicar fora (Sem alterações, já chama fecharInfoModal) ---
window.onclick = function(event) {
  if (event.target == formularioPopup) {
    fecharFormulario();
  }
  if (event.target == infoPopup) {
    fecharInfoModal(); // Chama a função atualizada que pausa o <video>
  }
}