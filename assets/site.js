(() => {
  const current = document.body.dataset.page;
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    if (link.dataset.pageLink === current) link.setAttribute("aria-current", "page");
  });

  const menuButton = document.querySelector("[data-menu-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");
  menuButton?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
  });
})();
