let animationsInitialized = false;

function initAnimations() {
    document.querySelectorAll('.reveal-type').forEach((element) => {
        const bgColor = element.dataset.bgColor; 
        const fgColorLight = element.dataset.fgColorLight; 
        const fgColorDark = element.dataset.fgColorDark; 

        const text = new SplitType(element, { types: 'words' }); 
        text.words.forEach(word => word.classList.add('split-word'));

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
                markers: false,
                toggleActions: 'play none none reverse'
            }
        });
    });

    animationsInitialized = true;
}

function resetAnimations() {
    gsap.killTweensOf('.reveal-type *');
    document.querySelectorAll('.reveal-type').forEach((element) => {
        element.innerHTML = element.textContent; // Restore the original text content
    });

    animationsInitialized = false;
}

function checkWindowSize() {
    if (window.innerWidth <= 767) {
        if (!animationsInitialized) {
            initAnimations();
        }
    } else {
        if (animationsInitialized) {
            resetAnimations();
        }
    }
}

document.addEventListener('DOMContentLoaded', checkWindowSize);

window.addEventListener('resize', () => {
    checkWindowSize();
});
