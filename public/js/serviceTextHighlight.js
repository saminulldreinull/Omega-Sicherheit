function initAnimations() {
    document.querySelectorAll('.reveal-type').forEach((element) => {
        const bgColor = element.dataset.bgColor; // Hintergrundfarbe aus den Datenattributen
        const fgColorLight = element.dataset.fgColorLight; // Vordergrundfarbe für highlight-light aus den Datenattributen
        const fgColorDark = element.dataset.fgColorDark; // Vordergrundfarbe für highlight-dark aus den Datenattributen

        const text = new SplitType(element, { types: 'words' }); // Text in Wörter statt Zeichen aufteilen

        // Definiere die Trigger-Positionen für die maximale Bildschirmbreite von 767 px
        const triggerPositions = {
            start: 'top 80%', // Angepasster Startwert
            end: 'bottom 55%' // Angepasster Endwert
        };

        // Animate text color changes on scroll
        gsap.fromTo(text.words, {
            color: bgColor, // Start with the background color
        }, {
            color: (i) => {
                // Anpassen der Farbe basierend auf der Klasse
                if (text.words[i].parentNode.className.includes('highlight-light')) {
                    return fgColorLight;
                } else if (text.words[i].parentNode.className.includes('highlight-dark')) {
                    return fgColorDark;
                }
            },
            duration: 0.3,
            stagger: 0.1, // Erhöhe den Stagger-Wert für eine langsamere Verzögerung zwischen den Wörtern
            scrollTrigger: {
                trigger: element,
                start: triggerPositions.start,
                end: triggerPositions.end,
                scrub: 0.1, // Erhöhe die Scrub-Dauer für eine langsamere Animation
                markers: false,
                toggleActions: 'play none none reverse'
            }
        });
    });
}

function resetAnimations() {
    gsap.killTweensOf('.reveal-type *');
    document.querySelectorAll('.reveal-type').forEach((element) => {
        const bgColor = element.dataset.bgColor;
        const text = new SplitType(element, { types: 'words' });

        text.words.forEach((word) => {
            word.style.color = bgColor;
        });
    });
}

function checkWindowSize() {
    if (window.innerWidth <= 767) {
        initAnimations();
    } else {
        resetAnimations();
    }
}

// Initial check
checkWindowSize();

// Check window size on resize
window.addEventListener('resize', () => {
    checkWindowSize();
});
