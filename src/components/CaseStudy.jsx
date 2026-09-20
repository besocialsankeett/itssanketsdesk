import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useStillMode } from '../hooks/useStillMode'
import { projects } from '../data/projects'
import './CaseStudy.css'

/* ==========================================================================
   BLOCK RENDERERS
   A case study is an ordered list of typed blocks. Mixing them is what stops
   every project reading like the same template.

   brief    — the setup: label, headline, paragraph
   idea     — a single large statement with an optional margin note
   process  — numbered steps
   image    — one visual; frame: 'plain' | 'tape' | 'polaroid', span: full/wide/half
   gallery  — several visuals; layout: 'row' | 'stack' | 'offset'
   video    — a muted loop, never preloaded
   quote    — a pull quote with attribution
   specs    — a key/value table
   did      — "what I did" list
   swatches — colour chips
   link     — a cardboard button out to the live project
   learning — the closing paragraph
   ========================================================================== */

function Figure({ src, sm, alt, caption, frame = 'plain' }) {
  return (
    <figure className={`cs-fig cs-fig--${frame}`}>
      {frame === 'tape' && (
        <>
          <span className="tape cs-fig__tape cs-fig__tape--l" aria-hidden="true" />
          <span className="tape cs-fig__tape cs-fig__tape--r" aria-hidden="true" />
        </>
      )}
      <img
        src={sm || src}
        srcSet={sm ? `${sm} 800w, ${src} 1600w` : undefined}
        sizes="(max-width: 900px) 92vw, 68vw"
        alt={alt || ''}
        loading="lazy"
        decoding="async"
      />
      {caption ? <figcaption className="cs-fig__cap t-micro">{caption}</figcaption> : null}
    </figure>
  )
}

