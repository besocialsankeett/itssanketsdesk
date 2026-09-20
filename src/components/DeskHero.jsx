import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { usePointerParallax } from '../hooks/usePointerParallax'
import { useIsMobile } from '../hooks/useMediaQuery'
import { useStillMode } from '../hooks/useStillMode'
import { identity } from '../data/site'
import FloatingObject from './FloatingObject'
import PhotoObject from './PhotoObject'
import './DeskHero.css'

const STATEMENT = ['I DESIGN THINGS.', 'I WRITE THINGS.', 'I EDIT THINGS.', 'I MAKE THINGS.']

/**
 * Layer order, bottom to top:
 *   1 cutting mat   2 blueprint sheet   3 cast shadows   4 large objects
 *   5 paper + cardboard   6 typography   7 annotations
 *
 * The centre of the frame is kept deliberately clear — objects live at the
 * edges so the type always has air around it. That restraint is the only
 * thing separating "intentionally messy" from "messy".
 */
export default function DeskHero({ ready }) {
  const rootRef = useRef(null)
  const sceneRef = useRef(null)
  const reduced = useStillMode()
  const isMobile = useIsMobile()
  const [egg, setEgg] = useState(null) // which easter egg is showing

  usePointerParallax(sceneRef, { max: isMobile ? 0 : 30 })

  /* --- someone is setting the desk up ---------------------------------- */
  useLayoutEffect(() => {
    if (reduced) return undefined

    const ctx = gsap.context(() => {
      // Hidden before paint so nothing flashes into position.
      gsap.set('[data-fall]', { autoAlpha: 0, y: 46, scale: 0.94 })
      gsap.set('[data-slide]', { autoAlpha: 0, xPercent: -8 })
      gsap.set('[data-pop]', { autoAlpha: 0, scale: 0.6 })
      gsap.set('.hero__sheet', { autoAlpha: 0, xPercent: -12, rotate: -8 })
      gsap.set('.hero__note', { autoAlpha: 0 })
    }, rootRef)

    return () => ctx.revert()
  }, [reduced])

  useLayoutEffect(() => {
    if (reduced || !ready) return undefined

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1 — the blueprint sheet is pushed onto the desk
      tl.to('.hero__sheet', { autoAlpha: 1, xPercent: 0, rotate: -2.4, duration: 0.9, ease: 'expo.out' })

        // 2 — big objects get put down, heaviest first
        .to(
          '[data-fall]',
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power4.out',
            stagger: { each: 0.055, from: 'random' },
          },
          0.18
        )

        // 3 — paper strips slide in one after another, like they were dealt
        .to(
          '[data-slide]',
          { autoAlpha: 1, xPercent: 0, duration: 0.7, ease: 'expo.out', stagger: 0.075 },
          0.42
        )

        // 4 — the small stuff lands last
        .to('[data-pop]', { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2.2)', stagger: 0.05 }, 0.85)
        .to('.hero__note', { autoAlpha: 1, duration: 0.5, stagger: 0.06 }, 1.05)

      // --- scroll: the desk pulls apart as you leave it -------------------
      gsap.to('.hero__type', {
        yPercent: -18,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })

      // Objects drift outward at different rates — parallax on exit.
      gsap.utils.toArray('[data-drift]').forEach((el) => {
        const amt = parseFloat(el.dataset.drift)
        gsap.to(el, {
          yPercent: amt,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 0.9 },
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [reduced, ready])

  /* --- easter eggs ------------------------------------------------------ */
  const fireEgg = (id) => {
    setEgg(id)
    window.clearTimeout(fireEgg.t)
    fireEgg.t = window.setTimeout(() => setEgg(null), 2600)
  }

  return (
    <section className="hero" id="top" ref={rootRef} aria-labelledby="hero-heading">
      {/* ---------- L1 · cutting mat ------------------------------------- */}
      <div className="hero__mat mat-surface" aria-hidden="true">
        {/* wear: the mat has been cut on for years */}
        <span className="hero__mat-wear" />
        <span className="hero__mat-grain" />
        <span className="hero__mat-vignette" />

        {/* Printed markings — every real self-healing mat has a cm scale on
            two edges, angle guides, and a size label. Then the blade marks. */}
        <svg className="hero__mat-guides" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <defs>
            <pattern id="matScale" width="48" height="900" patternUnits="userSpaceOnUse">
              <path d="M0 0v14M12 0v6M24 0v9M36 0v6" stroke="rgba(236,255,246,.55)" strokeWidth="1" />
              <path d="M0 900v-14M12 900v-6M24 900v-9M36 900v-6" stroke="rgba(236,255,246,.4)" strokeWidth="1" />
            </pattern>
            <pattern id="matScaleV" width="1440" height="48" patternUnits="userSpaceOnUse">
              <path d="M0 0h14M0 12h6M0 24h9M0 36h6" stroke="rgba(236,255,246,.5)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1440" height="900" fill="url(#matScale)" />
          <rect width="1440" height="900" fill="url(#matScaleV)" />
          {/* cm numbers along the top edge. One cell is 2 cm, so a major
              line every 5 cells is 10 cm — the frame is a 60 cm mat. */}
          <g fontFamily="'IBM Plex Mono',monospace" fontSize="10" fill="rgba(236,255,246,.6)">
            {Array.from({ length: 7 }, (_, i) => (
              <text key={i} x={i * 240 + 4} y="26">
                {i * 10}
              </text>
            ))}
          </g>
          <g fontFamily="'IBM Plex Mono',monospace" fontSize="10" fill="rgba(236,255,246,.5)">
            {Array.from({ length: 4 }, (_, i) => (
              <text key={i} x="18" y={i * 240 + 30}>
                {i * 10}
              </text>
            ))}
          </g>
          {/* angle guides */}
          <path d="M0 150 L1440 150" stroke="rgba(233,255,244,.18)" strokeWidth="1.2" />
          <path d="M0 750 L1440 750" stroke="rgba(233,255,244,.18)" strokeWidth="1.2" />
          <path d="M170 0 L890 900" stroke="rgba(233,255,244,.12)" strokeWidth="1" />
          <path d="M1270 0 L550 900" stroke="rgba(233,255,244,.12)" strokeWidth="1" />
          <circle cx="720" cy="450" r="160" fill="none" stroke="rgba(233,255,244,.1)" strokeWidth="1" strokeDasharray="3 5" />
          <text x="1330" y="882" fontFamily="'IBM Plex Mono',monospace" fontSize="10" letterSpacing="3" fill="rgba(236,255,246,.42)">
            A2 · SELF-HEALING
          </text>
          {/* blade scratches — pale, slightly lighter than the mat, never straight */}
          <g stroke="rgba(236,255,246,.13)" strokeWidth="0.8" fill="none" strokeLinecap="round">
            <path d="M420 322l198 141" />
            <path d="M448 318l176 130" />
            <path d="M980 190l-64 212" />
            <path d="M300 640l280 -18" />
            <path d="M1040 700l160 -96" />
            <path d="M620 520l22 168" />
            <path d="M120 420l60 -120" />
          </g>
          <g stroke="rgba(3,20,13,.22)" strokeWidth="0.6" fill="none" strokeLinecap="round">
            <path d="M421 323l198 141" />
            <path d="M981 191l-64 212" />
            <path d="M1041 701l160 -96" />
          </g>
        </svg>
      </div>

      {/* ---------- L2 · blueprint sheet --------------------------------- */}
      <div
        className="hero__sheet blueprint-surface"
        aria-hidden="true"
        onClick={() => fireEgg('blueprint')}
      >
        <svg className="hero__sheet-marks" viewBox="0 0 560 396" aria-hidden="true">
          <rect x="16" y="16" width="528" height="364" fill="none" stroke="rgba(190,222,255,.5)" strokeWidth="1" />
          <rect x="28" y="28" width="504" height="340" fill="none" stroke="rgba(190,222,255,.22)" strokeDasharray="5 4" />
          <circle cx="420" cy="200" r="78" fill="none" stroke="rgba(190,222,255,.4)" />
          <circle cx="420" cy="200" r="46" fill="none" stroke="rgba(190,222,255,.25)" strokeDasharray="4 4" />
          <path d="M342 200h156M420 122v156" stroke="rgba(190,222,255,.4)" />
          <path d="M40 350h480M40 344v12M520 344v12" stroke="rgba(190,222,255,.5)" />
          <text x="280" y="340" textAnchor="middle" fontSize="11" fontFamily="'IBM Plex Mono',monospace" fill="rgba(207,228,255,.7)">
            420 mm
          </text>
          <text x="30" y="372" fontSize="10" fontFamily="'IBM Plex Mono',monospace" fill="rgba(207,228,255,.55)" letterSpacing="2">
            A3 · CUTTING MAT · SHEET 01
          </text>
        </svg>
      </div>

      {/* ---------- L3–L7 · everything on top of the surfaces ------------ */}
      <div className="hero__scene" ref={sceneRef}>
        {/* ==============================================================
             REAL OBJECTS AT REAL SCALE
             The mat grid is the ruler: one 48px cell ≈ 2 cm, so a 1440px
             frame is roughly an A2 mat (60 × 42 cm) seen from above.
             Sizes are the objects' true dimensions at that scale.

             The name owns the centre of the frame. Objects live at the
             edges and corners, cropped by the frame like a photograph:
               TOP-LEFT      headphones
               LEFT          two prints, the earphones
               TOP-RIGHT     the phone, alone
               BOTTOM-RIGHT  the laptop
               TOP-MIDDLE    the cutter, under the taped nav
             Every object is one of Sanket's photographs. Nothing is drawn.
           ============================================================== */}

        {/* Headphones — ~18 cm across, band up, tucked into the corner */}
        <FloatingObject
          x="-9%"
          y="-17%"
          width="clamp(180px, 28vw, 415px)"
          className="obj--photo hero__headphones"
          rotate={-30}
          depth={0.12}
          z={20}
          ground
          data-fall
          data-drift="-14"
          hide="mobile"
        >
          <PhotoObject name="headphones" width={599} height={751} priority />
        </FloatingObject>

        {/* MacBook Air 13" — 30.4 cm. Bottom-right, cropped on two sides. */}
        <FloatingObject
          x="63%"
          y="60%"
          width="clamp(300px, 51vw, 760px)"
          rotate={5}
          depth={0.08}
          z={16}
          className="obj--photo hero__macbook"
          ground
          data-fall
          data-drift="-10"
          hide="mobile"
        >
          <PhotoObject name="macbook" width={633} height={449} priority />
        </FloatingObject>

        {/* Phone — 7.6 × 16 cm, on its own on the green */}
        <FloatingObject
          x="85%"
          y="3%"
          width="clamp(80px, 12.4vw, 184px)"
          rotate={-8}
          depth={0.14}
          z={24}
          className="obj--photo hero__phone"
          ground
          data-fall
          data-drift="-16"
          hide="mobile"
        >
          <PhotoObject name="phone" width={387} height={808} priority />
        </FloatingObject>

        {/* Two Instax prints (8.6 × 10.8 cm) down the left side */}
        <FloatingObject x="2%" y="38%" width="clamp(120px, 14.3vw, 206px)" rotate={-9} depth={0.16} z={30} shadow="paper" className="hero__print1" ground data-fall hide="mobile">
          <figure className="hero__photo">
            <img src="/assets/projects/sm/spline-forest.jpg" alt="" width="800" height="465" loading="eager" decoding="async" />
            <figcaption className="t-micro">FOREST · SPLINE</figcaption>
          </figure>
        </FloatingObject>
        <FloatingObject x="7%" y="66%" width="clamp(120px, 14.3vw, 206px)" rotate={6} depth={0.18} z={31} shadow="paper" className="hero__print2" ground data-fall hide="mobile">
          <figure className="hero__photo">
            <img src="/assets/projects/sm/sxnt-frame.jpg" alt="" width="350" height="340" loading="lazy" decoding="async" />
            <figcaption className="t-micro">SXNT · 2026</figcaption>
          </figure>
        </FloatingObject>

        {/* Cutter — 16 cm, under the taped nav card, blade left */}
        <FloatingObject
          x="60%"
          y="-7%"
          width="clamp(46px, 6.2vw, 92px)"
          rotate={104}
          depth={0.18}
          z={26}
          className="obj--photo hero__cutter"
          ground
          data-fall
          data-drift="-18"
          hide="mobile"
        >
          <PhotoObject name="cutter" width={334} height={1400} priority />
        </FloatingObject>

        {/* Earphones — a 15 cm tangle by the laptop's left edge */}
        <FloatingObject x="42%" y="78%" width="clamp(160px, 25vw, 372px)" rotate={28} depth={0.11} z={18} className="obj--photo hero__earphones" ground data-fall data-drift="-12" hide="mobile">
          <PhotoObject name="earphones" width={638} height={671} />
        </FloatingObject>

        {/* Ruler — 30 cm, along the bottom-left edge, mostly out of frame */}
        <FloatingObject
          x="-4%"
          y="90%"
          width="clamp(320px, 45vw, 660px)"
          rotate={2}
          depth={0.1}
          z={14}
          ground
          data-fall
          data-drift="-10"
          className="obj--live obj--photo hero__ruler"
          onClick={() => fireEgg('ruler')}
          data-cursor="MEASURE"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), fireEgg('ruler'))}
          aria-label="Easter egg: measure the desk"
        >
          <PhotoObject name="ruler" width={1105} height={594} priority />
        </FloatingObject>

        {/* ---- mobile-only cluster --------------------------------------
             Same real objects, sized for a phone frame. */}
        <FloatingObject x="-12%" y="-6%" width="50vw" rotate={-28} depth={0.1} z={20} className="obj--photo" ground data-fall hide="above-mobile">
          <PhotoObject name="headphones" width={599} height={751} />
        </FloatingObject>
        <FloatingObject x="68%" y="66%" width="24vw" rotate={-10} depth={0.14} z={24} className="obj--photo" ground data-fall hide="above-mobile">
          <PhotoObject name="phone" width={387} height={808} />
        </FloatingObject>
        <FloatingObject x="70%" y="2%" width="12vw" rotate={74} depth={0.12} z={23} className="obj--photo" ground data-fall hide="above-mobile">
          <PhotoObject name="cutter" width={334} height={1400} />
        </FloatingObject>
        <FloatingObject x="4%" y="76%" width="30vw" rotate={-7} depth={0.12} z={30} shadow="paper" ground data-fall hide="above-mobile">
          <figure className="hero__photo">
            <img src="/assets/projects/sm/spline-forest.jpg" alt="" width="800" height="465" loading="lazy" decoding="async" />
            <figcaption className="t-micro">FOREST · SPLINE</figcaption>
          </figure>
        </FloatingObject>

        {/* ---- L6 · typography, assembled from separate pieces ---------- */}
        <div className="hero__type">
          <h1 id="hero-heading" className="hero__heading">
            <span className="sr-only">
              Hi, I’m Sanket Athawale. I design things, I write things, I edit things, I make things.
            </span>

            <span className="hero__hi paper paper--torn" data-slide aria-hidden="true">
              HI, I’M
            </span>

            <span className="hero__name" data-slide aria-hidden="true">
              <span className="hero__name-card cardboard cardboard--flute-bottom">
                <span className="tape hero__name-tape" />
                SANKET
              </span>
              <span className="hero__dot" data-pop />
            </span>

            {/* Embossed label tape — the deliberate opposite of the cardboard
                above it: machine-precise, mono, tightly punched out. */}
            <span className="hero__last" data-slide aria-hidden="true">
              <span className="hero__last-tape">ATHAWALE</span>
            </span>
          </h1>

          <ul className="hero__statement" aria-hidden="true">
            {STATEMENT.map((line, i) => (
              <li
                key={line}
                className="hero__line paper"
                data-slide
                style={{ '--i': i, '--rot': `${[-1.4, 0.8, -0.6, 1.5][i]}deg` }}
              >
                <span className="hero__line-n t-micro">{String(i + 1).padStart(2, '0')}</span>
                {line}
              </li>
            ))}
          </ul>

          <div className="hero__meta">
            <span className="hero__role t-label" data-pop>
              {identity.role}
            </span>
            <p className="hero__sticky sticky" data-pop>
              <span className="t-micro">POST-IT #12</span>
              CURRENTLY
              <br />
              MAKING STUFF.
            </p>
          </div>
        </div>

        {/* ---- L7 · annotations ---------------------------------------- */}
        <span className="hero__note hero__note--b t-micro" aria-hidden="true">
          x: 0420 · y: 0117
        </span>
        <span className="hero__note hero__note--c t-micro" aria-hidden="true">
          DO NOT DELETE
        </span>
        <span className="hero__note hero__note--d t-micro" aria-hidden="true">
          STILL FIGURING IT OUT
        </span>

        {/* hand-drawn arrow pointing at the name */}
        <svg className="hero__arrow hero__note" viewBox="0 0 120 80" aria-hidden="true">
          <path
            d="M112 8C88 2 44 6 22 34c-6 8-8 20-2 30"
            stroke="var(--yellow)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M12 52l8 14 12-9" stroke="var(--yellow)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ---------- scroll cue ------------------------------------------- */}
      <div className="hero__scroll hero__note" aria-hidden="true">
        <span className="t-micro">SCROLL — THE DESK CONTINUES</span>
        <span className="hero__scroll-track">
          <i />
        </span>
      </div>

      {/* ---------- easter-egg readouts ----------------------------------- */}
      <div className="hero__egg" role="status" aria-live="polite">
        {egg === 'ruler' && <span className="hero__egg-chip">MEASURED. IT IS EXACTLY ENOUGH.</span>}
        {egg === 'blueprint' && <span className="hero__egg-chip">TECHNICAL OVERLAY — EVERYTHING IS ON PURPOSE</span>}
      </div>
    </section>
  )
}