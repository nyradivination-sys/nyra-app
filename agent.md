# agent.md — Stellar AI Agent Specification
## Claude API Integration for All 7 Features

---

## Overview

Stellar uses the Claude API across 6 feature modules. Each call is stateless — only the relevant user data and context is sent per request. All calls go to the Anthropic `/v1/messages` endpoint. The model is always `claude-sonnet-4-20250514`. All agents respond exclusively in JSON unless otherwise noted.

---

## Shared Configuration

```javascript
const API_URL   = "https://api.anthropic.com/v1/messages";
const MODEL     = "claude-sonnet-4-20250514";
const MAX_TOKENS = 1000;

// Shared fetch helper
async function callClaude(systemPrompt, userMessage, imageData = null) {
  const userContent = imageData
    ? [
        { type: "image", source: { type: "base64", media_type: imageData.type, data: imageData.data } },
        { type: "text", text: userMessage }
      ]
    : userMessage;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages: [{ role: "user", content: userContent }]
    })
  });

  const data = await response.json();
  const raw = data.content
    .filter(b => b.type === "text")
    .map(b => b.text)
    .join("");

  // Strip accidental markdown fences
  return raw.replace(/```json|```/g, "").trim();
}
```

---

## 1. Daily Astrology Agent

**File:** `js/daily.js`
**Trigger:** Page load (or manual refresh click)

### System Prompt
You are a poetic astrology interpreter for Stellar, a dark, editorial astrology app inspired by Co–Star. Your voice is precise, unsentimental, and intimate — like a very perceptive friend who has studied the stars. You do not say "you may" or "it is possible that." You make declarative statements. Short sentences. No platitudes.
You are given today's planetary positions and optionally the user's birth chart. You generate 8 domain readings.
Respond ONLY in JSON. No preamble. No markdown. No explanation outside the object.
JSON shape:
{
"date_line": "WEEKDAY · DD MON YYYY · ☉ IN SIGN",
"planet_positions": [
{ "glyph": "☉", "name": "SUN", "sign": "TAURUS" },
{ "glyph": "☽", "name": "MOON", "sign": "SCORPIO" },
{ "glyph": "♀", "name": "VENUS", "sign": "GEMINI" },
{ "glyph": "♂", "name": "MARS", "sign": "CANCER" },
{ "glyph": "♃", "name": "JUPITER", "sign": "GEMINI" },
{ "glyph": "♄", "name": "SATURN", "sign": "PISCES" }
],
"readings": [
{ "domain": "SELF",             "text": "...", "source": "☉ Sun in Taurus" },
{ "domain": "THINKING",         "text": "...", "source": "☿ Mercury in Aries" },
{ "domain": "EMOTIONS",         "text": "...", "source": "☽ Moon in Scorpio" },
{ "domain": "THE UNCONSCIOUS",  "text": "...", "source": "♆ Neptune in Pisces" },
{ "domain": "RELATIONSHIPS",    "text": "...", "source": "♀ Venus in Gemini" },
{ "domain": "WORK",             "text": "...", "source": "♂ Mars in Cancer" },
{ "domain": "GROWTH",           "text": "...", "source": "♃ Jupiter in Gemini" },
{ "domain": "SPIRITUALITY",     "text": "...", "source": "♄ Saturn in Pisces" }
]
}
Rules for readings:

Each reading: 1–3 sentences. Playfair-italic voice. Poetic but not vague.
No "today" — write as if the transit is simply a truth.
Do not repeat words across readings.
The source field should name the most relevant planet and its current sign.
### User Message

```javascript
function buildDailyUserMessage(userBirthData) {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

  let msg = `Today is ${dateStr}. Generate daily readings for all 8 domains.`;

  if (userBirthData) {
    msg += ` The user was born on ${userBirthData.date}`;
    if (userBirthData.time) msg += ` at ${userBirthData.time}`;
    if (userBirthData.place) msg += ` in ${userBirthData.place}`;
    msg += `. Factor in their natal chart.`;
  }

  return msg;
}
```

### Client Code (`js/daily.js`)

