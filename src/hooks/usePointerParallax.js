import { useEffect } from 'react'
import { gsap } from '../lib/gsap'
import { useIsTouch } from './useMediaQuery'
import { useStillMode } from './useStillMode'

/**
 * Mouse parallax for the desk.
 *
 * Every element carrying [data-depth] inside `scopeRef` drifts against the
 * pointer: move left, objects shift right. Depth is a multiplier — paper
 * scraps sit near 0.05, big foreground objects near 0.3.
 *
 * One rAF-throttled listener for the whole scene, one quickTo per element.
 * Disabled on touch and under reduced-motion.
 */
export function usePointerParallax(scopeRef, { max = 26, tilt = 0 } = {}) {
  const isTouch = useIsTouch()
  const reduced = useStillMode()

  useEffect(() => {
    const scope = scopeRef.current
    if (!scope || isTouch || reduced) return undefined

    const nodes = Array.from(scope.querySelectorAll('[data-depth]'))
    if (!nodes.length) return undefined

    const movers = nodes.map((el) => {
      const depth = parseFloat(el.dataset.depth) || 0.1
      return {
        depth,
        x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
      }
    })

    let rafId = null
    let px = 0
    let py = 0

    const apply = () => {
      rafId = null
      for (let i = 0; i < movers.length; i += 1) {
        const m = movers[i]
        m.x(-px * max * m.depth)
        m.y(-py * max * m.depth)
      }
      if (tilt) {
        gsap.to(scope, {
          rotateY: px * tilt,
          rotateX: -py * tilt,
          duration: 1,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }
    }

    const onMove = (e) => {
      // normalise to -1..1 around the viewport centre
      px = (e.clientX / window.innerWidth) * 2 - 1
      py = (e.clientY / window.innerHeight) * 2 - 1
      if (rafId === null) rafId = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      px = 0
      py = 0
      if (rafId === null) rafId = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      if (rafId !== null) cancelAnimationFrame(rafId)
      gsap.set(nodes, { x: 0, y: 0 })
    }
  }, [scopeRef, isTouch, reduced, max, tilt])
}
