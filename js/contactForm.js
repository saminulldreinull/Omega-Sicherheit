document.addEventListener('DOMContentLoaded', function() {
  let contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      let privacyCheckbox = document.getElementById('privacy');
      if (!privacyCheckbox.checked) {
        alert('Bitte akzeptieren Sie die Datenschutzerklärung.');
        return;
      }

      let formData = new FormData(this);
      let jsonObject = {};
      formData.forEach((value, key) => {
        jsonObject[key] = value;
      });

      console.log(jsonObject); // Debugging

      fetch('/contact/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObject),
      })
      .then(response => response.text())
      .then(data => {
        console.log('Response Text:', data); // Debugging
        if (data.includes('E-Mail erfolgreich gesendet!')) {
          document.getElementById('alert-success').style.display = 'flex';
          document.getElementById('alert-danger').style.display = 'none';
          document.getElementById('alert-container').style.display = 'block';
          console.log('Success Alert Triggered');

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
        console.error('Fetch error:', error);
        document.getElementById('alert-success').style.display = 'none';
        document.getElementById('alert-danger').style.display = 'flex';
        document.getElementById('alert-container').style.display = 'block';
        console.log('Error Alert Triggered');

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
  } else {
    console.error('Contact form not found');
  }
});
