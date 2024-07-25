document.addEventListener("DOMContentLoaded", () => {
  const mediaQuery = window.matchMedia("(max-width: 767px)");

  function handleMediaQueryChange(e) {
    if (e.matches) {
      gsap.registerPlugin(ScrollTrigger);

      const containers = document.querySelectorAll('.contact-text-container');

      containers.forEach(container => {
        container.classList.add('inactive');
        container.classList.remove('active');
      });

      containers.forEach((container, index) => {
        // ScrollTrigger für das Aktivieren/Deaktivieren des Containers
        ScrollTrigger.create({
          trigger: container,
          start: "top 40%",
          end: "bottom 35%",
          markers: false,
          onEnter: () => highlightContainer(index),
          onLeaveBack: () => resetContainer(index),
          onEnterBack: () => highlightContainer(index),
          onLeave: () => resetContainer(index)
        });

        const highlightElement = container.querySelector('a span');
        if (highlightElement && highlightElement.textContent.includes("Kontaktieren Sie uns")) {
          // ScrollTrigger für das Starten/Stoppen der Animation
          ScrollTrigger.create({
            trigger: container,
            start: "top 40%",
            end: "bottom 35%",
            markers: true,
            onEnter: () => startBounceAnimation(highlightElement),
            onEnterBack: () => startBounceAnimation(highlightElement), // Start animation when re-entering from below
            onLeave: () => stopBounceAnimation(highlightElement),
            onLeaveBack: () => stopBounceAnimation(highlightElement) // Stop animation when leaving from above
          });
        }
      });

      function highlightContainer(index) {
        containers.forEach((container, i) => {
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

  function startBounceAnimation(element) {
    const text = element.textContent;
    element.innerHTML = '';

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      element.appendChild(span);
    });

    const spans = element.children;
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    Array.from(spans).forEach((span, i) => {
      timeline.to(span, {
        y: -20,
        duration: 0.2,
        ease: "power1.inOut",
        yoyo: true
      }, i * 0.05).to(span, {
        y: 0,
        duration: 0.2,
        ease: "power1.inOut"
      }, i * 0.05 + 0.1);
    });

    element.timeline = timeline; // Save the timeline to stop it later
  }

  function stopBounceAnimation(element) {
    if (element.timeline) {
      element.timeline.kill();
      element.timeline = null; // Clear the reference to the timeline
      element.innerHTML = element.textContent; // Reset the content to original text
    }
  }

  // Initial check
  handleMediaQueryChange(mediaQuery);

  // Listen for changes
  mediaQuery.addEventListener("change", handleMediaQueryChange);
});
