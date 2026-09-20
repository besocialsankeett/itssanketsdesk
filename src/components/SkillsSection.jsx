import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { useStillMode } from '../hooks/useStillMode'
import CardboardLabel from './CardboardLabel'
import './SkillsSection.css'

/* ==========================================================================
   TOOLS ON MY DESK — the player card
   One collectible card lying on the mat, next to the foil pack it came in.
   Front: the LEGO self-portrait as the art, nine skills as stat bars.
   Back: what each stat actually means. Mouse tilts it, the foil catches the
   light, click flips it.

   Everything is scoped to this section: no global classes, no pinning.
   ========================================================================== */

const TOOLS = [
  { id: 'design', name: 'DESIGN', lvl: 92, line: 'Layout, type, systems — and the eleven versions before the one you see.' },
  { id: 'content', name: 'CONTENT', lvl: 95, line: 'Deciding what to post, why, and whether it earns the space.' },
  { id: 'video', name: 'VIDEO EDITING', lvl: 88, line: 'Cuts, pacing, and sound that lands on the right frame.' },
  { id: 'copy', name: 'COPYWRITING', lvl: 90, line: 'Sentences with a job to do. Usually shorter than the first draft.' },
  { id: 'direction', name: 'CREATIVE DIRECTION', lvl: 85, line: 'Holding twenty decisions to one idea, out loud, in a room.' },
  { id: 'story', name: 'VISUAL STORYTELLING', lvl: 90, line: 'Sequencing images until they stop describing and start arguing.' },
  { id: 'social', name: 'SOCIAL MEDIA', lvl: 94, line: 'Designing for a thumb at speed, not a wall at leisure.' },
  { id: 'web', name: 'WEB / DIGITAL', lvl: 78, line: 'Figma into something that actually scrolls. Like this one.' },
  { id: 'ai', name: 'AI CREATIVE TOOLS', lvl: 82, line: 'Faster drafts. The judgement still has to be mine.' },
]

const TILT = 11 // degrees, max, each axis

