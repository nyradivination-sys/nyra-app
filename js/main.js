function formatDateLine() {
  const now = new Date();
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const day = String(now.getDate()).padStart(2, "0");
  const month = now.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
  return `${weekday} · ${day} ${month} ${now.getFullYear()} · ☉\uFE0E IN TAURUS`;
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((item) => observer.observe(item));
}

function getBirthData() {
  try {
    return JSON.parse(localStorage.getItem("stellar_birth_data") || "null");
  } catch {
    return null;
  }
}

function getSignFromDate(dateString) {
  if (!dateString) return "Taurus";
  const date = new Date(`${dateString}T12:00:00`);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const ranges = [
    ["Capricorn", 1, 19], ["Aquarius", 2, 18], ["Pisces", 3, 20], ["Aries", 4, 19],
    ["Taurus", 5, 20], ["Gemini", 6, 20], ["Cancer", 7, 22], ["Leo", 8, 22],
    ["Virgo", 9, 22], ["Libra", 10, 22], ["Scorpio", 11, 21], ["Sagittarius", 12, 21], ["Capricorn", 12, 31]
  ];
  return ranges.find(([, m, d]) => month < m || (month === m && day <= d))?.[0] || "Capricorn";
}

function updatePersonalizationBanner(chart) {
  const banner = document.getElementById("personal-banner");
  if (!banner || !chart) return;
  banner.textContent = `☉\uFE0E Reading for: ${chart.sun_sign} Sun · ${chart.moon_sign} Moon · ${chart.rising_sign || "Unknown"} Rising`;
  banner.hidden = false;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hero-date").forEach((el) => {
    el.textContent = formatDateLine();
  });
  initReveal();
  const saved = getBirthData();
  if (saved?.chart) updatePersonalizationBanner(saved.chart);
});