```javascript
async function loadDailyReadings() {
  const birthData = JSON.parse(localStorage.getItem("stellar_birth_data") || "null");
  const domainGrid = document.querySelector(".domain-grid");

  // Show skeletons
  domainGrid.querySelectorAll(".domain-reading").forEach(el => {
    el.innerHTML = `<div class="skel-line"></div><div class="skel-line short"></div>`;
  });

  try {
    const raw = await callClaude(DAILY_SYSTEM_PROMPT, buildDailyUserMessage(birthData));
    const data = JSON.parse(raw);

    // Update date line
    document.querySelector(".hero-date").textContent = data.date_line;

    // Update planet bar
    data.planet_positions.forEach((p, i) => {
      const cells = document.querySelectorAll(".planet-cell");
      if (cells[i]) {
        cells[i].querySelector(".glyph").textContent = p.glyph;
        cells[i].querySelector("span:last-child").textContent = `${p.name} · ${p.sign}`;
      }
    });

    // Update domain cards
    data.readings.forEach(reading => {
      const card = document.querySelector(`.domain-card[data-domain="${reading.domain}"]`);
      if (card) {
        card.querySelector(".domain-reading").textContent = reading.text;
        card.querySelector(".domain-source").textContent = reading.source;
      }
    });
  } catch (err) {
    console.error("Daily readings error:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadDailyReadings);
```

---

## 2. Tarot Agent

**File:** `js/tarot.js`
**Trigger:** User clicks "Pull a Card" button

### System Prompt
You are the Tarot interpreter for Stellar, an editorial astrology app. Your readings are poetic, precise, and unsentimental — not vague affirmations. Each reading confronts the seeker with something true.
Respond ONLY in JSON. No preamble. No markdown. Exactly this shape:
{
"card_number": "XVIII",
"card_name": "The Moon",
"orientation": "UPRIGHT",
"face_text": "The Moon",
"reading": "Something is hidden — or hidden by you. The Moon asks you to sit with uncertainty rather than forcing premature clarity. Dreams carry messages now.",
"keywords": ["ILLUSION", "INTUITION", "THE UNCONSCIOUS"],
"element": "WATER",
"ruling_planet": "☽ Moon"
}
Rules:

orientation is randomly UPRIGHT or REVERSED (you decide, vary it)
card_number in Roman numerals for Major Arcana; for Minor Arcana use format "ACE OF CUPS", "THREE OF SWORDS" etc.
reading: 2–4 sentences, declarative, poetic. Different for reversed vs upright.
keywords: exactly 3, uppercase, 1–3 words each
For a 3-card spread, the user message will specify; return an array of 3 card objects under "cards" key instead
### Client Code (`js/tarot.js`)

```javascript
const pullBtn = document.getElementById("pull-btn");
const spreadLink = document.getElementById("spread-link");

pullBtn.addEventListener("click", async () => {
  pullBtn.disabled = true;
  pullBtn.textContent = "Reading...";

  try {
    const raw = await callClaude(TAROT_SYSTEM_PROMPT, "Pull a single tarot card for me.");
    const card = JSON.parse(raw);

    // Flip the card
    const cardEl = document.getElementById("tarot-card");
    document.getElementById("card-number").textContent = card.card_number;
    document.getElementById("card-name-face").textContent = card.card_name;
    document.getElementById("card-orientation-badge").textContent = card.orientation;
    cardEl.classList.add("revealed");

    // After flip delay, show reading
    setTimeout(() => {
      document.getElementById("card-prompt").hidden = true;

      const readingEl = document.getElementById("tarot-reading");
      readingEl.hidden = false;
      document.getElementById("reading-card-name").textContent = card.card_name;
      document.getElementById("reading-orientation").textContent = card.orientation;
      document.getElementById("reading-text").textContent = card.reading;

      const kwContainer = document.getElementById("reading-keywords");
      kwContainer.innerHTML = card.keywords
        .map(k => `<span class="keyword">${k}</span>`)
        .join("");
    }, 750);

  } catch (err) {
    console.error("Tarot error:", err);
  } finally {
    pullBtn.disabled = false;
    pullBtn.textContent = "Pull a Card";
  }
});

// Pull again
document.getElementById("pull-again-btn").addEventListener("click", () => {
  const cardEl = document.getElementById("tarot-card");
  cardEl.classList.remove("revealed");
  document.getElementById("tarot-reading").hidden = true;
  document.getElementById("card-prompt").hidden = false;
});

// 3-card spread
spreadLink.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const raw = await callClaude(TAROT_SYSTEM_PROMPT, "Pull a 3-card past-present-future spread for me.");
    const data = JSON.parse(raw);
    renderSpread(data.cards);
  } catch (err) {
    console.error("Spread error:", err);
  }
});
```

---

## 3. Daily Horoscope Agent

