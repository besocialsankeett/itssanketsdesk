import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { useIsTouch, useReducedMotion } from '../hooks/useMediaQuery'
import './CustomCursor.css'

/**
 * A small dot that becomes a word.
 *
 * Any element can drive it with data-cursor="OPEN" (or MOVE / LET'S TALK…).
 * We listen once on the document and walk up from the event target, so
 * components never have to wire up their own handlers.
 *
 * Never renders on touch devices or under reduced-motion.
 */
export default function CustomCursor() {
  const isTouch = useIsTouch()
  const reduced = useReducedMotion()
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [state, setState] = useState({ label: '', variant: 'idle' })

  const enabled = !isTouch && !reduced

  useEffect(() => {
    if (!enabled) return undefined

    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const dot = dotRef.current
    const ring = ringRef.current

    // The dot tracks tightly; the ring lags slightly. That gap is the whole
    // reason a custom cursor feels good rather than laggy.
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.09, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.09, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' })

    let visible = false

    const onMove = (e) => {
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onOver = (e) => {
      const target = e.target instanceof Element ? e.target.closest('[data-cursor]') : null
      if (target) {
        setState({
          label: target.dataset.cursor || '',
          variant: target.dataset.cursorVariant || 'label',
        })
        return
      }
      const clickable =
        e.target instanceof Element ? e.target.closest('a, button, [role="button"], input, textarea') : null
      setState(clickable ? { label: '', variant: 'hover' } : { label: '', variant: 'idle' })
    }

    const onDown = () => ring.classList.add('is-down')
    const onUp = () => ring.classList.remove('is-down')
    const onLeave = () => {
      visible = false
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)

    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor__dot" />
      <div ref={ringRef} className={`cursor__ring cursor__ring--${state.variant}`}>
        {state.label ? <span className="cursor__label">{state.label}</span> : null}
      </div>
    </div>
  )
}
