// ─── Typed terminal text (cycling phrases) ───────────────────────────────────
const typedEl = document.getElementById("typed-text");

const phrases = [
  "I turn complex problems into elegant solutions —\none line of code at a time.",
  "Full Stack Developer · Fintech · API Design\nbuilding systems that move money safely.",
  "Passionate about clean code, robust APIs,\nand tech that actually matters.",
  "Java · PHP · React · .NET · MySQL\nLet's build something great together.",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let pauseTimer = null;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    // Typing forward
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      // Pause at end before deleting
      pauseTimer = setTimeout(() => {
        isDeleting = true;
        typeLoop();
      }, 2600);
      return;
    }
  } else {
    // Deleting
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
  }

  const speed = isDeleting ? 18 : 32;
  setTimeout(typeLoop, speed);
}

window.addEventListener("load", () => {
  setTimeout(typeLoop, 600);
});

// ─── Hamburger menu toggle ───────────────────────────────────────────────────
const menuToggle = document.getElementById("menu-toggle");
const navLinks   = document.getElementById("nav-links");

menuToggle.addEventListener("click", (e) => {
  navLinks.classList.toggle("show");
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove("show");
  }
});

// Close menu when a nav link is clicked (mobile)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("show"));
});

// ─── Scroll reveal ───────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ─── Active nav link on scroll ───────────────────────────────────────────────
const sections    = document.querySelectorAll("div[id]");
const navAnchors  = document.querySelectorAll(".nav-links a[href^='#']");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.toggle(
            "active",
            a.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));
