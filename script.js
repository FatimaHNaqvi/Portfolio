const typedText = document.getElementById("typed-text");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

let index = 0;
const text = `I love bringing ideas to life through code — solving 
              tough problems, designing smart systems, and creating
                      tech that actually matters!`;

function typeChar() {
  if (index < text.length) {
    typedText.textContent += text.charAt(index);
    index++;
    setTimeout(typeChar, 30);
  }
}

window.onload = typeChar;

// Toggle menu on hamburger click
menuToggle.addEventListener("click", (e) => {
  navLinks.classList.toggle("show");
  e.stopPropagation(); // Prevent event bubbling so document listener doesn't close it immediately
});

// Close menu if clicking outside nav or toggle
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove("show");
  }
});
