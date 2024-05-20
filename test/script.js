gsap.registerPlugin(ScrollTrigger);

const imageElement = document.getElementById("imageElement");

const tl = gsap.timeline({
    ease: "none",
    onUpdate: function() {
        if (tl.progress() > 0.5) {
            imageElement.style.borderRadius = '0';
        } else {
            imageElement.style.borderRadius = '15px';
        }
    }
});

tl.from("#image img", {
    scale: 0.9,
    duration: 1,
    transformOrigin: "center ",
}).to({}, {
    duration: 1
});

ScrollTrigger.create({
    trigger: "#image",
    start: "top top",
    end: "+=200%",
    pin: true,
    animation: tl,
    scrub: 0.8,
    pinSpacing: false
});