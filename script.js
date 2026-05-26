// ===========================================================
// CK Materials · interactions
// ===========================================================

(function () {
  'use strict';

  // ---- Sticky nav background on scroll
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 60) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu toggle
  const burger = document.getElementById('navBurger');
  const menu = document.querySelector('.nav__menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close menu on link click
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  // ---- Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Smooth anchor scroll fallback (some browsers) — handled by CSS scroll-behavior
})();

// ---- Contact form submission (opens email client with prefilled body)
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const project = document.getElementById('project').value;
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(`Solicitud de presupuesto — ${name}`);
  const body = encodeURIComponent(
`Hola CK Materials,

Mi nombre es ${name}.
Contacto: ${email}${phone ? ' · ' + phone : ''}
Tipo de proyecto: ${project}

${message}

Un saludo.`);

  window.location.href = `mailto:contacto@ckmaterials.com?subject=${subject}&body=${body}`;
  return false;
}
