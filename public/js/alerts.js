export function createAlerts(host) {
    if (host.shadowRoot) return; // Verhindern der Erstellung mehrerer Shadow Roots
  
    const shadowRoot = host.attachShadow({ mode: 'open' });
  
    // Bootstrap CSS zu Shadow DOM hinzufügen
    const bootstrapLink = document.createElement('link');
    bootstrapLink.rel = 'stylesheet';
    bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    shadowRoot.appendChild(bootstrapLink);
  
    // Die Alert-Inhalte zu Shadow DOM hinzufügen
    const alertContainer = document.createElement('div');
    alertContainer.innerHTML = `
      <style>
        .alert {
          display: none;
          position: fixed;
          top: 10px;
          right: 10px;
          z-index: 9999;
          max-width: 300px;
        }
      </style>
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
        </symbol>
        <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
        </symbol>
      </svg>
      <div class="alert alert-success alert-dismissible d-flex align-items-center" role="alert" id="success-alert">
        <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:" width="15" height="15" fill="currentColor"><use xlink:href="#check-circle-fill"></use></svg>
        <div>Ihre Nachricht wurde erfolgreich versendet.</div>
        <button type="button" class="btn-close ms-auto" aria-label="Close"></button>
      </div>
      <div class="alert alert-danger alert-dismissible d-flex align-items-center" role="alert" id="error-alert">
        <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:" width="15" height="15" fill="currentColor"><use xlink:href="#exclamation-triangle-fill"></use></svg>
        <div>Es ist ein Problem aufgetreten.</div>
        <button type="button" class="btn-close ms-auto" aria-label="Close"></button>
      </div>
    `;
    shadowRoot.appendChild(alertContainer);
  
    // Event Listener für die Schließen-Buttons
    shadowRoot.querySelectorAll('.btn-close').forEach(button => {
      button.addEventListener('click', () => {
        button.parentElement.style.display = 'none';
      });
    });
  
    // Funktionen zum Anzeigen der Alerts
    host.showAlert = function(type) {
      const alert = type === 'success' ? shadowRoot.getElementById('success-alert') : shadowRoot.getElementById('error-alert');
      alert.style.display = 'block';
      setTimeout(() => {
        alert.style.display = 'none';
      }, 3000);
    };
  }
  