document.addEventListener("DOMContentLoaded", () => {
  const compatibilityForm = document.getElementById("compatibility-form");
  const resultCol = document.getElementById("compatibility-result");

  if (!compatibilityForm) return;

  const signNames = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  const elements = {
    "Aries": "Fire", "Leo": "Fire", "Sagittarius": "Fire",
    "Taurus": "Earth", "Virgo": "Earth", "Capricorn": "Earth",
    "Gemini": "Air", "Libra": "Air", "Aquarius": "Air",
    "Cancer": "Water", "Scorpio": "Water", "Pisces": "Water"
  };

  const modalities = {
    "Aries": "Cardinal", "Cancer": "Cardinal", "Libra": "Cardinal", "Capricorn": "Cardinal",
    "Taurus": "Fixed", "Leo": "Fixed", "Scorpio": "Fixed", "Aquarius": "Fixed",
    "Gemini": "Mutable", "Virgo": "Mutable", "Sagittarius": "Mutable", "Pisces": "Mutable"
  };

  // Helper: pseudo-random number generator
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  // Generate chart pseudo-randomly based on date and time
  function generateChart(dateString, timeString) {
    const seed = hashString(dateString + (timeString || "00:00"));
    const sunIndex = seed % 12;
    const sun = signNames[sunIndex];
    const moon = signNames[Math.abs(Math.floor(seed + 4)) % 12];
    
    // Time-based ascendant
    let ascIndex = sunIndex;
    if (timeString) {
      const hours = parseInt(timeString.split(":")[0], 10);
      ascIndex = (sunIndex + Math.floor(hours / 2)) % 12;
    }
    const asc = signNames[ascIndex];

    const venus = signNames[(sunIndex + 1) % 12];
    const mars = signNames[(sunIndex + 2) % 12];

    return { sun, moon, venus, mars, asc };
  }

  // Evaluate relationship between two signs
  function evaluateAspect(signA, signB, planetName) {
    if (signA === signB) {
      return { type: "harmonious", desc: `Conjunction in ${signA}: Powerful alignment of ${planetName} energy.` };
    }

    const elA = elements[signA];
    const elB = elements[signB];
    const modA = modalities[signA];
    const modB = modalities[signB];

    if (elA === elB) {
      return { type: "harmonious", desc: `Trine in ${elA}: Natural flow and shared elemental understanding in ${planetName}.` };
    }

    // Complementary elements (Fire/Air, Earth/Water)
    if ((elA === "Fire" && elB === "Air") || (elA === "Air" && elB === "Fire") ||
        (elA === "Earth" && elB === "Water") || (elA === "Water" && elB === "Earth")) {
      // Oppositions (same modality, complementary element)
      if (modA === modB) {
        return { type: "challenging", desc: `Opposition (${signA}/${signB}): Magnetic polarization and tension in ${planetName}.` };
      }
      return { type: "harmonious", desc: `Sextile: Stimulating and supportive connection in ${planetName}.` };
    }

    // Same modality but not complementary element -> Square
    if (modA === modB) {
      return { type: "challenging", desc: `Square (${modA}): Friction and necessary growth in ${planetName} expression.` };
    }

    // Quincunx or semi-sextile (awkward adjustments)
    return { type: "challenging", desc: `Quincunx (${signA}/${signB}): Requires constant adjustment in ${planetName} dynamics.` };
  }

  compatibilityForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const dateA = document.getElementById("a-birth-date").value;
    const timeA = document.getElementById("a-birth-time").value;
    const dateB = document.getElementById("b-birth-date").value;
    const timeB = document.getElementById("b-birth-time").value;

    if (!dateA || !timeA || !dateB || !timeB) return;

    // Generate Charts
    const chartA = generateChart(dateA, timeA);
    const chartB = generateChart(dateB, timeB);

    // Update UI table
    document.getElementById("syn-a-sun").textContent = chartA.sun.toUpperCase();
    document.getElementById("syn-b-sun").textContent = chartB.sun.toUpperCase();
    document.getElementById("syn-a-moon").textContent = chartA.moon.toUpperCase();
    document.getElementById("syn-b-moon").textContent = chartB.moon.toUpperCase();
    document.getElementById("syn-a-venus").textContent = chartA.venus.toUpperCase();
    document.getElementById("syn-b-venus").textContent = chartB.venus.toUpperCase();
    document.getElementById("syn-a-mars").textContent = chartA.mars.toUpperCase();
    document.getElementById("syn-b-mars").textContent = chartB.mars.toUpperCase();
    document.getElementById("syn-a-asc").textContent = chartA.asc.toUpperCase();
    document.getElementById("syn-b-asc").textContent = chartB.asc.toUpperCase();

    // Evaluate Aspects
    const aspects = [
      evaluateAspect(chartA.sun, chartB.sun, "Core Identity"),
      evaluateAspect(chartA.moon, chartB.moon, "Emotional Needs"),
      evaluateAspect(chartA.venus, chartB.venus, "Love & Affection"),
      evaluateAspect(chartA.mars, chartB.mars, "Drive & Passion"),
      evaluateAspect(chartA.asc, chartB.asc, "Life Approach")
    ];

    const harmoniousList = document.getElementById("harmonious-list");
    const challengingList = document.getElementById("challenging-list");
    harmoniousList.innerHTML = "";
    challengingList.innerHTML = "";

    let harmoniousCount = 0;
    let challengingCount = 0;

    aspects.forEach(aspect => {
      const li = document.createElement("li");
      li.textContent = aspect.desc;
      if (aspect.type === "harmonious") {
        harmoniousList.appendChild(li);
        harmoniousCount++;
      } else {
        challengingList.appendChild(li);
        challengingCount++;
      }
    });

    if (harmoniousCount === 0) harmoniousList.innerHTML = "<li>No major harmonious aspects found in basic placements.</li>";
    if (challengingCount === 0) challengingList.innerHTML = "<li>No major friction points found in basic placements.</li>";

    // Set title based on ratio
    const titleEl = document.getElementById("synastry-title");
    const subEl = document.getElementById("synastry-sub");
    
    if (harmoniousCount > challengingCount + 1) {
      titleEl.textContent = "Flowing Connection";
      subEl.textContent = "The energies naturally align and support each other.";
    } else if (challengingCount > harmoniousCount + 1) {
      titleEl.textContent = "Karmic Friction";
      subEl.textContent = "A challenging dynamic designed for intense growth.";
    } else {
      titleEl.textContent = "Dynamic Balance";
      subEl.textContent = "A mix of easy understanding and necessary friction.";
    }

    const placeholder = document.getElementById("synastry-placeholder");
    if (placeholder) placeholder.hidden = true;

    resultCol.hidden = false;
    resultCol.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
