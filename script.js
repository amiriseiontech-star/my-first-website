/* ===== DARK / LIGHT THEME ===== */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("riseion-theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
}

function updateThemeButton() {
    const isLight = document.body.classList.contains("light");
    themeToggle.textContent = isLight ? "☾" : "☀";
    themeToggle.title = isLight ? "Switch to dark theme" : "Switch to light theme";
    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const theme = document.body.classList.contains("light")
        ? "light"
        : "dark";

    localStorage.setItem("riseion-theme", theme);
    updateThemeButton();
});

/* ===== MOBILE MENU ===== */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

/* ===== SCROLL REVEAL ANIMATION ===== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});

/* ===== ANIMATED PARTICLES ===== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let animationId;
let width = 0;
let height = 0;

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(100, Math.floor(width / 12));

    particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        speed: Math.random() * 0.45 + 0.15,
        drift: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.6 + 0.2
    }));
}

function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.body.classList.contains("light");
    const color = isLight ? "70, 110, 230" : "40, 220, 255";

    particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;

        if (p.y < -5) {
            p.y = height + 5;
            p.x = Math.random() * width;
        }

        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.shadowBlur = 9;
        ctx.shadowColor = `rgba(${color}, 0.8)`;
        ctx.fill();
    });

    ctx.shadowBlur = 0;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animationId = requestAnimationFrame(drawParticles);
    }
}

resizeCanvas();
drawParticles();

window.addEventListener("resize", resizeCanvas);

/* Pause particles when the tab is hidden */
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
    } else {
        drawParticles();
    }
});

/* ===== CONTACT FORM DEMO ===== */
document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const formMessage = document.getElementById("formMessage");

    formMessage.textContent =
        `Thanks, ${name}! Your demo form was submitted in this browser.`;

    event.target.reset();
});

/* ===== CURRENT YEAR ===== */
document.getElementById("year").textContent = new Date().getFullYear();
