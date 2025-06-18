 
 
 
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Smooth scroll na kliknięcie w linki z nav
document.querySelectorAll('nav ul li button').forEach(btn => {
  btn.addEventListener('click', e => {
    const targetId = e.target.getAttribute('data-target');
    if (targetId) {
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
      // Jeśli menu mobilne jest otwarte, zamknij je
      if(navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    }
  });
});
 // Formularz kontaktowy - wysyłka do backendu
 function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  function openNewTab(url) {
    window.open(url, "_blank");
  }
  
  document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();
  
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
  
    if (!name || !email || !message) {
      alert("Proszę wypełnić wszystkie pola.");
      return;
    }
  
    try {
      const res = await fetch("https://zawitech-backend-contact.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });
  
      const data = await res.json();
  
      if (data.status === "success") {
        document.getElementById("formResponse").textContent = "✅ Wiadomość została wysłana!";
        this.reset();
      } else {
        throw new Error(data.error || "Nieznany błąd");
      }
    } catch (error) {
      document.getElementById("formResponse").textContent = "❌ Wystąpił błąd przy wysyłaniu wiadomości.";
      console.error("Błąd:", error);
    }
  });
