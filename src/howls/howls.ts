import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { SplitText } from 'gsap/SplitText'
import { Draggable } from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(DrawSVGPlugin, SplitText, Draggable, ScrollTrigger)

const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)


/*
  Art carousel
  Step 1: find the list of images in the page.
  Step 2: put a second copy of all the images at the end of the list.
          Now the list is: [8 images][the same 8 images again].
  Step 3: slide the list to the right, forever.
          "xPercent" moves an element by a percentage of its own width.
          At -50% the copy is on screen; at 0% the originals are on screen.
          Both halves look the same, so when it jumps back to -50% you can't tell.
          duration = seconds for one loop (smaller = faster),
          ease 'none' = same speed the whole time, repeat -1 = forever.
  Step 4: slow down while the mouse is over the carousel.
          "timeScale" is the playback speed: 1 is normal, 0.2 is 5 times slower.
          gsap.to() changes it smoothly instead of all at once.
*/
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


/*
  Poster tilt
  When the mouse moves over the poster, tilt it towards the mouse.
  x and y say where the mouse is: -0.5 on one edge, 0 in the middle, 0.5 on the other edge.
  Multiplying by 20 turns that into an angle of up to 10 degrees.
  When the mouse leaves, GSAP turns it back flat.
*/
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
