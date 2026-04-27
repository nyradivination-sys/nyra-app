# frontend.md — Stellar UI Specification
## Astrology App: Daily Astrology · Tarot · Horoscope · Birth Chart · Astro Wardrobe · Palmistry · Info

---

## What This App Is

A Co–Star-inspired astrology web app with 7 feature modules:
1. **Daily Astrology** — AI-generated daily cosmic guidance based on planetary positions
2. **Tarot** — Interactive daily tarot pull with card reveal and interpretation
3. **Daily Horoscope** — Sign-specific horoscope for every zodiac
4. **Tarot & Astrology Info** — Educational glossary: cards, signs, houses, planets, aspects
5. **Birth Chart** — Natal chart generator from birth date, time, and place
6. **Astro Wardrobe** — Daily outfit/colour recommendation based on planetary energy
7. **Palmistry** — Palm line reading via image upload + AI interpretation

---

## Design Philosophy

**Inverted Co–Star.** Co–Star is stark white backgrounds, black text, editorial silence. This app is the exact opposite: **near-black backgrounds dominate, warm white text, and a single accent — deep celestial gold (#C9A84C) — used sparingly.** The aesthetic is: a manuscript printed on night sky. Editorial. Sacred. Unhurried. No gradients. No glow effects. No generic purple "spiritual app" clichés. Every element earns its place. Typography does the heavy lifting. Whitespace is generous. Silence is intentional.

Think: _dark observatory library meets literary journal meets private journal_.

---

## Color Palette

```css
:root {
  /* Backgrounds — dark is absolute */
  --bg-primary:    #080808;   /* void black — base of everything */
  --bg-secondary:  #0E0E0E;   /* slightly lifted for section breaks */
  --bg-card:       #131313;   /* card / panel surfaces */
  --bg-card-hover: #181818;   /* card hover state */
  --bg-light:      #F7F5F0;   /* warm parchment — used ONLY for 1 contrast section */
  --bg-overlay:    rgba(8,8,8,0.92); /* modal/drawer overlay */

  /* Text */
  --text-primary:        #EDEAE3;  /* warm white — primary reading text */
  --text-secondary:      #8A8880;  /* muted warm grey */
  --text-muted:          #505050;  /* very dim labels, metadata */
  --text-ghost:          #2A2A2A;  /* barely visible dividers */
  --text-dark:           #0A0A0A;  /* text on parchment section */
  --text-dark-secondary: #3A3830;

  /* Accent — gold only */
  --accent:       #C9A84C;   /* celestial gold */
  --accent-dim:   #A0832A;   /* hover / dimmer gold */
  --accent-glow:  rgba(201,168,76,0.08); /* subtle gold tint for card hover bg */

  /* Borders */
  --border-void:   #111111;  /* nearly invisible */
  --border-dark:   #1E1E1E;  /* standard card border */
  --border-mid:    #2A2A2A;  /* slightly visible */
  --border-accent: #C9A84C;  /* gold border highlight */
  --border-light:  #E0DDD6;  /* borders on parchment section */

  /* Semantic */
  --error:   #B05555;
  --success: #5A8A5A;
}
```

---

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=IBM+Plex+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display / Headlines | `Playfair Display` | 400, 600, 700, italic | Page headings, card titles, celestial names |
| Body / UI | `IBM Plex Sans` | 300, 400, 500 | Navigation, body copy, labels, buttons |
| Labels / Mono / Data | `IBM Plex Mono` | 400, 500 | Tags, dates, coordinates, card IDs, stats, glyphs |

**Never use:** Inter, Roboto, system-ui, or any geometric sans for display. The Playfair italic is essential for the app's voice — it conveys ancient wisdom without being kitschy.

---

## Color Usage Rules

- 90%+ of the page uses `--bg-primary` or `--bg-secondary`
- `--bg-light` parchment appears ONLY in the Tarot & Info section (one deliberate contrast break)
- `--accent` gold used ONLY for: CTA buttons, active nav, section bullet labels (●), card border highlights, zodiac glyph highlights, active states
- Zero gradients. Zero blur. Zero box-shadows. Only `border` for separation.
- No purple, no "galaxy", no starfield backgrounds — the void speaks for itself
- Celestial glyphs (☉ ☽ ♀ ♂ ♃ ♄ ♅ ♆ ♇ ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓) used as decorative type elements in IBM Plex Mono `--text-muted`

---

## Layout

- Max content width: `1200px`, `margin: 0 auto`
- Section vertical padding: `100px 0` desktop, `64px 0` mobile
- Container horizontal padding: `0 80px` desktop → `0 24px` mobile
- No Bootstrap. No Tailwind. Pure CSS Grid + Flexbox only.
- All sections separated by `1px solid var(--border-void)` — nearly invisible, intentional

---

## Page Sections (in order)

---

### 1. Navbar

Fixed, full-width. Always dark. Invisible into the void.
[✦ STELLAR]    [Daily] [Tarot] [Horoscope] [Birth Chart] [Wardrobe] [Palmistry] [Info]    [Enter Birth Data]
- Height: `64px`
- Background: `--bg-primary`
- Border bottom: `1px solid var(--border-void)`
- Logo: `✦` in IBM Plex Mono `--accent` + `STELLAR` in Playfair Display 600, `--text-primary`, letter-spacing 0.16em
- Nav links: IBM Plex Sans 400 0.8125rem, `--text-secondary`, hover → `--text-primary`, active → `--accent`
- `Enter Birth Data`: ghost button → opens birth data modal
- Mobile: hamburger → full-screen `--bg-primary` overlay with centered Playfair links

```html
<nav id="navbar">
  <div class="container nav-inner">
    <a href="#home" class="logo">
      <span class="logo-glyph" aria-hidden="true">✦</span>
      <span class="logo-wordmark">STELLAR</span>
    </a>
    <ul class="nav-links" role="list">
      <li><a href="#daily">Daily</a></li>
      <li><a href="#tarot">Tarot</a></li>
      <li><a href="#horoscope">Horoscope</a></li>
      <li><a href="#birthchart">Birth Chart</a></li>
      <li><a href="#wardrobe">Wardrobe</a></li>
      <li><a href="#palmistry">Palmistry</a></li>
      <li><a href="#info">Info</a></li>
    </ul>
    <div class="nav-actions">
      <button class="btn btn-ghost" id="birth-data-btn">Enter Birth Data</button>
    </div>
    <button class="hamburger" aria-label="Open menu" aria-expanded="false">
      <span class="bar"></span><span class="bar"></span><span class="bar"></span>
    </button>
  </div>
</nav>
<div class="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation">
  <button class="mobile-close" aria-label="Close">✕</button>
  <ul role="list">
    <li><a href="#daily">Daily</a></li>
    <li><a href="#tarot">Tarot</a></li>
    <li><a href="#horoscope">Horoscope</a></li>
    <li><a href="#birthchart">Birth Chart</a></li>
    <li><a href="#wardrobe">Wardrobe</a></li>
    <li><a href="#palmistry">Palmistry</a></li>
    <li><a href="#info">Info</a></li>
    <li><button class="btn btn-accent btn-full" id="birth-data-mobile-btn">Enter Birth Data</button></li>
  </ul>
</div>
```

CSS:
```css
#navbar {
  position: fixed; top: 0; width: 100%;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-void);
  z-index: 1000;
}
.nav-inner {
  display: flex; align-items: center;
  justify-content: space-between; height: 64px;
}
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.logo-glyph {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1rem; color: var(--accent);
}
.logo-wordmark {
  font-family: 'Playfair Display', serif;
  font-size: 1.0625rem; font-weight: 600;
  color: var(--text-primary); letter-spacing: 0.16em;
}
.nav-links {
  display: flex; gap: 32px; list-style: none;
}
.nav-links a {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.8125rem; font-weight: 400;
  color: var(--text-secondary); text-decoration: none;
  transition: color 0.18s;
}
.nav-links a:hover { color: var(--text-primary); }
.nav-links a.active { color: var(--accent); }
.nav-actions { display: flex; align-items: center; }
.hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
.bar { width: 20px; height: 1px; background: var(--text-primary); display: block; transition: all 0.3s; }
.mobile-menu {
  position: fixed; inset: 0;
  background: var(--bg-primary);
  z-index: 1001;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
}
.mobile-menu.open { transform: translateX(0); }
.mobile-menu ul { list-style: none; text-align: center; display: flex; flex-direction: column; gap: 28px; }
.mobile-menu a {
  font-family: 'Playfair Display', serif;
  font-size: 1.875rem; font-style: italic;
  color: var(--text-primary); text-decoration: none;
}
.mobile-close { position: absolute; top: 24px; right: 28px; background: none; border: none; font-size: 1rem; color: var(--text-muted); cursor: pointer; font-family: 'IBM Plex Mono', monospace; }
```

---

### 2. Hero Section

Full viewport height. Dark. Centered text. The void opens.

**Layout:** Single centered column, max-width 700px.

- Date line: IBM Plex Mono 0.6875rem `--text-muted`, letter-spacing 0.18em: `SUNDAY · 27 APRIL 2025 · ☉ IN TAURUS`
- Main headline: Playfair Display 700, italic, clamp(3rem, 6vw, 5.5rem), `--text-primary`, centered:
  `"What the stars`
  `say today."`
- Sub: IBM Plex Sans 300 `--text-secondary` 1.0625rem, centered, max-width 480px:
  `"Hyper-personalized daily guidance drawn from your natal chart and real-time planetary movement."`
- CTA: single centered gold button → `Begin Your Reading`
- Below CTA: thin `1px solid var(--border-dark)` rule, then 3 planetary glyphs in IBM Plex Mono `--text-muted` spaced evenly: `☉ · ☽ · ♀ · ♂ · ♃ · ♄`
- Floating celestial rule: a single `1px` wide vertical line `80px` tall in `--border-dark` centered below the glyph row, dropping into the next section (Co–Star's "the universe continues downward" motif)

```html
<section class="hero" id="home">
  <div class="hero-inner">
    <span class="hero-date" aria-label="Current astrological date">SUNDAY · 27 APRIL 2025 · ☉ IN TAURUS</span>
    <h1 class="hero-headline">
      What the stars<br>
      <em>say today.</em>
    </h1>
    <p class="hero-sub">
      Hyper-personalized daily guidance drawn from your natal chart
      and real-time planetary movement.
    </p>
    <div class="hero-cta">
      <button class="btn btn-accent" id="hero-begin-btn">Begin Your Reading</button>
    </div>
    <div class="hero-glyphs" aria-hidden="true">
      <span>☉</span><span class="dot">·</span>
      <span>☽</span><span class="dot">·</span>
      <span>♀</span><span class="dot">·</span>
      <span>♂</span><span class="dot">·</span>
      <span>♃</span><span class="dot">·</span>
      <span>♄</span>
    </div>
    <div class="hero-drop-line" aria-hidden="true"></div>
  </div>
</section>
```

CSS:
```css
.hero {
  background: var(--bg-primary);
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding-top: 64px;
  border-bottom: 1px solid var(--border-void);
  text-align: center;
}
.hero-inner {
  display: flex; flex-direction: column;
  align-items: center; gap: 0;
  max-width: 700px; padding: 0 24px;
}
.hero-date {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6875rem; color: var(--text-muted);
  letter-spacing: 0.18em; margin-bottom: 32px;
  display: block;
}
.hero-headline {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 700; line-height: 1.1;
  color: var(--text-primary); margin: 0 0 28px;
}
.hero-headline em { font-style: italic; color: var(--text-primary); }
.hero-sub {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 1.0625rem; font-weight: 300;
  color: var(--text-secondary); line-height: 1.75;
  max-width: 480px; margin: 0 0 40px;
}
.hero-cta { margin-bottom: 48px; }
.hero-glyphs {
  display: flex; align-items: center; gap: 16px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1rem; color: var(--text-muted);
  border-top: 1px solid var(--border-dark); padding-top: 32px;
  margin-bottom: 0;
}
.hero-glyphs .dot { color: var(--border-mid); }
.hero-drop-line {
  width: 1px; height: 80px;
  background: var(--border-dark);
  margin-top: 32px;
}
```

---

### 3. Daily Astrology Section

Background: `--bg-primary`. ID: `daily`.

The core feature. Displays AI-generated guidance across life domains — exactly how Co–Star splits readings: **self, thinking, emotions, the unconscious, relationships, work, growth, spirituality.**

- Section header (centered):
  - Date label: IBM Plex Mono `--text-muted` 0.6875rem: `● DAILY ASTROLOGY`
  - Headline: Playfair Display 700 italic: `"Today's Cosmic Weather"`
  - Sub: IBM Plex Sans 300 `--text-secondary`: `"Planetary transits interpreted for your chart."`

- Planet bar: full-width row of current planet positions. IBM Plex Mono 0.625rem `--text-muted`. Format per cell: glyph + name + sign. Separated by `1px solid var(--border-void)`.
☉ SUN · TAURUS  |  ☽ MOON · SCORPIO  |  ♀ VENUS · GEMINI  |  ♂ MARS · CANCER  |  ♃ JUPITER · GEMINI  |  ♄ SATURN · PISCES
- Domain reading cards: 2-column grid (desktop), single column (mobile). 8 cards.

Each card:
- Background: `--bg-card`
- Border: `1px solid var(--border-dark)`
- Border-left: `2px solid var(--border-dark)` — on hover becomes `2px solid var(--accent)`
- Padding: `28px 28px`
- Domain label: IBM Plex Mono 0.625rem `--accent` letter-spacing 0.14em: e.g. `SELF`
- Reading text: Playfair Display 400 italic, `--text-primary`, 1.0625rem, line-height 1.75
- Source glyph: IBM Plex Mono 0.625rem `--text-muted` bottom-right: e.g. `♂ Mars in Cancer`

Domains + example readings:
1. `SELF` — *"You are in negotiation with something you cannot name. The answers you seek are not where you have been looking."*
2. `THINKING` — *"Logic is a tool, not a temple today. Allow the irrational its seat at the table."*
3. `EMOTIONS` — *"The tide goes out before it returns. What you interpret as loss is preparation."*
4. `THE UNCONSCIOUS` — *"Something ancient stirs below the surface. Pay attention to what wakes you at 3am."*
5. `RELATIONSHIPS` — *"No one can give you what you haven't yet claimed for yourself."*
6. `WORK` — *"Efficiency is not the same as progress. Slow down enough to see the difference."*
7. `GROWTH` — *"The friction you are feeling is not an obstacle. It is the path."*
8. `SPIRITUALITY` — *"The universe is not testing you. It is showing you what you already know."*

- Below cards: full-width dark rule, then a refresh note in IBM Plex Mono 0.625rem `--text-muted` centered: `✦ Readings refresh with each planetary transit · Generated for your natal chart`

```html
<section class="section daily" id="daily">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">● DAILY ASTROLOGY</span>
      <h2 class="section-headline"><em>Today's Cosmic Weather</em></h2>
      <p class="section-sub">Planetary transits interpreted for your chart.</p>
    </div>

    <div class="planet-bar reveal">
      <div class="planet-cell"><span class="glyph">☉</span><span>SUN · TAURUS</span></div>
      <div class="planet-cell"><span class="glyph">☽</span><span>MOON · SCORPIO</span></div>
      <div class="planet-cell"><span class="glyph">♀</span><span>VENUS · GEMINI</span></div>
      <div class="planet-cell"><span class="glyph">♂</span><span>MARS · CANCER</span></div>
      <div class="planet-cell"><span class="glyph">♃</span><span>JUPITER · GEMINI</span></div>
      <div class="planet-cell"><span class="glyph">♄</span><span>SATURN · PISCES</span></div>
    </div>

    <div class="domain-grid">
      <div class="domain-card reveal">
        <span class="domain-label">SELF</span>
        <p class="domain-reading">You are in negotiation with something you cannot name. The answers you seek are not where you have been looking.</p>
        <span class="domain-source">♂ Mars in Cancer</span>
      </div>
      <!-- repeat for all 8 domains -->
    </div>

    <p class="daily-refresh-note reveal">✦ Readings refresh with each planetary transit · Generated for your natal chart</p>
  </div>
</section>
```

CSS:
```css
.section-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6875rem; color: var(--accent);
  letter-spacing: 0.14em; display: block; margin-bottom: 14px;
}
.section-headline {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 700; color: var(--text-primary);
  line-height: 1.15; margin: 0 0 14px;
}
.section-sub {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.9375rem; font-weight: 300;
  color: var(--text-secondary);
}
.section-header { text-align: center; margin-bottom: 56px; }

/* Planet bar */
.planet-bar {
  display: flex; justify-content: space-between;
  border: 1px solid var(--border-dark);
  margin-bottom: 40px; background: var(--bg-card);
}
.planet-cell {
  display: flex; align-items: center; gap: 8px;
  padding: 16px 24px;
  border-right: 1px solid var(--border-dark);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.625rem; color: var(--text-muted);
  letter-spacing: 0.1em; flex: 1;
}
.planet-cell:last-child { border-right: none; }
.planet-cell .glyph { color: var(--accent); font-size: 0.875rem; }

/* Domain grid */
.domain-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 1px; background: var(--border-dark);
  border: 1px solid var(--border-dark);
}
.domain-card {
  background: var(--bg-card);
  padding: 28px;
  border-left: 2px solid transparent;
  transition: border-color 0.2s, background 0.2s;
  display: flex; flex-direction: column; gap: 14px;
  position: relative;
}
.domain-card:hover {
  background: var(--bg-card-hover);
  border-left-color: var(--accent);
}
.domain-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.625rem; color: var(--accent);
  letter-spacing: 0.18em;
}
.domain-reading {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 1.0625rem;
  color: var(--text-primary); line-height: 1.75;
  margin: 0; flex: 1;
}
.domain-source {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5625rem; color: var(--text-muted);
  letter-spacing: 0.1em; align-self: flex-end;
}
.daily-refresh-note {
  text-align: center; margin-top: 28px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.625rem; color: var(--text-muted);
  letter-spacing: 0.1em;
}
```

---

### 4. Tarot Section

Background: `--bg-secondary`. ID: `tarot`.

- Section label: `● TAROT`
- Headline: Playfair Display 700: `"Pull Your Card"`
- Sub: IBM Plex Sans 300 `--text-secondary`: `"One card. One question. Let the deck speak."`

**Card pull UI — centered, single-column:**

**Before pull** — a single face-down card in the center. Dark rectangle `240px × 340px`, `border: 1px solid var(--border-mid)`. In the center of the card: a zodiac mandala drawn in CSS (concentric thin circles in `--border-dark`, `--border-mid`). Below the card: IBM Plex Mono 0.6875rem `--text-muted`: `FOCUS ON YOUR QUESTION`. Below that: `Pull a Card` gold button.

**After pull** (JS toggles `.revealed` class):
- Card flips (CSS 3D transform, `perspective: 1000px`, `rotateY(180deg)`, duration 0.7s)
- Front of card: card name in Playfair italic large, card number in IBM Plex Mono `--accent`, orientation badge (`UPRIGHT` or `REVERSED` in IBM Plex Mono 0.5625rem)
- Below flipped card: interpretation block:
  - Card name: Playfair Display 700 large, `--text-primary`
  - Orientation: IBM Plex Mono `--accent` 0.625rem
  - Reading: Playfair italic 1.0625rem `--text-secondary`
  - Keywords: 3 IBM Plex Mono 0.625rem tags with `border: 1px solid var(--border-mid)`, padding 4px 10px
  - Pull again link: IBM Plex Mono 0.75rem `--text-muted`: `← Pull again`

**3-card spread option:** A subtle text link below the pull button: `Try a 3-card spread →` (past · present · future) in IBM Plex Mono 0.6875rem `--text-muted`.

```html
<section class="section tarot" id="tarot">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">● TAROT</span>
      <h2 class="section-headline">Pull Your Card</h2>
      <p class="section-sub">One card. One question. Let the deck speak.</p>
    </div>

    <div class="tarot-stage reveal">
      <div class="card-container" id="tarot-card">
        <div class="card-inner">
          <div class="card-back">
            <div class="card-mandala" aria-hidden="true"></div>
          </div>
          <div class="card-face">
            <span class="card-number" id="card-number">XVIII</span>
            <span class="card-name-face" id="card-name-face">The Moon</span>
            <span class="card-orientation-badge" id="card-orientation-badge">UPRIGHT</span>
          </div>
        </div>
      </div>
      <p class="card-prompt" id="card-prompt">FOCUS ON YOUR QUESTION</p>
      <button class="btn btn-accent" id="pull-btn">Pull a Card</button>
      <a href="#" class="spread-link" id="spread-link">Try a 3-card spread →</a>
    </div>

    <div class="tarot-reading reveal" id="tarot-reading" hidden>
      <div class="reading-header">
        <h3 class="reading-card-name" id="reading-card-name">The Moon</h3>
        <span class="reading-orientation" id="reading-orientation">UPRIGHT</span>
      </div>
      <p class="reading-text" id="reading-text">
        Something is hidden from you — or hidden by you. The Moon asks you to sit with uncertainty rather than forcing premature clarity. Dreams carry messages now.
      </p>
      <div class="reading-keywords" id="reading-keywords">
        <span class="keyword">ILLUSION</span>
        <span class="keyword">INTUITION</span>
        <span class="keyword">THE UNCONSCIOUS</span>
      </div>
      <button class="pull-again-link" id="pull-again-btn">← Pull again</button>
    </div>
  </div>
</section>
```

CSS:
```css
.tarot-stage {
  display: flex; flex-direction: column;
  align-items: center; gap: 24px;
}
.card-container {
  width: 240px; height: 340px;
  perspective: 1000px; cursor: pointer;
}
.card-inner {
  width: 100%; height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4,0,0.2,1);
}
.card-container.revealed .card-inner { transform: rotateY(180deg); }
.card-back, .card-face {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  border: 1px solid var(--border-mid);
  background: var(--bg-card);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px; padding: 24px;
}
.card-face { transform: rotateY(180deg); }
.card-mandala {
  width: 120px; height: 120px;
  border-radius: 50%;
  border: 1px solid var(--border-dark);
  box-shadow: 0 0 0 20px var(--bg-card), 0 0 0 21px var(--border-void), 0 0 0 40px var(--bg-card), 0 0 0 41px var(--border-void);
}
.card-prompt {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6875rem; color: var(--text-muted);
  letter-spacing: 0.18em;
}
.card-number {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem; color: var(--accent);
  letter-spacing: 0.1em;
}
.card-name-face {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 1.375rem;
  color: var(--text-primary); text-align: center;
}
.card-orientation-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5625rem; color: var(--text-muted);
  border: 1px solid var(--border-dark); padding: 3px 8px;
  letter-spacing: 0.12em;
}
.spread-link {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6875rem; color: var(--text-muted);
  text-decoration: none; letter-spacing: 0.08em;
}
.spread-link:hover { color: var(--text-secondary); }

/* Reading display */
.tarot-reading {
  max-width: 560px; margin: 48px auto 0;
  text-align: center; display: flex;
  flex-direction: column; gap: 24px;
}
.reading-header { display: flex; flex-direction: column; gap: 8px; align-items: center; }
.reading-card-name {
  font-family: 'Playfair Display', serif;
  font-size: 2rem; font-weight: 700; font-style: italic;
  color: var(--text-primary); margin: 0;
}
.reading-orientation {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.625rem; color: var(--accent);
  letter-spacing: 0.16em;
}
.reading-text {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 1.0625rem;
  color: var(--text-secondary); line-height: 1.8; margin: 0;
}
.reading-keywords { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
.keyword {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5625rem; color: var(--text-muted);
  border: 1px solid var(--border-mid); padding: 4px 10px;
  letter-spacing: 0.1em;
}
.pull-again-link {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem; color: var(--text-muted);
  background: none; border: none; cursor: pointer;
  letter-spacing: 0.06em;
}
.pull-again-link:hover { color: var(--text-secondary); }
```

---

### 5. Daily Horoscope Section

Background: `--bg-primary`. ID: `horoscope`.

- Section label: `● HOROSCOPE`
- Headline: Playfair Display 700: `"Your Sign Today"`
- Sub: IBM Plex Sans 300: `"Select your sun sign for today's reading."`

**Zodiac sign selector:** 12-cell grid. Each cell: IBM Plex Mono glyph large + sign name small. On hover and active: `border: 1px solid var(--accent)`, glyph in `--accent`.
♈ Aries    ♉ Taurus   ♊ Gemini   ♋ Cancer
♌ Leo      ♍ Virgo    ♎ Libra    ♏ Scorpio
♐ Sagitt.  ♑ Capric.  ♒ Aquarius ♓ Pisces

**Below selector:** Horoscope reading panel (revealed after sign selection):
- Sign name: Playfair Display 700 italic very large `--text-primary` + glyph in IBM Plex Mono `--accent`
- Date range: IBM Plex Mono 0.625rem `--text-muted`: e.g. `APR 20 – MAY 20`
- Ruling planet: IBM Plex Mono 0.625rem `--text-muted`: `RULER: ♀ VENUS`
- Divider: `1px solid var(--border-dark)`
- Reading text: Playfair italic 1.125rem `--text-primary`, line-height 1.8
- 3 domain sub-readings: thin horizontal rule, then 3 lines: `LOVE`, `WORK`, `BODY` each with a short italic sentence

```html
<section class="section horoscope" id="horoscope">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">● HOROSCOPE</span>
      <h2 class="section-headline">Your Sign Today</h2>
      <p class="section-sub">Select your sun sign for today's reading.</p>
    </div>

    <div class="zodiac-grid reveal">
      <button class="zodiac-cell" data-sign="aries" data-glyph="♈">
        <span class="zodiac-glyph">♈</span>
        <span class="zodiac-name">Aries</span>
      </button>
      <!-- repeat for all 12 signs -->
    </div>

    <div class="horoscope-panel reveal" id="horoscope-panel" hidden>
      <div class="horoscope-header">
        <div class="horoscope-sign-row">
          <h3 class="horoscope-sign-name" id="horoscope-sign-name"><em>Taurus</em></h3>
          <span class="horoscope-glyph" id="horoscope-glyph">♉</span>
        </div>
        <div class="horoscope-meta">
          <span id="horoscope-dates">APR 20 – MAY 20</span>
          <span class="meta-sep">·</span>
          <span id="horoscope-ruler">RULER: ♀ VENUS</span>
        </div>
      </div>
      <div class="horoscope-rule"></div>
      <p class="horoscope-main" id="horoscope-main"></p>
      <div class="horoscope-subreadings">
        <div class="subreading">
          <span class="subreading-label">LOVE</span>
          <p class="subreading-text" id="h-love"></p>
        </div>
        <div class="subreading">
          <span class="subreading-label">WORK</span>
          <p class="subreading-text" id="h-work"></p>
        </div>
        <div class="subreading">
          <span class="subreading-label">BODY</span>
          <p class="subreading-text" id="h-body"></p>
        </div>
      </div>
    </div>
  </div>
</section>
```

CSS:
```css
.zodiac-grid {
  display: grid; grid-template-columns: repeat(6, 1fr);
  gap: 1px; background: var(--border-dark);
  border: 1px solid var(--border-dark); margin-bottom: 48px;
}
.zodiac-cell {
  background: var(--bg-card);
  padding: 24px 16px;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  border: 1px solid transparent; cursor: pointer;
  transition: background 0.18s, border-color 0.18s;
}
.zodiac-cell:hover, .zodiac-cell.active {
  background: var(--bg-card-hover);
  border-color: var(--accent);
}
.zodiac-cell:hover .zodiac-glyph, .zodiac-cell.active .zodiac-glyph {
  color: var(--accent);
}
.zodiac-glyph {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.375rem; color: var(--text-secondary);
  transition: color 0.18s;
}
.zodiac-name {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5625rem; color: var(--text-muted);
  letter-spacing: 0.1em; text-transform: uppercase;
}

/* Horoscope panel */
.horoscope-panel {
  max-width: 640px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 24px;
}
.horoscope-sign-row {
  display: flex; align-items: center; gap: 16px;
}
.horoscope-sign-name {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem; font-weight: 700;
  color: var(--text-primary); margin: 0;
}
.horoscope-glyph {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.5rem; color: var(--accent);
}
.horoscope-meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.625rem; color: var(--text-muted);
  letter-spacing: 0.12em; display: flex; gap: 12px;
}
.meta-sep { color: var(--border-mid); }
.horoscope-rule { height: 1px; background: var(--border-dark); }
.horoscope-main {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 1.125rem;
  color: var(--text-primary); line-height: 1.8; margin: 0;
}
.horoscope-subreadings { display: flex; flex-direction: column; gap: 0; border-top: 1px solid var(--border-dark); }
.subreading {
  display: flex; gap: 28px; align-items: baseline;
  padding: 16px 0; border-bottom: 1px solid var(--border-dark);
}
.subreading-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5625rem; color: var(--accent);
  letter-spacing: 0.14em; min-width: 48px;
}
.subreading-text {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 0.9375rem;
  color: var(--text-secondary); line-height: 1.7; margin: 0;
}
```

---

### 6. Birth Chart Section

Background: `--bg-secondary`. ID: `birthchart`.

- Section label: `● BIRTH CHART`
- Headline: Playfair Display 700: `"Your Natal Map"`
- Sub: IBM Plex Sans 300: `"Enter your birth details. The chart is cast at the moment of your first breath."`

**2-column layout:**

**Left (40%) — Input form:**
Birth Date:    [  MM / DD / YYYY  ]
Birth Time:    [  HH : MM   ] [AM / PM]
— Time unknown: check this box —
Birth Place:   [  City, Country       ]
[Generate My Chart →  ]
Form styling:
- Labels: IBM Plex Mono 0.625rem `--text-muted` letter-spacing 0.12em
- Inputs: `background: var(--bg-card)`, `border: 1px solid var(--border-dark)`, `color: var(--text-primary)`, IBM Plex Mono 0.875rem, padding 12px 16px, `border-radius: 0` — square
- Focus: `border-color: var(--accent)`
- Checkbox for "time unknown": styled as a small dark square, checkmark in `--accent`
- Submit: full-width gold button

**Right (60%) — Chart display panel:**
Before generation: dark panel with IBM Plex Mono `--text-muted` centered: `YOUR CHART WILL APPEAR HERE · ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓`

After generation: an SVG circular natal chart rendered by JS/Claude API:
- Outer ring: 12 zodiac sign segments, thin `--border-dark` dividers, glyph label IBM Plex Mono `--text-muted` small in each segment
- Planet markers: IBM Plex Mono glyphs placed at their degree positions
- Aspect lines (conjunction, trine, square, opposition, sextile): thin lines in `--border-mid` across the center
- Inner circle: degrees of the Ascendant labeled in IBM Plex Mono `--accent` small

Below SVG: planet list table:
| Glyph | Planet | Sign | Degree | House |
| IBM Plex Mono 0.625rem `--text-muted` rows |

Big 3 highlight box below table:
- `SUN · ☉` sign + IBM Plex Mono `--text-primary`
- `MOON · ☽` sign
- `RISING · ASC` sign
All in a 3-cell row `border: 1px solid var(--border-accent)`, background `--bg-card`

```html
<section class="section birthchart" id="birthchart">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">● BIRTH CHART</span>
      <h2 class="section-headline">Your Natal Map</h2>
      <p class="section-sub">Enter your birth details. The chart is cast at the moment of your first breath.</p>
    </div>

    <div class="birthchart-layout reveal">
      <div class="birthchart-form-col">
        <form class="birthchart-form" id="birthchart-form">
          <div class="form-group">
            <label class="form-label" for="birth-date">BIRTH DATE</label>
            <input type="date" id="birth-date" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="birth-time">BIRTH TIME</label>
            <input type="time" id="birth-time" class="form-input" />
            <label class="checkbox-label">
              <input type="checkbox" id="time-unknown" class="checkbox-input">
              <span class="checkbox-text">Time unknown</span>
            </label>
          </div>
          <div class="form-group">
            <label class="form-label" for="birth-place">BIRTH PLACE</label>
            <input type="text" id="birth-place" class="form-input" placeholder="City, Country" />
          </div>
          <button type="submit" class="btn btn-accent btn-full">Generate My Chart →</button>
        </form>
      </div>

      <div class="birthchart-display-col">
        <div class="chart-placeholder" id="chart-placeholder">
          <span>YOUR CHART WILL APPEAR HERE</span>
          <span class="glyphs-row" aria-hidden="true">♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓</span>
        </div>
        <div class="chart-result" id="chart-result" hidden>
          <svg id="natal-chart-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"></svg>
          <div class="big-three-bar" id="big-three-bar">
            <div class="big-three-cell">
              <span class="big-three-label">☉ SUN</span>
              <span class="big-three-value" id="b3-sun">—</span>
            </div>
            <div class="big-three-cell">
              <span class="big-three-label">☽ MOON</span>
              <span class="big-three-value" id="b3-moon">—</span>
            </div>
            <div class="big-three-cell">
              <span class="big-three-label">ASC RISING</span>
              <span class="big-three-value" id="b3-rising">—</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

CSS:
```css
.birthchart-layout {
  display: grid; grid-template-columns: 40fr 60fr;
  gap: 60px; align-items: start;
}
.form-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.625rem; color: var(--text-muted);
  letter-spacing: 0.14em; display: block; margin-bottom: 8px;
}
.form-input {
  width: 100%; background: var(--bg-card);
  border: 1px solid var(--border-dark);
  color: var(--text-primary);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.875rem; padding: 12px 16px;
  outline: none; transition: border-color 0.18s;
  border-radius: 0;
}
.form-input:focus { border-color: var(--accent); }
.form-input::placeholder { color: var(--text-muted); }
.form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.checkbox-label {
  display: flex; align-items: center; gap: 10px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.625rem; color: var(--text-muted);
  letter-spacing: 0.1em; cursor: pointer;
}

/* Chart display */
.chart-placeholder {
  background: var(--bg-card); border: 1px solid var(--border-dark);
  height: 400px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 16px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.625rem; color: var(--text-muted);
  letter-spacing: 0.14em; text-align: center;
}
.glyphs-row { font-size: 1rem; letter-spacing: 0.18em; color: var(--border-mid); }
#natal-chart-svg { width: 100%; max-width: 400px; display: block; margin: 0 auto; }
.big-three-bar {
  display: grid; grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--border-accent); margin-top: 24px;
}
.big-three-cell {
  padding: 20px; display: flex; flex-direction: column; gap: 8px;
  border-right: 1px solid var(--border-dark); align-items: center;
}
.big-three-cell:last-child { border-right: none; }
.big-three-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5625rem; color: var(--text-muted); letter-spacing: 0.12em;
}
.big-three-value {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 1.125rem;
  color: var(--text-primary);
}
```

---

### 7. Astro Wardrobe Section

Background: `--bg-primary`. ID: `wardrobe`.

- Section label: `● ASTRO WARDROBE`
- Headline: Playfair Display 700: `"Dress for the Cosmos"`
- Sub: IBM Plex Sans 300: `"Today's planetary energy recommends what to wear."`

**Layout:** Centered single column, max-width 760px.

**Today's Wardrobe Card:** A tall dark card `--bg-card`, `border: 1px solid var(--border-dark)`, `border-top: 2px solid var(--accent)`. Padding 48px.

Inside the card:
- Top row: Planet influence + date. IBM Plex Mono `--text-muted` 0.625rem: `☽ MOON IN SCORPIO · SUNDAY 27 APR`
- Main colour recommendation:
  - Label: IBM Plex Mono `--accent`: `TODAY'S COLOUR`
  - Colour name: Playfair Display 700 very large `--text-primary`: `"Deep Burgundy"`
  - Colour swatch: a `48px × 48px` square rendered in the recommended colour, `border: 1px solid var(--border-mid)`
