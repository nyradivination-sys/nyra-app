const HOROSCOPE_RSS_URL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.astrology.com%2Fus%2Foffsite%2Frss%2Fdaily-extended.aspx";

let horoscopeCache = null;

async function fetchHoroscopes() {
  if (horoscopeCache) return horoscopeCache;
  try {
    const response = await fetch(HOROSCOPE_RSS_URL);
    const data = await response.json();
    if (data.status === "ok") {
      horoscopeCache = data.items;
      return horoscopeCache;
    }
  } catch (e) {
    console.error("Failed to fetch horoscopes:", e);
  }
  return null;
}

function extractHoroscopeText(htmlContent) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  return doc.body.textContent || "";
}

async function renderHoroscope(signName) {
  const item = STELLAR.signs.find((s) => s.sign === signName) || STELLAR.signs[1];
  
  document.getElementById("horoscope-panel").hidden = false;
  document.getElementById("horoscope-sign-name").innerHTML = `<em>${item.sign}</em>`;
  document.getElementById("horoscope-glyph").textContent = item.glyph;
  document.getElementById("horoscope-dates").textContent = item.dates;
  document.getElementById("horoscope-ruler").textContent = item.ruler;

  document.getElementById("horoscope-main").textContent = "Consulting the stars...";
  document.getElementById("h-love").textContent = "";
  document.getElementById("h-work").textContent = "";
  document.getElementById("h-body").textContent = "";

  const items = await fetchHoroscopes();
  let mainText = `${item.sign}, the atmosphere asks you to stop negotiating with what has already become obvious. A practical choice carries more power than a dramatic declaration.`;
  
  if (items) {
    const signItem = items.find(i => i.title.toLowerCase().includes(item.sign.toLowerCase()));
    if (signItem) {
      mainText = extractHoroscopeText(signItem.description);
    }
  }

  document.getElementById("horoscope-main").textContent = mainText;
  document.getElementById("h-love").textContent = "Affection becomes cleaner when it is not auditioning. Ask for what is real.";
  document.getElementById("h-work").textContent = "A delayed answer is still information. Build around the fact in front of you.";
  document.getElementById("h-body").textContent = "Your nervous system wants fewer inputs. Give it silence before explanation.";
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("zodiac-grid");
  grid.innerHTML = STELLAR.signs
    .map((item) => `<button class="zodiac-cell" type="button" data-sign="${item.sign}"><span class="zodiac-glyph">${item.glyph}</span><span class="zodiac-name">${item.sign}</span></button>`)
    .join("");

  let locked = false;
  grid.addEventListener("click", async (event) => {
    const cell = event.target.closest(".zodiac-cell");
    if (!cell || locked) return;
    locked = true;
    setTimeout(() => {
      locked = false;
    }, 500);

    document.querySelectorAll(".zodiac-cell").forEach((c) => c.classList.remove("active"));
    cell.classList.add("active");

    await renderHoroscope(cell.dataset.sign);
  });
});

