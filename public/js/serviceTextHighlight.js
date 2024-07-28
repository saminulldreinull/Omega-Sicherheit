function initAnimations() {
    document.querySelectorAll('.reveal-type').forEach((element) => {
        const bgColor = element.dataset.bgColor; 
        const fgColorLight = element.dataset.fgColorLight; 
        const fgColorDark = element.dataset.fgColorDark; 

        console.log('Initializing SplitType for element:', element);
        const text = new SplitType(element, { types: 'words' }); 

        const triggerPositions = {
            start: 'top 80%', 
            end: 'bottom 55%' 
        };

        gsap.fromTo(text.words, {
            color: bgColor, 
        }, {
            color: (i) => {
                if (text.words[i].parentNode.className.includes('highlight-light')) {
                    return fgColorLight;
                } else if (text.words[i].parentNode.className.includes('highlight-dark')) {
                    return fgColorDark;
                }
            },
            duration: 0.3,
            stagger: 0.1, 
            scrollTrigger: {
                trigger: element,
                start: triggerPositions.start,
                end: triggerPositions.end,
                scrub: 0.1,
                markers: true,  // Fügen Sie dies hinzu, um die ScrollTrigger-Marker zu sehen
                toggleActions: 'play none none reverse'
            }
        });
    });
}

function resetAnimations() {
    console.log('Resetting animations');
    gsap.killTweensOf('.reveal-type *');
    document.querySelectorAll('.reveal-type').forEach((element) => {
        const bgColor = element.dataset.bgColor;
        const text = new SplitType(element, { types: 'words' });

        text.words.forEach((word) => {
            word.style.color = bgColor;
        });
    });
}

function checkWindowSize() {
    console.log('Checking window size:', window.innerWidth);
    if (window.innerWidth <= 767) {
        console.log("Initializing animations for mobile view");
        initAnimations();
    } else {
        console.log("Resetting animations for larger view");
        resetAnimations();
    }
}

document.addEventListener('DOMContentLoaded', checkWindowSize);

window.addEventListener('resize', () => {
    checkWindowSize();
});