- Divider: `1px solid var(--border-dark)`
- Wardrobe narrative: Playfair italic 1.0625rem `--text-secondary`, line-height 1.8:
  *"Scorpio's depth calls for intensity in your presentation. Rich, dark tones signal your inner authority. Avoid pale or pastel — the energy today demands presence."*
- 3 recommendation tags in a row:
  - `TEXTURES` → `Velvet · Silk · Heavy Linen`
  - `AVOID` → `Pastels · Bright Yellow`
  - `ACCESSORY` → `Dark metal · Obsidian`
  - Each tag: IBM Plex Mono 0.5625rem `--text-muted` label + `--text-secondary` value. `border-bottom: 1px solid var(--border-dark)`, padding 14px 0.
- Final line: IBM Plex Mono 0.5625rem `--text-muted` italic: `☽ Updates with each Moon sign change`

Below card: a 3-column mini preview for **yesterday / today / tomorrow** outfit energy, each in a smaller dark card with just: glyph, energy word (Playfair italic), colour swatch.

```html
<section class="section wardrobe" id="wardrobe">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">● ASTRO WARDROBE</span>
      <h2 class="section-headline">Dress for the Cosmos</h2>
      <p class="section-sub">Today's planetary energy recommends what to wear.</p>
    </div>

    <div class="wardrobe-main reveal">
      <div class="wardrobe-card">
        <div class="wardrobe-planet-row">
          <span>☽ MOON IN SCORPIO · SUNDAY 27 APR</span>
        </div>
        <div class="wardrobe-colour-block">
          <span class="wardrobe-colour-label">TODAY'S COLOUR</span>
          <div class="wardrobe-colour-row">
            <span class="wardrobe-colour-name" id="w-colour-name">Deep Burgundy</span>
            <div class="colour-swatch" id="w-swatch" style="background: #4A1040;"></div>
          </div>
        </div>
        <div class="wardrobe-rule"></div>
        <p class="wardrobe-narrative" id="w-narrative">
          Scorpio's depth calls for intensity in your presentation. Rich, dark tones signal your inner authority. Avoid pale or pastel — the energy today demands presence.
        </p>
        <div class="wardrobe-tags">
          <div class="wardrobe-tag-row">
            <span class="wtag-label">TEXTURES</span>
            <span class="wtag-value" id="w-textures">Velvet · Silk · Heavy Linen</span>
          </div>
          <div class="wardrobe-tag-row">
            <span class="wtag-label">AVOID</span>
            <span class="wtag-value" id="w-avoid">Pastels · Bright Yellow</span>
          </div>
          <div class="wardrobe-tag-row">
            <span class="wtag-label">ACCESSORY</span>
            <span class="wtag-value" id="w-accessory">Dark metal · Obsidian</span>
          </div>
        </div>
        <span class="wardrobe-refresh-note">☽ Updates with each Moon sign change</span>
      </div>

      <div class="wardrobe-timeline">
        <div class="timeline-card">
          <span class="timeline-day">YESTERDAY</span>
          <span class="timeline-glyph">♀</span>
          <span class="timeline-energy">Soft</span>
          <div class="colour-swatch-sm" style="background: #C8A4A0;"></div>
        </div>
        <div class="timeline-card active">
          <span class="timeline-day">TODAY</span>
          <span class="timeline-glyph">☽</span>
          <span class="timeline-energy">Intense</span>
          <div class="colour-swatch-sm" style="background: #4A1040;"></div>
        </div>
        <div class="timeline-card">
          <span class="timeline-day">TOMORROW</span>
          <span class="timeline-glyph">♂</span>
          <span class="timeline-energy">Bold</span>
          <div class="colour-swatch-sm" style="background: #8B2020;"></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

CSS:
```css
.wardrobe-main { max-width: 760px; margin: 0 auto; }
.wardrobe-card {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  border-top: 2px solid var(--accent);
  padding: 48px; display: flex; flex-direction: column; gap: 24px;
  margin-bottom: 24px;
}
.wardrobe-planet-row {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.625rem; color: var(--text-muted); letter-spacing: 0.14em;
}
.wardrobe-colour-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.625rem; color: var(--accent);
  letter-spacing: 0.14em; display: block; margin-bottom: 12px;
}
.wardrobe-colour-row { display: flex; align-items: center; gap: 20px; }
.wardrobe-colour-name {
  font-family: 'Playfair Display', serif;
  font-size: 2.25rem; font-weight: 700;
  color: var(--text-primary);
}
.colour-swatch { width: 48px; height: 48px; border: 1px solid var(--border-mid); flex-shrink: 0; }
.colour-swatch-sm { width: 32px; height: 32px; border: 1px solid var(--border-dark); }
.wardrobe-rule { height: 1px; background: var(--border-dark); }
.wardrobe-narrative {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 1.0625rem;
  color: var(--text-secondary); line-height: 1.8; margin: 0;
}
.wardrobe-tags { display: flex; flex-direction: column; }
.wardrobe-tag-row {
  display: flex; gap: 24px; align-items: baseline;
  padding: 14px 0; border-bottom: 1px solid var(--border-dark);
}
.wtag-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5625rem; color: var(--text-muted);
  letter-spacing: 0.14em; min-width: 80px;
}
.wtag-value {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem; font-weight: 300; color: var(--text-secondary);
}
.wardrobe-refresh-note {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5625rem; color: var(--text-muted);
  letter-spacing: 0.1em;
}
.wardrobe-timeline {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1px; background: var(--border-dark);
  border: 1px solid var(--border-dark);
}
.timeline-card {
  background: var(--bg-card); padding: 24px;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
}
.timeline-card.active { background: var(--bg-card-hover); border-top: 1px solid var(--accent); }
.timeline-day {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5625rem; color: var(--text-muted); letter-spacing: 0.12em;
}
.timeline-glyph {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.25rem; color: var(--text-secondary);
}
.timeline-energy {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 0.9375rem; color: var(--text-primary);
}
```

---

### 8. Palmistry Section

Background: `--bg-secondary`. ID: `palmistry`.

- Section label: `● PALMISTRY`
- Headline: Playfair Display 700: `"Read Your Lines"`
- Sub: IBM Plex Sans 300: `"Upload an image of your dominant hand. The AI will read your major lines."`

**2-column layout:**

**Left (50%) — Upload + Preview:**
- Upload area: dashed border `1px dashed var(--border-mid)`, background `--bg-card`, height `360px`, centered content.
  - Before upload: IBM Plex Mono `--text-muted` 0.625rem: `UPLOAD PALM IMAGE` + palm emoji illustration made of unicode chars + `or drag and drop`
  - `<input type="file" accept="image/*">` hidden, triggered by clicking the upload area
  - After upload: image preview fills the upload area, `object-fit: cover`
- Below area: `Analyze My Palm →` gold button

**Right (50%) — Reading display:**
Before analysis: dark panel with IBM Plex Mono `--text-muted`: `YOUR READING WILL APPEAR HERE`

After analysis: 4 major line readings, each as a card row:
- Line name: IBM Plex Mono 0.625rem `--accent` e.g. `HEART LINE`
- Reading: Playfair italic `--text-secondary`
- Each row separated by `1px solid var(--border-dark)`

Lines read:
1. `HEART LINE` — emotional nature, relationships
2. `HEAD LINE` — intellect, communication, reasoning
3. `LIFE LINE` — vitality, major life changes
4. `FATE LINE` — career path, external forces

Below the lines: an overall synthesis paragraph in Playfair italic larger.

Disclaimer (IBM Plex Mono 0.5625rem `--text-muted` at bottom):
`✦ Palmistry is an interpretive art. Readings are generated by AI for reflection, not prediction.`

```html
<section class="section palmistry" id="palmistry">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">● PALMISTRY</span>
      <h2 class="section-headline">Read Your Lines</h2>
      <p class="section-sub">Upload an image of your dominant hand. The AI will read your major lines.</p>
    </div>

    <div class="palmistry-layout reveal">
      <div class="palmistry-upload-col">
        <div class="upload-area" id="upload-area" role="button" tabindex="0" aria-label="Upload palm image">
          <div class="upload-placeholder" id="upload-placeholder">
            <span class="upload-icon" aria-hidden="true">✋</span>
            <span class="upload-label">UPLOAD PALM IMAGE</span>
            <span class="upload-sub">or drag and drop</span>
          </div>
          <img src="" alt="Palm preview" id="palm-preview" class="palm-preview" hidden />
          <input type="file" accept="image/*" id="palm-input" class="sr-only" />
        </div>
        <button class="btn btn-accent btn-full" id="analyze-btn" disabled>Analyze My Palm →</button>
      </div>

      <div class="palmistry-reading-col">
        <div class="palm-placeholder" id="palm-reading-placeholder">
          <span>YOUR READING WILL APPEAR HERE</span>
          <span class="palm-glyphs" aria-hidden="true">— — — —</span>
        </div>
        <div class="palm-reading-panel" id="palm-reading-panel" hidden>
          <div class="palm-line-row" id="p-heart">
            <span class="palm-line-label">HEART LINE</span>
            <p class="palm-line-text"></p>
          </div>
          <div class="palm-line-row" id="p-head">
            <span class="palm-line-label">HEAD LINE</span>
            <p class="palm-line-text"></p>
          </div>
          <div class="palm-line-row" id="p-life">
            <span class="palm-line-label">LIFE LINE</span>
            <p class="palm-line-text"></p>
          </div>
          <div class="palm-line-row" id="p-fate">
            <span class="palm-line-label">FATE LINE</span>
            <p class="palm-line-text"></p>
          </div>
          <p class="palm-synthesis" id="palm-synthesis"></p>
          <span class="palm-disclaimer">✦ Palmistry is an interpretive art. Readings are generated by AI for reflection, not prediction.</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

