function linear(x) {
    return x; // Simple linear interpolation, other easing functions possible
}

function animateValue(obj, start, end, duration) {
    obj.style.willChange = 'transform'; // Enable will-change before animation
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        let progress = Math.min(elapsed / duration, 1); // Ensure progress does not exceed 1
        progress = linear(progress);

        const currentValue = Math.floor(progress * (end - start) + start);
        obj.textContent =  currentValue +  "+";

        if (elapsed < duration) {
            window.requestAnimationFrame(step);
        } else {
            obj.textContent = end + "+";
            obj.style.willChange = 'auto'; // Disable will-change after animation
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
                observer.unobserve(target); // Stop observing once animation starts
            }
        });
    }, { threshold: 0.5 }); // Threshold set to 50%, element must be half-visible

    document.querySelectorAll('.key-number').forEach(element => {
        observer.observe(element);
    });
});
