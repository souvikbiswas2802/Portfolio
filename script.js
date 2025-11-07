document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            if (window.innerWidth <= 768) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });

    const cards = document.querySelectorAll('.card');

const cursor = document.getElementById("cursor");

const isLowPower = (navigator.deviceMemory && navigator.deviceMemory < 2) ||
                   (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);

const AMOUNT = isLowPower ? 6 : 8;
const SINE_DOTS = Math.floor(AMOUNT * 0.25);
const DOT_WIDTH = isLowPower ? 18 : 22;
const IDLE_TIMEOUT = 150;

let lastFrame = 0;
let mousePosition = { x: 0, y: 0 };
let dots = [];
let timeoutID;
let idle = false;

if (isLowPower && cursor) {
    cursor.style.filter = 'none';
}

class Dot {
    constructor(index = 0) {
        this.index = index;
        this.anglespeed = 0.05;
        this.x = 0;
        this.y = 0;
        this.scale = 1 - 0.05 * index;
        this.range = DOT_WIDTH / 2 - (DOT_WIDTH / 2) * this.scale + 2;
        this.limit = DOT_WIDTH * 0.75 * this.scale;
        this.element = document.createElement("span");
        this.element.className = "cursor-dot";
        this.element.style.willChange = "transform";
        cursor.appendChild(this.element);
    }
    lock() {
        this.lockX = this.x;
        this.lockY = this.y;
        this.angleX = Math.PI * 2 * Math.random();
        this.angleY = Math.PI * 2 * Math.random();
    }
    draw(delta) {
        if (!idle || this.index <= SINE_DOTS) {
            this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) scale(${this.scale})`;
        } else {
            this.angleX += this.anglespeed;
            this.angleY += this.anglespeed;
            this.y = this.lockY + Math.sin(this.angleY) * this.range;
            this.x = this.lockX + Math.sin(this.angleX) * this.range;
            this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) scale(${this.scale})`;
        }
    }
}

function buildDots() {
    dots.forEach(d => d.element.remove());
    dots = [];
    for (let i = 0; i < AMOUNT; i++) {
        let dot = new Dot(i);
        dots.push(dot);
    }
}

function startIdleTimer() {
    timeoutID = setTimeout(goInactive, IDLE_TIMEOUT);
    idle = false;
}
function resetIdleTimer() {
    clearTimeout(timeoutID);
    startIdleTimer();
}
function goInactive() {
    idle = true;
    for (let dot of dots) {
        dot.lock();
    }
}

const onMouseMove = event => {
    mousePosition.x = event.clientX - DOT_WIDTH / 2;
    mousePosition.y = event.clientY - DOT_WIDTH / 2;
    resetIdleTimer();
};
const onTouchMove = event => {
    mousePosition.x = event.touches[0].clientX - DOT_WIDTH / 2;
    mousePosition.y = event.touches[0].clientY - DOT_WIDTH / 2;
    resetIdleTimer();
};

function positionCursor(delta) {
    let x = mousePosition.x;
    let y = mousePosition.y;
    dots.forEach((dot, index, arr) => {
        let nextDot = arr[index + 1] || arr[0];
        dot.x = x;
        dot.y = y;
        dot.draw(delta);
        if (!idle || index <= SINE_DOTS) {
            const dx = (nextDot.x - dot.x) * 0.35;
            const dy = (nextDot.y - dot.y) * 0.35;
            x += dx;
            y += dy;
        }
    });
}

const MIN_DELTA = 8;
function render(timestamp) {
    const delta = timestamp - lastFrame;
    if (delta >= MIN_DELTA) {
        positionCursor(delta);
        lastFrame = timestamp;
    }
    requestAnimationFrame(render);
}

function initCursor() {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    lastFrame = performance.now();
    buildDots();
    startIdleTimer();
    requestAnimationFrame(render);
}

if (window.innerWidth > 768) {
    initCursor();
}

    cards.forEach((card, index) => {
        setTimeout(() => {
            cardObserver.observe(card);
        }, index * 50);
    });

    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 10px 40px rgba(6, 182, 212, 0.3)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.boxShadow = 'none';
        });
    });
});

const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;
const THEME_KEY = "portfolio-theme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";

function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme || (prefersDark ? DARK_THEME : LIGHT_THEME);

    applyTheme(theme);
}

function applyTheme(theme) {
    if (theme === LIGHT_THEME) {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }
    localStorage.setItem(THEME_KEY, theme);
}

themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("light-mode")
        ? LIGHT_THEME
        : DARK_THEME;
    const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;

    applyTheme(newTheme);
});

window.addEventListener("DOMContentLoaded", initializeTheme);

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
        }
    });
