import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useStillMode } from '../hooks/useStillMode'
import { contact, identity } from '../data/site'
import FloatingObject from './FloatingObject'
import PhotoObject from './PhotoObject'
import './ContactSection.css'

/**
 * The end of the day. Same desk, but used — things have been pushed around,
 * the blueprint is buried, and there is one clean sheet left with a name on it.
 */
export default function ContactSection() {
  const rootRef = useRef(null)
  const reduced = useStillMode()

  useLayoutEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      gsap.from('.contact__sheet', {
        y: 60,
        rotate: -3,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.contact__sheet', start: 'top 82%' },
      })
      gsap.from('.contact__link', {
        x: -22,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__links', start: 'top 86%' },
      })
      gsap.from('.contact__obj', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="contact" id="contact" ref={rootRef} aria-labelledby="contact-heading">
      {/* ---- the desk at 2am, objects shoved to the edges ---------------- */}
      {/* Same real objects as the hero, at the same physical scale (48px ≈ 2 cm),
          pushed to the edges of the frame around the last sheet of paper. */}
      <div className="contact__desk" aria-hidden="true">
        <FloatingObject x="1%" y="-4%" width="clamp(180px, 28vw, 415px)" rotate={-26} depth={0.14} z={5} className="contact__obj obj--photo" ground hide="mobile">
          <PhotoObject name="headphones" width={599} height={751} />
        </FloatingObject>
        <FloatingObject x="88%" y="4%" width="clamp(70px, 10.4vw, 152px)" rotate={18} depth={0.2} z={5} className="contact__obj obj--photo" ground hide="mobile">
          <PhotoObject name="mouse" width={432} height={859} />
        </FloatingObject>
        <FloatingObject x="86%" y="40%" width="clamp(46px, 6.2vw, 92px)" rotate={-28} depth={0.22} z={5} className="contact__obj obj--photo" ground hide="mobile">
          <PhotoObject name="cutter" width={334} height={1400} />
        </FloatingObject>
        <FloatingObject x="2%" y="48%" width="clamp(80px, 12.4vw, 184px)" rotate={12} depth={0.16} z={5} className="contact__obj obj--photo" ground hide="mobile">
          <PhotoObject name="phone" width={387} height={808} />
        </FloatingObject>
        <FloatingObject x="-8%" y="84%" width="clamp(320px, 45vw, 660px)" rotate={-6} depth={0.1} z={4} className="contact__obj obj--photo" ground hide="mobile">
          <PhotoObject name="ruler" width={1105} height={594} />
        </FloatingObject>
        <FloatingObject x="72%" y="76%" width="clamp(160px, 25vw, 372px)" rotate={-40} depth={0.12} z={4} className="contact__obj obj--photo" ground hide="tablet">
          <PhotoObject name="earphones" width={638} height={671} />
        </FloatingObject>
      </div>

      <div className="shell contact__inner">
        {/* ---- the last clean sheet ------------------------------------- */}
        <div className="contact__sheet paper">
          <span className="tape contact__tape contact__tape--l" aria-hidden="true" />
          <span className="tape contact__tape contact__tape--r" aria-hidden="true" />

          <p className="contact__eyebrow t-label">07 — THE LAST PAGE</p>

          <h2 className="contact__heading" id="contact-heading">
            LET’S MAKE
            <br />
            SOMETHING <span className="contact__weird">WEIRD.</span>
          </h2>

          <p className="contact__body">
            Brief me properly, brief me badly, or just send a half-formed idea at 1am — I have
            worked from worse. Design, content, edits, words, or all four at once.
          </p>

          <a
            className="contact__cta"
            href={contact.links[0].href}
            data-cursor="LET’S TALK"
            data-cursor-variant="label"
          >
            <span className="contact__cta-face">
              START A PROJECT
              <span className="contact__cta-arrow" aria-hidden="true">
                →
              </span>
            </span>
            <span className="contact__cta-flute" aria-hidden="true" />
          </a>

          <ul className="contact__links">
            {contact.links.map((link) => (
              <li key={link.id} className="contact__link">
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  download={link.download || undefined}
                >
                  <span className="contact__link-label t-micro">{link.label}</span>
                  <span className="contact__link-value">{link.value}</span>
                  <span className="contact__link-note t-micro">{link.note}</span>
                  <span className="contact__link-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="contact__sign">
            <span className="t-micro">SIGNED OFF BY</span>
            <span className="contact__sign-name">{identity.name}</span>
            <span className="t-micro">{identity.location}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
