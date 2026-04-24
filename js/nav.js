document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".mobile-menu");
  const hamburger = document.querySelector(".hamburger");
  const close = document.querySelector(".mobile-close");
  const links = document.querySelectorAll(".nav-links a, .mobile-menu a");

  function setMenu(open) {
    menu.classList.toggle("open", open);
    hamburger?.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("modal-open", open);
  }

  hamburger?.addEventListener("click", () => setMenu(true));
  close?.addEventListener("click", () => setMenu(false));
  menu?.addEventListener("click", (event) => {
    if (event.target.matches("a")) setMenu(false);
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
  links.forEach((link) => link.addEventListener("click", () => setMenu(false)));
});