**File:** `js/horoscope.js`
**Trigger:** User clicks a zodiac sign cell

### System Prompt
You are the horoscope writer for Stellar — a dark, editorial astrology app. Your horoscopes are sharp, personal, and never generic. One sentence can change someone's day. Write as if you know this person.
Respond ONLY in JSON. No markdown. No preamble. Exactly this shape:
{
"sign": "Taurus",
"glyph": "♉",
"date_range": "APR 20 – MAY 20",
"ruling_planet": "RULER: ♀ VENUS",
"main_reading": "...",
"love": "...",
"work": "...",
"body": "..."
}
Rules:

main_reading: 3–5 sentences. Poetic, declarative, no hedging.
love / work / body: 1–2 sentences each. Direct. No platitudes.
Readings should feel specific to today's current planetary weather, not generic sign traits.
### Client Code (`js/horoscope.js`)

```javascript
document.querySelectorAll(".zodiac-cell").forEach(cell => {
  cell.addEventListener("click", async () => {
    const sign = cell.dataset.sign;
    const glyph = cell.dataset.glyph;

    // Active state
    document.querySelectorAll(".zodiac-cell").forEach(c => c.classList.remove("active"));
    cell.classList.add("active");

    const panel = document.getElementById("horoscope-panel");
    panel.hidden = false;

    // Loading skeletons
    ["horoscope-main", "h-love", "h-work", "h-body"].forEach(id => {
      document.getElementById(id).innerHTML =
        `<div class="skel-line"></div><div class="skel-line short"></div>`;
    });

    try {
      const today = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
      const raw = await callClaude(
        HOROSCOPE_SYSTEM_PROMPT,
        `Today is ${today}. Write the daily horoscope for ${sign}.`
      );
      const data = JSON.parse(raw);

      document.getElementById("horoscope-sign-name").innerHTML = `<em>${data.sign}</em>`;
      document.getElementById("horoscope-glyph").textContent = data.glyph;
      document.getElementById("horoscope-dates").textContent = data.date_range;
      document.getElementById("horoscope-ruler").textContent = data.ruling_planet;
      document.getElementById("horoscope-main").textContent = data.main_reading;
      document.getElementById("h-love").textContent = data.love;
      document.getElementById("h-work").textContent = data.work;
      document.getElementById("h-body").textContent = data.body;

    } catch (err) {
      console.error("Horoscope error:", err);
    }
  });
});
```

---

## 4. Birth Chart Agent

**File:** `js/birthchart.js`
**Trigger:** User submits birth chart form

### System Prompt
You are an expert astrologer for Stellar. Given a birth date, time, and place, you calculate and interpret a natal birth chart.
Respond ONLY in JSON. No markdown. No preamble. Exactly this shape:
{
"sun_sign": "Taurus",
"moon_sign": "Scorpio",
"rising_sign": "Virgo",
"planets": [
{ "glyph": "☉", "name": "Sun",     "sign": "Taurus",   "degree": "12°", "house": "8" },
{ "glyph": "☽", "name": "Moon",    "sign": "Scorpio",  "degree": "24°", "house": "3" },
{ "glyph": "☿", "name": "Mercury", "sign": "Aries",    "degree": "5°",  "house": "7" },
{ "glyph": "♀", "name": "Venus",   "sign": "Gemini",   "degree": "18°", "house": "9" },
{ "glyph": "♂", "name": "Mars",    "sign": "Cancer",   "degree": "3°",  "house": "10" },
{ "glyph": "♃", "name": "Jupiter", "sign": "Gemini",   "degree": "22°", "house": "9" },
{ "glyph": "♄", "name": "Saturn",  "sign": "Pisces",   "degree": "16°", "house": "6" },
{ "glyph": "♅", "name": "Uranus",  "sign": "Taurus",   "degree": "29°", "house": "8" },
{ "glyph": "♆", "name": "Neptune", "sign": "Pisces",   "degree": "29°", "house": "6" },
{ "glyph": "♇", "name": "Pluto",   "sign": "Aquarius", "degree": "3°",  "house": "5" }
],
"chart_summary": "...",
"big_three_reading": "..."
}
Rules:

Use standard Western tropical astrology calculations for the given birth data.
If time is unknown, omit rising_sign and set it to null. Omit house placements or set them to null.
chart_summary: 3–4 sentences synthesizing the chart as a whole. Poetic, precise.
big_three_reading: 2 sentences focusing on Sun/Moon/Rising dynamics.
### Client Code (`js/birthchart.js`)

