
document.addEventListener('scroll', function() {
    gsap.registerPlugin(ScrollTrigger);
    const scrollPosition = window.scrollY;
    const video = document.querySelector('video');
  
    video.style.transform = 'translateY(' + (-scrollPosition / 2) + 'px)';
  });
  