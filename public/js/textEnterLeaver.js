document.addEventListener("DOMContentLoaded", () => {
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  function handleMediaQueryChange(e) {
    if (e.matches) {
      // Medienweite ist mindestens 768px, Script ausführen
      const textContainers = document.querySelectorAll('.contact-text-container, .contact-text-container-first','.form-container');
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
    }
  }

  // Initial check
  handleMediaQueryChange(mediaQuery);

  // Listen for changes
  mediaQuery.addEventListener("change", handleMediaQueryChange);
});
