// Shared navigation and demo account interactions.
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle"), nav = document.querySelector(".main-nav");
  if (menu && nav) menu.addEventListener("click", () => { const open = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", String(open)); });
  const signup = document.getElementById("signupForm");
  if (signup) signup.addEventListener("submit", event => {
    event.preventDefault();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const terms = document.getElementById("terms").checked;
    const msg = document.getElementById("signupMessage");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || password.length < 8 || !terms) {
      msg.hidden = false; msg.className = "alert-msg"; msg.textContent = "Enter a valid email, use at least 8 password characters and accept the Terms of Service."; return;
    }
    const old = JSON.parse(localStorage.getItem("ccAccount") || "{}");
    localStorage.setItem("ccAccount", JSON.stringify({...old,email,password}));
    msg.hidden = false; msg.className = "success-msg"; msg.textContent = "Sign-up details saved in this browser. You can now sign in.";
  });
  const show = document.getElementById("showPassword");
  if (show) show.addEventListener("click", () => { const input = document.getElementById("loginPassword"); input.type = input.type === "password" ? "text" : "password"; show.textContent = input.type === "password" ? "Show" : "Hide"; });
  const signin = document.getElementById("signinForm");
  if (signin) signin.addEventListener("submit", event => {
    event.preventDefault(); const account = JSON.parse(localStorage.getItem("ccAccount") || "null");
    const email = document.getElementById("loginEmail").value.trim(), password = document.getElementById("loginPassword").value;
    const alert = document.getElementById("loginAlert"); alert.hidden = false;
    if (account && account.email === email && account.password === password) { sessionStorage.setItem("ccLoggedIn","true"); location.href = "home.html"; }
    else { alert.textContent = "Invalid credentials. Please register first or check your email and password."; }
  });
  const home = document.querySelector(".dashboard-shell");
  if (home) {
    const account = JSON.parse(localStorage.getItem("ccAccount") || "null");
    if (!account || sessionStorage.getItem("ccLoggedIn") !== "true") { location.href = "signin.html"; return; }
    const name = account.fullName || "Student";
    ["welcomeName","sideName","rightName"].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = name; });
    const set = (id,value) => { const el=document.getElementById(id); if(el) el.textContent=value || "—"; };
    set("sideId",account.empId); set("rightEmail",account.email); set("rightId",account.empId); set("rightDept",account.dept);
    set("avatarInitial",name.charAt(0).toUpperCase());
    const tasks = [...document.querySelectorAll(".task-row input")], bar = document.getElementById("taskProgress"), count = document.getElementById("taskCount");
    const update = () => { const done=tasks.filter(t=>t.checked).length; bar.style.width=(done/tasks.length*100)+"%"; count.textContent=`${done} of ${tasks.length} completed`; };
    tasks.forEach(t=>t.addEventListener("change",update)); update();
    const logout=document.getElementById("logoutBtn"); if(logout) logout.addEventListener("click",()=>{sessionStorage.removeItem("ccLoggedIn");location.href="index.html";});
  }
});