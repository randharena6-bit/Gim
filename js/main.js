const preloader = document.getElementById('preloader');
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('load', () => {
  setTimeout(() => preloader.classList.add('hidden'), 800);
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

const hero = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
  const offset = window.pageYOffset;
  if (hero) hero.style.transform = `translateY(${offset * 0.4}px) scale(1.1)`;
});

document.querySelectorAll('.banner-bg.parallax').forEach((bg) => {
  const rect = bg.parentElement.getBoundingClientRect();
  const speed = 0.3;
  bg.style.backgroundPositionY = `${(rect.top * -speed)}px 0`;
});

document.querySelectorAll('.parallax').forEach((bg) => {
  if (bg.classList.contains('banner-bg')) {
    bg.style.backgroundAttachment = 'scroll';
  }
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getInstance(menu).hide();
    }
  });
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const success = document.querySelector('.form-success');
  success.classList.remove('d-none');
  e.target.reset();
  setTimeout(() => success.classList.add('d-none'), 5000);
});