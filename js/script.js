// ===== Dynamic Typing Effect =====
// ===== Dynamic Typing Effect =====
const text = [
  "Hi, I'm Aju Krishna.B",
  "A Full-Stack Developer.",
  "A Tech Enthusiast.",
  "Crafting modern web experiences.",
  "Lover of clean code & great UI.",
  "Exploring the future with code.",
  "Building smarter, better systems.",
  "Turning ideas into digital reality.",
  "Always learning. Always creating.",
  "Let's build something amazing!"
];


let i = 0, j = 0;
let currentText = '', isDeleting = false;

function type() {
  if (i < text.length) {
    currentText = text[i];
    const typedElement = document.getElementById("typed");

    if (typedElement) {
      typedElement.innerHTML = currentText.substring(0, j) + (j % 2 === 0 ? "|" : "");

      if (!isDeleting) {
        j++;
        if (j === currentText.length + 1) {
          isDeleting = true;
          setTimeout(type, 1500);
          return;
        }
      } else {
        j--;
        if (j === 0) {
          isDeleting = false;
          i = (i + 1) % text.length;
        }
      }
      setTimeout(type, isDeleting ? 50 : 100);
    }
  }
}
type();

// ===== Optional: Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ===== Optional: Scroll to Top Button Logic =====
// (if you plan to use one)
const scrollTopBtn = document.getElementById("scrollTopBtn");
if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ===== Lottie Icon Loader =====
document.querySelectorAll('.lottie').forEach((el) => {
  const animName = el.getAttribute('data-lottie');
  lottie.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: `assets/lottie/${animName}.json`
  });
});
