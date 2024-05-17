 gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".reveal").forEach(section => {
  gsap.fromTo(section, 
    {
      autoAlpha: 0, // Startet unsichtbar
      scale: 0.5, // Startskalierung bei 50%
    },
    {
      autoAlpha: 1, // Endet sichtbar
      scale: 1, // Ends skalierung bei 100%
      scrollTrigger: {
        trigger: section, // Der Trigger ist das Section-Element selbst
        start: "top 80%", // Startet die Animation, wenn der Trigger 80% vom oberen Bildschirmrand erreicht
        end: "bottom top", // Endet, wenn der untere Rand des Triggers den oberen Bildschirmrand erreicht
        scrub: true // Glättet die Animation beim Scrollen
      }
    }
  );
});

 