/**
 * Mohamed Rayen Segni - Portfolio Core Logic
 */

// =========================================================================
// SERVICES CONFIGURATION
// Manage services, titles, badges, and descriptions here.
// =========================================================================
const SERVICES_DATA = [
  {
    title: "RAG Systems",
    badge: "VECTOR SEARCH & LOCAL LLMS",
    desc: "Building end-to-end Retrieval-Augmented Generation pipelines with vector databases (pgvector), document indexing, embeddings, and context-aware LLM generation."
  },
  {
    title: "Full Stack Platforms",
    badge: "CLIENT PORTALS & DASHBOARDS",
    desc: "Complete setup from schema designs to fast web layouts. Includes certificate generation modules, Stripe billing, and CMS admin dashboards."
  },
  {
    title: "Backend API Core",
    badge: "FASTAPI MICROSERVICES",
    desc: "Structuring asynchronous RESTful routes, setting up SQLAlchemy relational database structures, and configuring Alembic table migrations."
  },
  {
    title: "Showcase Websites (Vitrine)",
    badge: "UI/UX & FRONTEND DEPLOYMENT",
    desc: "Complete frontend project featuring customized UI/UX enhancements, responsive layouts, and domain deployment with secure certificate settings."
  },
  {
    title: "DevOps & Cloud",
    badge: "DEPLOYMENT & BUILD HOOKS",
    desc: "Deploying servers on AWS/Render/Netlify, configuring Nginx proxies, organizing environment variables, and establishing CI/CD setups."
  },
  {
    title: "API Enhancements",
    badge: "LATENCY & REFACTORING",
    desc: "Diagnosing database queries, adding Redis cache hooks, refactoring redundant functions, and reducing overall payload latency."
  },
  {
    title: "SEO & GEO Engine",
    badge: "AI SEARCH OPTIMIZATION",
    desc: "Optimizing website markup structure for search engines (sitemaps, meta descriptions) and generative AI engines (JSON-LD schemas, citation layouts)."
  },
  {
    title: "Cloud Cost Audits",
    badge: "INFRASTRUCTURE TUNING",
    desc: "Auditing hosting services, disabling idle virtual hardware, optimizing storage buckets, and scaling database instances to save budget."
  },
  {
    title: "Custom AI Agents",
    badge: "AUTONOMOUS WORKFLOWS",
    desc: "Developing specialized autonomous AI agents designed to execute multi-step workflows, tool calls, and complex task automation.",
    comingSoon: true
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hide Loading Overlay
  const loader = document.getElementById('loader-overlay');
  if (loader) {
    const hideLoader = () => {
      if (!loader.classList.contains('fade-out')) {
        loader.classList.add('fade-out');
      }
    };

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
      // Fast fallback: fade out loader after 700ms if assets are slow to complete
      setTimeout(hideLoader, 700);
    }
  }

  // Initialize features
  initThemeManager();
  renderServices();
  initScrollSpy();
  initStatsCounter();
  initGlowCards();
  initCaseStudiesTabs();
  initContactForm();
});

/**
 * 1. Dark/Light Theme Manager
 */
function initThemeManager() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  
  if (!toggleBtn) return;

  // Retrieve setting or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  if (currentTheme === 'light') {
    document.documentElement.classList.remove('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  } else {
    document.documentElement.classList.add('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  }

  toggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      localStorage.setItem('theme', 'light');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  });
}

/**
 * 2. Render Services Dynamically from central config
 */
