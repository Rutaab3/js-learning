(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeIcon = document.querySelector("[data-theme-icon]");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-bs-theme", theme === "dark" ? "dark" : "light");

    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "light_mode" : "dark_mode";
    }
  }

  function resolveTheme() {
    const storedTheme = window.localStorage.getItem("notes-live-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    return prefersDark.matches ? "dark" : "light";
  }

  applyTheme(resolveTheme());

  themeToggle?.addEventListener("click", function () {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    window.localStorage.setItem("notes-live-theme", nextTheme);
    applyTheme(nextTheme);
  });

  prefersDark.addEventListener("change", function (event) {
    if (!window.localStorage.getItem("notes-live-theme")) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });

  const activeSidebarLink = document.querySelector(".sidebar-link.is-active");
  activeSidebarLink?.scrollIntoView({ block: "nearest" });

  if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.from(".topbar-inner", {
      duration: 0.45,
      ease: "power2.out",
      opacity: 0,
      y: -18,
    });

    gsap.from(".sidebar-link", {
      duration: 0.35,
      ease: "power2.out",
      opacity: 0,
      x: -10,
      stagger: 0.03,
      delay: 0.12,
    });

    gsap.from(".reveal-card", {
      duration: 0.55,
      ease: "power2.out",
      opacity: 0,
      y: 22,
      stagger: 0.08,
      delay: 0.18,
    });
  }
})();
