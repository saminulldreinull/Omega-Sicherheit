let headings = gsap.utils.toArray("h1");

headings.forEach(function (element, index) {
  gsap.to(element, {
    backgroundImage: "linear-gradient(45deg, #000 100%, #eee 200%, #000 300%)",
    duration: 2,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top 75%",
      end: "top 25%",
      scrub: true,
      markers: true
    }
  });
});

