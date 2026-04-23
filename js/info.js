function renderInfo(tab = "zodiac") {
  const target = document.getElementById("info-content");
  if (tab === "zodiac") {
    target.innerHTML = `<div class="library-grid">${STELLAR.signs.map((s) => `<article class="library-card"><span class="library-glyph">${s.glyph}</span><h3>${s.sign}</h3><span class="library-meta">${s.element} · ${s.quality}</span><p>${s.ruler}<br>${s.dates}</p></article>`).join("")}</div>`;
  }
  if (tab === "tarot") {
    target.innerHTML = `<div class="library-grid">${STELLAR.tarot.map((c) => `<article class="library-card"><span class="library-meta">${c.card_number}</span><h3>${c.card_name}</h3><p>${c.keywords.join(" · ")}</p></article>`).join("")}</div>`;
  }
  if (tab === "planets") {
    const houses = ["Self", "Value", "Speech", "Home", "Pleasure", "Ritual", "Partnership", "Depth", "Meaning", "Work", "Community", "Mystery"];
    target.innerHTML = `<div class="library-two-col"><div>${STELLAR.planets.map((p) => `<article class="library-row"><span class="library-meta">${p.glyph} ${p.name}</span><h3>${p.sign}</h3><p>Rulership, motion, appetite, timing.</p></article>`).join("")}</div><div>${houses.map((h, i) => `<article class="library-row"><span class="library-meta">HOUSE ${i + 1}</span><h3>${h}</h3><p>The part of life where the chart becomes lived.</p></article>`).join("")}</div></div>`;
  }
  if (tab === "aspects") {
    const aspects = [
      ["☌", "Conjunction", "Fusion", "Two forces occupying the same room."],
      ["☍", "Opposition", "Polarity", "A mirror that demands integration."],
      ["△", "Trine", "Flow", "Talent moving with little friction."],
      ["□", "Square", "Pressure", "The productive ache of growth."],
      ["⚹", "Sextile", "Invitation", "Opportunity that still requires a hand on the door."]
    ];
    target.innerHTML = `<div class="library-grid">${aspects.map((a) => `<article class="library-card"><span class="library-glyph">${a[0]}</span><h3>${a[1]}</h3><span class="library-meta">${a[2]}</span><p>${a[3]}</p></article>`).join("")}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderInfo("zodiac");
  document.querySelector(".info-tabs").addEventListener("click", (event) => {
    const tab = event.target.closest(".info-tab");
    if (!tab) return;
    document.querySelectorAll(".info-tab").forEach((button) => button.classList.remove("active"));
    tab.classList.add("active");
    renderInfo(tab.dataset.tab);
  });
});
