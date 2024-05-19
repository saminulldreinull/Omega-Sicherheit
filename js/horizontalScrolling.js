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
    end: () => `+=${document.querySelector(".races").scrollWidth}`,
    pin: true,
    animation: tween,
    scrub: true,
    invalidateOnRefresh: true
  });

  console.log('ScrollTrigger instance created.');
}

function refreshServiceSection() {
  console.log('Resizing window, refreshing service section...');

  if (tween) {
    tween.kill();  // Kill the previous tween
  }

  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();  // Kill the previous ScrollTrigger instance
  }

  // Recreate the animation and ScrollTrigger instance
  createScrollAnimation();

  // Refresh ScrollTrigger calculations
  ScrollTrigger.refresh();

  console.log('ScrollTrigger refreshed.');
}

// Initial creation of scroll animation
createScrollAnimation();
