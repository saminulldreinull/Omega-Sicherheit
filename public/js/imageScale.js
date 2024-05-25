document.addEventListener('DOMContentLoaded', () => {
  const imageElement = document.getElementById("contact-image");
  const contactSection = document.getElementById("contact-section");

  function makeSticky() {
    imageElement.classList.add('sticky');
  }

  function removeSticky() {
    imageElement.classList.remove('sticky');
  }

  function initAnimation() {
    ScrollTrigger.create({
      trigger: "#contact-section",
      start: "top top",
      end: "bottom top",
      pin: imageElement,
      pinSpacing: false,
      onUpdate: self => {
        const progress = self.progress;
        imageElement.style.clipPath = `inset(0 0 ${progress * 100}% 0)`;
      },
      onEnter: () => makeSticky(),
      onLeave: () => removeSticky(),
      onLeaveBack: () => makeSticky(),
    });
  }

  if (window.matchMedia("(max-width: 768px)").matches) {
    window.addEventListener('scroll', () => {
      const rect = contactSection.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= 0) {
        makeSticky();
      } else {
        removeSticky();
      }
    });
  } else {
    initAnimation();
  }
});
