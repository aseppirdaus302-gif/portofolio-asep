/* =========================================
   PORTFOLIO - Asep Pirdaus - main.js
   ========================================= */

// === NAVBAR SCROLL EFFECT ===
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav-mobile');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === HAMBURGER MENU ===
if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });

  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });
}

// === SET ACTIVE NAV LINK ===
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}
setActiveNav();

// === SCROLL REVEAL (Intersection Observer) ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal, .stagger').forEach(el => {
  revealObserver.observe(el);
});

// === SKILL BAR ANIMATION ===
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = targetWidth + '%';
        }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => {
  skillObserver.observe(cat);
});

// === PROJECT FILTER ===
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = '';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// === CONTACT FORM - EMAIL REDIRECT ===
const contactForm = document.getElementById('contactForm');
const formSuccess = document.querySelector('.form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Ambil nilai dari input form
    const nameInput = contactForm.querySelector('input[placeholder="Nama lengkap kamu"]');
    const emailInput = contactForm.querySelector('input[placeholder="email@kamu.com"]');
    const subjectInput = contactForm.querySelector('input[placeholder="Tawaran magang / Kolaborasi / Pertanyaan..."]');
    const messageTextarea = contactForm.querySelector('textarea[placeholder="Ceritakan kebutuhan kamu di sini..."]');

    const name = nameInput ? nameInput.value : '';
    const email = emailInput ? emailInput.value : '';
    const subject = subjectInput ? subjectInput.value : '';
    const message = messageTextarea ? messageTextarea.value : '';

    // Validasi sederhana
    if (!name || !email || !subject || !message) {
      alert('Mohon isi semua field yang diperlukan!');
      return;
    }

    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;

    // Buat body email
    const emailBody = `Nama: ${name}%0AEmail: ${email}%0A%0A${message}`;
    const emailSubject = `[Portfolio Contact] ${subject}`;
    
    // Email tujuan (ganti dengan email kamu)
    const targetEmail = 'asep@email.com'; // Ganti dengan email asli kamu
    
    // Redirect ke mailto dengan data yang sudah diisi
    const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Buka email client
    window.location.href = mailtoLink;
    
    // Reset form dan tampilkan success message
    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = 'Terkirim ✓';
      
      if (formSuccess) {
        formSuccess.style.display = 'flex';
      }
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        if (formSuccess) {
          formSuccess.style.display = 'none';
        }
      }, 5000);
    }, 500);
  });
}

// === TYPING EFFECT ===
function typeWriter(element, texts, speed = 80) {
  if (!element) return;

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => { isDeleting = true; }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    const delay = isDeleting ? speed / 2 : speed;
    setTimeout(type, delay);
  }

  type();
}

const typingEl = document.querySelector('.typing-text');
if (typingEl) {
  const roles = [
    'Network Technician',
    'Web Developer',
    'Staff Administrator'
  ];
  typeWriter(typingEl, roles);
}

// === SMOOTH CURSOR GLOW (Desktop Only) ===
if (window.innerWidth > 768) {
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

// === COUNTER ANIMATION ===
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => {
  counterObserver.observe(el);
});

console.log('%c👨‍💻 Portfolio — Asep Pirdaus', 'font-size:16px; font-weight:bold; color:#c9a84c;');
console.log('%cSMK TKJ — Teknik Komputer & Jaringan', 'color:#888;');