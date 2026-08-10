// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------
// Opening reveal — plays once per browser session
// (not on every page navigation), skipped entirely
// for reduced motion. Kept short and understated:
// name, role, a thin progress line, then it's gone.
// ---------------------------------------------
(function introReveal() {
  if (prefersReducedMotion) return;
  if (sessionStorage.getItem("introPlayed") === "true") return;

  const overlay = document.createElement("div");
  overlay.className = "intro-overlay";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <div class="intro-overlay__bar intro-overlay__bar--top" aria-hidden="true"></div>
    <div class="intro-overlay__bar intro-overlay__bar--bottom" aria-hidden="true"></div>
    <div class="intro-overlay__glow" aria-hidden="true"></div>
    <h1 class="intro-overlay__mark">Aju Krishna B<span class="dot">.</span></h1>
    <div class="intro-overlay__rule" aria-hidden="true"></div>
    <p class="intro-overlay__role">Student &amp; Aspiring Developer</p>
    <button type="button" class="intro-overlay__skip">Skip</button>
  `;
  document.body.prepend(overlay);
  document.body.style.overflow = "hidden";

  function endIntro() {
    if (overlay.classList.contains("is-hiding")) return;
    overlay.classList.add("is-hiding");
    sessionStorage.setItem("introPlayed", "true");
    document.body.style.overflow = "";
    setTimeout(() => overlay.remove(), 600);
  }

  overlay.querySelector(".intro-overlay__skip").addEventListener("click", (e) => {
    e.stopPropagation();
    endIntro();
  });
  setTimeout(endIntro, 3000);
})();

// ---------------------------------------------
// Ambient background animation: drifting color
// blobs + soft rising dust motes. Injected here
// (not in HTML) so it applies across every page.
// ---------------------------------------------
const amberBlob = document.createElement("div");
amberBlob.className = "bg-blob bg-blob--amber";
amberBlob.setAttribute("aria-hidden", "true");

const tealBlob = document.createElement("div");
tealBlob.className = "bg-blob bg-blob--teal";
tealBlob.setAttribute("aria-hidden", "true");

document.body.prepend(tealBlob);
document.body.prepend(amberBlob);

if (!prefersReducedMotion) {
  const canvas = document.createElement("canvas");
  canvas.className = "bg-particles";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  const colors = ["242, 184, 75", "95, 212, 192"]; // amber, teal (rgb)
  let particles = [];
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function sizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 100,
      r: 1 + Math.random() * 1.8,
      speed: 0.15 + Math.random() * 0.35,
      drift: (Math.random() - 0.5) * 0.4,
      driftPhase: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      baseAlpha: 0.2 + Math.random() * 0.35,
    };
  }

  function initParticles() {
    const count = window.innerWidth < 720 ? 18 : 34;
    particles = Array.from({ length: count }, () => {
      const p = makeParticle();
      p.y = Math.random() * window.innerHeight; // spread out on first paint
      return p;
    });
  }

  let t = 0;
  function tick() {
    t += 0.016;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((p) => {
      p.y -= p.speed;
      p.x += Math.sin(t + p.driftPhase) * p.drift;
      if (p.y < -10) {
        p.y = window.innerHeight + 10;
        p.x = Math.random() * window.innerWidth;
      }
      const alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(t * 1.2 + p.driftPhase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${Math.max(alpha, 0)})`;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }

  sizeCanvas();
  initParticles();
  requestAnimationFrame(tick);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      sizeCanvas();
      initParticles();
    }, 200);
  });
}

// Mobile nav toggle (animates hamburger into an X)
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---------------------------------------------
// Generic scroll-reveal: fades + rises elements
// into view the first time they enter viewport.
// ---------------------------------------------
const revealSelectors = [
  ".section__eyebrow",
  ".section__title",
  ".section__sub",
  ".about__intro",
  ".about__body p",
  ".skills-hero",
  ".project-card",
  ".skill-card",
  ".journal-list li",
  ".contact-grid > *",
  ".page-header",
];

const revealEls = document.querySelectorAll(revealSelectors.join(","));

if (prefersReducedMotion) {
  revealEls.forEach((el) => {
    el.classList.add("reveal", "is-visible");
  });
} else if ("IntersectionObserver" in window) {
  // Stagger elements that share a parent (project grid, skills grid, journal list...)
  const staggerCounters = new WeakMap();

  revealEls.forEach((el) => {
    el.classList.add("reveal");
    const parent = el.parentElement;
    const count = staggerCounters.get(parent) || 0;
    staggerCounters.set(parent, count + 1);
    el.style.transitionDelay = `${Math.min(count, 8) * 70}ms`;
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("reveal", "is-visible"));
}

// Skill bars fill once their card is visible (uses the same reveal signal)
const skillCards = document.querySelectorAll(".skill-card");
skillCards.forEach((card) => {
  if (prefersReducedMotion) {
    card.classList.add("is-visible");
    return;
  }
  if (!("IntersectionObserver" in window)) {
    card.classList.add("is-visible");
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(card);
});

// Cursor-follow lamp glow (desktop only, respects reduced motion)
const lampGlow = document.querySelector(".lamp-glow");
if (lampGlow && !prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
  let targetX = window.innerWidth / 2;
  let targetY = 0;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY * 0.3; // subtle vertical follow only
  });

  function animateLamp() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    lampGlow.style.transform = `translate(-50%, 0) translate(${(currentX - window.innerWidth / 2) * 0.08}px, ${currentY * 0.08}px)`;
    requestAnimationFrame(animateLamp);
  }
  requestAnimationFrame(animateLamp);
}

// Simple rotating role text in hero (no external libs)
const roles = [
  "Student & Aspiring Developer",
  "Building things while learning",
  "Curious about how the web works",
];
const roleEl = document.getElementById("typedRole");
let roleIndex = 0;

if (roleEl && !prefersReducedMotion) {
  roleEl.style.transition = "opacity 250ms ease";
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleEl.style.opacity = 0;
    setTimeout(() => {
      roleEl.textContent = roles[roleIndex];
      roleEl.style.opacity = 1;
    }, 250);
  }, 3200);
}

// Contact form — submits to Formspree via fetch so we can show
// an inline success/error message without leaving the page.
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (form && formNote) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formNote.textContent = "";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formNote.textContent = "Thanks! Your message is on its way — I'll get back to you soon.";
        form.reset();
      } else {
        formNote.textContent = "Something went wrong sending that. Try again, or email me directly.";
      }
    } catch (err) {
      formNote.textContent = "Couldn't reach the server — check your connection and try again.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
