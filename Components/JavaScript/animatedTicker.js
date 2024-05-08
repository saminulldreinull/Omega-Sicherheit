
document.addEventListener('DOMContentLoaded', function() {
    const first = document.querySelector('.first');
    const second = document.querySelector('.second');
  
  const updateWidthAndAnimations = () => {
    const tickerWidth = first.offsetWidth;
    const duration = tickerWidth / 50; 
  
    first.style.animationDuration = `${duration}s`;
    second.style.animationDuration = `${duration}s`;
  
    // Update GSAP Animations
    gsap.to('.first', {
      x: () => `-${tickerWidth}px`,
      ease: 'linear',
      repeat: -1,
      duration: duration
    });
  
    gsap.to('.second', {
      x: () => `-${tickerWidth}px`,
      ease: 'linear',
      repeat: -1,
      duration: duration
    });
  };
  
  
    // Execute initially and on window resize
    updateWidthAndAnimations();
    window.addEventListener('resize', updateWidthAndAnimations);
  
    // GSAP animations for the infinite loop
    gsap.to('.first', {
      x: () => `-${first.offsetWidth}px`,
      ease: 'linear',
      repeat: -1,
      duration: 30 // Duration of animation in seconds
    });
  
    gsap.to('.second', {
      x: () => `-${second.offsetWidth}px`,
      ease: 'linear',
      repeat: -1,
      duration: 30 // Duration of animation in seconds
    });
  
    // Pause animation on hover
    document.querySelectorAll('.animated-ticker__container').forEach(container => {
      container.addEventListener('mouseenter', () => {
        gsap.globalTimeline.pause();
      });
      container.addEventListener('mouseleave', () => {
        gsap.globalTimeline.resume();
      });
    });
  
/*     document.addEventListener('DOMContentLoaded', function() {
      const factsSection = document.querySelector('#facts-section');
      const ticker = document.querySelector('.animated-ticker');
    
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (!entry.isIntersecting) {
                  ticker.style.opacity = '1';
                  ticker.style.transform = 'translateY(0%)'; 
              } else {
                  ticker.style.opacity = '0';
                  ticker.style.transform = 'translateY(100%)'; 
              }
          });
      }, { threshold: 0 });
    
      observer.observe(ticker);
    }); 
   */
    
  
  });
  