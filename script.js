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

    // Gooey Cursor Effect
    const cursor = document.getElementById("cursor");
    const amount = 20;
    const sineDots = Math.floor(amount * 0.3);
    const width = 26;
    const idleTimeout = 150;
    let lastFrame = 0;
    let mousePosition = { x: 0, y: 0 };
    let dots = [];
    let timeoutID;
    let idle = false;

    class Dot {
        constructor(index = 0) {
            this.index = index;
            this.anglespeed = 0.05;
            this.x = 0;
            this.y = 0;
            this.scale = 1 - 0.05 * index;
            this.range = width / 2 - width / 2 * this.scale + 2;
            this.limit = width * 0.75 * this.scale;
            this.element = document.createElement("span");
            this.element.className = "cursor-dot";
            cursor.appendChild(this.element);
        }
        lock() {
            this.lockX = this.x;
            this.lockY = this.y;
            this.angleX = Math.PI * 2 * Math.random();
            this.angleY = Math.PI * 2 * Math.random();
        }
        draw(delta) {
            if (!idle || this.index <= sineDots) {
                this.element.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
            } else {
                this.angleX += this.anglespeed;
                this.angleY += this.anglespeed;
                this.y = this.lockY + Math.sin(this.angleY) * this.range;
                this.x = this.lockX + Math.sin(this.angleX) * this.range;
                this.element.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
            }
        }
    }

    function buildDots() {
        for (let i = 0; i < amount; i++) {
            let dot = new Dot(i);
            dots.push(dot);
        }
    }

    function startIdleTimer() {
        timeoutID = setTimeout(goInactive, idleTimeout);
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
        mousePosition.x = event.clientX - width / 2;
        mousePosition.y = event.clientY - width / 2;
        resetIdleTimer();
    };
    const onTouchMove = event => {
        mousePosition.x = event.touches[0].clientX - width / 2;
        mousePosition.y = event.touches[0].clientY - width / 2;
        resetIdleTimer();
    };

    function positionCursor(delta) {
        let x = mousePosition.x;
        let y = mousePosition.y;
        dots.forEach((dot, index, dots) => {
            let nextDot = dots[index + 1] || dots[0];
            dot.x = x;
            dot.y = y;
            dot.draw(delta);
            if (!idle || index <= sineDots) {
                const dx = (nextDot.x - dot.x) * 0.35;
                const dy = (nextDot.y - dot.y) * 0.35;
                x += dx;
                y += dy;
            }
        });
    }

    function render(timestamp) {
        const delta = timestamp - lastFrame;
        positionCursor(delta);
        lastFrame = timestamp;
        requestAnimationFrame(render);
    }

    function initCursor() {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);
        lastFrame = performance.now();
        buildDots();
        startIdleTimer();
        requestAnimationFrame(render);
    }

    initCursor();
    const cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

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
