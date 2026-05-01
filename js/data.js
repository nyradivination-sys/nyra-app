const STELLAR = {
  signs: [
    { sign: "Aries", glyph: "♈\uFE0E", dates: "MAR 21 - APR 19", ruler: "RULER: ♂\uFE0E MARS", element: "FIRE", quality: "CARDINAL" },
    { sign: "Taurus", glyph: "♉\uFE0E", dates: "APR 20 - MAY 20", ruler: "RULER: ♀\uFE0E VENUS", element: "EARTH", quality: "FIXED" },
    { sign: "Gemini", glyph: "♊\uFE0E", dates: "MAY 21 - JUN 20", ruler: "RULER: ☿\uFE0E MERCURY", element: "AIR", quality: "MUTABLE" },
    { sign: "Cancer", glyph: "♋\uFE0E", dates: "JUN 21 - JUL 22", ruler: "RULER: ☽\uFE0E MOON", element: "WATER", quality: "CARDINAL" },
    { sign: "Leo", glyph: "♌\uFE0E", dates: "JUL 23 - AUG 22", ruler: "RULER: ☉\uFE0E SUN", element: "FIRE", quality: "FIXED" },
    { sign: "Virgo", glyph: "♍\uFE0E", dates: "AUG 23 - SEP 22", ruler: "RULER: ☿\uFE0E MERCURY", element: "EARTH", quality: "MUTABLE" },
    { sign: "Libra", glyph: "♎\uFE0E", dates: "SEP 23 - OCT 22", ruler: "RULER: ♀\uFE0E VENUS", element: "AIR", quality: "CARDINAL" },
    { sign: "Scorpio", glyph: "♏\uFE0E", dates: "OCT 23 - NOV 21", ruler: "RULER: ♇\uFE0E PLUTO", element: "WATER", quality: "FIXED" },
    { sign: "Sagittarius", glyph: "♐\uFE0E", dates: "NOV 22 - DEC 21", ruler: "RULER: ♃\uFE0E JUPITER", element: "FIRE", quality: "MUTABLE" },
    { sign: "Capricorn", glyph: "♑\uFE0E", dates: "DEC 22 - JAN 19", ruler: "RULER: ♄\uFE0E SATURN", element: "EARTH", quality: "CARDINAL" },
    { sign: "Aquarius", glyph: "♒\uFE0E", dates: "JAN 20 - FEB 18", ruler: "RULER: ♅\uFE0E URANUS", element: "AIR", quality: "FIXED" },
    { sign: "Pisces", glyph: "♓\uFE0E", dates: "FEB 19 - MAR 20", ruler: "RULER: ♆\uFE0E NEPTUNE", element: "WATER", quality: "MUTABLE" }
  ],
  planets: [
    { glyph: "☉\uFE0E", name: "SUN", sign: "TAURUS" },
    { glyph: "☽\uFE0E", name: "MOON", sign: "SCORPIO" },
    { glyph: "☿\uFE0E", name: "MERCURY", sign: "ARIES" },
    { glyph: "♀\uFE0E", name: "VENUS", sign: "GEMINI" },
    { glyph: "♂\uFE0E", name: "MARS", sign: "CANCER" },
    { glyph: "♃\uFE0E", name: "JUPITER", sign: "GEMINI" },
    { glyph: "♄\uFE0E", name: "SATURN", sign: "PISCES" }
  ],
  dailyReadings: [
    { domain: "SELF", text: "You are negotiating with a truth that refuses ornament. Let the unvarnished answer stand in the room.", source: "☉\uFE0E Sun in Taurus" },
    { domain: "THINKING", text: "Your mind cuts quickly through performance. Use that edge for discernment, not punishment.", source: "☿\uFE0E Mercury in Aries" },
    { domain: "EMOTIONS", text: "Feeling deepens where you stop explaining it. The private tide has its own intelligence.", source: "☽\uFE0E Moon in Scorpio" },
    { domain: "THE UNCONSCIOUS", text: "An old symbol returns with new teeth. Notice the dream, the repeated phrase, the closed door.", source: "♆\uFE0E Neptune in Pisces" },
    { domain: "RELATIONSHIPS", text: "Connection asks for language precise enough to hold desire. Say the thing cleanly.", source: "♀\uFE0E Venus in Gemini" },
    { domain: "WORK", text: "Progress comes through protection of your attention. The urgent noise is not the assignment.", source: "♂\uFE0E Mars in Cancer" },
    { domain: "GROWTH", text: "Expansion arrives as a conversation you did not plan. Follow the sentence that makes you braver.", source: "♃\uFE0E Jupiter in Gemini" },
    { domain: "SPIRITUALITY", text: "Devotion becomes practical. Keep the ritual small enough to survive ordinary life.", source: "♄\uFE0E Saturn in Pisces" }
  ],
  tarot: [
    { card_number: "0", card_name: "The Fool", keywords: ["BEGINNING", "RISK", "TRUST"], element: "AIR", ruling_planet: "♅\uFE0E Uranus" },
    { card_number: "I", card_name: "The Magician", keywords: ["WILL", "VOICE", "MASTERY"], element: "AIR", ruling_planet: "☿\uFE0E Mercury" },
    { card_number: "II", card_name: "The High Priestess", keywords: ["SECRECY", "INTUITION", "THRESHOLD"], element: "WATER", ruling_planet: "☽\uFE0E Moon" },
    { card_number: "III", card_name: "The Empress", keywords: ["BODY", "PLEASURE", "CREATION"], element: "EARTH", ruling_planet: "♀\uFE0E Venus" },
    { card_number: "IV", card_name: "The Emperor", keywords: ["ORDER", "AUTHORITY", "STRUCTURE"], element: "FIRE", ruling_planet: "♂\uFE0E Mars" },
    { card_number: "VI", card_name: "The Lovers", keywords: ["CHOICE", "MIRROR", "DESIRE"], element: "AIR", ruling_planet: "☿\uFE0E Mercury" },
    { card_number: "VIII", card_name: "Strength", keywords: ["COURAGE", "PATIENCE", "HEART"], element: "FIRE", ruling_planet: "☉\uFE0E Sun" },
    { card_number: "X", card_name: "Wheel of Fortune", keywords: ["CYCLE", "TURNING", "FATE"], element: "FIRE", ruling_planet: "♃\uFE0E Jupiter" },
    { card_number: "XIII", card_name: "Death", keywords: ["ENDING", "RELEASE", "TRUTH"], element: "WATER", ruling_planet: "♇\uFE0E Pluto" },
    { card_number: "XVIII", card_name: "The Moon", keywords: ["ILLUSION", "INSTINCT", "DREAMS"], element: "WATER", ruling_planet: "☽\uFE0E Moon" },
    { card_number: "XIX", card_name: "The Sun", keywords: ["CLARITY", "JOY", "EXPOSURE"], element: "FIRE", ruling_planet: "☉\uFE0E Sun" },
    { card_number: "ACE OF CUPS", card_name: "Ace of Cups", keywords: ["OPENING", "FEELING", "RECEIVING"], element: "WATER", ruling_planet: "☽\uFE0E Moon" },
    { card_number: "THREE OF SWORDS", card_name: "Three of Swords", keywords: ["GRIEF", "HONESTY", "REPAIR"], element: "AIR", ruling_planet: "♄\uFE0E Saturn" },
    { card_number: "QUEEN OF PENTACLES", card_name: "Queen of Pentacles", keywords: ["CARE", "MATERIAL", "DEVOTION"], element: "EARTH", ruling_planet: "♀\uFE0E Venus" }
  ],
  wardrobe: {
    planet_influence: "☽\uFE0E MOON IN SCORPIO",
    date_line: "SUNDAY 26 APR",
    colour_name: "Deep Burgundy",
    colour_hex: "#4A1040",
    narrative: "Scorpio's depth asks your presentation to become quieter and more deliberate. Rich saturated color gives the body a sense of gravity. Choose one severe detail and let everything else recede.",
    textures: "Velvet · Silk · Heavy Linen",
    avoid: "Pastels · Bright Yellow · Thin synthetics",
    accessory: "Dark metal · Obsidian",
    timeline: [
      { day: "YESTERDAY", glyph: "♀\uFE0E", energy: "Soft", hex: "#6F4D57" },
      { day: "TODAY", glyph: "☽\uFE0E", energy: "Intense", hex: "#4A1040" },
      { day: "TOMORROW", glyph: "♂\uFE0E", energy: "Bold", hex: "#8B2020" }
    ]
  }
};
