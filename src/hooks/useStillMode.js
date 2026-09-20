import { useEffect, useState } from 'react'
import { useReducedMotion } from './useMediaQuery'

/* ==========================================================================
   STILL MODE
   Two very different reasons to not animate, answered by one flag:

   1. The visitor asked for reduced motion.
   2. requestAnimationFrame is not running at all.

   (2) sounds theoretical but is not: a tab opened in the background, an
   embedded webview, aggressive power saving or a headless renderer can all
   suspend frames indefinitely. Because almost every reveal on this site
   starts at opacity 0, a suspended ticker would leave a blank green page —
   and Lenis, which drives scrolling from that same ticker, would leave the
   page unable to scroll at all.

   So: one module-level probe, shared by every component. setTimeout is not
   rAF-throttled, which is what makes the check possible. When still mode
   turns on, each GSAP context reverts and the site becomes a static, fully
   legible, natively-scrolling page.
   ========================================================================== */

let framesAlive = true
let probeStarted = false
const subscribers = new Set()

function setAlive(alive) {
  if (framesAlive === alive) return
  framesAlive = alive
  document.documentElement.classList.toggle('no-motion', !alive)
  subscribers.forEach((notify) => notify())
}

function probe() {
  let painted = false
  requestAnimationFrame(() => {
    painted = true
    // a late first frame (slow first paint, a pane that was still opening)
    // is not a dead ticker — the moment frames tick, motion comes back
    setAlive(true)
  })

  window.setTimeout(() => {
    if (painted) return
    if (document.hidden) {
      // background tab: frames are paused, not broken. Ask again once it
      // is actually on screen instead of locking the site into still mode.
      document.addEventListener('visibilitychange', probe, { once: true })
      return
    }
    setAlive(false)
  }, 1400)
}

function startProbe() {
  if (probeStarted || typeof window === 'undefined') return
  probeStarted = true
  probe()
}

/** True when we should not animate — for either reason. */
export function useStillMode() {
  const reduced = useReducedMotion()
  const [alive, setAlive] = useState(framesAlive)

  useEffect(() => {
    startProbe()
    const notify = () => setAlive(framesAlive)
    subscribers.add(notify)
    // in case the probe resolved before this component mounted
    if (alive !== framesAlive) setAlive(framesAlive)
    return () => subscribers.delete(notify)
  }, [alive])

  return reduced || !alive
}
