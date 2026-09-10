(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Add a transition veil without duplicating markup across pages.
  const veil = document.createElement('div');
  veil.className = 'page-transition';
  veil.setAttribute('aria-hidden', 'true');
  document.body.prepend(veil);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => document.body.classList.add('is-ready'));
  });

  if (reduceMotion) return;

  // Stagger repeated reveal elements so sections feel intentionally choreographed.
  document.querySelectorAll('section').forEach(section => {
    section.querySelectorAll('.reveal').forEach((el, index) => {
      el.style.setProperty('--reveal-delay', `${Math.min(index * 80, 320)}ms`);
    });
  });

  // Image masks use their own observer for a more editorial entrance.
  const imageFrames = document.querySelectorAll(
    '.hero-visual, .project-card-image, .project-tile .image, .studio-visual, .project-detail-image'
  );
  imageFrames.forEach(frame => frame.classList.add('image-reveal'));

  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-image-visible');
      imageObserver.unobserve(entry.target);
    });
  }, { threshold: 0.16 });
  imageFrames.forEach(frame => imageObserver.observe(frame));

  // Gentle vertical parallax. Kept intentionally small to preserve legibility.
  const parallaxImages = [...document.querySelectorAll(
    '.hero-visual img, .project-detail-image img, .studio-visual img'
  )];
  parallaxImages.forEach(img => img.setAttribute('data-parallax', ''));

  let ticking = false;
  const updateParallax = () => {
    const vh = window.innerHeight;
    parallaxImages.forEach(img => {
      const frame = img.parentElement;
      const rect = frame.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
      const shift = Math.max(-18, Math.min(18, centerOffset * -24));
      img.style.setProperty('--parallax-y', `${shift}px`);
    });
    ticking = false;
  };

  const requestParallax = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateParallax);
  };
  window.addEventListener('scroll', requestParallax, { passive: true });
  window.addEventListener('resize', requestParallax);
  updateParallax();

  // Page exits: same-site HTML links get a short cinematic wipe.
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    const target = new URL(link.href, window.location.href);
    if (target.origin !== window.location.origin || !target.pathname.endsWith('.html')) return;

    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
      event.preventDefault();
      document.body.classList.add('is-leaving', 'is-transitioning');
      window.setTimeout(() => { window.location.href = link.href; }, 520);
    });
  });
})();