```javascript
document.getElementById("birthchart-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const date  = document.getElementById("birth-date").value;
  const time  = document.getElementById("time-unknown").checked ? null : document.getElementById("birth-time").value;
  const place = document.getElementById("birth-place").value;

  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Casting chart...";

  document.getElementById("chart-placeholder").hidden = true;
  document.getElementById("chart-result").hidden = false;

  let userMsg = `Generate a natal birth chart for someone born on ${date}`;
  if (time) userMsg += ` at ${time}`;
  else userMsg += ` (birth time unknown)`;
  if (place) userMsg += ` in ${place}`;
  userMsg += ".";

  try {
    const raw = await callClaude(BIRTHCHART_SYSTEM_PROMPT, userMsg);
    const chart = JSON.parse(raw);

    // Update Big Three
    document.getElementById("b3-sun").textContent    = chart.sun_sign    || "—";
    document.getElementById("b3-moon").textContent   = chart.moon_sign   || "—";
    document.getElementById("b3-rising").textContent = chart.rising_sign || "Unknown";

    // Render SVG chart
    renderNatalChart(chart.planets, chart.rising_sign);

    // Save to localStorage for personalization
    localStorage.setItem("stellar_birth_data", JSON.stringify({ date, time, place, chart }));
    updatePersonalizationBanner(chart);

  } catch (err) {
    console.error("Birth chart error:", err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Generate My Chart →";
  }
});

function renderNatalChart(planets, rising) {
  const svg = document.getElementById("natal-chart-svg");
  const cx = 200, cy = 200, r = 160;

  // Draw outer ring (12 zodiac segments)
  const glyphs = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
  glyphs.forEach((g, i) => {
    const startAngle = (i * 30 - 90) * Math.PI / 180;
    const midAngle   = ((i * 30 + 15) - 90) * Math.PI / 180;
    const endAngle   = ((i + 1) * 30 - 90) * Math.PI / 180;

    // Segment line
    const line = document.createElementNS("http://www.w3.org/2000/svg","line");
    line.setAttribute("x1", cx + (r - 20) * Math.cos(startAngle));
    line.setAttribute("y1", cy + (r - 20) * Math.sin(startAngle));
    line.setAttribute("x2", cx + r * Math.cos(startAngle));
    line.setAttribute("y2", cy + r * Math.sin(startAngle));
    line.setAttribute("stroke","#1E1E1E"); line.setAttribute("stroke-width","0.5");
    svg.appendChild(line);

    // Glyph
    const text = document.createElementNS("http://www.w3.org/2000/svg","text");
    text.setAttribute("x", cx + (r - 10) * Math.cos(midAngle));
    text.setAttribute("y", cy + (r - 10) * Math.sin(midAngle));
    text.setAttribute("text-anchor","middle"); text.setAttribute("dominant-baseline","middle");
    text.setAttribute("fill","#505050"); text.setAttribute("font-size","8");
    text.setAttribute("font-family","IBM Plex Mono, monospace");
    text.textContent = g;
    svg.appendChild(text);
  });

  // Outer and inner circles
  [r, r - 20, 40].forEach(radius => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
    circle.setAttribute("cx", cx); circle.setAttribute("cy", cy);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill","none"); circle.setAttribute("stroke","#1E1E1E");
    circle.setAttribute("stroke-width","0.5");
    svg.appendChild(circle);
  });

  // Planet markers
  planets.forEach(p => {
    // Approximate degree from sign (simplified: sign index × 30 + offset)
    const signIndex = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo",
                       "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"]
                      .indexOf(p.sign);
    const deg = (signIndex * 30 + 15 - 90) * Math.PI / 180;
    const pr  = r - 35;

    const planetText = document.createElementNS("http://www.w3.org/2000/svg","text");
    planetText.setAttribute("x", cx + pr * Math.cos(deg));
    planetText.setAttribute("y", cy + pr * Math.sin(deg));
    planetText.setAttribute("text-anchor","middle"); planetText.setAttribute("dominant-baseline","middle");
    planetText.setAttribute("fill","#C9A84C"); planetText.setAttribute("font-size","9");
    planetText.setAttribute("font-family","IBM Plex Mono, monospace");
    planetText.textContent = p.glyph;
    svg.appendChild(planetText);
  });
}
```

---

## 5. Astro Wardrobe Agent

**File:** `js/wardrobe.js`
**Trigger:** Page load (refreshes with Moon sign change)

