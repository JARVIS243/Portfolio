/* =========================
   Typing Animation
========================= */

const textArray = [
  "Web Developer",
  "Frontend Developer",
  "Creative Thinker",
  "Problem Solver"
];

const typingText = document.querySelector(".typing-text");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentText = textArray[textIndex];

  if (!isDeleting) {
    // Typing
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), 1200);
    }
  } else {
    // Deleting
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
    }
  }

  const speed = isDeleting ? 80 : 120;
  setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

/* =========================
   Smooth Page Fade-in
========================= */

document.body.style.opacity = 0;

window.addEventListener("load", () => {
  document.body.style.transition = "opacity 0.8s ease";
  document.body.style.opacity = 1;
});
