(() => {
  const posts = [...document.querySelectorAll(".post-item")];
  const filterButtons = [...document.querySelectorAll("#tag-filters [data-tag]")];
  const clearButton = document.getElementById("clear-tags");
  const noResults = document.getElementById("no-results");

  if (!posts.length || !filterButtons.length) return;

  const setFilter = (tag = "") => {
    let visibleCount = 0;

    for (const post of posts) {
      const tags = (post.dataset.tags || "").split(/\s+/).filter(Boolean);
      const visible = tag === "" || tags.includes(tag);
      post.hidden = !visible;
      if (visible) visibleCount += 1;
    }

    for (const button of filterButtons) {
      const active = button.dataset.tag === tag;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("active", active);
      button.classList.toggle("bg-primary", active);
      button.classList.toggle("text-primary-foreground", active);
      button.classList.toggle("bg-secondary", !active);
      button.classList.toggle("text-secondary-foreground", !active);
    }

    if (noResults) noResults.hidden = visibleCount !== 0;
  };

  for (const button of filterButtons) {
    button.addEventListener("click", () => setFilter(button.dataset.tag || ""));
  }

  clearButton?.addEventListener("click", () => setFilter(""));
  setFilter("");
})();
