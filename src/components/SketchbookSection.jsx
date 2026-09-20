import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { useStillMode } from '../hooks/useStillMode'
import { useIsMobile } from '../hooks/useMediaQuery'
import { contact } from '../data/site'
import CardboardLabel from './CardboardLabel'
import './SketchbookSection.css'

/* ==========================================================================
   THE NOTEBOOK
   An A5 sketchbook lying open on the mat. Five spreads, one per thing
   Sanket does. Left page: the number, the word, three honest lines.
   Right page: a real piece of work taped in. Scrolling turns the pages.
   ========================================================================== */

const SPREADS = [
  {
    n: '01',
    title: 'DESIGN',
    note: 'Visual systems, social creatives, brand assets and digital experiences. Mostly: making a thing look like it means it.',
    img: { src: '/assets/projects/sm/papercut-cover.jpg', alt: 'Paper Cut brand guide, opening spread' },
    cap: 'PAPER CUT — BRAND GUIDE, P.1',
    tab: '#e4462f',
  },
  {
    n: '02',
    title: 'CONTENT',
    note: 'Ideas, campaigns, community content and creative communication. Working out what to say before worrying how it looks.',
    img: { src: '/assets/projects/sm/netizens-home.jpg', alt: 'The Indian Netizens homepage' },
    cap: 'THEINDIANNETIZENS.IN — WROTE FOR IT, CUT VIDEO FOR IT',
    tab: '#ffd230',
  },
  {
    n: '03',
    title: 'EDITING',
    note: 'Short-form video, visual storytelling, pacing. Cutting until only the part worth keeping is left.',
    /* the reels live on Instagram — a taped note points there instead of a fake still */
    sticky: { head: 'THE REELS LIVE HERE →', lines: ['@social.sankeett', 'Bibliophiles · UGC · product'], href: contact.links[1].href },
    cap: 'SCRIPTED, SHOT, CUT — CAPCUT, MOSTLY AT NIGHT',
    tab: '#2f6b57',
  },
  {
    n: '04',
    title: 'WRITING',
    note: 'Captions, scripts, concepts. Words are a design tool — they just take longer to admit it.',
    img: { src: '/assets/projects/sm/papercut-name.jpg', alt: 'Paper Cut — the name, and the brand voice' },
    cap: 'PAPER CUT — “FOLD YOUR OWN. BUILD WEIRD STUFF.”',
    tab: '#1a4fae',
  },
  {
    n: '05',
    title: 'IDEATION',
    note: 'Taking rough thoughts and turning them into something other people can actually see.',
    img: { src: '/assets/projects/sm/stickers-framer.jpg', alt: '3D Stickers — an interactive page' },
    cap: '3D STICKERS — A THOUGHT THAT BECAME A PAGE',
    tab: '#e4462f',
  },
]

/* ---------- page contents ------------------------------------------------ */
function LeftPage({ s }) {
  return (
    <div className="sk__content sk__content--left">
      <span className="sk__meta t-micro">SPREAD {s.n} / 05</span>
      <span className="sk__num">{s.n}</span>
      <h3 className="sk__title">{s.title}</h3>
      <p className="sk__note">{s.note}</p>
      <span className="sk__scrawl" aria-hidden="true">
        ↳ see right
      </span>
    </div>
  )
}

function RightPage({ s }) {
  return (
    <div className="sk__content sk__content--right">
      <figure className="sk__print" style={{ '--tilt': `${s.n % 2 ? -2.2 : 1.8}deg` }}>
        <span className="tape sk__tape sk__tape--l" aria-hidden="true" />
        <span className="tape sk__tape sk__tape--r" aria-hidden="true" />
        {s.img ? (
          <img src={s.img.src} alt={s.img.alt} loading="lazy" decoding="async" />
        ) : (
          <a className="sk__sticky sticky" href={s.sticky.href} target="_blank" rel="noreferrer noopener" data-cursor="OPEN ↗">
            <span className="t-micro">{s.sticky.head}</span>
            {s.sticky.lines.map((l) => (
              <b key={l}>{l}</b>
            ))}
          </a>
        )}
        <figcaption className="t-micro">{s.cap}</figcaption>
      </figure>
    </div>
  )
}

