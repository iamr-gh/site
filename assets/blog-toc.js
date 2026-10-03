(() => {
  const toggleButton = document.getElementById("toc-toggle");
  const closeButton = document.getElementById("toc-close-btn");
  const menuIcon = document.getElementById("toc-menu-icon");
  const closeIcon = document.getElementById("toc-close-icon");
  const overlay = document.getElementById("toc-overlay");
  const panel = document.getElementById("mobile-toc-panel");

  if (!toggleButton || !overlay || !panel) return;

  const setOpen = (open) => {
    toggleButton.setAttribute("aria-expanded", String(open));
    if (menuIcon) menuIcon.hidden = open;
    if (closeIcon) closeIcon.hidden = !open;
    overlay.hidden = !open;
    panel.classList.toggle("translate-x-full", !open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggleButton.addEventListener("click", () => {
    setOpen(toggleButton.getAttribute("aria-expanded") !== "true");
  });
  closeButton?.addEventListener("click", () => setOpen(false));
  overlay.addEventListener("click", () => setOpen(false));
  panel.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  setOpen(false);
})();
