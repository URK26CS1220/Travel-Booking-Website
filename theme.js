// Persistent light/dark theme using CSS custom property tokens.
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("ccTheme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  document.querySelectorAll(".theme-toggle").forEach(button => {
    const paint = () => { button.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀" : "☾"; };
    paint();
    button.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("ccTheme", next); paint();
    });
  });
});