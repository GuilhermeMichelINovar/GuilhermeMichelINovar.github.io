/* ==========================================================================
   main.js — Comportamento de navegação
   - Menu mobile (hamburguer)
   - Sombra no header ao rolar
   - Link ativo conforme a seção visível
   - Ano atual no rodapé
   ========================================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Menu mobile
     ---------------------------------------------------------------------- */
  var hamburguer = document.getElementById("hamburguer");
  var menuMobile = document.getElementById("menu-mobile");

  function fecharMenu() {
    if (!menuMobile || !hamburguer) return;
    menuMobile.classList.remove("aberto");
    hamburguer.setAttribute("aria-expanded", "false");
    hamburguer.setAttribute("aria-label", "Abrir menu de navegação");
  }

  function alternarMenu() {
    if (!menuMobile || !hamburguer) return;
    var aberto = menuMobile.classList.toggle("aberto");
    hamburguer.setAttribute("aria-expanded", String(aberto));
    hamburguer.setAttribute(
      "aria-label",
      aberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
    );
  }

  if (hamburguer && menuMobile) {
    hamburguer.addEventListener("click", alternarMenu);

    // Fecha ao clicar em qualquer link do menu
    menuMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", fecharMenu);
    });

    // Fecha com a tecla Esc e devolve o foco ao botão
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && menuMobile.classList.contains("aberto")) {
        fecharMenu();
        hamburguer.focus();
      }
    });

    // Fecha ao clicar fora do menu
    document.addEventListener("click", function (evento) {
      if (!menuMobile.classList.contains("aberto")) return;
      if (
        !menuMobile.contains(evento.target) &&
        !hamburguer.contains(evento.target)
      ) {
        fecharMenu();
      }
    });

    // Fecha se a tela crescer e o menu desktop reaparecer
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (e) {
      if (e.matches) fecharMenu();
    });
  }

  /* ----------------------------------------------------------------------
     Sombra no header ao rolar a página
     ---------------------------------------------------------------------- */
  var header = document.getElementById("header");

  function atualizarHeader() {
    if (!header) return;
    header.classList.toggle("rolado", window.scrollY > 20);
  }

  atualizarHeader();
  window.addEventListener("scroll", atualizarHeader, { passive: true });

  /* ----------------------------------------------------------------------
     Link ativo conforme a seção visível na tela
     ---------------------------------------------------------------------- */
  var secoes = document.querySelectorAll("main section[id]");
  var linksNav = document.querySelectorAll(
    ".header__link, .menu-mobile__link"
  );

  if (secoes.length && linksNav.length && "IntersectionObserver" in window) {
    var marcarAtivo = function (id) {
      linksNav.forEach(function (link) {
        link.classList.toggle(
          "ativo",
          link.getAttribute("href") === "#" + id
        );
      });
    };

    var observadorSecoes = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            marcarAtivo(entrada.target.id);
          }
        });
      },
      {
        // A "linha de leitura" fica a ~40% do topo da janela
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0
      }
    );

    secoes.forEach(function (secao) {
      observadorSecoes.observe(secao);
    });
  }

  /* ----------------------------------------------------------------------
     Ano atual no rodapé
     ---------------------------------------------------------------------- */
  var ano = document.getElementById("ano");
  if (ano) {
    ano.textContent = String(new Date().getFullYear());
  }
})();
