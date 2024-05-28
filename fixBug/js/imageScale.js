document.addEventListener('DOMContentLoaded', () => {
    const imageElement = document.getElementById("contact-image");

    function initAnimation() {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

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
            pinSpacing: false
        });
    }

    function handleResize() {
        ScrollTrigger.refresh();
    }

    gsap.matchMedia().add({
        "(max-width: 768px)": function() {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.addEventListener('scroll', checkPosition);
        },
        "(min-width: 769px)": function() {
            window.removeEventListener('scroll', checkPosition);
            initAnimation();
        }
    });

    window.addEventListener('resize', handleResize);

    function checkPosition() {
        const rect = document.getElementById("contact-section").getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
            imageElement.style.position = 'fixed';
            imageElement.style.top = '0';
        } else {
            imageElement.style.position = 'relative';
            imageElement.style.top = '0';
        }
    }
});
