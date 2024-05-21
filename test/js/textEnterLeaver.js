// Corrected JavaScript code
const textContainers = document.getElementsByClassName('text-container'); // Remove the dot

// Convert HTMLCollection to an array
const textContainersArray = Array.from(textContainers);

const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    }
}, { threshold: 1.0, rootMargin: '20%' });

textContainersArray.forEach(el => observer.observe(el));
