const words = ["OMEGA SECURITY", "HIER WIRD IHNEN MIT SICHERHEIT GEHOLFEN!"];
let i = 0;

function displayNextWord() {
    let typewriter = document.getElementById("typewriter");
    typewriter.textContent = words[i];
    typewriter.style.animation = 'fadeInLeftToRight 3s forwards'; 

    setTimeout(() => {
        typewriter.style.animation = 'fadeOutRightToLeft 3s forwards'; 

        setTimeout(() => {
            i = (i + 1) % words.length;
            displayNextWord();
        }, 3000); // Zeit nach Fade-Out bis zum nächsten Wort
    }, 5000); // Zeit, wie lange das Wort sichtbar ist, verlängert
}

window.addEventListener('scroll', function() {
    var header = document.querySelector('header'); // Wählen Sie den Header aus.
    var section = document.getElementById('facts-section'); // Ersetzen Sie 'sectionId' mit der tatsächlichen ID Ihrer Section.
    var sectionTop = section.offsetTop; // Top-Position der Section relativ zum Dokument.
    var sectionHeight = section.offsetHeight; // Höhe der Section.
    var logo = document.getElementById('logo');
    var logoContainer = document.getElementById('logo-container');


    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        header.style.backgroundColor = 'rgb(0,0,77)'; // Ersetzen Sie 'neueFarbe' mit der gewünschten Farbe.
        logo.classList.add('logo-shrinked')
        logoContainer.classList.add('logo-container-shrinked');
        logo.classList.remove('logo');
        logoContainer.classList.remove('logo-container');
    } else {
        header.style.backgroundColor = 'transparent'; 
        logo.classList.remove('logo-shrinked');
        logoContainer.classList.remove('logo-container-shrinked');
        logo.classList.add('logo');
        logoContainer.classList.add('logo-container');

    }
});



document.addEventListener('DOMContentLoaded', displayNextWord);
