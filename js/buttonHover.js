document.querySelectorAll('.button-container, .form-button-container').forEach(button => {
  button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(button, {
          x: x * 0.2, // Stärkere Bewegung
          y: y * 0.2,
          scale: 1.05, // Leichte Skalierung auf 105% der Originalgröße
          duration: 0.3,
          ease: 'power1.out'
      });
  });

  button.addEventListener('mouseleave', () => {
      gsap.to(button, {x: 0, y: 0, scale: 1, duration: 0.3, ease: 'power1.out'}); // Rücksetzung auf normale Größe und Position
  });
});
