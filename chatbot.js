// Floating keyword-matching assistant with auto-scrolling message log.
document.addEventListener("DOMContentLoaded", () => {
  const fab = document.createElement("button");
  fab.className = "chat-fab"; fab.type = "button"; fab.setAttribute("aria-label","Open assistant"); fab.textContent = "✦";
  const panel = document.createElement("section");
  panel.className = "chat-panel"; panel.setAttribute("aria-label","CampusConnect assistant");
  panel.innerHTML = `<div class="chat-head"><span>✦ CampusConnect Assistant</span><button class="chat-close" aria-label="Close chat">×</button></div><div class="chat-log" aria-live="polite"><div class="bot-msg">Hi! I'm your CampusConnect assistant. Ask me about registration, sign in, dashboard or calculator.</div></div><form class="chat-form"><input aria-label="Message" placeholder="Type your question..." required><button type="submit">Send</button></form>`;
  document.body.append(fab,panel);
  const log = panel.querySelector(".chat-log");
  const add = (text, cls) => { const node = document.createElement("div"); node.className = cls; node.textContent = text; log.appendChild(node); log.scrollTop = log.scrollHeight; };
  fab.addEventListener("click", () => panel.classList.toggle("open"));
  panel.querySelector(".chat-close").addEventListener("click", () => panel.classList.remove("open"));
  panel.querySelector("form").addEventListener("submit", event => {
    event.preventDefault(); const input = panel.querySelector("input"); const q = input.value.trim().toLowerCase(); if (!q) return;
    add(input.value.trim(),"user-msg"); input.value = "";
    let reply = "I can help with registration, account sign-up, sign-in, the dashboard, calculator and theme settings. Try asking about one of these.";
    if (/register|registration|form|password rule/.test(q)) reply = "Open Register and fill every required field. The form checks your name, ID, email, mobile number, division and password. The Create Account button activates when all fields are valid.";
    else if (/sign.?up|account|create account/.test(q)) reply = "Use the Sign Up page for the short email/password onboarding form, or Register for the full student profile.";
    else if (/login|sign.?in|password|credential/.test(q)) reply = "Register first, then sign in using the same email and password. Use the Show button to reveal or hide the password.";
    else if (/calculator|divide|addition|math/.test(q)) reply = "The dashboard calculator supports +, −, × and ÷. Press C to clear and = to calculate. Division by zero is blocked.";
    else if (/theme|dark|light/.test(q)) reply = "Use the moon/sun button in the top navigation to switch themes. Your choice is saved in this browser.";
    else if (/dashboard|home|task/.test(q)) reply = "Sign in to open your dashboard. It contains a profile summary, task checklist and quick calculator.";
    setTimeout(() => add(reply,"bot-msg"),180);
  });
});