CSS:
```css
.palmistry-layout {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 48px; align-items: start;
}
.upload-area {
  background: var(--bg-card); border: 1px dashed var(--border-mid);
  height: 360px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; position: relative; overflow: hidden;
  margin-bottom: 16px; transition: border-color 0.2s;
}
.upload-area:hover { border-color: var(--accent); }
.upload-placeholder { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.upload-icon { font-size: 2.5rem; filter: grayscale(1) brightness(0.4); }
.upload-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.625rem; color: var(--text-muted); letter-spacing: 0.14em;
}
.upload-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5625rem; color: var(--text-ghost); letter-spacing: 0.1em;
}
.palm-preview { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }

/* Reading panel */
.palm-placeholder {
  background: var(--bg-card); border: 1px solid var(--border-dark);
  height: 360px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 16px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.625rem; color: var(--text-muted); letter-spacing: 0.14em;
}
.palm-glyphs { font-size: 1.25rem; letter-spacing: 0.5em; color: var(--border-mid); }
.palm-reading-panel { display: flex; flex-direction: column; }
.palm-line-row {
  padding: 20px 0; border-bottom: 1px solid var(--border-dark);
  display: flex; flex-direction: column; gap: 10px;
}
.palm-line-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5625rem; color: var(--accent); letter-spacing: 0.16em;
}
.palm-line-text {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 0.9375rem;
  color: var(--text-secondary); line-height: 1.7; margin: 0;
}
.palm-synthesis {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 1.0625rem;
  color: var(--text-primary); line-height: 1.8;
  margin: 28px 0 20px;
}
.palm-disclaimer {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5625rem; color: var(--text-muted);
  letter-spacing: 0.08em; display: block;
}
```

