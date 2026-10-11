/**
 * Mobile World Sales & Service — Landing Page JavaScript
 * Handles:
 * - Sticky navigation blur & scroll transitions
 * - Mobile drawer navigation & accessible focus trapping
 * - Intersection Observer scroll reveals
 * - Dynamic copyright year
 * - Interactive Store Details Customizer (persisted via localStorage)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initScrollSpyAndSmoothScroll();
  initScrollAnimations();
  initDynamicYear();
  initStoreDetailsCustomizer();
});

/* ==========================================================================
   1. Sticky Header with Scroll Effect
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 35) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('mobileMenuClose');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. Smooth Scroll & Active Scroll Spy
   ========================================================================== */
function initScrollSpyAndSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   4. Scroll Animations (IntersectionObserver: Fade up as you scroll)
   ========================================================================== */
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-in');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

/* ==========================================================================
   5. Dynamic Copyright Year
   ========================================================================== */
function initDynamicYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   6. Store Details Customizer (With Verified Signboard Phone)
   ========================================================================== */
function initStoreDetailsCustomizer() {
  const DEFAULT_DETAILS = {
    address: 'Gandhipuram, Coimbatore, Tamil Nadu',
    phone: '+91 94453 03696',
    hours: '9:30 AM – 9:30 PM (All 7 Days)'
  };

  const addressEls = document.querySelectorAll('.store-dynamic-address');
  const phoneEls = document.querySelectorAll('.store-dynamic-phone');
  const hoursEls = document.querySelectorAll('.store-dynamic-hours');
  const phoneLinkEls = document.querySelectorAll('.store-dynamic-phone-link');
  const mapsLinkEls = document.querySelectorAll('.store-dynamic-maps-link');

  const modal = document.getElementById('customizerModal');
  const openBtn = document.getElementById('customizerOpenBtn');
  const closeBtn = document.getElementById('customizerCloseBtn');
  const cancelBtn = document.getElementById('customizerCancelBtn');
  const saveBtn = document.getElementById('customizerSaveBtn');
  const resetBtn = document.getElementById('customizerResetBtn');

  const addressInput = document.getElementById('inputStoreAddress');
  const phoneInput = document.getElementById('inputStorePhone');
  const hoursInput = document.getElementById('inputStoreHours');

  const getStoredDetails = () => {
    try {
      const stored = localStorage.getItem('mw_shop_details');
      if (stored) {
        return { ...DEFAULT_DETAILS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }
    return DEFAULT_DETAILS;
  };

  const applyDetails = (details) => {
    addressEls.forEach((el) => (el.textContent = details.address));
    phoneEls.forEach((el) => (el.textContent = details.phone));
    hoursEls.forEach((el) => (el.textContent = details.hours));

    const cleanPhone = details.phone.replace(/[^0-9+]/g, '');
    phoneLinkEls.forEach((el) => {
      el.setAttribute('href', `tel:${cleanPhone}`);
    });

    const encodedAddress = encodeURIComponent(`Mobile World ${details.address}`);
    mapsLinkEls.forEach((el) => {
      el.setAttribute('href', `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`);
    });
  };

  const currentDetails = getStoredDetails();
  applyDetails(currentDetails);

  if (!modal || !openBtn) return;

  const openModal = () => {
    const details = getStoredDetails();
    if (addressInput) addressInput.value = details.address;
    if (phoneInput) phoneInput.value = details.phone;
    if (hoursInput) hoursInput.value = details.hours;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  };

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const updated = {
        address: addressInput?.value.trim() || DEFAULT_DETAILS.address,
        phone: phoneInput?.value.trim() || DEFAULT_DETAILS.phone,
        hours: hoursInput?.value.trim() || DEFAULT_DETAILS.hours
      };
      try {
        localStorage.setItem('mw_shop_details', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
      applyDetails(updated);
      closeModal();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        localStorage.removeItem('mw_shop_details');
      } catch (err) {
        console.error('Failed to clear localStorage:', err);
      }
      applyDetails(DEFAULT_DETAILS);
      if (addressInput) addressInput.value = DEFAULT_DETAILS.address;
      if (phoneInput) phoneInput.value = DEFAULT_DETAILS.phone;
      if (hoursInput) hoursInput.value = DEFAULT_DETAILS.hours;
      closeModal();
    });
  }
}
