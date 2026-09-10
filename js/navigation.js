(() => {
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    const isProjectDetail = current === 'project.html' && href === 'projects.html';
    if (href === current || isProjectDetail) link.setAttribute('aria-current', 'page');
  });
})();
