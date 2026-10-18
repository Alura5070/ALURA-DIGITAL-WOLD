/* ALURA DIGITAL SOLUTIONS — interactions */
const EMAIL = "opioalfred1997@gmail.com";
const WHATSAPP = "256784038264";

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* Mobile navigation */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuToggle.textContent = open ? "✕" : "☰";
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.textContent = "☰";
  }));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
}

/* Let service links select the relevant service in the enquiry form. */
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.getElementById("service");
    if (!select) return;
    const requested = link.dataset.service;
    const match = Array.from(select.options).find(option =>
      option.value === requested || option.textContent.trim() === requested
    );
    select.value = match ? match.value : "Other / Not Sure Yet";
  });
});

function showMessage(element, message, kind) {
  if (!element) return;
  element.textContent = message;
  element.className = "form-note" + (kind ? " " + kind : "");
}

/* Project enquiry: prepares a draft in the visitor's email application.
   It does not silently send or store the visitor's information. */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("clientName").value.trim();
    const clientEmail = document.getElementById("clientEmail").value.trim();
    const service = document.getElementById("service").value;
    const budget = document.getElementById("budget").value || "Prefer to discuss";
    const details = document.getElementById("projectMessage").value.trim();
    const status = document.getElementById("contactMessage");

    if (!name || !clientEmail || !service || !details) {
      showMessage(status, "Please complete all required fields.", "error");
      return;
    }
    const subject = `ALURA project enquiry: ${service}`;
    const body = [
      "NEW PROJECT ENQUIRY — ALURA DIGITAL SOLUTIONS", "",
      `Name: ${name}`, `Client email: ${clientEmail}`,
      `Service: ${service}`, `Estimated budget: ${budget}`, "",
      "Project details:", details, "",
      "Sent from the ALURA Digital Solutions website."
    ].join("\n");
    showMessage(status, "Your email application should open. Review the message and press Send there.", "success");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

/* Private feedback: prepares an email. Feedback is not published automatically. */
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("feedbackName").value.trim() || "Not provided";
    const type = document.getElementById("feedbackType").value;
    const message = document.getElementById("feedbackText").value.trim();
    const status = document.getElementById("feedbackMessage");
    if (!message) {
      showMessage(status, "Please enter your feedback before continuing.", "error");
      return;
    }
    const subject = `ALURA website feedback: ${type}`;
    const body = `Feedback type: ${type}\nName: ${name}\n\nMessage:\n${message}\n\nThis feedback was submitted privately through the ALURA website.`;
    showMessage(status, "Your email application should open. The feedback will not be published automatically.", "success");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
