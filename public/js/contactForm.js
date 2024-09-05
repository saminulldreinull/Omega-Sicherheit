document.addEventListener('DOMContentLoaded', function() {
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      // CSRF-Token abrufen und im Formularfeld speichern
      fetch('/get-csrf-token')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          document.getElementById('csrfToken').value = data.csrfToken;
        })
        .catch(error => console.error('Error fetching CSRF token:', error));
  
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
  
        var privacyCheckbox = document.getElementById('privacy');
        if (!privacyCheckbox.checked) {
          alert('Bitte akzeptieren Sie die Datenschutzerklärung.');
          return;
        }
  
        var formData = new FormData(this);
        var jsonObject = {};
        formData.forEach((value, key) => {
          jsonObject[key] = value;
        });
  
        fetch('/contact/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'CSRF-Token': document.getElementById('csrfToken').value // CSRF-Token hinzufügen
          },
          body: JSON.stringify(jsonObject),
        })
        .then(response => response.text())
        .then(data => {
          if (data.includes('E-Mail erfolgreich gesendet!')) {
            document.getElementById('alert-success').style.display = 'flex';
            document.getElementById('alert-danger').style.display = 'none';
            document.getElementById('alert-container').style.display = 'block';
  
            // Hide success alert after 5 seconds
            setTimeout(() => {
              document.getElementById('alert-container').style.display = 'none';
            }, 5000);
  
            // Clear form inputs
            contactForm.reset();
          } else {
            throw new Error('Fehler beim Senden der E-Mail.');
          }
        })
        .catch(error => {
          document.getElementById('alert-success').style.display = 'none';
          document.getElementById('alert-danger').style.display = 'flex';
          document.getElementById('alert-container').style.display = 'block';
  
          // Hide error alert after 5 seconds
          setTimeout(() => {
            document.getElementById('alert-container').style.display = 'none';
          }, 5000);
        });
      });
  
      function closeAlert() {
        document.getElementById('alert-container').style.display = 'none';
      }
  
      document.querySelectorAll('.close').forEach(function(closeBtn) {
        closeBtn.addEventListener('click', closeAlert);
      });
    }
  });