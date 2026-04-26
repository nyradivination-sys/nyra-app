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
