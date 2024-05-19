function linear(x) {
    return x; // Einfache lineare Interpolation, weitere Easing-Funktionen möglich
}

function animateValue(obj, start, end, duration) {
    obj.style.willChange = 'transform'; // Aktivieren von will-change vor der Animation
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        let progress = Math.min(elapsed / duration, 1); // Sicherstellen, dass der Fortschritt nicht >1 ist
        progress = linear(progress);

        const currentValue = Math.floor(progress * (end - start) + start);
        obj.textContent = "+" + currentValue;

        if (elapsed < duration) {
            window.requestAnimationFrame(step);
        } else {
            obj.textContent = "+" + end;
            obj.style.willChange = 'auto'; // Deaktivieren von will-change nach der Animation
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                animateValue(target, 0, parseInt(target.getAttribute('data-target')), 2000);
                observer.unobserve(target); // Beobachtung beenden, sobald die Animation gestartet wurde
            }
        });
    }, { threshold: 0.5 }); // Schwellenwert bei 50%, bedeutet, dass das Element zur Hälfte sichtbar sein muss

    document.querySelectorAll('.key-number').forEach(element => {
        observer.observe(element);
    });
});
