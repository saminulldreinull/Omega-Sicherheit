// Selecting elements
const tickerWrapper = document.querySelector('.tickerwrapper');
const list = tickerWrapper.querySelector('ul.list');
const clonedList = list.cloneNode(true);

// Calculating the width of the list
let listWidth = 12; // Start with initial width if needed
list.querySelectorAll('li').forEach(li => {
    listWidth += li.offsetWidth;
});

// Calculate end position
const endPos = tickerWrapper.offsetWidth - listWidth;

// Setting styles
list.style.width = `${listWidth}px`;
clonedList.style.width = `${listWidth}px`;

// Adding cloned list to the DOM
clonedList.classList.add('cloned');
tickerWrapper.appendChild(clonedList);

// GSAP Animation
const infinite = gsap.timeline({ repeat: -1, paused: false, defaults: {ease: "none", force3D: true} });

infinite.fromTo(list, { x: 0 }, { duration: 20, x: -listWidth })
        .fromTo(clonedList, { x: listWidth }, { duration: 20, x: 0 }, 0)
        .set(list, { x: listWidth })
        .to(clonedList, { duration: 20, x: -listWidth }, 20)
        .to(list, { duration: 20, x: 0 }, 20);

// Pause/Play functionality
tickerWrapper.addEventListener('mouseenter', () => {
    infinite.pause();
});
tickerWrapper.addEventListener('mouseleave', () => {
    infinite.play();
});

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