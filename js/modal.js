document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("birth-modal");
  const form = document.getElementById("birth-modal-form");
  const openButtons = [document.getElementById("birth-data-btn"), document.getElementById("birth-data-mobile-btn")];
  const closeButton = document.getElementById("modal-close");
  const timeUnknown = document.getElementById("modal-time-unknown");
  const timeInput = document.getElementById("modal-birth-time");

  function openModal() {
    const saved = getBirthData();
    if (saved) {
      document.getElementById("modal-birth-date").value = saved.date || "";
      document.getElementById("modal-birth-time").value = saved.time || "";
      document.getElementById("modal-birth-place").value = saved.place || "";
      timeUnknown.checked = !saved.time;
      timeInput.disabled = !saved.time;
    }
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  openButtons.forEach((button) => button?.addEventListener("click", openModal));
  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
  timeUnknown.addEventListener("change", () => {
    timeInput.disabled = timeUnknown.checked;
    if (timeUnknown.checked) timeInput.value = "";
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const date = document.getElementById("modal-birth-date").value;
    const time = timeUnknown.checked ? null : timeInput.value;
    const place = document.getElementById("modal-birth-place").value;
    const chart = generateLocalChart(date, time);
    localStorage.setItem("stellar_birth_data", JSON.stringify({ date, time, place, chart }));
    updatePersonalizationBanner(chart);
    closeModal();
  });
});
