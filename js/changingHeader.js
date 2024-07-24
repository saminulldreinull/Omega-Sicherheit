window.onload = () => {
  let landingPage = document.getElementById('landing-page');
  let landingPageHeight = landingPage.offsetHeight;
  let header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    if (scrollY >= landingPageHeight) {
      header.style.backgroundColor = "rgb(0,0,77)";
      header.style.boxShadow = "0px 1px 3px 2px rgba(0,0,0,0.43)";
    } else {
      header.style.backgroundColor = "transparent";
      header.style.boxShadow = "none"; // Entfernt den Schatten, wenn zurück zur Landingpage
    }
  });
}
