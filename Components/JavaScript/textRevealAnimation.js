gsap.registerPlugin(ScrollTrigger);document.querySelectorAll('.reveal-type').forEach((element) => {
    const originalText = element.innerHTML;
    const bgColor = element.dataset.bgColor; // Hintergrundfarbe aus den Datenattributen
    const fgColor = element.dataset.fgColor; // Vordergrundfarbe aus den Datenattributen
    let isFirstOccurrenceHandled = false;
    // Highlight-Funktion für spezielle Wörter
    function highlightText(text) {
       
        const specialWords = ["Omega Security GmbH", "2021", "Wir", "Beitrag", "Berlins"];
        const firstOccurrenceOnly = "Sicherheit";

        text = specialWords.reduce((acc, word) => {
            const regex = new RegExp(`\\b${word}\\b`, 'g');
            return acc.replace(regex, `<span class="special">${word}</span>`);
        }, text);

        // Sonderbehandlung für das erste Vorkommen von "Sicherheit"
        text = text.replace(new RegExp(`\\b${firstOccurrenceOnly}\\b`, 'g'), match => {
            if (!isFirstOccurrenceHandled) {
                isFirstOccurrenceHandled = true;
                return `<span class="special" style="color: rgb(129, 164, 205);">${match}</span>`; // Erstes Vorkommen
            }
            return match; // Normale Farbe für nachfolgende Vorkommen
        });

        return text;
    }

    element.innerHTML = originalText.split('<br>').map(line => highlightText(line)).join('<br>');
    const text = new SplitType(element, { types: 'chars' });

    // Animate text color changes on scroll
    gsap.fromTo(text.chars, {
        color: bgColor, // Start with the background color
    }, {
        color: (i) => {
            // Anpassen der Farbe basierend auf der Klasse
            return text.chars[i].parentNode.className.includes('special') ? "rgb(129, 164, 205)" : fgColor;
        },
        duration: 0.3,
        stagger: 0.02,
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: true,
            markers: false,
            toggleActions: 'play none none reverse'
        }
    });
});

