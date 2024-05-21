 gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".reveal").forEach(section => {
  gsap.fromTo(section, 
    {
      autoAlpha: 0,
      scale: 0.5,
    },
    {
      autoAlpha: 1,
      scale: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom top", 
        scrub: true 
      }
    }
  );
});

 