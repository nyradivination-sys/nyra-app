const BIRTHCHART_SYSTEM_PROMPT = "You are an expert astrologer for Nyra. Respond only in JSON.";
const signNames = STELLAR.signs.map((s) => s.sign);

function generateLocalChart(date, time) {
  const sun = getSignFromDate(date);
  const seed = date ? new Date(`${date}T12:00:00`).getTime() / 86400000 : 42;
  const moon = signNames[Math.abs(Math.floor(seed + 4)) % 12];
  const rising = time ? signNames[Math.abs(Math.floor(Number(time.split(":")[0]) + seed)) % 12] : null;
  const planetNames = [
    ["☉\uFE0E", "Sun", sun], ["☽\uFE0E", "Moon", moon], ["☿\uFE0E", "Mercury", signNames[(signNames.indexOf(sun) + 11) % 12]],
    ["♀\uFE0E", "Venus", signNames[(signNames.indexOf(sun) + 1) % 12]], ["♂\uFE0E", "Mars", signNames[(signNames.indexOf(sun) + 2) % 12]],
    ["♃\uFE0E", "Jupiter", "Gemini"], ["♄\uFE0E", "Saturn", "Pisces"], ["♅\uFE0E", "Uranus", "Taurus"], ["♆\uFE0E", "Neptune", "Pisces"], ["♇\uFE0E", "Pluto", "Aquarius"]
  ];
  const planets = planetNames.map(([glyph, name, sign], index) => ({
    glyph,
    name,
    sign,
    degree: `${Math.abs(Math.floor(seed + index * 7)) % 30}°`,
    house: time ? String((index % 12) + 1) : null
  }));
  return {
    sun_sign: sun,
    moon_sign: moon,
    rising_sign: rising,
    planets,
    chart_summary: "This chart is drawn as an interpretive local casting for reflection. Its center of gravity is steadiness under pressure, with instinct asking for more room than habit usually allows. The pattern favors small promises kept with unusual seriousness.",
    big_three_reading: `${sun} Sun gives the life a clear appetite for embodiment. ${moon} Moon and ${rising || "an unknown"} Rising describe the private weather around that desire.`
  };
}

function renderNatalChart(planets) {
  const svg = document.getElementById("natal-chart-svg");
  svg.innerHTML = "";
  const cx = 200;
  const cy = 200;
  const r = 160;
  STELLAR.signs.forEach((sign, i) => {
    const start = ((i * 30) - 90) * Math.PI / 180;
    const mid = ((i * 30 + 15) - 90) * Math.PI / 180;
    svg.insertAdjacentHTML("beforeend", `<line x1="${cx + (r - 20) * Math.cos(start)}" y1="${cy + (r - 20) * Math.sin(start)}" x2="${cx + r * Math.cos(start)}" y2="${cy + r * Math.sin(start)}" stroke="#d0ccc4" stroke-width="0.8"/>`);
    svg.insertAdjacentHTML("beforeend", `<text x="${cx + (r - 10) * Math.cos(mid)}" y="${cy + (r - 10) * Math.sin(mid)}" text-anchor="middle" dominant-baseline="middle" fill="#e8e4dc" font-size="10" font-family="IBM Plex Mono, monospace">${sign.glyph}</text>`);
  });
  [r, r - 20, 70, 40].forEach((radius) => {
    svg.insertAdjacentHTML("beforeend", `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#d0ccc4" stroke-width="0.8"/>`);
  });
  planets.forEach((p, index) => {
    const signIndex = signNames.indexOf(p.sign);
    const degree = parseInt(p.degree, 10) || 15;
    const angle = ((signIndex * 30 + degree) - 90) * Math.PI / 180;
    const pr = r - 38 - (index % 3) * 10;
    svg.insertAdjacentHTML("beforeend", `<text x="${cx + pr * Math.cos(angle)}" y="${cy + pr * Math.sin(angle)}" text-anchor="middle" dominant-baseline="middle" fill="#C9A84C" font-size="12" font-family="IBM Plex Mono, monospace">${p.glyph}</text>`);
    if (index % 2 === 0) {
      svg.insertAdjacentHTML("beforeend", `<line x1="${cx}" y1="${cy}" x2="${cx + (pr - 20) * Math.cos(angle)}" y2="${cy + (pr - 20) * Math.sin(angle)}" stroke="#b0aba3" stroke-width="0.6"/>`);
    }
  });
}

