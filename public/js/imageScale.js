const imageElement = document.getElementById("contact-image");

const tl = gsap.timeline({
  ease: "none",
  onUpdate: function() {
    if (tl.progress() > 0.5) {
      imageElement.style.borderRadius = '0';
    } else {
      imageElement.style.borderRadius = '15px';
    }
  }
});

tl.from(imageElement, {
  scale: 0.9,
  duration: 1,
  transformOrigin: "center",
}).to({}, {
  duration: 1
});

ScrollTrigger.create({
  trigger: "#contact-section",
  start: "top top",
  end: "bottom top",
  animation: tl,
  scrub: 0.8,
  pin: imageElement,
  pinSpacing: false,
  onEnter: () => {
    imageElement.classList.add('sticky');
    imageElement.style.position = 'fixed';
    imageElement.style.top = '0';
    imageElement.style.width = '100%';
    imageElement.style.height = '100vh';
  },
  onLeaveBack: () => {
    imageElement.classList.remove('sticky');
    imageElement.style.position = 'relative';
    imageElement.style.top = 'auto';
    imageElement.style.height = 'auto';
  }
});
 