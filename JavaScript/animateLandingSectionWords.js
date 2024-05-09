const words = ["OMEGA SECURITY", "HIER WIRD IHNEN MIT SICHERHEIT GEHOLFEN!"];
let i = 0;

function animateWords() {
    let typewriter = document.getElementById("typewriter");
    typewriter.textContent = words[i];
    typewriter.style.animation = 'fadeInLeftToRight 3s forwards';

    setTimeout(() => {
        typewriter.style.animation = 'fadeOutRightToLeft 3s forwards'; 

        setTimeout(() => {
            i = (i + 1) % words.length;
            animateWords();
        }, 3000);
    }, 5000); 
}

document.addEventListener('DOMContentLoaded', animateWords);
