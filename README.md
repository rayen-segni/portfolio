# Mohamed Rayen Segni - Professional Portfolio

A premium, agency-designed, high-converting, and SEO/GEO-optimized personal portfolio built using HTML5, Tailwind CSS via CDN, and Vanilla JavaScript.

## 🚀 Features

- **SEO & GEO Engine**: Automatic Generative Engine Optimization (GEO) structured to let AI engines (like ChatGPT Search, Perplexity, Gemini, and Claude) easily extract citations. Includes semantic schemas for `Person`, `ProfessionalService`, and `FAQPage`.
- **Theme Manager**: Dark mode by default, synced with user system settings and persistent via `localStorage`, featuring a toggle controls interface.
- **Premium Animations**:
  - **Dynamic Background Particles**: High-performance canvas nodes connecting and responding to pointer coordinate tracking.
  - **Interactive Glow Cards**: Cards that tracking mouse hover coords to render radial border glow gradients.
  - **Magnetic Buttons**: CTAs that shift toward the cursor to increase micro-interactivity.
  - **Scroll Spy**: Auto-highlighting navigation links corresponding to active page sections.
  - **Interactive System Architecture SVGs**: Dynamic SVG flow lines showcasing data transfers for case studies.
- **Career Story Timeline & Blog Preview**: Fully chronological timelines and pre-structured tags matching future topics (FastAPI, DevOps, System Design).

## 📁 File Structure

```
/
├── index.html         # Main page (structure, content, inline SVGs, and JSON-LD schemas)
├── robots.txt         # Crawler policies
├── sitemap.xml        # Search index map
├── manifest.json      # PWA settings & shortcut setup
├── css/
│   └── style.css      # Customized variables, mouse-glow modifiers, and keyframes
├── js/
│   ├── app.js         # Navigation spy trackers, tickers, theme switches, and forms
│   └── animations.js  # Particle canvas vectors, scroll reveals, and magnetic formulas
└── assets/
    └── images/
        └── profile.png # Professional profile headshot
```

## 🛠️ Local Verification

To run and review the website locally, spin up a local static server to prevent browser CORS blockages for dynamic scripts:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.