---

### 9. Tarot & Astrology Info Section

Background: **`--bg-light`** (parchment — the single contrast break). ID: `info`.

- Section label: IBM Plex Mono `--text-dark` muted: `● REFERENCE`
- Headline: Playfair Display 700 `--text-dark`: `"The Library"`
- Sub: IBM Plex Sans 300 `--text-dark-secondary`: `"Everything you need to understand the language of the stars and cards."`

**Tab navigation** (4 tabs): `ZODIAC SIGNS` | `TAROT CARDS` | `PLANETS & HOUSES` | `ASPECTS`

Tab style: IBM Plex Mono 0.625rem `--text-dark-secondary`. Active tab: border-bottom `2px solid var(--accent)`, color `--text-dark`. Tabs in a row, separated by `1px solid var(--border-light)`.

**Under each tab — reference grid:**

`ZODIAC SIGNS` tab: 12-card grid. Each card bg `--bg-light-off`, border `1px solid var(--border-light)`. Card: glyph large IBM Plex Mono `--text-dark`, sign name Playfair Display italic `--text-dark`, element (FIRE / EARTH / AIR / WATER) IBM Plex Mono 0.5625rem `--text-dark-secondary`, ruling planet + quality.

`TAROT CARDS` tab: Two columns — Major Arcana (22 cards) + Minor Arcana overview. Major Arcana as a grid: card number + card name Playfair italic + one-line meaning IBM Plex Sans 300 `--text-dark-secondary`.

