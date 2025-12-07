const el = document.getElementById("menu-toggle");
if (el) {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.getElementById("menu");
    el.ariaExpanded = target.classList.contains("hidden");
    target.classList.toggle("hidden");
    
    // Adjust gallery main padding when menu opens/closes
    const galleries = document.querySelector(".galleries");
    if (galleries) {
      if (target.classList.contains("hidden")) {
        // Menu is hidden (closed)
        galleries.style.paddingTop = "var(--site-header-height, 120px)";
      } else {
        // Menu is visible (open) - add menu height to padding
        const menuHeight = target.offsetHeight;
        const headerHeight = getComputedStyle(document.documentElement).getPropertyValue('--site-header-height') || '120px';
        galleries.style.paddingTop = 0;
      }
    }
  });
}
