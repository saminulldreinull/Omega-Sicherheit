window.onload = () => {
  let landingPage = document.getElementById('landing-page');
  let landingPageHeight = landingPage.offsetHeight;
  let header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    if (scrollY >= landingPageHeight) {
      header.style.backgroundColor = "rgb(0,0,77)";
    } else {
      header.style.backgroundColor = "transparent";
    }
  });
}
