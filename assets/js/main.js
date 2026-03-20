/**
 * Lumière - Main JavaScript
 * Handles premium intersection scroll animations, dark mode and RTL toggles.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initImageHandling();
  initAnimations();
  initThemeToggles();
  initBackToTop();
});

function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Build a shared mobile navigation drawer from the existing desktop nav/actions.
 */
function initMobileNav() {
  const headers = document.querySelectorAll('.site-header');

  headers.forEach((header, index) => {
    const headerContainer = header.querySelector('.container');
    const nav = header.querySelector('.main-nav');
    const actions = header.querySelector('.header-actions');

    if (!headerContainer || !nav || !actions) {
      return;
    }

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', `mobile-nav-panel-${index}`);
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    headerContainer.appendChild(toggle);

    const panel = document.createElement('div');
    panel.className = 'mobile-nav-panel';
    panel.id = `mobile-nav-panel-${index}`;
    panel.setAttribute('hidden', '');

    const panelInner = document.createElement('div');
    panelInner.className = 'mobile-nav-inner';

    const panelHeader = document.createElement('div');
    panelHeader.className = 'mobile-nav-header';

    const logoText = header.querySelector('.site-logo')?.textContent || 'Menu';
    const panelLogo = document.createElement('div');
    panelLogo.className = 'mobile-nav-logo';
    panelLogo.textContent = logoText;

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'mobile-nav-close';
    closeButton.setAttribute('aria-label', 'Close menu');
    closeButton.innerHTML = '&times;';


    panelHeader.append(panelLogo, closeButton);

    const navClone = nav.cloneNode(true);
    navClone.classList.remove('main-nav');
    navClone.classList.add('mobile-nav-links');

    const actionsClone = actions.cloneNode(true);
    actionsClone.classList.remove('header-actions');
    actionsClone.classList.add('mobile-nav-actions');

    panelInner.append(panelHeader, navClone, actionsClone);
    panel.appendChild(panelInner);
    document.body.appendChild(panel);

    const closeMenu = () => {
      document.body.classList.remove('mobile-nav-open', 'mobile-nav-lock');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('active');
      // Add hidden attribute after transition
      setTimeout(() => {
        if (!document.body.classList.contains('mobile-nav-open')) {
          panel.setAttribute('hidden', '');
        }
      }, 400);
    };

    const openMenu = () => {
      panel.removeAttribute('hidden');
      // Force reflow for transition
      void panel.offsetWidth;
      document.body.classList.add('mobile-nav-open', 'mobile-nav-lock');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.classList.add('active');
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = document.body.classList.contains('mobile-nav-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    closeButton.addEventListener('click', closeMenu);

    // Overlay click: close menu
    panel.addEventListener('click', (e) => {
      if (e.target === panel) closeMenu();
    });

    // Close on any link click inside the panel
    panel.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        closeMenu();
      }
    });

  });
}

/**
 * Improve image loading behavior globally while keeping third-party image URLs.
 */
function initImageHandling() {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    const isHeroImage = Boolean(img.closest('.hero-section, .page-hero, .hero-editorial'));

    if (!img.hasAttribute('loading')) {
      img.loading = isHeroImage ? 'eager' : 'lazy';
    }

    if (!img.hasAttribute('decoding')) {
      img.decoding = 'async';
    }

    if (isHeroImage) {
      img.fetchPriority = 'high';
    }

    img.classList.add('media-pending');

    const markLoaded = () => {
      img.classList.remove('media-pending');
      img.classList.add('media-ready');
    };

    const handleError = () => {
      if (img.dataset.backupSrc && img.dataset.backupApplied !== 'true') {
        img.dataset.backupApplied = 'true';
        img.src = img.dataset.backupSrc;
        return;
      }

      img.classList.remove('media-pending');
      img.classList.add('media-error');
    };

    img.addEventListener('load', markLoaded);
    img.addEventListener('error', handleError);

    if (img.complete) {
      if (img.naturalWidth > 0) {
        markLoaded();
      } else {
        handleError();
      }
    }
  });
}

/**
 * Initialize IntersectionObserver for scroll animations
 */
function initAnimations() {
  const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .reveal');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, unobserve to keep the state
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Initialize Dark Mode & RTL Toggles
 */
function initThemeToggles() {
  const themeToggles = document.querySelectorAll('.js-theme-toggle');
  const rtlToggles = document.querySelectorAll('.js-rtl-toggle');

  // Check Local Storage
  const savedTheme = localStorage.getItem('lumiere_theme');
  const savedDir = localStorage.getItem('lumiere_dir');

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  // Theme Toggle Event
  themeToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('lumiere_theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('lumiere_theme', 'dark');
      }
    });
  });

  // RTL Toggle Event
  rtlToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDir = document.documentElement.getAttribute('dir');
      if (currentDir === 'rtl') {
        document.documentElement.removeAttribute('dir');
        localStorage.setItem('lumiere_dir', 'ltr');
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('lumiere_dir', 'rtl');
      }
    });
  });
}
