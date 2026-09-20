import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useStillMode } from '../hooks/useStillMode'
import { projects } from '../data/projects'
import { marginalia } from '../data/site'
import ProjectCard from './ProjectCard'
import CardboardLabel from './CardboardLabel'
import './WorkSection.css'

export default function WorkSection({ onOpen }) {
  const rootRef = useRef(null)
  const reduced = useStillMode()

  useLayoutEffect(() => {
    if (reduced) return undefined

    const ctx = gsap.context(() => {
      // Cards are dealt onto the desk rather than faded in — each one comes
      // from slightly off, at a slightly wrong angle, and settles.
      gsap.utils.toArray('.pc').forEach((card, i) => {
        gsap.from(card, {
          y: 64,
          opacity: 0,
          rotate: i % 2 ? 5 : -5,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="work section" id="work" ref={rootRef} aria-labelledby="work-heading">
      <div className="shell">
        <header className="work__head">
          <div className="work__head-main">
            <CardboardLabel variant="strip" rotate={-1.6} className="work__tag">
              <span className="section-tag__dot" />
              <span>06 — FROM THE DESK</span>
            </CardboardLabel>

            <h2 className="work__heading t-mega" id="work-heading">
              THINGS
              <br />
              I’VE MADE
            </h2>
          </div>

          <div className="work__head-side">
            <p className="work__count t-label">
              {projects.length} PIECES · {new Set(projects.map((p) => p.category)).size} DISCIPLINES
            </p>
            <p className="work__blurb">
              Everything here is live. A site I built on an internship, a brand made from nothing,
              two 3D scenes and two scroll experiments that run in your browser. Open any of them —
              then open the real thing.
            </p>
            <ul className="work__marks" aria-hidden="true">
              {marginalia.work.map((m) => (
                <li className="t-micro" key={m}>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <ul className="work__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} onOpen={onOpen} priority={i < 2} />
          ))}
        </ul>

        <p className="work__end t-label">
          <span className="work__end-rule" aria-hidden="true" />
          END OF PILE — MORE IS ALWAYS IN PROGRESS
          <span className="work__end-rule" aria-hidden="true" />
        </p>
      </div>
    </section>
  )
}
