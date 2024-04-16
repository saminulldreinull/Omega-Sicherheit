const words = ["OMEGA SECURITY", "HIER WIRD IHNEN MIT SICHERHEIT GEHOLFEN!"];
let i = 0;

function displayNextWord() {
    let typewriter = document.getElementById("typewriter");
    typewriter.textContent = words[i];
    typewriter.style.animation = 'fadeInLeftToRight 3s forwards'; // Langsameres Fade-In

    setTimeout(() => {
        typewriter.style.animation = 'fadeOutRightToLeft 3s forwards'; // Langsameres Fade-Out

        setTimeout(() => {
            i = (i + 1) % words.length;
            displayNextWord();
        }, 3000); // Zeit nach Fade-Out bis zum nächsten Wort
    }, 5000); // Zeit, wie lange das Wort sichtbar ist, verlängert
}

document.addEventListener('DOMContentLoaded', displayNextWord);
