/* ==========================================================================
   animations.js — Animações acionadas pela rolagem
   - Reveal: elementos .reveal aparecem ao entrar na tela
   - Contadores: números da seção "Em números" contam até o valor alvo
   Tudo é desativado quando o sistema pede menos movimento.

   Por que não usamos IntersectionObserver aqui:
   o observer só avalia a posição dos elementos a cada quadro. Numa rolagem
   muito rápida (roda do mouse acelerada, tecla End, link de âncora), uma seção
   inteira pode passar de "abaixo da tela" para "acima da tela" entre dois
   quadros — o observer nunca dispara e o conteúdo fica invisível para sempre.
   A varredura abaixo compara posições diretamente, então nada é pulado.
   ========================================================================== */

(function () {
  "use strict";

  var MARGEM = 80; // px que o elemento precisa entrar na tela para aparecer
  var DURACAO = 1600; // duração da contagem dos números, em ms

  var menosMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Listas de pendentes: cada elemento sai daqui assim que é ativado
  var pendentesReveal = Array.prototype.slice.call(
    document.querySelectorAll(".reveal")
  );
  var pendentesContador = Array.prototype.slice.call(
    document.querySelectorAll(".contador")
  );

  function formatar(valor, sufixo) {
    return valor.toLocaleString("pt-BR") + sufixo;
  }

  function valorFinal(elemento) {
    return formatar(
      Number(elemento.dataset.alvo || 0),
      elemento.dataset.sufixo || ""
    );
  }

  /* ----------------------------------------------------------------------
     Sem animação: mostra tudo no estado final e encerra
     ---------------------------------------------------------------------- */
  if (menosMovimento) {
    pendentesReveal.forEach(function (el) {
      el.classList.add("visivel");
    });
    pendentesContador.forEach(function (el) {
      el.textContent = valorFinal(el);
    });
    return;
  }

  /* ----------------------------------------------------------------------
     Contadores animados
     ---------------------------------------------------------------------- */

  // Desaceleração suave no final (ease-out cubic)
  function suavizar(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animarContador(elemento) {
    var alvo = Number(elemento.dataset.alvo || 0);
    var sufixo = elemento.dataset.sufixo || "";
    var inicio = null;

    function passo(agora) {
      if (inicio === null) inicio = agora;

      var progresso = Math.min((agora - inicio) / DURACAO, 1);
      elemento.textContent = formatar(
        Math.round(alvo * suavizar(progresso)),
        sufixo
      );

      if (progresso < 1) {
        window.requestAnimationFrame(passo);
      } else {
        elemento.textContent = formatar(alvo, sufixo);
      }
    }

    window.requestAnimationFrame(passo);
  }

  /* ----------------------------------------------------------------------
     Varredura: ativa tudo que já entrou na tela (ou que já passou por ela)
     ---------------------------------------------------------------------- */

  // true quando o elemento entrou na tela OU já subiu para fora dela
  function jaApareceu(elemento, alturaJanela, margem) {
    var caixa = elemento.getBoundingClientRect();
    return caixa.top < alturaJanela - margem;
  }

  function varrer() {
    var alturaJanela = window.innerHeight;

    pendentesReveal = pendentesReveal.filter(function (el) {
      if (!jaApareceu(el, alturaJanela, MARGEM)) return true;
      el.classList.add("visivel");
      return false;
    });

    // Os contadores só começam quando estão bem visíveis
    pendentesContador = pendentesContador.filter(function (el) {
      if (!jaApareceu(el, alturaJanela, alturaJanela * 0.25)) return true;
      animarContador(el);
      return false;
    });

    // Nada mais pendente: solta os listeners
    if (!pendentesReveal.length && !pendentesContador.length) {
      window.removeEventListener("scroll", agendarVarredura);
      window.removeEventListener("resize", agendarVarredura);
    }
  }

  /* ----------------------------------------------------------------------
     Agendamento: no máximo uma varredura por quadro
     ---------------------------------------------------------------------- */
  var agendada = false;

  function agendarVarredura() {
    if (agendada) return;
    agendada = true;
    window.requestAnimationFrame(function () {
      agendada = false;
      varrer();
    });
  }

  window.addEventListener("scroll", agendarVarredura, { passive: true });
  window.addEventListener("resize", agendarVarredura, { passive: true });

  // Primeira passada: revela o que já está visível ao carregar a página
  varrer();

  // As fontes chegam depois e podem empurrar o layout; refaz a conta.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(agendarVarredura);
  }
  window.addEventListener("load", agendarVarredura);
})();