export default function SkillsSection() {
  const rootRef = useRef(null)
  const cardRef = useRef(null)
  const reduced = useStillMode()
  const [flipped, setFlipped] = useState(false)

  /* --- tilt + foil: pointer position → css vars on the card -------------- */
  const setPointer = useCallback((nx, ny) => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--ry', `${(nx - 0.5) * 2 * TILT}deg`)
    el.style.setProperty('--rx', `${(0.5 - ny) * 2 * TILT}deg`)
    el.style.setProperty('--mx', `${nx * 100}%`)
    el.style.setProperty('--my', `${ny * 100}%`)
  }, [])

  const onMove = (e) => {
    if (reduced || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    setPointer((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height)
  }
  const onLeave = () => setPointer(0.5, 0.5)

  /* --- reveal: the pack is dropped on the mat, the card slides out ------- */
  useLayoutEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.tc__stage', start: 'top 78%' },
        defaults: { ease: 'power3.out' },
      })
      tl.from('.tc__pack', { y: 40, rotate: -4, opacity: 0, duration: 0.7 })
        .from('.tc__scene', { x: -60, y: 24, rotate: -6, opacity: 0, duration: 0.9 }, 0.25)
        .from('.tc__cap', { y: 12, opacity: 0, duration: 0.5 }, 0.8)
        .from('.tc__intro', { y: 30, rotate: 3, opacity: 0, duration: 0.8 }, 0.45)
        .from('.tc__stat-fill', { scaleX: 0, transformOrigin: '0 50%', duration: 0.6, stagger: 0.05 }, 0.7)
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="skills section" ref={rootRef} aria-labelledby="skills-heading">
      <div className="shell">
        <header className="skills__head">
          <CardboardLabel variant="strip" rotate={1.2} className="skills__tag">
            <span className="section-tag__dot" />
            <span>04 — INVENTORY</span>
          </CardboardLabel>
          <h2 className="skills__heading t-xl" id="skills-heading">
            TOOLS ON MY DESK
          </h2>
          <p className="skills__note t-label">TILT IT. FLIP IT. ONE OF ONE.</p>
        </header>

        {/* the plain list, for anyone not playing */}
        <ul className="sr-only">
          {TOOLS.map((t) => (
            <li key={t.id}>
              {t.name} — {t.line}
            </li>
          ))}
        </ul>

        <div className="tc__stage">
          <div className="tc__deck">
          {/* ---------- the pack it came in ------------------------------- */}
          <div className="tc__pack" aria-hidden="true">
            <span className="tc__pack-tear" />
            <span className="tc__pack-brand">
              <b>SA DESK</b>
              <i>TRADING CARDS</i>
            </span>
            <span className="tc__pack-series">SERIES 04 · INVENTORY</span>
            <span className="tc__pack-note">1 CARD PER PACK · NO GUM</span>
            <span className="tc__pack-star">★ RARE</span>
          </div>

          {/* ---------- the card -------------------------------------------- */}
          <div className="tc__scene">
            <span className="tc__ground" aria-hidden="true" />
            <button
              type="button"
              className={`tc__card${flipped ? ' is-flipped' : ''}`}
              ref={cardRef}
              onPointerMove={onMove}
              onPointerLeave={onLeave}
              onClick={() => setFlipped((f) => !f)}
              aria-pressed={flipped}
              aria-label={flipped ? 'Player card, back. Press to show the front.' : 'Player card, front. Press to flip it over.'}
              data-cursor={flipped ? 'FRONT' : 'FLIP'}
            >
              <span className="tc__inner">
                {/* ----- front ----- */}
                <span className="tc__face tc__face--front">
                  <span className="tc__top">
                    <b className="tc__name">SANKET ATHAWALE</b>
                    <i className="tc__no">NO. 01 / 01</i>
                  </span>
                  <span className="tc__art">
                    <img
                      src="/assets/objects/portrait-lego@sm.jpg"
                      srcSet="/assets/objects/portrait-lego@sm.jpg 480w, /assets/objects/portrait-lego.jpg 900w"
                      sizes="(max-width: 767px) 78vw, 420px"
                      alt="Sanket, built out of LEGO bricks, taking a mirror selfie"
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                    />
                    <span className="tc__art-tag">CONTENT × SOCIAL × DESIGN × DIGITAL</span>
                  </span>
                  <span className="tc__stats">
                    {TOOLS.map((t) => (
                      <span className="tc__stat" key={t.id}>
                        <span className="tc__stat-name">{t.name}</span>
                        <span className="tc__stat-bar">
                          <span className="tc__stat-fill" style={{ width: `${t.lvl}%` }} />
                        </span>
                        <span className="tc__stat-val">{t.lvl}</span>
                      </span>
                    ))}
                  </span>
                  <span className="tc__foot">
                    <span>HOLO · RARE</span>
                    <span>PRINTED AT THE DESK · 2026</span>
                  </span>
                  <span className="tc__foil" aria-hidden="true" />
                  <span className="tc__glare" aria-hidden="true" />
                </span>

                {/* ----- back ----- */}
                <span className="tc__face tc__face--back">
                  <span className="tc__back-head">
                    <b>WHAT THE STATS MEAN</b>
                    <i>SA DESK · SERIES 04</i>
                  </span>
                  <span className="tc__back-list">
                    {TOOLS.map((t) => (
                      <span className="tc__back-row" key={t.id}>
                        <b>{t.name}</b>
                        <span>{t.line}</span>
                      </span>
                    ))}
                  </span>
                  <span className="tc__back-foot">
                    <span>NO. 01 / 01</span>
                    <span>DO NOT BEND</span>
                  </span>
                  <span className="tc__glare" aria-hidden="true" />
                </span>
              </span>
            </button>
            <p className="tc__cap t-micro">MOVE TO TILT · CLICK TO FLIP</p>
          </div>
          </div>

          {/* ---------- the intro, on a sheet taped beside the card ---------- */}
          <aside className="tc__intro paper" aria-label="A short intro">
            <span className="tape tc__intro-tape" aria-hidden="true" />
            <p className="tc__intro-hey">
              HOLA,
              <br />
              I’M SANKET.
            </p>
            <p>I’m a creative who likes turning ideas into things people actually want to stop and look at.</p>
            <p>
              I work across content, social media, video and visual design — writing, shooting, editing,
              and figuring things out along the way.
            </p>
            <p>
              A lot of my creativity comes from people — talking, storytelling, meeting new people and
              understanding how they see the world.
            </p>
            <p>
              Outside of work, you’ll probably find me drawing, dancing, cooking, doing calisthenics,
              making DIY stuff, or chasing some random hobby.
            </p>
            <span className="tc__intro-sign" aria-hidden="true">
              — S.A.
            </span>
          </aside>
        </div>
      </div>
    </section>
  )
}