function renderChart(chart) {
  document.getElementById("chart-placeholder").hidden = true;
  document.getElementById("chart-result").hidden = false;
  document.getElementById("b3-sun").textContent = chart.sun_sign || "-";
  document.getElementById("b3-moon").textContent = chart.moon_sign || "-";
  document.getElementById("b3-rising").textContent = chart.rising_sign || "Unknown";
  renderNatalChart(chart.planets || []);
  document.getElementById("planet-table").innerHTML = (chart.planets || [])
    .map((p) => `<div class="planet-row"><span>${p.glyph}</span><span>${p.name}</span><span>${p.sign}</span><span>${p.degree || "-"}</span><span>${p.house || "-"}</span></div>`)
    .join("");
  document.getElementById("chart-summary").textContent = chart.chart_summary || chart.big_three_reading || "";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("birthchart-form");
  const timeUnknown = document.getElementById("time-unknown");
  const timeInput = document.getElementById("birth-time");

  timeUnknown.addEventListener("change", () => {
    timeInput.disabled = timeUnknown.checked;
    if (timeUnknown.checked) timeInput.value = "";
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const date = document.getElementById("birth-date").value;
    const time = timeUnknown.checked ? null : timeInput.value;
    const place = document.getElementById("birth-place").value;
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "Casting chart...";
    const chart = generateLocalChart(date, time);
    try {
      renderChart(chart);
      localStorage.setItem("stellar_birth_data", JSON.stringify({ date, time, place, chart }));
      updatePersonalizationBanner(chart);
    } finally {
      button.disabled = false;
      button.textContent = "Generate My Chart →";
    }
  });
});

/**
 * Place Autocomplete — powered by OpenStreetMap Nominatim (no API key needed)
 * Attaches to any <input> with data-place-autocomplete attribute.
 * Locks the parent <form> submit unless a suggestion has been selected.
 */
(function () {
  'use strict';

  const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
  const DEBOUNCE_MS = 320;

  function debounce(fn, ms) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  }

  function initAutocomplete(input) {
    // Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'place-autocomplete';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    // Dropdown list
    const list = document.createElement('ul');
    list.className = 'place-suggestions';
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    wrapper.appendChild(list);

    let selectedPlace = null;   // {display_name, lat, lon} when user picks
    let activeIndex = -1;
    let lastQuery = '';

    // Mark form as needing a selection
    const form = input.closest('form');
    if (form) {
      form.dataset.placeReady = 'false';
      form.addEventListener('submit', (e) => {
        if (form.dataset.placeReady !== 'true') {
          e.preventDefault();
          e.stopImmediatePropagation();
          input.focus();
          showError('Please select a city from the suggestions.');
        }
      }, true);
    }

    function showError(msg) {
      let err = wrapper.querySelector('.place-error');
      if (!err) {
        err = document.createElement('p');
        err.className = 'place-error';
        wrapper.appendChild(err);
      }
      err.textContent = msg;
      err.hidden = false;
      setTimeout(() => { err.hidden = true; }, 3000);
    }

    function clearError() {
      const err = wrapper.querySelector('.place-error');
      if (err) err.hidden = true;
    }

    function setItems(places) {
      list.innerHTML = '';
      activeIndex = -1;
      if (!places.length) { list.hidden = true; return; }

      places.forEach((place, i) => {
        const li = document.createElement('li');
        li.className = 'place-suggestion-item';
        li.setAttribute('role', 'option');
        li.setAttribute('id', `psi-${i}`);
        li.textContent = place.display_name;
        li.addEventListener('mousedown', (e) => {
          e.preventDefault();
          selectPlace(place);
        });
        list.appendChild(li);
      });

      list.hidden = false;
    }

    function selectPlace(place) {
      selectedPlace = place;
      input.value = place.display_name;
      input.dataset.lat = place.lat;
      input.dataset.lon = place.lon;
      if (form) form.dataset.placeReady = 'true';
      list.hidden = true;
      clearError();
    }

    function highlightItem(index) {
      const items = list.querySelectorAll('.place-suggestion-item');
      items.forEach((el, i) => el.classList.toggle('active', i === index));
      if (items[index]) {
        input.setAttribute('aria-activedescendant', items[index].id);
        items[index].scrollIntoView({ block: 'nearest' });
      }
    }

    const fetchSuggestions = debounce(async (query) => {
      if (query.length < 2) { list.hidden = true; return; }
      if (query === lastQuery) return;
      lastQuery = query;

      try {
        const url = `${NOMINATIM}?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=6`;
        const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
        const data = await res.json();
        setItems(data);
      } catch {
        list.hidden = true;
      }
    }, DEBOUNCE_MS);

    input.addEventListener('input', () => {
      // User is typing again → unselect any previously chosen place
      selectedPlace = null;
      if (form) form.dataset.placeReady = 'false';
      fetchSuggestions(input.value.trim());
    });

    input.addEventListener('keydown', (e) => {
      const items = list.querySelectorAll('.place-suggestion-item');
      if (list.hidden || !items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
        highlightItem(activeIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        highlightItem(activeIndex);
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        items[activeIndex].dispatchEvent(new Event('mousedown'));
      } else if (e.key === 'Escape') {
        list.hidden = true;
        activeIndex = -1;
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) list.hidden = true;
    });

    input.setAttribute('autocomplete', 'off');
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-haspopup', 'listbox');
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-place-autocomplete]').forEach(initAutocomplete);
  });
})();
