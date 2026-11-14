// Registration form validation: required patterns are taken from the IA-3 checklist.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return;
  const rules = {
    fullName: [/^[a-zA-Z\s]{2,50}$/, "Use 2–50 letters and spaces only."],
    empId: [/^[A-Z0-9]{6,12}$/i, "Use 6–12 letters or numbers."],
    email: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address."],
    mobile: [/^[6-9]\d{9}$/, "Enter a 10-digit number starting with 6–9."],
    password: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, "Use 8+ characters with uppercase, lowercase, number and symbol (@$!%*?&)."]
  };
  const ids = ["fullName","empId","email","mobile","dept","password","confirmPassword"];
  const get = id => document.getElementById(id);
  function validate(id) {
    const field = get(id), msg = field.parentElement.querySelector(".error-msg");
    let valid = true, message = "";
    if (id === "dept") { valid = field.value !== ""; message = "Please select your division."; }
    else if (id === "confirmPassword") { valid = field.value !== "" && field.value === get("password").value; message = "Passwords must match."; }
    else if (rules[id]) { valid = rules[id][0].test(field.value.trim()); message = rules[id][1]; }
    field.classList.toggle("invalid", !valid);
    field.classList.toggle("valid", valid);
    msg.textContent = valid ? "" : message;
    field.setAttribute("aria-invalid", String(!valid));
    return valid;
  }
  function validateAll() { return ids.map(validate).every(Boolean); }
  ids.forEach(id => {
    get(id).addEventListener("blur", () => { validate(id); updateButton(); });
    get(id).addEventListener("input", () => { if (get(id).classList.contains("invalid") || id === "password") validate(id); if (id === "password" && get("confirmPassword").value) validate("confirmPassword"); updateButton(); });
    get(id).addEventListener("change", () => { validate(id); updateButton(); });
  });
  function updateButton() { document.getElementById("registerSubmit").disabled = !validateAll(); }
  // Start disabled; live checks enable only when every field is valid.
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!validateAll()) { updateButton(); return; }
    const account = {
      fullName: get("fullName").value.trim(), empId: get("empId").value.trim(),
      email: get("email").value.trim(), mobile: get("mobile").value.trim(),
      dept: get("dept").value, password: get("password").value
    };
    localStorage.setItem("ccAccount", JSON.stringify(account));
    const success = document.getElementById("registerSuccess");
    success.hidden = false;
    success.textContent = "Registration successful! Your demo profile is saved in this browser. You can now sign in.";
    form.reset(); ids.forEach(id => { get(id).classList.remove("valid","invalid"); get(id).parentElement.querySelector(".error-msg").textContent = ""; });
    updateButton();
  });
  updateButton();
});