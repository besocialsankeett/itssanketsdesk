import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { useStillMode } from '../hooks/useStillMode'
import './Preloader.css'

const STEPS = [
  { n: '01', label: 'GRID' },
  { n: '02', label: 'OBJECTS' },
  { n: '03', label: 'IDEAS' },
  { n: '04', label: 'SANKET' },
]

/**
 * Blueprint check screen. Roughly 1.7s end to end — long enough to register
 * as art direction, short enough that nobody waits for it. Under
 * reduced-motion it does not render at all.
 */
export default function Preloader({ onDone }) {
  const rootRef = useRef(null)
  const reduced = useStillMode()
  const [done, setDone] = useState(reduced)

  useEffect(() => {
    // once it has left it never comes back, even if still mode toggles later
    if (done) return undefined
    if (reduced) {
      setDone(true)
      onDone?.()
      return undefined
    }

    document.body.style.overflow = 'hidden'

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      document.body.style.overflow = ''
      setDone(true)
      onDone?.()
    }

    // If frames never tick, the timeline's onComplete never fires and this
    // screen would cover the site forever. setTimeout is not rAF-throttled.
    const failsafe = window.setTimeout(finish, 3200)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish })

      tl.from('.pre__crosshair', { scale: 0.4, opacity: 0, duration: 0.5, ease: 'power3.out' })
        .from('.pre__rule', { scaleX: 0, duration: 0.55, ease: 'power2.inOut', stagger: 0.05 }, 0.1)
        .from(
          '.pre__step',
          { opacity: 0, x: -14, duration: 0.3, stagger: 0.16, ease: 'power2.out' },
          0.25
        )
        .to('.pre__step', { '--tick': 1, duration: 0.2, stagger: 0.16 }, 0.4)
        .to('.pre__bar-fill', { scaleX: 1, duration: 1.1, ease: 'power1.inOut' }, 0.25)
        // blueprint wipe: the whole sheet is pulled up and off the desk
        .to('.pre__sheet', { yPercent: -102, duration: 0.72, ease: 'power4.inOut' }, 1.35)
        .to(rootRef.current, { autoAlpha: 0, duration: 0.2 }, 1.9)
    }, rootRef)

    return () => {
      window.clearTimeout(failsafe)
      ctx.revert()
      document.body.style.overflow = ''
    }
  }, [reduced, done, onDone])

  if (done) return null

  return (
    <div className="pre" ref={rootRef} role="status" aria-live="polite">
      <span className="sr-only">Loading Sanket Athawale’s desk</span>
      <div className="pre__sheet blueprint-surface">
        {/* registration crosshairs, like a print proof */}
        <svg className="pre__crosshair" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="60" cy="60" r="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          <path d="M60 2v40M60 78v40M2 60h40M78 60h40" stroke="currentColor" strokeWidth="1" />
          <circle cx="60" cy="60" r="3" fill="currentColor" />
        </svg>

        <div className="pre__panel">
          <p className="pre__title t-label">BUILDING DESK…</p>
          <span className="pre__rule" />
          <ul className="pre__steps">
            {STEPS.map((s) => (
              <li className="pre__step" key={s.n}>
                <span className="pre__step-n">{s.n}</span>
                <span className="pre__step-slash">/</span>
                <span className="pre__step-label">{s.label}</span>
                <span className="pre__step-tick" aria-hidden="true">
                  ✓
                </span>
              </li>
            ))}
          </ul>
          <span className="pre__rule" />
          <div className="pre__bar">
            <span className="pre__bar-fill" />
          </div>
          <p className="pre__meta t-micro">
            <span>SHEET 01 OF 01</span>
            <span>SCALE 1:1</span>
            <span>REV. C</span>
          </p>
        </div>
      </div>
    </div>
  )
}
