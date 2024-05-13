
const races = document.querySelector(".races");
function getScrollAmount() {
	let racesWidth = races.scrollWidth;
	return -(racesWidth - window.innerWidth);
}

const tween = gsap.to(races, {
    x: () => getScrollAmount(),  // Stelle sicher, dass dies eine Funktion ist, falls sich die Breite dynamisch ändert
    duration: 3,
    ease: "none",
    force3D: true
});

ScrollTrigger.create({
    trigger: ".racesWrapper",
    start: "top 20%",
    end: () => `+=${document.querySelector(".races").scrollWidth}`,
    pin: true,
    animation: tween,
    scrub: true,
    invalidateOnRefresh: true,
    onRefresh: () => tween.invalidate()
});