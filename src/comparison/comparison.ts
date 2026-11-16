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
