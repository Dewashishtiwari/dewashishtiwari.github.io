(() => {
  const root = document.documentElement;
  root.classList.add("js");
  let storedTheme = null;
  try { storedTheme = localStorage.getItem("dt-theme"); } catch {}
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = storedTheme || (prefersDark ? "dark" : "light");

  const themeButton = document.querySelector("[data-theme-toggle]");
  const syncThemeLabel = () => {
    if (!themeButton) return;
    const isDark = root.dataset.theme === "dark";
    themeButton.textContent = isDark ? "Light" : "Dark";
    themeButton.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
  };
  syncThemeLabel();

  themeButton?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("dt-theme", root.dataset.theme); } catch {}
    syncThemeLabel();
  });

  const menuButton = document.querySelector("[data-menu-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");
  menuButton?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
  });

  const current = document.body.dataset.page;
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    if (link.dataset.pageLink === current) link.setAttribute("aria-current", "page");
  });

  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach((element) => observer.observe(element));
})();
