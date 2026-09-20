import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useStillMode } from '../hooks/useStillMode'
import BlueprintPanel from './BlueprintPanel'
import './ProcessSection.css'

const STEPS = [
  { n: '01', title: 'THINK', body: 'Sit with it before opening anything. Most bad work is a good tool used too early.' },
  { n: '02', title: 'SKETCH', body: 'Ugly, fast, on paper. Twenty thumbnails beat one polished wrong idea.' },
  { n: '03', title: 'MAKE', body: 'Build the real thing at real size. Mockups lie about scale, always.' },
  { n: '04', title: 'BREAK', body: 'Deliberately wreck it. Wrong colour, wrong grid, wrong crop. Something usually survives.' },
  { n: '05', title: 'REFINE', body: 'Subtract. If a piece cannot justify itself out loud, it comes off.' },
  { n: '06', title: 'SHIP', body: 'Post it before it feels ready. Ready is a feeling that arrives two weeks late.' },
]

/**
 * "HOW I BUILD" — an engineering drawing with a sketchbook's contents.
 * The connector line literally draws itself as you scroll through.
 */
export default function ProcessSection() {
  const rootRef = useRef(null)
  const reduced = useStillMode()

  useLayoutEffect(() => {
    if (reduced) return undefined

    const ctx = gsap.context(() => {
      // draw the technical connector
      const path = rootRef.current.querySelector('.process__connector-path')
      if (path) {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.process__track', start: 'top 78%', end: 'bottom 62%', scrub: 0.6 },
        })
      }

      gsap.from('.process__step', {
        y: 34,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: '.process__track', start: 'top 76%' },
      })

      gsap.from('.process__dim', {
        scaleX: 0,
        opacity: 0,
        transformOrigin: 'left center',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.process__track', start: 'top 72%' },
      })

      // blueprint wipe on the panel itself
      gsap.from('.process__panel', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.15,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.process__panel', start: 'top 85%' },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="process" id="play" ref={rootRef} aria-labelledby="process-heading">
      <BlueprintPanel className="process__panel" title="HOW I BUILD" sheet="02" scale="NOT TO SCALE" rev="C">
        <div className="shell process__inner">
          <header className="process__head">
            <p className="process__eyebrow t-label">05 — FROM IDEA → THING</p>
            <h2 className="process__heading t-xxl" id="process-heading">
              HOW I<br />
              BUILD
            </h2>
            <p className="process__intro">
              Creative thinking is the fun half. This is the other half — the bit that decides
              whether an idea turns into a file or stays a nice thought in a notes app.
            </p>
          </header>

          {/* dimension line, like a measured span across the whole process */}
          <div className="process__dim" aria-hidden="true">
            <span className="process__dim-cap" />
            <span className="process__dim-line" />
            <span className="process__dim-label">IDEA — 6 STAGES — SHIPPED</span>
            <span className="process__dim-line" />
            <span className="process__dim-cap" />
          </div>

          <div className="process__track">
            <svg
              className="process__connector"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className="process__connector-path"
                d="M20 60 H180 l14 -22 l14 44 l14 -22 H400 q40 0 40 -26 t40 -26 H700 l16 26 l16 -26 H980 q60 0 60 30 v0 H1180"
                fill="none"
                stroke="rgba(190,222,255,.85)"
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <ol className="process__steps">
              {STEPS.map((s) => (
                <li className="process__step" key={s.n}>
                  <span className="process__step-node" aria-hidden="true">
                    <i />
                  </span>
                  <span className="process__step-n">{s.n}</span>
                  <h3 className="process__step-title">{s.title}</h3>
                  <p className="process__step-body">{s.body}</p>
                  <span className="process__step-coord t-micro" aria-hidden="true">
                    x{(120 + STEPS.indexOf(s) * 137).toString().padStart(4, '0')} · y0{STEPS.indexOf(s) + 1}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="process__margin" aria-hidden="true">
            <span className="process__scrawl">↓ this is where most of it falls apart</span>
            <svg viewBox="0 0 160 60" className="process__scrawl-arrow">
              <path
                d="M6 8c30 2 66 12 84 30 6 6 8 14 6 18"
                stroke="var(--yellow)"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              <path d="M88 46l8 10 10-6" stroke="var(--yellow)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </aside>
        </div>
      </BlueprintPanel>
    </section>
  )
}
