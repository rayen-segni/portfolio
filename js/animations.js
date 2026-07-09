/**
 * Mohamed Rayen Segni - Portfolio Interactivity & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleBackground();
  initTypingEffect();
  initScrollReveal();
  initMagneticButtons();
});

/**
 * 1. High-Performance Canvas Particles Background
 */
function initParticleBackground() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let mouse = {
    x: null,
    y: null,
    radius: 120
  };

  // Track mouse coordinates over window
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Handle Resize
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }
  window.addEventListener('resize', resizeCanvas);
  
  // Particle Blueprint
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      // Bounce off borders
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      // Move particle
      this.x += this.directionX;
      this.y += this.directionY;

      // Mouse interactive collision
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius + this.size) {
          if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
            this.x += 2;
          }
          if (mouse.x > this.x && this.x > this.size * 10) {
            this.x -= 2;
          }
          if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
            this.y += 2;
          }
          if (mouse.y > this.y && this.y > this.size * 10) {
            this.y -= 2;
          }
        }
      }
      this.draw();
    }
  }

  // Populate Particle list
  function initParticles() {
    particlesArray = [];
    // Adjust density based on screen dimensions
    let numberOfParticles = (canvas.width * canvas.height) / 16000;
    numberOfParticles = Math.min(numberOfParticles, 90); // Cap to preserve performance

    // Base colors from theme
    const isLight = !document.documentElement.classList.contains('dark');
    const color = isLight ? 'rgba(37, 99, 235, 0.08)' : 'rgba(6, 182, 212, 0.15)';

    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 1;
      let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 0.4) - 0.2;
      let directionY = (Math.random() * 0.4) - 0.2;

      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  // Draw connectors
  function connect() {
    let opacityValue = 1;
    const isLight = !document.documentElement.classList.contains('dark');
    const baseRGB = isLight ? '37, 99, 235' : '6, 182, 212';

    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          opacityValue = 1 - (distance / 110);
          ctx.strokeStyle = `rgba(${baseRGB}, ${opacityValue * 0.15})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connect();
  }

  // Initialize
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
  animate();

  // Watch for theme switch and reinitialize color
  const themeObserver = new MutationObserver(() => {
    initParticles();
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

/**
 * 2. Optimized Word Typing Animation
 */
function initTypingEffect() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const words = JSON.parse(target.getAttribute('data-words') || '["Backend APIs", "Secure Systems", "AI Solutions"]');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletes faster
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Natural typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Small delay before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/**
 * 3. Intersection Observer Scroll Reveal
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(el => revealObserver.observe(el));

  // Specialized Timeline Observer
  const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  timelineItems.forEach(item => timelineObserver.observe(item));
}

/**
 * 4. Premium Magnetic Buttons Effect
 */
function initMagneticButtons() {
  const btns = document.querySelectorAll('.magnetic-btn');
  
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const position = btn.getBoundingClientRect();
      // Calculate mouse displacement relative to button center
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      
      // Pull button slightly towards pointer (30% of distance)
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      // Revert position smoothly
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}