function Block({ block }) {
  switch (block.kind) {
    case 'brief':
      return (
        <section className="cs-b cs-b--brief" data-cs-reveal>
          <p className="cs-b__label t-label">{block.label}</p>
          <h3 className="cs-b__title">{block.title}</h3>
          <p className="cs-b__body">{block.body}</p>
        </section>
      )

    case 'idea':
      return (
        <section className="cs-b cs-b--idea" data-cs-reveal>
          <p className="cs-b__idea">{block.body}</p>
          {block.note ? (
            <p className="cs-b__note">
              <span aria-hidden="true">↳ </span>
              {block.note}
            </p>
          ) : null}
        </section>
      )

    case 'process':
      return (
        <section className="cs-b cs-b--process" data-cs-reveal>
          <p className="cs-b__label t-label">THE PROCESS</p>
          <ol className="cs-b__steps">
            {block.steps.map((s) => (
              <li key={s.n}>
                <span className="cs-b__step-n t-micro">{s.n}</span>
                <h4 className="cs-b__step-title">{s.title}</h4>
                <p className="cs-b__step-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>
      )

    case 'image':
      return (
        <section className={`cs-b cs-b--image cs-b--${block.span || 'wide'}`} data-cs-reveal>
          <Figure {...block} />
        </section>
      )

    case 'gallery':
      return (
        <section className={`cs-b cs-b--gallery cs-b--gal-${block.layout || 'row'}`} data-cs-reveal>
          {block.items.map((item) => (
            <Figure key={item.src} {...item} frame={block.layout === 'offset' ? 'plain' : 'plain'} />
          ))}
        </section>
      )

    case 'video':
      return (
        <section className="cs-b cs-b--image cs-b--full" data-cs-reveal>
          <figure className="cs-fig cs-fig--plain">
            {/* preload none: a case study nobody opens should cost nothing */}
            <video
              src={block.src}
              poster={block.poster}
              preload="none"
              muted
              loop
              playsInline
              controls
            />
            {block.caption ? <figcaption className="cs-fig__cap t-micro">{block.caption}</figcaption> : null}
          </figure>
        </section>
      )

    case 'quote':
      return (
        <section className="cs-b cs-b--quote" data-cs-reveal>
          <blockquote>
            <p>{block.text}</p>
            <footer className="t-micro">{block.sub}</footer>
          </blockquote>
        </section>
      )

    case 'specs':
      return (
        <section className="cs-b cs-b--specs" data-cs-reveal>
          <p className="cs-b__label t-label">SPEC</p>
          <dl>
            {block.rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      )

    case 'did':
      return (
        <section className="cs-b cs-b--did" data-cs-reveal>
          <p className="cs-b__label t-label">WHAT I DID</p>
          <ul>
            {block.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </section>
      )

    case 'swatches':
      return (
        <section className="cs-b cs-b--swatches" data-cs-reveal>
          <p className="cs-b__label t-label">PALETTE</p>
          <ul>
            {block.colors.map((c) => (
              <li key={c.hex}>
                <span className="cs-b__chip" style={{ background: c.hex }} aria-hidden="true" />
                <b>{c.name}</b>
                <code>{c.hex}</code>
              </li>
            ))}
          </ul>
        </section>
      )

    case 'link':
      return (
        <section className="cs-b cs-b--link" data-cs-reveal>
          <a
            className="cs-b__live"
            href={block.href}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="OPEN ↗"
          >
            <span className="cs-b__live-face">
              <span className="cs-b__live-label">{block.label}</span>
              <span className="cs-b__live-arrow" aria-hidden="true">
                ↗
              </span>
            </span>
            <span className="cs-b__live-flute" aria-hidden="true" />
          </a>
          {block.note ? <p className="cs-b__live-note t-micro">{block.note}</p> : null}
        </section>
      )

    case 'learning':
      return (
        <section className="cs-b cs-b--learning" data-cs-reveal>
          <p className="cs-b__label t-label">RESULT / LEARNING</p>
          <p className="cs-b__body">{block.body}</p>
        </section>
      )

    default:
      return null
  }
}

/* ==========================================================================
   THE FOLDER
   ========================================================================== */

export default function CaseStudy({ project, onClose, onNavigate, lenisRef }) {
  const rootRef = useRef(null)
  const scrollRef = useRef(null)
  const closeRef = useRef(null)
  const openerRef = useRef(null)
  const reduced = useStillMode()

  const open = Boolean(project)

  /* --- remember what to give focus back to ------------------------------ */
  useEffect(() => {
    if (open) openerRef.current = document.activeElement
  }, [open])

  /* --- lock the page behind the folder ---------------------------------- */
  useEffect(() => {
    if (!open) return undefined
    const lenis = lenisRef?.current
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [open, lenisRef])

  /* --- escape + focus trap ---------------------------------------------- */
  useEffect(() => {
    if (!open) return undefined

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = rootRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  /* --- the folder opens -------------------------------------------------- */
  useLayoutEffect(() => {
    if (!open) return undefined

    scrollRef.current?.scrollTo(0, 0)

    if (reduced) {
      closeRef.current?.focus()
      return undefined
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => closeRef.current?.focus() })

      tl.fromTo('.cs__scrim', { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
        // the folder is lifted onto the desk and opened towards you
        .fromTo(
          '.cs__sheet',
          { yPercent: 14, rotateX: 9, opacity: 0, transformOrigin: '50% 100%' },
          { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.72, ease: 'expo.out' },
          0.06
        )
        .fromTo(
          '.cs__masthead > *',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out' },
          0.3
        )
    }, rootRef)

    return () => ctx.revert()
  }, [open, reduced, project?.id])

  /* --- blocks appear as you read down ------------------------------------ */
  useLayoutEffect(() => {
    if (!open || reduced) return undefined

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray('[data-cs-reveal]')
      blocks.forEach((el) => {
        gsap.from(el, {
          y: 34,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            scroller: scrollRef.current,
            start: 'top 90%',
          },
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [open, reduced, project?.id])

  const handleClose = useCallback(() => {
    openerRef.current?.focus?.()
    onClose()
  }, [onClose])

  if (!open) return null

  const i = projects.findIndex((p) => p.id === project.id)
  const next = projects[(i + 1) % projects.length]
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const cs = project.caseStudy

  return (
    <div
      className={`cs${cs.dark ? ' cs--dark' : ''}`}
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cs-title"
    >
      <button
        type="button"
        className="cs__scrim"
        onClick={handleClose}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="cs__sheet" style={{ '--tint': cs.tint, '--accent': project.accent }}>
        {/* ---- sticky bar --------------------------------------------- */}
        <div className="cs__bar">
          <span className="cs__bar-id t-micro">
            PROJECT {project.index} · {project.year}
          </span>
          <button type="button" className="cs__close" onClick={handleClose} ref={closeRef} data-cursor="CLOSE">
            <span aria-hidden="true">✕</span>
            <span className="cs__close-text">CLOSE FOLDER</span>
          </button>
        </div>

        <div className="cs__scroll" ref={scrollRef}>
          {/* ---- masthead --------------------------------------------- */}
          <header className="cs__masthead">
            <p className="cs__kicker t-label">
              <span>{project.category}</span>
              <span className="cs__dot" aria-hidden="true" />
              <span>{project.kind}</span>
            </p>
            <h2 className="cs__title" id="cs-title">
              {project.title}
            </h2>
            <p className="cs__client">
              {project.client}
              {project.link ? (
                <a className="cs__live-chip" href={project.link} target="_blank" rel="noreferrer noopener">
                  <i aria-hidden="true" />
                  LIVE — OPEN ↗
                </a>
              ) : null}
            </p>
            <p className="cs__lede">{project.description}</p>
          </header>

          {/* ---- the contents of the folder --------------------------- */}
          <div className="cs__blocks">
            {cs.blocks.map((block, idx) => (
              <Block key={`${block.kind}-${idx}`} block={block} />
            ))}
          </div>

          {/* ---- next / prev ------------------------------------------ */}
          <nav className="cs__nav" aria-label="Other projects">
            <button type="button" className="cs__nav-btn" onClick={() => onNavigate(prev)} data-cursor="BACK">
              <span className="t-micro">← PREVIOUS</span>
              <span className="cs__nav-title">{prev.title}</span>
            </button>
            <button type="button" className="cs__nav-btn cs__nav-btn--next" onClick={() => onNavigate(next)} data-cursor="NEXT">
              <span className="t-micro">NEXT →</span>
              <span className="cs__nav-title">{next.title}</span>
            </button>
          </nav>

          <p className="cs__end t-micro">
            <span>END OF FOLDER</span>
            <span>FILE {project.index} / {String(projects.length).padStart(2, '0')}</span>
            <span>PUT IT BACK WHERE YOU FOUND IT</span>
          </p>
        </div>
      </div>
    </div>
  )
}
