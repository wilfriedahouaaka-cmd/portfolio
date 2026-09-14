/* ======================================================
   SCRIPT PRINCIPAL
   ====================================================== */

document.addEventListener("DOMContentLoaded", function () {

  // ========== LOADER + INTRO ==========
  const loaderScreen = document.getElementById('loader-screen');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const introScreen = document.getElementById('intro-text-screen');
  const mainPortfolio = document.getElementById('main-portfolio');

  const t1 = document.getElementById('text1');
  const t2 = document.getElementById('text2');
  const t3 = document.getElementById('text3');
  const t4 = document.getElementById('text4');

  let currentProgress = 0;
  document.body.style.overflow = 'hidden';

  // Barre de progression
  const loadingInterval = setInterval(() => {
    currentProgress += Math.floor(Math.random() * 10) + 5;
    if (currentProgress >= 100) {
      currentProgress = 100;
      clearInterval(loadingInterval);
      startIntroSequence();
    }
    if (progressBar) progressBar.style.width = currentProgress + '%';
    if (progressText) progressText.innerText = `Chargement ${currentProgress}%`;
  }, 70);

  function startIntroSequence() {
    loaderScreen.style.opacity = '0';
    setTimeout(() => {
      loaderScreen.style.visibility = 'hidden';
      introScreen.style.visibility = 'visible';
      introScreen.style.opacity = '1';
      runTextSequence();
    }, 800);
  }

  function runTextSequence() {
    setTimeout(() => showText(t1), 400);
    setTimeout(() => hideText(t1), 1800);

    setTimeout(() => showText(t2), 2400);
    setTimeout(() => hideText(t2), 3800);

    setTimeout(() => showText(t3), 4400);
    setTimeout(() => hideText(t3), 6000);

    setTimeout(() => showText(t4), 6600);
    setTimeout(() => {
      hideText(t4);
      setTimeout(() => {
        revealPortfolio();
      }, 700);
    }, 8500);
  }

  function showText(element) {
    if (element) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  }

  function hideText(element) {
    if (element) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(-20px)';
    }
  }

  function revealPortfolio() {
    introScreen.style.opacity = '0';
    setTimeout(() => {
      introScreen.style.visibility = 'hidden';
      if (mainPortfolio) {
        mainPortfolio.style.visibility = 'visible';
        mainPortfolio.style.opacity = '1';
      }
      document.body.classList.add('portfolio-loaded');
      document.body.style.overflow = '';
    }, 600);
  }

  // ========== REVEAL AU SCROLL ==========
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-up');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ========== COMPTEURS ==========
  const counters = document.querySelectorAll('[data-count-to]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count-to'), 10);
    const duration = 1200;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      element.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target;
      }
    }
    requestAnimationFrame(updateCount);
  }

  // ========== PARTICULES ==========
  if (typeof tsParticles !== "undefined") {
    tsParticles.load("particles-js", {
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: { value: 55, density: { enable: true, area: 800 } },
        color: { value: "#6c63ff" },
        shape: { type: "circle" },
        opacity: { value: 0.45, random: true },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: 1.4,
          direction: "none",
          random: true,
          outModes: { default: "out" }
        }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: true, mode: "push" }
        },
        modes: {
          repulse: { distance: 120 },
          push: { quantity: 4 }
        }
      },
      detectRetina: true
    });
  }
});

// ========== FORMULAIRE WHATSAPP ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const nom = document.getElementById('contactName').value;
    const message = document.getElementById('contactMessage').value;
    const numero = "2250715383096";
    const texte = encodeURIComponent(`Bonjour Wilfried, je suis ${nom}.\n\n${message}`);
    const url = `https://wa.me/${numero}?text=${texte}`;
    window.open(url, '_blank');
    contactForm.reset();
  });
}