// Calculator module: controlled key grid and safe arithmetic.
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("calcDisplay");
  if (!display) return;
  let expression = "";
  const render = value => { display.textContent = value; };
  document.querySelectorAll("[data-key]").forEach(key => key.addEventListener("click", () => {
    const value = key.dataset.key;
    if (value === "C") { expression = ""; render("0"); return; }
    if (value === "=") {
      try {
        if (!expression || !/^[0-9+\-*/.() ]+$/.test(expression)) throw new Error("Invalid");
        if (/\/\s*0(?![0-9.])/.test(expression) || /\/0(?:\.0*)?$/.test(expression)) throw new Error("Cannot divide by zero");
        const result = Function('"use strict"; return (' + expression + ')')();
        if (!Number.isFinite(result)) throw new Error("Invalid result");
        expression = String(Number(result.toFixed(8))); render(expression);
      } catch (error) { render(error.message === "Cannot divide by zero" ? "Cannot divide by 0" : "Invalid expression"); expression = ""; }
      return;
    }
    if (expression.length < 28) { expression += value; render(expression); }
  }));
});