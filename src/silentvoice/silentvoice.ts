import gsap from 'gsap'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Each scroll lasts 0.7 s and slows down towards the end (ease-out).
// Lenis's default never quite arrives, so it stalls and then jumps 1px; a fixed duration ends cleanly.
const lenis = new Lenis({
  duration: 0.7,
  easing: (t) => 1 - (1 - t) ** 3,
})
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)


/* Carousel */
const carousel = document.querySelector('.art-carousel') as HTMLElement

const originalImages = carousel.innerHTML
carousel.innerHTML = originalImages + originalImages

const carouselAnimation = gsap.fromTo(
  carousel,
  { xPercent: -50 },
  {
    xPercent: 0,
    duration: 40,
    ease: 'none',
    repeat: -1,
  }
)

function slowDown() {
  gsap.to(carouselAnimation, { timeScale: 0.2, duration: 1.2, overwrite: true, ease: 'power2.out'})
}

function speedUp() {
  gsap.to(carouselAnimation, { timeScale: 1.2, duration: 2, overwrite: true, ease: 'sine.inOut'})
}

carousel.addEventListener('mouseenter', slowDown)
carousel.addEventListener('mouseleave', speedUp)



/* Poster tilt */
const poster = document.querySelector('.poster') as HTMLElement

function tiltPoster(event: MouseEvent) {
  const x = event.offsetX / poster.offsetWidth - 0.5
  const y = event.offsetY / poster.offsetHeight - 0.5
  gsap.to(poster, { rotationY: x * 20, rotationX: -y * 20, transformPerspective: 800 })
}

function resetPoster() {
  gsap.to(poster, { rotationY: 0, rotationX: 0 })
}

poster.addEventListener('mousemove', tiltPoster)
poster.addEventListener('mouseleave', resetPoster)
