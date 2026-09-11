(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.site-header');

  if (menuToggle && navLinks) {
    const setMenuState = open => {
      navLinks.classList.toggle('is-open', open);
      header?.classList.toggle('menu-open', open);
      document.body.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? 'Close' : 'Menu';
      document.body.style.overflow = open ? 'hidden' : '';
    };

    const closeMenu = () => setMenuState(false);

    menuToggle.addEventListener('click', () => {
      setMenuState(!navLinks.classList.contains('is-open'));
    });

    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  const reveals = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -4% 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const form = document.querySelector('[data-contact-form]');

  if (form) {
    const button = form.querySelector('.submit-btn');

    if (button && !button.querySelector('span')) {
      button.innerHTML = `<span>${button.textContent}</span>`;
    }

    form.addEventListener('submit', event => {
      event.preventDefault();

      const status = form.querySelector('.form-status');

      status.textContent =
        'Prototype form — connect your preferred form service before production.';

      form.reset();
    });
  }

  // Esconde o header ao rolar para baixo e mostra ao subir.
  if (header && !reduceMotion) {
    let lastY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (y < 90 || delta < -7) {
        header.classList.remove('is-hidden');
        header.classList.add('is-visible');
      } else if (
        delta > 8 &&
        y > 160 &&
        !(navLinks && navLinks.classList.contains('is-open'))
      ) {
        header.classList.add('is-hidden');
        header.classList.remove('is-visible');
      }

      lastY = y;
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;

        ticking = true;
        requestAnimationFrame(updateHeader);
      },
      { passive: true }
    );
  }
})();
