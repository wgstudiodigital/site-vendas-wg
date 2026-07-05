/* =========================================================
   HEADER — muda de transparente para sólido ao rolar a página
========================================================= */
const header = document.getElementById("header");

function atualizarHeader() {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", atualizarHeader);
atualizarHeader();

/* =========================================================
   MENU MOBILE
========================================================= */
const mobileMenu = document.getElementById("mobile-menu");
const nav = document.querySelector(".nav");

function abrirMenu() {
    nav.classList.add("active");
    mobileMenu.setAttribute("aria-expanded", "true");
}

function fecharMenu() {
    nav.classList.remove("active");
    mobileMenu.setAttribute("aria-expanded", "false");
}

if (mobileMenu && nav) {
    mobileMenu.addEventListener("click", () => {
        nav.classList.contains("active") ? fecharMenu() : abrirMenu();
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", fecharMenu));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") fecharMenu();
    });

    document.addEventListener("click", (event) => {
        const clicouDentro = nav.contains(event.target) || mobileMenu.contains(event.target);
        if (!clicouDentro) fecharMenu();
    });
}

/* =========================================================
   CARDÁPIO — abas de categorias
========================================================= */
const abas = document.querySelectorAll(".tab-btn");
const paineis = document.querySelectorAll(".cardapio-lista");

abas.forEach((aba) => {
    aba.addEventListener("click", () => {
        const categoria = aba.dataset.categoria;

        abas.forEach((a) => {
            a.classList.remove("ativo");
            a.setAttribute("aria-selected", "false");
        });
        aba.classList.add("ativo");
        aba.setAttribute("aria-selected", "true");

        paineis.forEach((painel) => {
            painel.hidden = painel.dataset.painel !== categoria;
        });
    });
});

/* =========================================================
   FAQ (accordion)
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
   FORMULÁRIO DE RESERVA
   Sem backend conectado neste projeto de portfólio — apenas
   confirma visualmente o envio. Substituir por integração real
   (e-mail, WhatsApp API, sistema de reservas) quando publicado.
========================================================= */
const formReserva = document.getElementById("form-reserva");

if (formReserva) {
    formReserva.addEventListener("submit", (event) => {
        event.preventDefault();
        const botao = formReserva.querySelector("button[type='submit']");
        const textoOriginal = botao.textContent;

        botao.textContent = "Reserva Enviada ✓";
        botao.disabled = true;

        setTimeout(() => {
            botao.textContent = textoOriginal;
            botao.disabled = false;
            formReserva.reset();
        }, 2500);
    });
}

/* =========================================================
   ANIMAÇÕES AO ROLAR (fade-in)
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
    fadeElements.forEach((el) => el.classList.add("in-view"));
}
