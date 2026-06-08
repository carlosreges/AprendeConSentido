document.addEventListener('DOMContentLoaded', () => {
  // --- MOBILE NAV TOGGLE ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Toggle hamburger / close icon visual representation if needed
      const icon = mobileToggle.querySelector('svg');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
        } else {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
      }
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('svg');
        if (icon) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
      });
    });
  }

  // --- THEME SWITCHER (DARK / LIGHT MODE) ---
  const themeToggle = document.querySelector('.theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  // Apply saved theme on load
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      
      // Save theme preference
      let theme = 'light';
      if (document.body.classList.contains('dark-theme')) {
        theme = 'dark';
      }
      localStorage.setItem('theme', theme);
      
      // Trigger a subtle click feedback animation
      themeToggle.style.transform = 'scale(0.9) rotate(15deg)';
      setTimeout(() => {
        themeToggle.style.transform = 'scale(1) rotate(0deg)';
      }, 150);
    });
  }

  // --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---
  const fadeSections = document.querySelectorAll('.fade-in-section');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.1, // trigger when 10% is visible
      rootMargin: '0px 0px -50px 0px' // offset trigger point slightly
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // stop observing after fade-in
        }
      });
    }, observerOptions);

    fadeSections.forEach(section => {
      sectionObserver.observe(section);
    });
  } else {
    // Fallback if observer not supported
    fadeSections.forEach(section => section.classList.add('is-visible'));
  }

  // --- FAQ ACCORDION ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- FORM VALIDATION & INTERACTIVE FEEDBACK ---
  const contactForms = document.querySelectorAll('.contact-form');
  
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const messageInput = form.querySelector('textarea[name="message"]');
      let isValid = true;
      
      if (nameInput && nameInput.value.trim() === '') {
        showError(nameInput, 'Por favor, dinos tu nombre.');
        isValid = false;
      } else if (nameInput) {
        clearError(nameInput);
      }
      
      if (emailInput && !validateEmail(emailInput.value)) {
        showError(emailInput, 'Por favor, ingresa un correo electrónico válido.');
        isValid = false;
      } else if (emailInput) {
        clearError(emailInput);
      }
      
      if (messageInput && messageInput.value.trim() === '') {
        showError(messageInput, 'Por favor, dinos en qué podemos ayudarte.');
        isValid = false;
      } else if (messageInput) {
        clearError(messageInput);
      }
      
      if (isValid) {
        // Mock successful submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Enviar';
        
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<svg style="animation: spin 1s linear infinite; width: 20px; height: 20px; margin-right: 8px;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4"/></svg> Enviando...';
        }
        
        setTimeout(() => {
          // Success message
          form.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 2rem 1rem; opacity: 0; transform: translateY(10px); transition: all 0.5s ease;">
              <div style="width: 72px; height: 72px; background: rgba(142, 187, 149, 0.2); color: #8EBB95; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                <svg style="width: 36px; height: 36px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.8rem; margin-bottom: 0.75rem; color: var(--color-text-main);">¡Mensaje Enviado!</h3>
              <p style="color: var(--color-text-muted); max-width: 320px; margin: 0 auto;">Gracias por comunicarte con nosotros. En breve nos pondremos en contacto contigo para conversar con sentido.</p>
            </div>
          `;
          
          setTimeout(() => {
            const successDiv = form.querySelector('.success-message');
            if (successDiv) {
              successDiv.style.opacity = '1';
              successDiv.style.transform = 'translateY(0)';
            }
          }, 100);
        }, 1500);
      }
    });
  });

  // Helper validation functions
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  }

  function showError(input, message) {
    const group = input.parentElement;
    let errorDiv = group.querySelector('.error-feedback');
    
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-feedback';
      errorDiv.style.color = '#e53e3e';
      errorDiv.style.fontSize = '0.85rem';
      errorDiv.style.marginTop = '0.35rem';
      errorDiv.style.fontFamily = "'Inter', sans-serif";
      group.appendChild(errorDiv);
    }
    
    errorDiv.innerText = message;
    input.style.borderColor = '#e53e3e';
  }

  function clearError(input) {
    const group = input.parentElement;
    const errorDiv = group.querySelector('.error-feedback');
    if (errorDiv) {
      errorDiv.remove();
    }
    input.style.borderColor = 'var(--color-border)';
  }
});

// CSS animation styles needed for script spinners
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
