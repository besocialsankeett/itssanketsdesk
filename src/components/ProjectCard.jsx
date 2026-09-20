import { PushPin } from './DeskObjects'
import './ProjectCard.css'

/**
 * A project lying on the desk. The `type` decides what it is made of —
 * a taped strip, a pinned poster, a cardboard folder, a film frame, a
 * printed proof, or a screenshot on paper. No two adjacent cards should
 * read as the same object.
 */
export default function ProjectCard({ project, onOpen, priority = false }) {
  const { index, title, category, year, kind, description, cover, type, span, rotate, accent, link } = project

  return (
    <li
      className={`pc pc--${type} pc--${span}`}
      style={{ '--rot': `${rotate}deg`, '--accent': accent }}
    >
      <article className="pc__body">
        {/* --- type-specific chrome ------------------------------------- */}
        {type === 'strip' && (
          <>
            <span className="tape pc__tape pc__tape--l" aria-hidden="true" />
            <span className="tape pc__tape pc__tape--r" aria-hidden="true" />
          </>
        )}
        {type === 'poster' && <PushPin className="pc__pin" color="#e4462f" />}
        {type === 'folder' && (
          <span className="pc__folder-tab" aria-hidden="true">
            <span className="t-micro">{index}</span>
          </span>
        )}
        {type === 'print' && (
          <span className="pc__regmarks" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        )}

        {/* --- the visual ------------------------------------------------ */}
        <div className="pc__frame">
          {type === 'frame' && (
            <>
              <span className="pc__sprockets pc__sprockets--t" aria-hidden="true" />
              <span className="pc__sprockets pc__sprockets--b" aria-hidden="true" />
            </>
          )}
          {type === 'screen' && (
            <span className="pc__chrome" aria-hidden="true">
              <i />
              <i />
              <i />
              <span className="pc__chrome-url t-micro">{title.toLowerCase().replace(/\s+/g, '-')}.concept</span>
            </span>
          )}
          <img
            className="pc__img"
            src={cover.sm}
            srcSet={`${cover.sm} 800w, ${cover.src} 1600w`}
            sizes="(max-width: 640px) 92vw, (max-width: 1023px) 46vw, 40vw"
            alt={`${title} — ${category}`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            width="1600"
            height="1000"
          />
          <span className="pc__glare" aria-hidden="true" />
        </div>

        {/* --- the label ------------------------------------------------- */}
        <div className="pc__meta">
          <p className="pc__kicker t-micro">
            <span className="pc__index">{index}</span>
            <span className="pc__cat">{category}</span>
            {link ? (
              <span className="pc__live">
                <i aria-hidden="true" />
                LIVE
              </span>
            ) : null}
            <span className="pc__year">{year}</span>
          </p>

          <h3 className="pc__title">
            {/* The whole card is clickable, but only the title is a control —
                so screen readers and keyboards get one clean target. */}
            <button type="button" className="pc__open" onClick={() => onOpen(project)} data-cursor="OPEN">
              {title}
              <span className="sr-only"> — open case study</span>
            </button>
          </h3>

          <p className="pc__desc">{description}</p>

          <p className="pc__foot">
            <span className="pc__kind">{kind}</span>
            {link ? (
              /* sits above the card-wide click target so it opens the real thing */
              <a className="pc__ext" href={link} target="_blank" rel="noreferrer noopener" data-cursor="VISIT ↗">
                VISIT&nbsp;↗
              </a>
            ) : null}
            <span className="pc__arrow" aria-hidden="true">
              OPEN&nbsp;→
            </span>
          </p>
        </div>
      </article>
    </li>
  )
}