### System Prompt
You are the Astro Wardrobe advisor for Stellar — a dark, editorial astrology app. You translate today's planetary energy into specific, actionable wardrobe guidance. You are not vague. You give a real colour, real fabric, real accessory.
Respond ONLY in JSON. No markdown. No preamble. Exactly this shape:
{
"planet_influence": "☽ MOON IN SCORPIO",
"date_line": "SUNDAY 27 APR",
"colour_name": "Deep Burgundy",
"colour_hex": "#4A1040",
"energy_word": "Intense",
"narrative": "...",
"textures": "Velvet · Silk · Heavy Linen",
"avoid": "Pastels · Bright Yellow",
"accessory": "Dark metal · Obsidian",
"refresh_note": "☽ Updates with each Moon sign change",
"timeline": [
{ "day": "YESTERDAY", "glyph": "♀", "energy": "Soft",   "hex": "#C8A4A0" },
{ "day": "TODAY",     "glyph": "☽", "energy": "Intense","hex": "#4A1040" },
{ "day": "TOMORROW",  "glyph": "♂", "energy": "Bold",   "hex": "#8B2020" }
]
}
Rules:

colour_hex must be a valid dark or saturated hex — never pure white or neon.
narrative: 2–3 sentences. Specific to the planetary energy, not generic fashion advice.
textures: comma/dot-separated list of 2–3 specific fabrics.
avoid: 2–3 specific things to avoid wearing today.
timeline yesterday/tomorrow should reflect the preceding and upcoming Moon sign.
### Client Code (`js/wardrobe.js`)

```javascript
async function loadWardrobe() {
  const today = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  const birthData = JSON.parse(localStorage.getItem("stellar_birth_data") || "null");

  let msg = `Today is ${today}. Generate today's Astro Wardrobe recommendation.`;
  if (birthData) msg += ` The user is a ${birthData.chart?.sun_sign} Sun, ${birthData.chart?.moon_sign} Moon.`;

  try {
    const raw = await callClaude(WARDROBE_SYSTEM_PROMPT, msg);
    const data = JSON.parse(raw);

    document.querySelector(".wardrobe-planet-row span").textContent =
      `${data.planet_influence} · ${data.date_line}`;
    document.getElementById("w-colour-name").textContent = data.colour_name;
    document.getElementById("w-swatch").style.background = data.colour_hex;
    document.getElementById("w-narrative").textContent = data.narrative;
    document.getElementById("w-textures").textContent = data.textures;
    document.getElementById("w-avoid").textContent = data.avoid;
    document.getElementById("w-accessory").textContent = data.accessory;

    // Timeline
    const cards = document.querySelectorAll(".timeline-card");
    data.timeline.forEach((t, i) => {
      if (cards[i]) {
        cards[i].querySelector(".timeline-day").textContent    = t.day;
        cards[i].querySelector(".timeline-glyph").textContent  = t.glyph;
        cards[i].querySelector(".timeline-energy").textContent = t.energy;
        cards[i].querySelector(".colour-swatch-sm").style.background = t.hex;
      }
    });
  } catch (err) {
    console.error("Wardrobe error:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadWardrobe);
```

---

## 6. Palmistry Agent

**File:** `js/palmistry.js`
**Trigger:** User clicks "Analyze My Palm →" after uploading an image

### System Prompt
You are the Palmistry reader for Stellar — a dark, editorial astrology app. You are given an image of a human palm. Read the four major lines: Heart Line, Head Line, Life Line, and Fate Line. Your readings are poetic, precise, and personal. You are not a generic chatbot. You are an ancient reader.
Respond ONLY in JSON. No markdown. No preamble. Exactly this shape:
{
"heart_line": "...",
"head_line": "...",
"life_line": "...",
"fate_line": "...",
"synthesis": "...",
"disclaimer": "✦ Palmistry is an interpretive art. Readings are generated by AI for reflection, not prediction."
}
Rules:

Each line reading: 2–3 sentences. Declarative. Personal. Not vague.
synthesis: 2–3 sentences drawing all four lines together into a single narrative.
If the image does not show a clear palm, return: { "error": "NO_PALM_DETECTED", "message": "The image does not show a readable palm. Please upload a clear photograph of your dominant hand, palm facing up." }
Never fabricate details about a person's life. Interpret the lines only in terms of tendencies, energies, and patterns.
### Client Code (`js/palmistry.js`)

```javascript
const uploadArea  = document.getElementById("upload-area");
const palmInput   = document.getElementById("palm-input");
const analyzeBtn  = document.getElementById("analyze-btn");
const palmPreview = document.getElementById("palm-preview");

// Upload area click
uploadArea.addEventListener("click", () => palmInput.click());
uploadArea.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") palmInput.click();
});

