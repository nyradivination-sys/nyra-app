const DAILY_SYSTEM_PROMPT = "You are a poetic astrology interpreter for Nyra. Respond only in JSON.";

async function loadDailyReadings() {
  const data = {
    date_line: formatDateLine(),
    planet_positions: STELLAR.planets.filter((p) => p.name !== "MERCURY"),
    readings: STELLAR.dailyReadings
  };

  document.querySelector(".hero-date").textContent = data.date_line || formatDateLine();
  document.querySelector(".planet-bar").innerHTML = data.planet_positions
    .map((p) => `<div class="planet-cell"><span class="glyph">${p.glyph}</span><span>${p.name} · ${p.sign}</span></div>`)
    .join("");

  document.querySelector(".domain-grid").innerHTML = data.readings
    .map(
      (reading) => `
        <article class="domain-card reveal visible" data-domain="${reading.domain}">
          <span class="domain-label">${reading.domain}</span>
          <p class="domain-reading">${reading.text}</p>
          <span class="domain-source">${reading.source}</span>
        </article>
      `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", loadDailyReadings);
