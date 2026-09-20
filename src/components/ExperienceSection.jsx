import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useStillMode } from '../hooks/useStillMode'
import { experience } from '../data/site'
import { PaperClip } from './DeskObjects'
import CardboardLabel from './CardboardLabel'
import './ExperienceSection.css'

/**
 * Where I've actually worked — index cards clipped together on the desk.
 * Copy comes straight from the resume in data/site.js; nothing is embellished.
 */
export default function ExperienceSection() {
  const rootRef = useRef(null)
  const reduced = useStillMode()

  useLayoutEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      gsap.from('.xp__card', {
        y: 50,
        opacity: 0,
        rotate: (i) => (i % 2 ? 3 : -3),
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: { trigger: '.xp__stack', start: 'top 80%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="xp section" id="experience" ref={rootRef} aria-labelledby="xp-heading">
      <div className="shell">
        <header className="xp__head">
          <CardboardLabel variant="strip" rotate={1.1} className="xp__tag">
            <span className="section-tag__dot" />
            <span>03 — TIMESHEET</span>
          </CardboardLabel>
          <h2 className="xp__heading t-xxl" id="xp-heading">
            WHERE I’VE
            <br />
            ACTUALLY WORKED
          </h2>
          <p className="xp__intro">
            Content, social and design jobs — the ones where a brand’s feed, website or campaign
            was mine to write, shoot, edit and ship.
          </p>
        </header>

        <ol className="xp__stack">
          {experience.map((job, i) => (
            <li className={`xp__card paper${job.status ? ' xp__card--current' : ''}`} key={job.id} style={{ '--i': i }}>
              <PaperClip className="xp__clip" tone={i % 2 ? '#e4c14a' : '#c9ccd2'} />

              <div className="xp__top">
                <p className="xp__period t-label">
                  {job.period}
                  {job.status ? <span className="xp__status">{job.status}</span> : null}
                </p>
                <h3 className="xp__org">{job.org}</h3>
                <p className="xp__role">{job.role}</p>
                {job.link ? (
                  <a className="xp__link t-micro" href={job.link} target="_blank" rel="noreferrer noopener">
                    {job.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')} ↗
                  </a>
                ) : null}
              </div>

              <p className="xp__summary">{job.summary}</p>

              <ul className="xp__points">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>

              <ul className="xp__tags" aria-label="Skills used">
                {job.tags.map((t) => (
                  <li key={t} className="t-micro">
                    {t}
                  </li>
                ))}
              </ul>

              <span className="xp__hole" aria-hidden="true" />
            </li>
          ))}
        </ol>

        <p className="xp__foot t-micro">
          <span>ALSO: B.TECH, TERNA ENGINEERING COLLEGE · 2026</span>
          <span>— BUT THAT IS NOT WHAT THIS DESK IS FOR</span>
        </p>
      </div>
    </section>
  )
}