// Drag and drop
uploadArea.addEventListener("dragover", e => {
  e.preventDefault(); uploadArea.style.borderColor = "var(--accent)";
});
uploadArea.addEventListener("dragleave", () => {
  uploadArea.style.borderColor = "";
});
uploadArea.addEventListener("drop", e => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) handleFile(file);
});

palmInput.addEventListener("change", () => {
  if (palmInput.files[0]) handleFile(palmInput.files[0]);
});

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    palmPreview.src = e.target.result;
    palmPreview.hidden = false;
    document.getElementById("upload-placeholder").hidden = true;
    analyzeBtn.disabled = false;
    analyzeBtn._imageData = {
      type: file.type,
      data: e.target.result.split(",")[1] // base64
    };
  };
  reader.readAsDataURL(file);
}

analyzeBtn.addEventListener("click", async () => {
  if (!analyzeBtn._imageData) return;
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = "Reading...";

  document.getElementById("palm-reading-placeholder").hidden = true;
  document.getElementById("palm-reading-panel").hidden = false;

  // Loading skeletons
  ["p-heart","p-head","p-life","p-fate"].forEach(id => {
    document.getElementById(id).querySelector(".palm-line-text").innerHTML =
      `<div class="skel-line"></div><div class="skel-line short"></div>`;
  });
  document.getElementById("palm-synthesis").innerHTML =
    `<div class="skel-line"></div><div class="skel-line"></div><div class="skel-line short"></div>`;

  try {
    const raw = await callClaude(
      PALMISTRY_SYSTEM_PROMPT,
      "Read this palm image.",
      analyzeBtn._imageData
    );
    const data = JSON.parse(raw);

    if (data.error === "NO_PALM_DETECTED") {
      document.getElementById("palm-reading-panel").hidden = true;
      document.getElementById("palm-reading-placeholder").hidden = false;
      document.querySelector(".palm-placeholder span").textContent = data.message;
      return;
    }

    document.getElementById("p-heart").querySelector(".palm-line-text").textContent = data.heart_line;
    document.getElementById("p-head").querySelector(".palm-line-text").textContent  = data.head_line;
    document.getElementById("p-life").querySelector(".palm-line-text").textContent  = data.life_line;
    document.getElementById("p-fate").querySelector(".palm-line-text").textContent  = data.fate_line;
    document.getElementById("palm-synthesis").textContent = data.synthesis;

  } catch (err) {
    console.error("Palmistry error:", err);
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = "Analyze My Palm →";
  }
});
```

---

## Error States (All Agents)

| Condition | Response |
|---|---|
| Network/API failure | Show `--text-muted` IBM Plex Mono: `✦ Reading unavailable. Try again.` |
| JSON parse failure | Retry once; if second fails, show same error message |
| Image not a palm (palmistry) | Show `NO_PALM_DETECTED` message from Claude in placeholder panel |
| Missing birth data | Daily/Wardrobe agent proceeds with general chart (no personalization) |
| Form fields empty | Inline form validation in IBM Plex Mono 0.5625rem `--error` below the input |

---

## localStorage Schema

```javascript
// Saved by birth data modal and birth chart form
const STELLAR_BIRTH_DATA = {
  date:  "1995-05-12",           // ISO date string
  time:  "14:30",                // 24h, nullable
  place: "Mumbai, India",        // free text
  chart: {                       // cached from last birth chart API call
    sun_sign:    "Taurus",
    moon_sign:   "Scorpio",
    rising_sign: "Virgo",
    planets:     [/* planet objects */]
  }
};

localStorage.setItem("stellar_birth_data", JSON.stringify(STELLAR_BIRTH_DATA));
```

---

## Notes

- All agents are stateless. No conversation history is sent.
- Birth chart data from `localStorage` is injected into Daily and Wardrobe prompts for personalization — it is never sent to any server.
- JSON parsing always strips markdown fences: `.replace(/```json|```/g, "").trim()`
- The Palmistry agent is the only one that sends image data (base64, `image/*`).
- Rate limiting: add a 500ms debounce on the horoscope sign-click handler to prevent rapid-fire API calls.
- All `aria-live="polite"` reading containers update after API resolution so screen readers announce new content.