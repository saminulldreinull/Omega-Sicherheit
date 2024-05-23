
// Intersection observer for text containers
const textContainers = document.getElementsByClassName('contact-text-container');
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