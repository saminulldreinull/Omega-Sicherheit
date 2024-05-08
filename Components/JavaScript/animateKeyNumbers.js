
function linear(x) {
    return x; 
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = Math.min(timestamp - startTimestamp, duration); 
        let progress = elapsed / duration;
        progress = linear(progress); 

        const currentValue = Math.floor(progress * (end - start) + start);
        obj.textContent = "+" + currentValue;

        if (elapsed < duration) {
            window.requestAnimationFrame(step);
        } else {  
            obj.textContent = "+" + end; 
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
                observer.unobserve(target); 
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.key-number').forEach(element => {
        observer.observe(element);
    });

});