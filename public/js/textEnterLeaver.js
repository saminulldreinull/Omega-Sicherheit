/* const textContainers = document.getElementsByClassName('contact-text-container');
const textContainersArray = Array.from(textContainers);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      textContainersArray.forEach((container) => {
        if (container !== entry.target) {
          container.classList.remove('visible');
        }
      });
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.5, rootMargin: '0px 0px -20% 0px' });

textContainersArray.forEach(el => observer.observe(el));
 */