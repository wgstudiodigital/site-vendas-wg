/* =========================================================
   MENU MOBILE
   Abre/fecha o menu, mantém o ícone (hamburguer/X) e o estado
   de acessibilidade (aria-expanded) sempre sincronizados.
========================================================= */
const mobileMenu = document.getElementById("mobile-menu");
const nav = document.querySelector(".nav");

function openMenu() {
    nav.classList.add("active");
    mobileMenu.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-label", "Fechar menu de navegação");
}

function closeMenu() {
    nav.classList.remove("active");
    mobileMenu.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-label", "Abrir menu de navegação");
}

function toggleMenu() {
    const isOpen = nav.classList.contains("active");
    isOpen ? closeMenu() : openMenu();
}

if (mobileMenu && nav) {
    mobileMenu.addEventListener("click", toggleMenu);

    // Fecha o menu automaticamente ao clicar em qualquer link de navegação
    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Fecha o menu ao pressionar a tecla Esc (acessibilidade via teclado)
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", (event) => {
        const clickedInsideMenu = nav.contains(event.target) || mobileMenu.contains(event.target);
        if (!clickedInsideMenu) closeMenu();
    });
}

/* =========================================================
   LAZY LOAD DO VÍDEO DO PORTFÓLIO
   O vídeo só começa a ser baixado quando o item de portfólio
   se aproxima da área visível da tela. Isso evita gastar dados
   e tempo de carregamento com um vídeo que talvez o usuário
   nunca role até ver — melhora bastante o desempenho geral.
========================================================= */
const portfolioVideos = document.querySelectorAll(".portfolio-item video[data-src]");

if (portfolioVideos.length && "IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    video.src = video.dataset.src;
                    video.autoplay = true;
                    video.play().catch(() => {
                        /* Alguns navegadores bloqueiam autoplay; sem problema,
                           o usuário ainda vê o poster e pode interagir. */
                    });
                    observer.unobserve(video);
                }
            });
        },
        { rootMargin: "200px" }
    );

    portfolioVideos.forEach((video) => videoObserver.observe(video));
} else {
    // Navegadores sem suporte a IntersectionObserver: carrega o vídeo normalmente
    portfolioVideos.forEach((video) => {
        video.src = video.dataset.src;
        video.autoplay = true;
    });
}

/* =========================================================
   PERGUNTAS FREQUENTES (accordion)
   Cada pergunta abre/fecha sua resposta de forma independente.
   Usa max-height controlado via JS para permitir a transição
   suave definida no CSS (max-height não anima bem com "auto").
========================================================= */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const botao = item.querySelector(".faq-pergunta");
    const resposta = item.querySelector(".faq-resposta");

    botao.addEventListener("click", () => {
        const estaAberto = item.getAttribute("data-aberto") === "true";

        if (estaAberto) {
            resposta.style.maxHeight = null;
            item.setAttribute("data-aberto", "false");
            botao.setAttribute("aria-expanded", "false");
        } else {
            resposta.style.maxHeight = resposta.scrollHeight + "px";
            item.setAttribute("data-aberto", "true");
            botao.setAttribute("aria-expanded", "true");
        }
    });
});

/* =========================================================
   ANIMAÇÕES AO ROLAR A PÁGINA (fade-in)
   Adiciona a classe .in-view aos elementos marcados com
   .fade-in conforme eles entram na tela — efeito leve e
   elegante, sem exagero.
========================================================= */
const fadeElements = document.querySelectorAll(".fade-in");

if (fadeElements.length && "IntersectionObserver" in window) {
    const fadeObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    fadeElements.forEach((el) => fadeObserver.observe(el));
} else {
    // Fallback: mostra tudo imediatamente se o navegador não suportar
    fadeElements.forEach((el) => el.classList.add("in-view"));
}