`PLANETS & HOUSES` tab: 2-column table. Planets column: glyph + name + rulership + keywords. Houses column: house number + domain name + keywords.

`ASPECTS` tab: 5-row table. Aspect name + glyph + orb + meaning. Aspects: Conjunction (☌), Opposition (☍), Trine (△), Square (□), Sextile (⚹).

---

### 10. Birth Data Modal

Triggered by "Enter Birth Data" button in navbar. Full-screen dark overlay.

Modal panel: `--bg-card`, `border: 1px solid var(--border-mid)`, max-width 480px, centered.

- Header: Playfair italic large `"Your Birth Data"` + IBM Plex Mono close button `✕`
- Same form as Birth Chart section (date, time, place)
- Below form: IBM Plex Mono 0.5625rem `--text-muted`: `✦ Your data is stored locally in your browser and never transmitted.`
- Save button: full-width gold `Save & Personalize`

Once saved, a persistent thin banner appears below the navbar:
IBM Plex Mono 0.5625rem `--text-muted` centered: `☉ Reading for: Taurus Sun · Scorpio Moon · Virgo Rising`

---

### 11. Footer

Background: `--bg-primary`. `border-top: 1px solid var(--border-void)`. Padding: 60px 0 32px.

3-column layout:

**Col 1: Brand**
- `✦ STELLAR` (Playfair Display 600)
- Tagline: Playfair italic `--text-secondary`: `"Where the ancient meets the algorithmic."`
- IBM Plex Mono `--text-muted` 0.5625rem: `© 2025 Stellar · All readings generated by AI · For reflection, not prediction.`

