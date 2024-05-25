const imageElement = document.getElementById("contact-image");

function makeSticky() {
    imageElement.classList.add('sticky');
}

function removeSticky() {
    imageElement.classList.remove('sticky');
}

function checkPosition() {
    const contactSection = document.getElementById("contact-section");
    const rect = contactSection.getBoundingClientRect();

    if (rect.top <= 0 && rect.bottom >= 0) {
        makeSticky();
    } else {
        removeSticky();
    }
}

function initAnimation() {
    const tl = gsap.timeline({
        ease: "none",
        onUpdate: function () {
            if (tl.progress() > 0.5) {
                imageElement.style.borderRadius = '0';
            } else {
                imageElement.style.borderRadius = '15px';
            }
        }
    });

    tl.from(imageElement, {
        scale: 0.9,
        duration: 1,
        transformOrigin: "center",
    }).to({}, {
        duration: 1
    });

    ScrollTrigger.create({
        trigger: "#contact-section",
        start: "top top",
        end: "bottom top",
        animation: tl,
        scrub: 0.8,
        pin: imageElement,
        pinSpacing: false,
        onEnter: () => {
            makeSticky();
        },
        onLeaveBack: () => {
            removeSticky();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
        checkPosition();
        window.addEventListener('scroll', checkPosition);
    } else {
        initAnimation();
    }
});

window.addEventListener('resize', () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
        window.removeEventListener('scroll', checkPosition);
        window.addEventListener('scroll', checkPosition);
    } else {
        window.removeEventListener('scroll', checkPosition);
        initAnimation();
    }
});

