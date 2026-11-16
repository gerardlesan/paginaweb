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


//Art carousel

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

//Poster tilt

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
