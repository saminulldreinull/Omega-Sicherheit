const words = ["OMEGA SECURITY", "HIER WIRD IHNEN MIT SICHERHEIT GEHOLFEN!"];
let i = 0;

function animateWords() {
    let typewriter = document.getElementById("typewriter");
    typewriter.textContent = words[i];
    typewriter.style.animation = 'fadeInLeftToRight 3s forwards'; // Langsameres Fade-In

    setTimeout(() => {
        typewriter.style.animation = 'fadeOutRightToLeft 3s forwards'; // Langsameres Fade-Out

        setTimeout(() => {
            i = (i + 1) % words.length;
            animateWords();
        }, 3000); // Zeit nach Fade-Out bis zum nächsten Wort
    }, 5000); // Zeit, wie lange das Wort sichtbar ist, verlängert
}

document.addEventListener('DOMContentLoaded', animateWords);

// Variablen für die Elemente
var logo = document.getElementById('logo');
var logoContainer = document.getElementById('logo-container');
var header = document.querySelector('header');
var landingPage = document.getElementById('landing-page');

// Funktion, die prüft, ob die erste Section verlassen wurde
function checkSection() {
  // Bestimmen Sie die Position der ersten Section
  var landingPageHeight = landingPage.offsetHeight;
  var landingPageTop = landingPage.getBoundingClientRect().top + window.scrollY;

  // Prüfen, ob sich der Benutzer auf der ersten Section befindet
  if (window.scrollY < landingPageTop + landingPageHeight) {
    // Anpassungen, wenn innerhalb der ersten Section
    header.style.backgroundColor = 'transparent';
    logo.classList.remove('logo-shrinked');
    logoContainer.classList.remove('logo-container-shrinked');
    if (!logo.classList.contains('logo')) {
      logo.classList.add('logo');
    }
    if (!logoContainer.classList.contains('logo-container')) {
      logoContainer.classList.add('logo-container');
    }
  } else {
    // Anpassungen, wenn außerhalb der ersten Section
    logo.classList.add('logo-shrinked');
    logoContainer.classList.add('logo-container-shrinked');
    logo.classList.remove('logo');
    logoContainer.classList.remove('logo-container');
    header.style.backgroundColor = 'rgb(0,0,77)';
  }
}

// Event Listener für das Scroll-Event
window.addEventListener('scroll', checkSection);

// Funktion beim Laden der Seite und beim Scrollen ausführen
document.addEventListener('DOMContentLoaded', checkSection);












// Lineare Easing-Funktion
function linear(x) {
    return x; // Gibt einfach den Input direkt zurück
}

// Funktion zum Animieren der Zahlen mit der linearen Easing-Funktion
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = Math.min(timestamp - startTimestamp, duration); // Verhindert Überschreitung des Zielwerts
        let progress = elapsed / duration;
        progress = linear(progress); // Anwendung der linearen Easing-Funktion

        const currentValue = Math.floor(progress * (end - start) + start);
        obj.textContent = "+" + currentValue;

        if (elapsed < duration) {
            window.requestAnimationFrame(step);
        } else {
            obj.textContent = "+" + end; // Stellen Sie sicher, dass das Endziel genau erreicht wird.
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
    // Verwendung von IntersectionObserver, um die Animation auszulösen
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                animateValue(target, 0, parseInt(target.getAttribute('data-target')), 2000);
                observer.unobserve(target); // Stoppt die Beobachtung nach der Animation
            }
        });
    }, { threshold: 0.5 });

    // Alle Zielelemente hinzufügen
    document.querySelectorAll('.key-number').forEach(element => {
        observer.observe(element);
    });

    displayNextWord();  // Starte das Text-Schreibeffekt nach dem DOM geladen ist
});
