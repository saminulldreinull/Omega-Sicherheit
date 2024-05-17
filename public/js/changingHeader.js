let logo = document.getElementById('logo');
let logoContainer = document.getElementById('logo-container');
let header = document.querySelector('header');
let landingPage = document.getElementById('landing-page');

function checkSection() {
    let landingPageHeight = landingPage.offsetHeight;
    let landingPageTop = landingPage.getBoundingClientRect().top + window.scrollY;

    if (window.scrollY < landingPageTop + landingPageHeight) {
        header.style.backgroundColor = 'transparent';
        header.style.willChange = 'background-color';  // Hinzufügen des will-change
        logo.classList.remove('logo-shrinked');
        logoContainer.classList.remove('logo-container-shrinked');
    } else {
        header.style.backgroundColor = 'rgb(0,0,77)';
        header.style.willChange = 'background-color';  // Hinzufügen des will-change
        logo.classList.add('logo-shrinked');
        logoContainer.classList.add('logo-container-shrinked');
    }
}

//Responsive Header
window.onload = () => {
    let openMenu = document.querySelector(".open-menu");
  
    openMenu.addEventListener("click", (e) => {
      document.documentElement.style.overflow = 'hidden';
    });
  
    let closeMenu = document.querySelector(".close-menu");
    closeMenu.addEventListener("click", (e) => {
      document.documentElement.style.overflow = 'visible';
    });
  
    let navLinks = document.querySelectorAll(".nav-item");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        closeMenu.click(); 
      });
    });
  
    window.addEventListener("scroll", (event) => {
      let scroll = this.scrollY;
      if (scroll > 10) {
        document.querySelector("header").classList.add("shadow");
      } else {
        document.querySelector("header").classList.remove("shadow");
      }
    });
};

window.addEventListener('resize', () => {
    const checkbox = document.getElementById('check');
    if (window.innerWidth > 1028 && checkbox.checked) {
      checkbox.checked = false;
      document.documentElement.style.overflow = 'visible';
    }
});

window.addEventListener('scroll', checkSection);

document.addEventListener('DOMContentLoaded', checkSection);