**Col 2: Features**
- IBM Plex Sans 400 `--text-secondary` 0.875rem: Daily Astrology, Tarot, Horoscope, Birth Chart, Astro Wardrobe, Palmistry, Info

**Col 3: Glyphs**
- A decorative line of zodiac glyphs: `♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓` in IBM Plex Mono `--border-mid`
- Below: planetary glyphs: `☉ ☽ ♀ ♂ ♃ ♄ ♅ ♆` in IBM Plex Mono `--border-dark`

Bottom bar: `border-top: 1px solid var(--border-void)`, padding-top 20px. IBM Plex Mono 0.5625rem `--text-muted` centered: `✦ STELLAR · AI-powered astrology for the modern seeker`

---

## Buttons

```css
.btn {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.8125rem; font-weight: 500;
  letter-spacing: 0.04em; padding: 11px 24px;
  border-radius: 0; cursor: pointer;
  transition: all 0.18s ease; text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid transparent; white-space: nowrap;
}
.btn-accent {
  background: var(--accent); color: #0A0A0A;
  border-color: var(--accent);
}
.btn-accent:hover { background: var(--accent-dim); border-color: var(--accent-dim); }
.btn-ghost {
  background: transparent; color: var(--text-primary);
  border: 1px solid var(--border-dark);
}
.btn-ghost:hover { border-color: var(--border-mid); }
.btn-full { width: 100%; justify-content: center; }

/* Buttons are always border-radius: 0 — square edges, no rounding */
```

