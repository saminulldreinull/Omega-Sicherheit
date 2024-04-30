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