export default function SketchbookSection() {
  const rootRef = useRef(null)
  const stRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const reduced = useStillMode()
  const isMobile = useIsMobile()
  const flat = reduced || isMobile

  useLayoutEffect(() => {
    if (flat) return undefined

    const ctx = gsap.context(() => {
      const sheets = gsap.utils.toArray('.sk__sheet')
      const steps = sheets.length // 4 turns for 5 spreads

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.sk__pin',
          start: 'top top',
          end: `+=${steps * 90}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => setCurrent(Math.min(steps, Math.round(self.progress * steps))),
        },
      })
      stRef.current = tl.scrollTrigger

      sheets.forEach((sheet, i) => {
        const shade = sheet.querySelector('.sk__turn-shade')
        // the sheet being turned rides above every other sheet, then settles
        // into the flipped stack in order
        tl.set(sheet, { zIndex: 40 }, i)
          .to(sheet, { rotateY: -180, duration: 1, ease: 'power1.inOut' }, i)
          .fromTo(shade, { opacity: 0 }, { opacity: 0.55, duration: 0.5, ease: 'sine.in' }, i)
          .to(shade, { opacity: 0, duration: 0.5, ease: 'sine.out' }, i + 0.5)
          .set(sheet, { zIndex: 20 + i }, i + 1)
      })

      // the whole book settles a hair as pages move — weight, not decoration
      tl.to('.sk__book', { rotate: -0.6, duration: steps, ease: 'none' }, 0)
    }, rootRef)

    return () => {
      ctx.revert()
      stRef.current = null
    }
  }, [flat])

  const jump = (i) => {
    const st = stRef.current
    if (!st) return
    const y = st.start + ((st.end - st.start) * i) / (SPREADS.length - 1)
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const last = SPREADS[SPREADS.length - 1]

  return (
    <section className="sk section" id="about" ref={rootRef} aria-labelledby="sk-heading">
      <div className="shell">
        <header className="sk__head">
          <CardboardLabel variant="strip" rotate={-1.4} className="sk__tag">
            <span className="section-tag__dot" />
            <span>02 — WHAT’S INSIDE</span>
          </CardboardLabel>
          <h2 className="sk__heading t-xxl" id="sk-heading">
            THE
            <br />
            NOTEBOOK.
          </h2>
          <p className="sk__intro">
            I do not have one job title and I have stopped pretending I want one. Five things I do,
            one spread each — with the honest version of what each one means, and a piece of the
            real work taped in.
          </p>
        </header>
      </div>

      {flat ? (
        /* ---------- phones + reduced motion: the spreads, stacked ---------- */
        <div className="shell sk__flat">
          {SPREADS.map((s) => (
            <article className="sk__flat-spread" key={s.n}>
              <div className="sk__page sk__page--left">
                <LeftPage s={s} />
              </div>
              <div className="sk__page sk__page--right">
                <RightPage s={s} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* ---------- the book, pinned while the pages turn ------------------- */
        <div className="sk__pin">
          <div className="sk__stage">
            <div className="sk__book">
              <span className="sk__ground" aria-hidden="true" />

              {/* the left-most page and right-most page never move */}
              <div className="sk__page sk__page--left sk__page--base">
                <LeftPage s={SPREADS[0]} />
              </div>
              <div className="sk__page sk__page--right sk__page--base">
                <RightPage s={last} />
              </div>

              {/* each sheet: front = this spread's right page,
                  back = the next spread's left page */}
              {SPREADS.slice(0, -1).map((s, i) => (
                <div className="sk__sheet" key={s.n} style={{ zIndex: 20 - i }}>
                  <div className="sk__face sk__face--front sk__page sk__page--right">
                    <RightPage s={s} />
                    <span className="sk__turn-shade" aria-hidden="true" />
                  </div>
                  <div className="sk__face sk__face--back sk__page sk__page--left">
                    <LeftPage s={SPREADS[i + 1]} />
                  </div>
                </div>
              ))}

              <span className="sk__spine" aria-hidden="true" />
              <span className="sk__edge sk__edge--l" aria-hidden="true" />
              <span className="sk__edge sk__edge--r" aria-hidden="true" />

              {/* coloured index tabs down the right edge */}
              <ul className="sk__tabs" aria-label="Spreads">
                {SPREADS.map((s, i) => (
                  <li key={s.n}>
                    <button
                      type="button"
                      className={`sk__tab${current === i ? ' is-on' : ''}`}
                      style={{ '--tab': s.tab }}
                      onClick={() => jump(i)}
                      aria-current={current === i ? 'true' : undefined}
                      data-cursor={s.title}
                    >
                      {s.n}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <p className="sk__counter t-micro" aria-live="polite">
              <span>{SPREADS[current].n}</span> / 05 — {SPREADS[current].title}
              <span className="sk__hint">SCROLL TO TURN THE PAGE</span>
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
