import { identity, marginalia } from '../data/site'
import './Footer.css'

/** The back of the box. Shipping marks, a barcode, and the small print. */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="foot">
      <div className="foot__box cardboard">
        <div className="shell foot__inner">
          {/* ---- shipping label ------------------------------------------ */}
          <div className="foot__label">
            <p className="foot__label-head t-micro">SHIPPED FROM</p>
            <p className="foot__name">{identity.name}</p>
            <p className="foot__disciplines t-label">{identity.disciplines.join(' × ')}</p>
            <p className="foot__loc t-micro">{identity.location}</p>
          </div>

          {/* ---- handling marks ------------------------------------------ */}
          <ul className="foot__marks" aria-hidden="true">
            {marginalia.footer.map((m) => (
              <li key={m} className="foot__mark">
                {m}
              </li>
            ))}
          </ul>

          {/* ---- barcode -------------------------------------------------- */}
          <div className="foot__barcode" aria-hidden="true">
            <svg viewBox="0 0 240 56" preserveAspectRatio="none">
              {/* deterministic bar widths so it renders identically every time */}
              {[3, 1, 2, 4, 1, 1, 3, 2, 1, 4, 2, 1, 1, 3, 4, 1, 2, 2, 3, 1, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2].reduce(
                (acc, w, i) => {
                  const x = acc.x
                  acc.x += w * 2 + 3
                  acc.bars.push(<rect key={i} x={x} y="0" width={w * 2} height="42" fill="#3d2708" />)
                  return acc
                },
                { x: 2, bars: [] }
              ).bars}
              <text
                x="120"
                y="54"
                textAnchor="middle"
                fontSize="9"
                fontFamily="'IBM Plex Mono', monospace"
                letterSpacing="3"
                fill="#3d2708"
              >
                SA-{year}-DESK-01
              </text>
            </svg>
          </div>

          {/* ---- small print ---------------------------------------------- */}
          <div className="foot__print">
            <p className="foot__joke">MADE WITH TOO MANY TABS OPEN.</p>
            <p className="foot__legal t-micro">
              <span>{identity.name} © {year}</span>
              <span>BUILT WITH REACT, GSAP &amp; STUBBORNNESS</span>
              <span>NO TEMPLATES WERE HARMED</span>
            </p>
          </div>
        </div>

        {/* exposed corrugation along the very bottom of the page */}
        <span className="foot__flute" aria-hidden="true" />
      </div>
    </footer>
  )
}
