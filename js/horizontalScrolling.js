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

// Contact-image/section scaling
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
  end: "bottom top", // Adjusted to the section height
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

// Intersection observer for text containers
const textContainers = document.getElementsByClassName('contact-text-container');
const textContainersArray = Array.from(textContainers);

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  }
}, { threshold: 1.0, rootMargin: '20%' });

textContainersArray.forEach(el => observer.observe(el));
