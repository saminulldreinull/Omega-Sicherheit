
document.addEventListener('scroll', function() {
    gsap.registerPlugin(ScrollTrigger);
    const scrollPosition = window.scrollY;
    const video = document.querySelector('video');
  
    // Bewegt das Video halb so schnell wie den Scroll-Vorgang
    video.style.transform = 'translateY(' + (-scrollPosition / 2) + 'px)';
  });
  