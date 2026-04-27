# Stellar

A static dark editorial astrology app based on `agent.md` and `frontend.md`.

## Run

```bash
python3 -m http.server 5173
```

Open `http://127.0.0.1:5173/`.

## Notes

- The app works locally with built-in fallback readings, tarot cards, horoscope copy, wardrobe guidance, palmistry interpretation, and birth-chart rendering.
- `js/api.js` includes the Claude `/v1/messages` helper from the spec. If `localStorage.stellar_anthropic_key` is set, modules attempt Claude calls and fall back gracefully on failure.
- Birth data is stored only in `localStorage` under `stellar_birth_data`.
