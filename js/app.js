document.addEventListener('DOMContentLoaded', () => {

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal')
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  )
  revealEls.forEach(el => observer.observe(el))

  // ===== PARALLAX HERO =====
  const hero = document.querySelector('.hero')
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset
      hero.style.backgroundPositionY = `${scrolled * 0.4}px`
    })
  }

  // ===== SMOOTH SCROLL BTN =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault()
      const target = document.querySelector(anchor.getAttribute('href'))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })

  // ===== FLOATING PARTICLES (subtle bg effect) =====
  const particleCount = 40
  const body = document.body
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    const size = Math.random() * 3 + 1
    particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 20 + 15}s linear infinite;
      animation-delay: ${Math.random() * -20}s;
      opacity: ${Math.random() * 0.4 + 0.1};
    `
    body.appendChild(particle)
  }

  // inject float keyframes if not present
  if (!document.getElementById('particle-styles')) {
    const style = document.createElement('style')
    style.id = 'particle-styles'
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-100px) translateX(50px); }
        50% { transform: translateY(-200px) translateX(-30px); }
        75% { transform: translateY(-100px) translateX(40px); }
        100% { transform: translateY(0) translateX(0); }
      }
    `
    document.head.appendChild(style)
  }
})
