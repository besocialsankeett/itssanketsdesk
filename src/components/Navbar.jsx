import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { navLinks, identity } from '../data/site'
import { scrollToSection } from '../hooks/useLenis'
import { useStillMode } from '../hooks/useStillMode'
import './Navbar.css'

/**
 * Not a navbar — a taped index card sitting on the workspace.
 * It stays put, but shifts and straightens itself as you scroll past the
 * hero, the way a piece of paper nudged by a passing hand would.
 */
export default function Navbar({ lenisRef }) {
  const rootRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const reduced = useStillMode()

  /* --- settle on scroll ------------------------------------------------- */
  useEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      gsap.to('.nav__card', {
        rotate: 0.4,
        y: -4,
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: '+=600',
          scrub: 0.8,
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  /* --- which section am I looking at ------------------------------------ */
  useEffect(() => {
    const triggers = navLinks
      .map((link) => {
        const el = document.querySelector(link.href)
        if (!el) return null
        return ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => self.isActive && setActive(link.id),
        })
      })
      .filter(Boolean)
    return () => triggers.forEach((t) => t.kill())
  }, [])

  /* --- close the mobile sheet on escape --------------------------------- */
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollToSection(lenisRef?.current, href, -20)
  }

  return (
    <header className="nav" ref={rootRef}>
      {/* --- the card ------------------------------------------------------ */}
      <div className="nav__card">
        <span className="tape nav__tape nav__tape--l" aria-hidden="true" />
        <span className="tape nav__tape nav__tape--r" aria-hidden="true" />

        <a
          className="nav__mark"
          href="#top"
          onClick={(e) => go(e, '#top')}
          data-cursor="TOP"
          aria-label="Back to the top of the desk"
        >
          <span className="nav__mark-initials">SA</span>
          <span className="nav__mark-sub t-micro">DESK</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className={`nav__link${active === link.id ? ' is-active' : ''}`}
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <span className="nav__status t-micro" aria-hidden="true">
          <i className="nav__dot anim-blink" />
          OPEN FOR WORK
        </span>
      </div>

      {/* --- mobile trigger ------------------------------------------------ */}
      <button
        type="button"
        className={`nav__tab${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="nav-sheet"
      >
        <span className="nav__tab-lines" aria-hidden="true">
          <i />
          <i />
        </span>
        <span className="nav__tab-text">{open ? 'CLOSE' : 'INDEX'}</span>
      </button>

      {/* --- mobile sheet -------------------------------------------------- */}
      <div id="nav-sheet" className={`nav__sheet paper${open ? ' is-open' : ''}`} hidden={!open}>
        <p className="nav__sheet-head t-micro">INDEX — WHAT IS ON THE DESK</p>
        <ul className="nav__sheet-list">
          {navLinks.map((link, i) => (
            <li key={link.id}>
              <a href={link.href} onClick={(e) => go(e, link.href)}>
                <span className="nav__sheet-n t-micro">{String(i + 1).padStart(2, '0')}</span>
                <span className="nav__sheet-label t-xl">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="nav__sheet-foot t-micro">{identity.role}</p>
      </div>
    </header>
  )
}
