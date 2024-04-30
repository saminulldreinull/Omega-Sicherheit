
  
const words = ["OMEGA SECURITY", "HIER WIRD IHNEN MIT SICHERHEIT GEHOLFEN!"];
let i = 0;

function animateWords() {
    let typewriter = document.getElementById("typewriter");
    typewriter.textContent = words[i];
    typewriter.style.animation = 'fadeInLeftToRight 3s forwards';

    setTimeout(() => {
        typewriter.style.animation = 'fadeOutRightToLeft 3s forwards'; 

        setTimeout(() => {
            i = (i + 1) % words.length;
            animateWords();
        }, 3000);
    }, 5000); 
}

document.addEventListener('DOMContentLoaded', animateWords);


/* Header change */
let logo = document.getElementById('logo');
let logoContainer = document.getElementById('logo-container');
let header = document.querySelector('header');
let landingPage = document.getElementById('landing-page');

function checkSection() {
    let landingPageHeight = landingPage.offsetHeight;
    let landingPageTop = landingPage.getBoundingClientRect().top + window.scrollY;

    if (window.scrollY < landingPageTop + landingPageHeight) {
        header.style.backgroundColor = 'transparent';
        logo.classList.remove('logo-shrinked');
        logoContainer.classList.remove('logo-container-shrinked');
    } else {
        logo.classList.add('logo-shrinked');
        logoContainer.classList.add('logo-container-shrinked');
        header.style.backgroundColor = 'rgb(0,0,77)';
    }
}


window.addEventListener('scroll', checkSection);

document.addEventListener('DOMContentLoaded', checkSection);

/* key-figure animation */
function linear(x) {
    return x; 
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = Math.min(timestamp - startTimestamp, duration); 
        let progress = elapsed / duration;
        progress = linear(progress); 

        const currentValue = Math.floor(progress * (end - start) + start);
        obj.textContent = "+" + currentValue;

        if (elapsed < duration) {
            window.requestAnimationFrame(step);
        } else {
            obj.textContent = "+" + end; 
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                animateValue(target, 0, parseInt(target.getAttribute('data-target')), 2000);
                observer.unobserve(target); 
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.key-number').forEach(element => {
        observer.observe(element);
    });

});
/* key figure animation ende */

/* horizontal scroll gsap */
const races = document.querySelector(".races");
console.log(races.offsetWidth)

function getScrollAmount() {
	let racesWidth = races.scrollWidth;
	return -(racesWidth - window.innerWidth);
}

const tween = gsap.to(races, {
	x: getScrollAmount,
	duration: 3,
	ease: "none",
});

ScrollTrigger.create({
	trigger:".racesWrapper",
	start:"top 20%",
	end: () => `+=${getScrollAmount() * -1}`,
	pin:true,
	animation:tween,
	scrub:1,
	invalidateOnRefresh:true,
	markers:false
})

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

