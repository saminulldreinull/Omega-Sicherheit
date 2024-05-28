document.addEventListener("DOMContentLoaded", () => {
    const imageElement = document.getElementById("contact-image");
    const sections = document.querySelectorAll("section");
    const body = document.body;
    const textContainers = document.getElementsByClassName(
      "contact-text-container"
    );
  
    const textContainersArray = Array.from(textContainers);
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            textContainersArray.forEach((container) => {
              if (container !== entry.target) {
                container.classList.remove("visible");
              }
            });
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -20% 0px" }
    );
  
    textContainersArray.forEach((el) => observer.observe(el));
  
    function setBodyHeight() {
      let totalHeight = 0;
      sections.forEach((section) => {
        totalHeight += section.clientHeight;
      });
      body.style.height = `${totalHeight}px`;
    }
  
    gsap.registerPlugin(ScrollTrigger);
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        pin: imageElement,
        pinSpacing: false,
        markers: false
      }
    });
  
    tl.from(imageElement, {
      scale: 0.9,
      duration: 1,
      transformOrigin: "center",
      borderRadius: "15px"
    }).to(imageElement, {
      scale: 1,
      borderRadius: "0px",
      duration: 1
    });
  
    // Initial height setting
    setBodyHeight();
  
    // Update height on window resize
    window.addEventListener("resize", setBodyHeight);
  
    // Using matchMedia to handle different screen sizes
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addEventListener("change", setBodyHeight);
  });