function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  grid.innerHTML = SERVICES_DATA.map(srv => {
    if (srv.comingSoon) {
      return `
        <div class="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-900 p-6 rounded-xl flex flex-col justify-between opacity-60 border-dashed">
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">${srv.title}</h3>
            <p class="text-[10px] text-slate-500 font-mono tracking-widest uppercase">${srv.badge}</p>
            <p class="text-sm text-slate-600 dark:text-slate-400">${srv.desc}</p>
          </div>
          <div class="pt-6 border-t border-slate-100 dark:border-slate-900 mt-6 flex justify-between items-center">
            <span class="text-xs font-semibold text-purple-600 dark:text-purple-400">COMING SOON</span>
            <span class="text-[10px] font-mono text-slate-500">In Development</span>
          </div>
        </div>
      `;
    }
    return `
      <div class="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-900 p-6 rounded-xl flex flex-col justify-between hover:border-blue-500/30 transition-all">
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">${srv.title}</h3>
          <p class="text-[10px] text-blue-600 dark:text-blue-400 font-mono tracking-widest uppercase font-semibold">${srv.badge}</p>
          <p class="text-sm text-slate-600 dark:text-slate-400">${srv.desc}</p>
        </div>
        <div class="pt-6 border-t border-slate-100 dark:border-slate-900 mt-6 flex justify-between items-center">
          <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Available</span>
          </span>
          <a href="#contact" class="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center space-x-1 transition-colors">
            <span>Inquire</span>
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 3. Scroll Spy and Scroll Progress Indicators
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const progressBar = document.getElementById('scroll-progress');

  // Page Scroll Progress Tracker
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progressBar && height > 0) {
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }
  });

  // Section Tracking
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Target mid-viewport intersections
    threshold: 0
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-blue-500', 'font-semibold');
            link.classList.remove('text-slate-400', 'text-slate-600', 'dark:text-slate-400');
          } else {
            link.classList.remove('text-blue-500', 'font-semibold');
            link.classList.add('text-slate-600', 'dark:text-slate-400');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => spyObserver.observe(sec));
}

/**
 * 4. Stats Counter Ticking
 */
function initStatsCounter() {
  const statsSection = document.getElementById('stats-section');
  if (!statsSection) return;

  const counters = statsSection.querySelectorAll('.counter-val');
  let triggered = false;

  const runCounter = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      let current = 0;
      const step = target > 50 ? Math.ceil(target / 40) : 1;
      const intervalSpeed = target > 50 ? 25 : 80;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = current + suffix;
        }
      }, intervalSpeed);
    });
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        runCounter();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  obs.observe(statsSection);
}

/**
 * 5. Coordinate Listener for Card Glow
 */
function initGlowCards() {
  const cards = document.querySelectorAll('.glow-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * 6. Interactive Case Study Tab Switches
 */
function initCaseStudiesTabs() {
  const tabContainers = document.querySelectorAll('.case-study-tabs');
  
  tabContainers.forEach(container => {
    const btns = container.querySelectorAll('.tab-btn');
    const contentId = container.getAttribute('data-content-id');
    const contents = document.querySelectorAll(`#${contentId} .tab-pane`);

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Toggle button states
        btns.forEach(b => {
          b.classList.remove('bg-blue-600', 'text-white');
          b.classList.add('bg-slate-200', 'dark:bg-slate-800/40', 'text-slate-600', 'dark:text-slate-400');
        });
        btn.classList.add('bg-blue-600', 'text-white');
        btn.classList.remove('bg-slate-200', 'dark:bg-slate-800/40', 'text-slate-600', 'dark:text-slate-400');

        // Toggle content panes
        contents.forEach(pane => {
          if (pane.getAttribute('data-pane') === targetTab) {
            pane.classList.remove('hidden');
          } else {
            pane.classList.add('hidden');
          }
        });
      });
    });
  });
}

/**
 * 7. Contact Form Verification & Submitting
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const responseMsg = document.getElementById('form-response');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showResponse('Please fill in all mandatory fields.', 'error');
      return;
    }

    // Display sending state
    showResponse('Connecting to mail node...', 'info');

    // Simulate sending payload
    setTimeout(() => {
      showResponse('Transmission successful! Mohamed will reach out to you within 24 hours.', 'success');
      form.reset();
    }, 1500);
  });

  function showResponse(msg, type) {
    if (!responseMsg) return;
    responseMsg.textContent = msg;
    responseMsg.className = 'mt-4 text-sm font-medium p-3 rounded-lg transition-all duration-300';
    
    if (type === 'success') {
      responseMsg.classList.add('bg-emerald-500/10', 'text-emerald-400', 'border', 'border-emerald-500/20');
    } else if (type === 'error') {
      responseMsg.classList.add('bg-rose-500/10', 'text-rose-400', 'border', 'border-rose-500/20');
    } else {
      responseMsg.classList.add('bg-blue-500/10', 'text-blue-400', 'border', 'border-blue-500/20');
    }
  }
}
