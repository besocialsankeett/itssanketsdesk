/* Single place where GSAP plugins get registered, so no component has to
   remember to do it and we never register twice. */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Every desk animation shares this vocabulary. Physical things fall fast and
   settle slow; they do not ease linearly and they do not bounce like rubber. */
gsap.defaults({ ease: 'power3.out', duration: 0.9 })

export const EASE = {
  drop: 'power4.out', // an object being put down
  settle: 'power2.out', // paper coming to rest
  slide: 'expo.out', // something pushed across the desk
  snap: 'power2.inOut', // a flap opening/closing
}

export { gsap, ScrollTrigger }
