import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useStillMode } from './useStillMode'

/**
 * Smooth scroll, driven by GSAP's ticker so Lenis and ScrollTrigger never
 * fight over the frame. Returns a ref to the instance for stop()/start().
 *
 * Reduced motion turns Lenis off entirely — native scrolling is the
 * accessible default, not a degraded one.
 */
export function useLenis() {
  const lenisRef = useRef(null)
  const reduced = useStillMode()

  useEffect(() => {
    if (reduced) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Never hijack touch scrolling — it makes phones feel broken.
      syncTouch: false,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker so the two never run on separate frames.
    // No scrollerProxy: in its default mode Lenis moves the real window
    // scroll position, so ScrollTrigger reads it correctly on its own. Adding
    // a proxy here makes ScrollTrigger compute against a scroller that does
    // not exist, and the resulting throw kills the ticker mid-timeline.
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  return lenisRef
}

/** Imperative scroll used by nav links and the case-study close button. */
export function scrollToSection(lenis, target, offset = 0) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.3 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
