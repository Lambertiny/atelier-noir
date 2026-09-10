# Atelier Noir

A responsive multi-page portfolio concept for a fictional contemporary architecture studio. The project was designed to feel like a real premium architecture practice rather than a generic front-end exercise.

## Live concept

**Atelier Noir** explores editorial web design, expressive typography, restrained motion and architecture-led storytelling across desktop and mobile.

## Highlights

- Six fully navigable pages
- Responsive editorial layouts using CSS Grid and Flexbox
- Mobile navigation with staggered motion
- Scroll-triggered content reveals
- Image mask reveals and subtle parallax
- Cinematic same-site page transitions
- Direction-aware header behavior on scroll
- Refined project, service and form microinteractions
- Semantic HTML and keyboard focus states
- `prefers-reduced-motion` support
- Lightweight vanilla JavaScript with no framework dependency
- Local SVG artwork for a self-contained visual system

## Pages

- `index.html` — Home / selected work
- `projects.html` — Project archive
- `project.html` — Casa Vetra case study
- `studio.html` — Studio profile and principles
- `services.html` — Capabilities
- `contact.html` — Enquiry experience

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- CSS Custom Properties
- CSS Grid + Flexbox
- Intersection Observer API
- RequestAnimationFrame-powered parallax

## Project structure

```text
atelier-noir/
├── assets/
│   └── images/
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── global.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── navigation.js
│   ├── main.js
│   └── animations.js
├── screenshots/
├── index.html
├── projects.html
├── project.html
├── studio.html
├── services.html
├── contact.html
├── LICENSE
└── README.md
```

## Design direction

The interface combines a warm off-white canvas, charcoal typography, mineral neutrals and a restrained bronze accent. Cormorant Garamond carries the editorial display language while Manrope handles navigation and interface copy.

Motion is deliberately quiet: it supports spatial rhythm without competing with the work. All animation-heavy behavior is disabled or simplified when a visitor prefers reduced motion.

## Running locally

No build step is required. Open `index.html` directly in a browser, or serve the folder with any static local server.

## Deployment

The project can be deployed directly to **GitHub Pages** or **Vercel** as a static site.

## Portfolio note

This is a fictional architecture brand and a portfolio case study. The identity, interface, layouts, SVG compositions and front-end implementation were created specifically for demonstrating digital design and development capability.

---

**Portfolio project by Lambertiny**
