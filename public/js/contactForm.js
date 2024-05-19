document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
  
    if (form) {
      form.addEventListener("submit", function(event) {
        event.preventDefault();
  
        const formData = new FormData(form);
        const jsonData = JSON.stringify(Object.fromEntries(formData));
  
        fetch("/contact/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: jsonData
        })
        .then(response => {
          if (response.ok) {
            alert("E-Mail erfolgreich gesendet!");
            form.reset(); // Formular zurücksetzen
          } else {
            alert("Fehler beim Senden der E-Mail. Bitte versuchen Sie es erneut.");
          }
        })
        .catch(error => {
          console.error("Fehler beim Senden der E-Mail:", error);
          alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
        });
      });
    } else {
      console.error("Formular mit ID 'contact-form' nicht gefunden.");
    }
  });
  