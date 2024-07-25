document.addEventListener("DOMContentLoaded", () => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
  
    function handleMediaQueryChange(e) {
      if (e.matches) {
        // Medienweite ist bis zu 767px, Script ausführen
        gsap.registerPlugin(ScrollTrigger);
  
        const containers = document.querySelectorAll('.contact-text-container');
  
        // Alle Container initial in den inaktiven Zustand versetzen
        containers.forEach(container => {
          container.classList.add('inactive');
          container.classList.remove('active');
        });
  
        containers.forEach((container, index) => {
          ScrollTrigger.create({
            trigger: container,
            start: "top 30%",
            end: "bottom 25%",
            markers: false,
            markers: {startColor:"pink", endColor:"purple"}, 
            onEnter: () => highlightContainer(index),
            onLeaveBack: () => resetContainer(index),
            onEnterBack: () => highlightContainer(index),
            onLeave: () => resetContainer(index)           
          });
        });
  
        function highlightContainer(index) {
          containers.forEach((container, i) => {
            const text = container.querySelector('.contact-text-container-element');
            if (i === index) {
              container.classList.add('active');
              container.classList.remove('inactive');
            } else {
              container.classList.add('inactive');
              container.classList.remove('active');
            }
          });
        }
  
        function resetContainer(index) {
          containers.forEach((container) => {
            container.classList.add('inactive');
            container.classList.remove('active');
          });
        }
      }
    }
  
    // Initial check
    handleMediaQueryChange(mediaQuery);
  
    // Listen for changes
    mediaQuery.addEventListener("change", handleMediaQueryChange);
  });
  