---

## Animations (`css/animations.css`)

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; } to { opacity: 1; }
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@keyframes dropLine {
  from { height: 0; opacity: 0; }
  to   { height: 80px; opacity: 1; }
}

/* Hero stagger */
.hero-inner > * { opacity: 0; animation: fadeUp 0.6s ease forwards; }
.hero-date      { animation-delay: 0.1s; }
.hero-headline  { animation-delay: 0.24s; }
.hero-sub       { animation-delay: 0.38s; }
.hero-cta       { animation-delay: 0.5s; }
.hero-glyphs    { animation-delay: 0.62s; }
.hero-drop-line { animation: dropLine 0.8s ease 0.8s forwards; opacity: 0; }

/* Scroll reveal */
.reveal {
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* Skeleton */
.skel-line {
  height: 14px;
  background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--border-dark) 50%, var(--bg-secondary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 0; margin-bottom: 10px;
}
.skel-line.short { width: 60%; }

/* Card flip */
.card-inner { transition: transform 0.7s cubic-bezier(0.4,0,0.2,1); }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Breakpoints

```css
@media (max-width: 1024px) {
  .domain-grid { grid-template-columns: 1fr; }
  .birthchart-layout { grid-template-columns: 1fr; gap: 40px; }
  .palmistry-layout { grid-template-columns: 1fr; }
  .zodiac-grid { grid-template-columns: repeat(4, 1fr); }
  .planet-bar { flex-wrap: wrap; }
}

@media (max-width: 768px) {
  .nav-links, .nav-actions { display: none; }
  .hamburger { display: flex; }
  .hero-headline { font-size: clamp(2.5rem, 8vw, 3.5rem); }
  .zodiac-grid { grid-template-columns: repeat(3, 1fr); }
  .wardrobe-timeline { grid-template-columns: 1fr; }
  .big-three-bar { grid-template-columns: 1fr; }
  .big-three-cell { border-right: none; border-bottom: 1px solid var(--border-dark); }
  .birthchart-layout, .palmistry-layout { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .container { padding-left: 20px; padding-right: 20px; }
  .zodiac-grid { grid-template-columns: repeat(2, 1fr); }
  .planet-bar { display: none; }
  .domain-grid { grid-template-columns: 1fr; }
  .wardrobe-card { padding: 28px; }
}
```

---

## File Structure
stellar/
├── index.html
├── css/
│   ├── base.css          # reset, variables, typography, body
│   ├── layout.css        # container, section, grid utils
│   ├── components.css    # navbar, buttons, cards, forms, modal, ticker
│   ├── animations.css    # keyframes, reveal, skeleton, card-flip
│   └── responsive.css    # all media queries
├── js/
│   ├── main.js           # scroll reveal, planet bar date, init
│   ├── nav.js            # hamburger, smooth scroll, active states
│   ├── daily.js          # daily astrology Claude API call
│   ├── tarot.js          # card pull logic, reveal animation, Claude API
│   ├── horoscope.js      # sign selector, Claude API horoscope fetch
│   ├── birthchart.js     # form handling, SVG chart render, Claude API
│   ├── wardrobe.js       # moon sign lookup, Claude API wardrobe
│   ├── palmistry.js      # image upload, base64 encode, Claude API
│   ├── info.js           # tab switching, static reference data
│   └── modal.js          # birth data modal, localStorage save
├── data/
│   ├── tarot.json        # 78 card names, numbers, keywords
│   ├── zodiac.json       # 12 signs, elements, rulers, dates
│   └── planets.json      # planet glyphs, keywords, rulerships
├── assets/
│   ├── favicon.svg       # ✦ star SVG
│   └── og-image.png      # 1200×630 social share
└── README.md
---

## Accessibility

- All interactive elements: `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }`
- `aria-live="polite"` on all AI reading result areas
- `aria-expanded` on hamburger, `aria-modal` on birth data modal
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Upload area: `role="button"`, `tabindex="0"`, keyboard-activated
- Celestial glyphs: `aria-hidden="true"` on all decorative glyph elements
- `prefers-reduced-motion` kills all animations
- All text meets WCAG AA: warm white `#EDEAE3` on `#080808` exceeds 17:1 contrast
- SR-only class for screen reader text: `.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }`