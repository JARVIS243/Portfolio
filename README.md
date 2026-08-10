# Portfolio Website

A multi-page personal portfolio site — home, about, skills, projects, resume, and contact — built with plain HTML, CSS, and JavaScript. No build tools, no frameworks, no dependencies to install. Just open it or deploy it.

## Structure

```
portfolio/
├── index.html          Home page (hero, stats)
├── about.html           About page
├── skills.html          Skills grid + illustration
├── projects.html        Project cards grid
├── resume.html          Resume summary + download link
├── contact.html         Contact form + social links
├── css/
│   └── style.css        All styling (single shared stylesheet)
├── js/
│   └── script.js        All behavior (single shared script)
└── assets/
    ├── icons/            Nav icons, favicon
    ├── images/           Profile photos, project thumbnails
    └── music/            Whoosh.mp3 (not currently used — see Intro section below)
```

Every page shares the same `css/style.css` and `js/script.js`, so a change to either file updates the whole site at once.

## Running it locally

No build step needed. Either:

- Open `index.html` directly in a browser, **or**
- Serve the folder with any static server, e.g.:
  ```
  npx serve .
  ```
  or the VS Code "Live Server" extension.

## Deploying

This is a static site — drag the whole `portfolio` folder onto [Netlify](https://app.netlify.com/drop), or connect it to a GitHub repo on Netlify/Vercel/GitHub Pages. No build command or output directory settings are needed.

## Features

- **Opening reveal animation** — plays once per browser session (via `sessionStorage`), skipped entirely if the visitor has `prefers-reduced-motion` enabled.
- **Ambient background** — drifting color blobs + a canvas-based rising dust-mote effect, running behind all content.
- **Scroll reveal** — sections, project cards, skill cards, and journal entries fade up into view as you scroll.
- **Contact form** — submits via `fetch` to [Formspree](https://formspree.io) (form ID: `mqpzagpj`), with inline success/error messaging and no page redirect.
- **Responsive** — works down to small mobile widths, with a slide-out nav menu below 720px.
- **Accessible motion** — every animation respects `prefers-reduced-motion: reduce`.

## Customizing

**Your info:** Search each `.html` file for "Your Name" and the placeholder role text, and replace with your own.

**Projects:** Open `projects.html` — each `<article class="project-card">` block is one project. Replace the placeholder image, title, description, tags, and the `href="#"` link with your real project's live demo URL.

**Resume:** Drop your actual PDF at `assets/resume.pdf` (referenced by the download buttons on the Home and Resume pages).

**Contact info:** In `contact.html`, update the email address and the four social links (GitHub, Instagram, email, phone) in the `.contact-side__socials` block.

**Contact form backend:** The form currently posts to a Formspree endpoint. To point it at your own Formspree form, change the `action` attribute on the `<form id="contactForm">` in `contact.html` to your own endpoint URL — no JS changes needed. Formspree requires you to confirm your form via email after the first submission before it starts delivering messages.

**Colors/fonts:** All design tokens (colors, fonts, spacing) are CSS custom properties at the top of `css/style.css` under `:root` — change them once and they apply site-wide.

**Intro sound:** `assets/music/Whoosh.mp3` is included but not currently wired up (the opening animation is silent by design). If you want it back, it can be re-added to the intro sequence in `js/script.js`.

## Browser support

Built with modern CSS (custom properties, `clamp()`, `aspect-ratio`, `backdrop-filter`) and JS (`IntersectionObserver`, Canvas, `fetch`). Works in all current versions of Chrome, Firefox, Safari, and Edge. No polyfills included for older browsers.
