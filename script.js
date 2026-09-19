const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const reveals = document.querySelectorAll('.reveal');
const heroBackgroundImages = document.querySelectorAll('.hero-background-image');

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

reveals.forEach((element) => revealObserver.observe(element));

const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => activeSectionObserver.observe(section));

if (heroBackgroundImages.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let activeHeroImage = 0;

  window.setInterval(() => {
    heroBackgroundImages[activeHeroImage].classList.remove('active');
    activeHeroImage = (activeHeroImage + 1) % heroBackgroundImages.length;
    heroBackgroundImages[activeHeroImage].classList.add('active');
  }, 6000);
}
