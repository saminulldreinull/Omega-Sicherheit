gsap.registerPlugin(ScrollTrigger);

// Horizontal scrolling in service-section/#service-area
const races = document.querySelector(".races");

function getScrollAmount() {
  let racesWidth = races.scrollWidth;
  return -(racesWidth - window.innerWidth);
}

let tween, scrollTriggerInstance;

function createScrollAnimation() {
  tween = gsap.to(races, {
    x: () => getScrollAmount(),
    duration: 3,
    ease: "none",
    force3D: true
  });

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: ".racesWrapper",
    start: "top 20%",
    end: () => `+=${races.scrollWidth}`,
    pin: true,
    animation: tween,
    scrub: true,
    invalidateOnRefresh: true
  });
}

function refreshServiceSection() {
  if (tween) {
    tween.kill(); 
  }

  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }

  createScrollAnimation();
  ScrollTrigger.refresh();
}

createScrollAnimation();

