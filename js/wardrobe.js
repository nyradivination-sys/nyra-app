const WARDROBE_SYSTEM_PROMPT = "You are the Astro Wardrobe advisor for Nyra. Respond only in JSON.";

const PLANETARY_DAYS = [
  { day: 0, name: "Sunday", planet: "Sun", glyph: "☉\uFE0E", colour_name: "Gold & Amber", hex: "#DAA520", narrative: "The Sun demands visibility. Today's energy supports taking up space and being perceived. Dress in a way that feels like the center of gravity.", textures: "Silk, Organza, Structured gold", avoid: "Muted tones, hiding in layers", accessory: "Statement gold pieces, amber rings" },
  { day: 1, name: "Monday", planet: "Moon", glyph: "☽\uFE0E", colour_name: "Silver & White", hex: "#E0E6ED", narrative: "The Moon asks for receptivity and flow. Let your silhouette soften. Today is about intuitive dressing rather than armor.", textures: "Linen, Flowing cotton, Soft knits", avoid: "Rigid structure, heavy synthetics", accessory: "Pearls, silver chains, moonstone" },
  { day: 2, name: "Tuesday", planet: "Mars", glyph: "♂\uFE0E", colour_name: "Crimson & Rust", hex: "#8B0000", narrative: "Mars provides kinetic energy. The atmosphere requires momentum and edge. Your clothing should feel like an active choice, not a default.", textures: "Leather, Denim, Sharp tailoring", avoid: "Overly delicate fabrics, indecisive fits", accessory: "Iron, sharp angles, bold boots" },
  { day: 3, name: "Wednesday", planet: "Mercury", glyph: "☿\uFE0E", colour_name: "Emerald & Mixed Patterns", hex: "#2E8B57", narrative: "Mercury is mutable and communicative. Today favors flexibility, layering, and pieces that can transition easily as the day shifts.", textures: "Breathable cotton, Plaid, Mixed textiles", avoid: "Monolithic heavy outfits", accessory: "Layered necklaces, practical bags, agate" },
  { day: 4, name: "Thursday", planet: "Jupiter", glyph: "♃\uFE0E", colour_name: "Royal Blue & Indigo", hex: "#4169E1", narrative: "Jupiter expands whatever it touches. There is an atmosphere of abundance. Lean into rich colors and generous, comfortable silhouettes.", textures: "Velvet, Rich wool, Drapey fabrics", avoid: "Constricting garments, scarcity mindset in styling", accessory: "Amethyst, large pendants, lapis lazuli" },
  { day: 5, name: "Friday", planet: "Venus", glyph: "♀\uFE0E", colour_name: "Rose & Soft Pastels", hex: "#D8BFD8", narrative: "Venus harmonizes. The focus is on aesthetic pleasure and tactile comfort. Let your clothing feel good against the skin.", textures: "Silk, Lace, Cashmere", avoid: "Harsh lines, abrasive materials", accessory: "Copper, rose quartz, elegant symmetry" },
  { day: 6, name: "Saturday", planet: "Saturn", glyph: "♄\uFE0E", colour_name: "Onyx & Charcoal", hex: "#2F4F4F", narrative: "Saturn deals in boundaries and endurance. The energy is serious and grounded. Choose pieces that feel protective, classic, and structurally sound.", textures: "Heavy wool, Stiff denim, Gabardine", avoid: "Frivolous trends, flimsy layers", accessory: "Antique silver, obsidian, heirlooms" }
];

async function loadWardrobe() {
  const today = new Date();
  const dayIndex = today.getDay();
  const current = PLANETARY_DAYS[dayIndex];
  
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
  const dateLine = today.toLocaleDateString("en-US", dateOptions).toUpperCase();

  document.querySelector(".wardrobe-planet-row span").textContent = `${current.glyph} ${current.planet.toUpperCase()} DAY · ${dateLine}`;
  document.getElementById("w-colour-name").textContent = current.colour_name;
  document.getElementById("w-swatch").style.background = current.hex;
  document.getElementById("w-narrative").textContent = current.narrative;
  document.getElementById("w-textures").textContent = current.textures;
  document.getElementById("w-avoid").textContent = current.avoid;
  document.getElementById("w-accessory").textContent = current.accessory;

  // Build timeline for next 3 days
  let timelineHtml = "";
  for (let i = 0; i < 3; i++) {
    let nextDate = new Date();
    nextDate.setDate(today.getDate() + i);
    let pd = PLANETARY_DAYS[nextDate.getDay()];
    let dayLabel = i === 0 ? "TODAY" : pd.name.toUpperCase().substring(0, 3);
    timelineHtml += `<div class="timeline-card ${i === 0 ? "active" : ""}"><span class="timeline-day">${dayLabel}</span><span class="timeline-glyph">${pd.glyph}</span><span class="timeline-energy">${pd.planet}</span><div class="colour-swatch-sm" style="background:${pd.hex}"></div></div>`;
  }
  document.getElementById("wardrobe-timeline").innerHTML = timelineHtml;
}

document.addEventListener("DOMContentLoaded", loadWardrobe);

