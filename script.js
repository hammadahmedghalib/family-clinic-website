/* ============================================
   Family Clinic — Interactions
   ============================================ */

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

// Prefill date with today
const dateInput = document.getElementById("date");
if (dateInput) {
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;
  dateInput.value = today;
}

// Appointment form → WhatsApp
const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name  = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const date  = document.getElementById("date").value;
    const time  = document.getElementById("time").value;

    if (!name || !phone || !date || !time) {
      alert("Please fill in all fields.");
      return;
    }

    const prettyDate = new Date(date).toLocaleDateString("en-GB", {
      weekday: "short", day: "2-digit", month: "short", year: "numeric",
    });

    const message =
      `*New Appointment Request*\n` +
      `👤 Name: ${name}\n` +
      `📞 Phone: ${phone}\n` +
      `📅 Date: ${prettyDate}\n` +
      `⏰ Time: ${time}`;

    // Backup locally
    try {
      const key = "family-clinic-appointments";
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      list.push({ name, phone, date, time, sentAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(list));
    } catch (_) {}

    const url = `https://wa.me/923199608782?text=${encodeURIComponent(message)}`;

    const btn = form.querySelector("button[type='submit']");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Opening WhatsApp…";

    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      btn.disabled = false;
      btn.textContent = original;
      form.reset();
      if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];
    }, 300);
  });
}

// Reveal-on-scroll
const revealTargets = document.querySelectorAll(
  ".service-card, .doctor-card, .appointment-form, .contact-info, .contact-map"
);
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("fade-in"));
}