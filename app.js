/* ============================================
   HaiderHuss Agency — Interaction Layer
   Scroll Reveals, Menu Morph, Magnetic Buttons
   ============================================ */

(function () {
  'use strict';

  /* ── DOM References ── */
  const menuToggle = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuLinks = menuOverlay.querySelectorAll('.menu-overlay__link');
  const revealElements = document.querySelectorAll('.reveal-up');

  let menuOpen = false;

  /* ── Hamburger → X Morph ── */
  function openMenu() {
    menuOpen = true;
    menuToggle.classList.add('open');
    menuOverlay.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOpen = false;
    menuToggle.classList.remove('open');
    menuOverlay.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', function () {
      if (menuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Close on link click */
    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
      }
    });
  }

  /* ── Scroll Reveal (IntersectionObserver) ── */
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: show everything immediately */
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── Nav Pill Shrink on Scroll ── */
  var navbar = document.getElementById('navbar');
  var lastScrollY = 0;

  function updateNavOnScroll() {
    var scrollY = window.scrollY;

    if (scrollY > 100) {
      navbar.style.opacity = '0.92';
    } else {
      navbar.style.opacity = '1';
    }

    lastScrollY = scrollY;
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateNavOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ── Smooth Scroll for Nav Links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();