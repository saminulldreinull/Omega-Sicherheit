const h2s = document.querySelectorAll('h2')

const observer = new IntersectionObserver((entries) => {
	for (const entry of entries) {
  	if (entry.isIntersecting) {
	    entry.target.classList.add('visible')
    } else {
			entry.target.classList.remove('visible')
    }
  }
}, { threshold: 1.0, rootMargin: '20%' })
  
h2s.forEach(el => observer.observe(el))