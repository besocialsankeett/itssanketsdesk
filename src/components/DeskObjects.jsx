import { useId } from 'react'

/* ==========================================================================
   DESK OBJECTS
   Every object here is drawn top-down, as if photographed from directly
   above the desk. No stock art, no bitmaps — which means they stay sharp at
   any size and cost almost nothing to load.

   Conventions:
   · viewBox units ≈ millimetres, so relative sizes stay believable
   · light falls from the upper-left, so highlights sit top-left and the
     contact shadow sits bottom-right
   · gradient ids are namespaced with useId() so an object can appear twice
   ========================================================================== */

/* ------------------------------------------------------------------ mouse */
export function MagicMouse({ className = '', ...rest }) {
  const u = useId()
  return (
    <svg viewBox="0 0 88 150" className={className} aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id={`${u}-body`} x1="0.18" y1="0" x2="0.86" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.42" stopColor="#f6f6f7" />
          <stop offset="0.78" stopColor="#e2e2e6" />
          <stop offset="1" stopColor="#cdced3" />
        </linearGradient>
        <linearGradient id={`${u}-top`} x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* body: a capsule that is wider below the midpoint, like a Magic Mouse */}
      <path
        d="M44 2c19 0 32 12 34 30 2 16 2 44 0 62-2 20-14 54-34 54S12 114 10 94C8 76 8 48 10 32 12 14 25 2 44 2Z"
        fill={`url(#${u}-body)`}
      />
      {/* upper surface highlight */}
      <path
        d="M44 6c15 0 26 9 28 24 1 9 1 22 0 30-9-6-18-9-28-9s-19 3-28 9c-1-8-1-21 0-30C18 15 29 6 44 6Z"
        fill={`url(#${u}-top)`}
      />
      {/* the single seam across the shell */}
      <path d="M12 66c10-5 20-7.5 32-7.5S66 61 76 66" stroke="#c3c4ca" strokeWidth="0.9" fill="none" />
      {/* rim */}
      <path
        d="M44 2c19 0 32 12 34 30 2 16 2 44 0 62-2 20-14 54-34 54S12 114 10 94C8 76 8 48 10 32 12 14 25 2 44 2Z"
        fill="none"
        stroke="#b9bac0"
        strokeWidth="0.8"
      />
    </svg>
  )
}

/* ------------------------------------------------------------- headphones
   Over-ears laid flat on the desk, cups face down, exactly as they land when
   you take them off: one wide padded band arcing over the top, two big matte
   ovals nearly touching underneath, thin stems between the two. Matte black
   means almost no specular highlight — the form has to come from the
   silhouette and a very soft top-left sheen, not from shine. */
export function Headphones({ className = '', ...rest }) {
  const u = useId()
  return (
    <svg viewBox="0 0 224 252" className={className} aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id={`${u}-band`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#3f4148" />
          <stop offset="0.4" stopColor="#25272c" />
          <stop offset="1" stopColor="#131419" />
        </linearGradient>
        <radialGradient id={`${u}-cup`} cx="0.34" cy="0.24" r="0.92">
          <stop offset="0" stopColor="#3a3c43" />
          <stop offset="0.42" stopColor="#26282d" />
          <stop offset="0.82" stopColor="#191a1f" />
          <stop offset="1" stopColor="#0d0e12" />
        </radialGradient>
      </defs>

      {/* Padded headband. The arc has to be nearly as tall as the cups —
          make it shallower and the whole thing reads as a handle between two
          circles instead of a headband. */}
      <path
        d="M64 128C46 14 178 14 160 128"
        stroke={`url(#${u}-band)`}
        strokeWidth="29"
        fill="none"
        strokeLinecap="round"
      />
      {/* stitched seam running along the outer face of the band */}
      <path
        d="M64 126C47 22 177 22 160 126"
        stroke="#53565e"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* the one soft sheen matte plastic gets, along the top of the arc */}
      <path
        d="M84 44C98 32 126 32 140 44"
        stroke="#767a84"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        opacity="0.14"
      />

      {/* slider stems dropping from the band into each cup */}
      <rect x="56" y="112" width="16" height="36" rx="8" fill="#1c1e23" />
      <rect x="152" y="112" width="16" height="36" rx="8" fill="#1c1e23" />

      {/* Ear cups: tall rounded ovals, tilted very slightly outward the way
          they sit when the band is relaxed, with a real gap between them. */}
      <g transform="rotate(-4 64 186)">
        <ellipse cx="64" cy="186" rx="53" ry="61" fill={`url(#${u}-cup)`} />
        {/* earpad — one soft ring, not a bullseye */}
        <ellipse cx="64" cy="188" rx="42" ry="49" fill="#1b1c21" />
        <ellipse cx="64" cy="188" rx="42" ry="49" fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="2.2" />
        <ellipse cx="64" cy="189" rx="31" ry="37" fill="#101115" />
        <ellipse cx="46" cy="160" rx="18" ry="15" fill="#ffffff" opacity="0.045" transform="rotate(-30 46 160)" />
      </g>
      <g transform="rotate(4 160 186)">
        <ellipse cx="160" cy="186" rx="53" ry="61" fill={`url(#${u}-cup)`} />
        <ellipse cx="160" cy="188" rx="42" ry="49" fill="#1b1c21" />
        <ellipse cx="160" cy="188" rx="42" ry="49" fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="2.2" />
        <ellipse cx="160" cy="189" rx="31" ry="37" fill="#101115" />
        <ellipse cx="142" cy="160" rx="18" ry="15" fill="#ffffff" opacity="0.045" transform="rotate(-30 142 160)" />
      </g>
    </svg>
  )
}

/* --------------------------------------------------------------- keyboard */
export function Keyboard({ className = '', ...rest }) {
  const u = useId()
  const key = (x, y, w = 15, h = 15) => (
    <g key={`${x}-${y}-${w}`}>
      <rect x={x} y={y} width={w} height={h} rx="2.6" fill="#f0f0f2" />
      <rect x={x} y={y} width={w} height={h - 2} rx="2.6" fill="#fbfbfc" />
      <rect x={x} y={y + h - 2.4} width={w} height="2.4" rx="1.2" fill="#cfd0d5" />
    </g>
  )
  const row = (y, count, startX = 12, w = 15, gap = 3) =>
    Array.from({ length: count }, (_, i) => key(startX + i * (w + gap), y, w, 15))

  return (
    <svg viewBox="0 0 340 160" className={className} aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id={`${u}-deck`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#ececed" />
          <stop offset="0.6" stopColor="#dedee2" />
          <stop offset="1" stopColor="#c8c9cf" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="336" height="156" rx="9" fill={`url(#${u}-deck)`} />
      <rect x="2" y="2" width="336" height="156" rx="9" fill="none" stroke="#b6b7bd" strokeWidth="1" />
      {/* function row, slightly shorter keys */}
      {Array.from({ length: 17 }, (_, i) => key(12 + i * 18, 12, 15, 10))}
      {row(28, 17)}
      {row(46, 17)}
      {row(64, 17)}
      {row(82, 17)}
      {/* modifier row + space bar */}
      {key(12, 100, 24)}
      {key(39, 100, 20)}
      {key(62, 100, 20)}
      {key(85, 100, 108)}
      {key(196, 100, 20)}
      {key(219, 100, 20)}
      {/* arrow cluster */}
      {key(258, 100, 15)}
      {key(276, 92, 15, 7)}
      {key(276, 102, 15, 13)}
      {key(294, 100, 15)}
      {/* bottom edge shadow so it reads as a slab with thickness */}
      <rect x="2" y="150" width="336" height="8" rx="4" fill="#b0b1b8" opacity="0.55" />
    </svg>
  )
}

/* ------------------------------------------------------------------ ruler */
export function Ruler({ className = '', ...rest }) {
  const u = useId()
  const ticks = []
  for (let i = 0; i <= 60; i += 1) {
    const x = 14 + i * 7.1
    const major = i % 10 === 0
    const mid = i % 5 === 0
    ticks.push(
      <line
        key={i}
        x1={x}
        y1="4"
        x2={x}
        y2={major ? 20 : mid ? 14 : 9}
        stroke="#5c4415"
        strokeWidth={major ? 1.3 : 0.8}
        opacity={major ? 0.85 : 0.5}
      />
    )
    if (major) {
      ticks.push(
        <text
          key={`t${i}`}
          x={x + 2.6}
          y="27"
          fontSize="7.5"
          fontFamily="'IBM Plex Mono', monospace"
          fill="#5c4415"
          opacity="0.8"
        >
          {i}
        </text>
      )
    }
  }
  return (
    <svg viewBox="0 0 450 42" className={className} aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id={`${u}-acr`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe89a" stopOpacity="0.9" />
          <stop offset="0.45" stopColor="#ffd764" stopOpacity="0.78" />
          <stop offset="1" stopColor="#e8b93c" stopOpacity="0.86" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="448" height="40" rx="3" fill={`url(#${u}-acr)`} />
      {/* bevel along the measuring edge */}
      <rect x="1" y="1" width="448" height="4" fill="#fff6cf" opacity="0.75" />
      <rect x="1" y="36" width="448" height="5" fill="#c99a26" opacity="0.4" />
      {ticks}
      <text
        x="392"
        y="27"
        fontSize="7"
        fontFamily="'IBM Plex Mono', monospace"
        fill="#5c4415"
        opacity="0.75"
        letterSpacing="1.4"
      >
        cm
      </text>
      <rect x="1" y="1" width="448" height="40" rx="3" fill="none" stroke="#a8801c" strokeWidth="0.8" opacity="0.55" />
    </svg>
  )
}

/* --------------------------------------------------------------- macbook
   Closed, lid up, midnight finish. It is the largest object on the desk, so
   it does the job of anchoring the bottom of the composition. Almost no
   detail on purpose: a dark rounded slab reads as a laptop instantly. */
export function Macbook({ className = '', ...rest }) {
  const u = useId()
  return (
    <svg viewBox="0 0 320 224" className={className} aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id={`${u}-lid`} x1="0.16" y1="0" x2="0.84" y2="1">
          <stop offset="0" stopColor="#33363f" />
          <stop offset="0.35" stopColor="#22242b" />
          <stop offset="0.72" stopColor="#181a20" />
          <stop offset="1" stopColor="#101116" />
        </linearGradient>
        <linearGradient id={`${u}-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4d56" />
          <stop offset="1" stopColor="#1a1c22" />
        </linearGradient>
      </defs>
      {/* body */}
      <rect x="3" y="3" width="314" height="212" rx="17" fill={`url(#${u}-lid)`} />
      {/* the machined chamfer that catches light all the way round */}
      <rect x="3" y="3" width="314" height="212" rx="17" fill="none" stroke={`url(#${u}-edge)`} strokeWidth="1.6" />
      {/* broad, very soft sheen across the upper-left of the lid */}
      <path
        d="M20 3h150L52 215H20a17 17 0 0 1-17-17V20A17 17 0 0 1 20 3Z"
        fill="#ffffff"
        opacity="0.035"
      />
      {/* the seam of the closed clamshell along the front edge */}
      <rect x="3" y="205" width="314" height="10" rx="5" fill="#0b0c10" opacity="0.75" />
      <rect x="126" y="209" width="68" height="3" rx="1.5" fill="#000" opacity="0.5" />
      {/* apple-shaped mark deliberately left off — this is a generic laptop */}
      <circle cx="160" cy="106" r="15" fill="#2f323a" opacity="0.5" />
      <circle cx="160" cy="106" r="15" fill="none" stroke="#43464f" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

/* ----------------------------------------------------------- seiko watch
   Cushion case, steel bracelet, black dial with a day/date window. The hands
   are driven by `time` so the easter egg can point them at 02:17. */
export function Watch({ time = '02:17', day = 'MER', date = '21', className = '', ...rest }) {
  const u = useId()
  const [hRaw, mRaw] = String(time).split(':')
  const h = Number(hRaw) % 12
  const m = Number(mRaw) % 60
  const minAngle = m * 6
  const hourAngle = h * 30 + m * 0.5

  const cx = 60
  const cy = 112

  return (
    <svg viewBox="0 0 120 224" className={className} aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id={`${u}-steel`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8f949c" />
          <stop offset="0.16" stopColor="#e6e9ee" />
          <stop offset="0.42" stopColor="#a8adb6" />
          <stop offset="0.62" stopColor="#d5d9e0" />
          <stop offset="0.85" stopColor="#8b9099" />
          <stop offset="1" stopColor="#6d7178" />
        </linearGradient>
        <linearGradient id={`${u}-case`} x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#f0f2f5" />
          <stop offset="0.4" stopColor="#b6bac2" />
          <stop offset="1" stopColor="#7e838b" />
        </linearGradient>
        <radialGradient id={`${u}-dial`} cx="0.36" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#2a2d34" />
          <stop offset="0.6" stopColor="#131519" />
          <stop offset="1" stopColor="#05060a" />
        </radialGradient>
      </defs>

      {/* bracelet — brushed steel links, tapering towards the clasp */}
      <path d="M34 2h52l3 58H31Z" fill={`url(#${u}-steel)`} />
      <path d="M31 164h58l-4 58H35Z" fill={`url(#${u}-steel)`} />
      {/* link separations */}
      <g stroke="#5f636b" strokeWidth="1.1" opacity="0.8">
        <path d="M33 14h54M32.4 26h55.2M31.8 38h56.4M31.2 50h57.6" />
        <path d="M31.4 176h57.2M32 188h56M32.6 200h54.8M33.2 212h53.6" />
      </g>

      {/* cushion case */}
      <rect x="8" y="58" width="104" height="108" rx="30" fill={`url(#${u}-case)`} />
      <rect x="13" y="63" width="94" height="98" rx="26" fill="#5f646c" />
      {/* crown */}
      <rect x="110" y="100" width="8" height="20" rx="3" fill="#9aa0a8" />
      <rect x="110" y="100" width="8" height="20" rx="3" fill="none" stroke="#6c7178" strokeWidth="0.7" />

      {/* dial */}
      <ellipse cx={cx} cy={cy} rx="41" ry="44" fill={`url(#${u}-dial)`} />

      {/* applied baton indices */}
      <g fill="#d8dde5">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180
          const r1 = 36
          const r2 = 30
          const x1 = cx + Math.sin(a) * r1
          const y1 = cy - Math.cos(a) * r1
          const x2 = cx + Math.sin(a) * r2
          const y2 = cy - Math.cos(a) * r2
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#d8dde5"
              strokeWidth={i % 3 === 0 ? 2.4 : 1.4}
              strokeLinecap="round"
            />
          )
        })}
      </g>

      {/* day / date window */}
      <rect x="72" y="105" width="24" height="14" rx="1.5" fill="#e8eaee" />
      <text
        x="84"
        y="115.5"
        textAnchor="middle"
        fontSize="8.5"
        fontFamily="'IBM Plex Mono', monospace"
        fontWeight="600"
        fill="#15171b"
      >
        {date}
      </text>
      <text
        x={cx}
        y="88"
        textAnchor="middle"
        fontSize="6"
        fontFamily="'IBM Plex Mono', monospace"
        fill="#8e94a0"
        letterSpacing="1.2"
      >
        {day}
      </text>

      {/* hands */}
      <g transform={`rotate(${hourAngle} ${cx} ${cy})`}>
        <rect x={cx - 2.4} y={cy - 24} width="4.8" height="27" rx="2.4" fill="#e9edf3" />
      </g>
      <g transform={`rotate(${minAngle} ${cx} ${cy})`}>
        <rect x={cx - 1.8} y={cy - 35} width="3.6" height="38" rx="1.8" fill="#e9edf3" />
      </g>
      <circle cx={cx} cy={cy} r="3" fill="#c9ced6" />
      <circle cx={cx} cy={cy} r="1.2" fill="#15171b" />

      {/* crystal reflection across the upper-left quadrant */}
      <path d="M22 84c10-9 26-13 40-11-19 7-33 22-40 40Z" fill="#ffffff" opacity="0.09" />
    </svg>
  )
}

/* -------------------------------------------------------- web-shooters
   The collectible that has been on the desk since school. Faceted red
   shells on black elastic bands — abstracted, not a replica. */
export function WebShooters({ className = '', ...rest }) {
  /* Each shell is built from flat facets with their own solid fills rather
     than translucent overlays — overlays on red turn to mud immediately. */
  const shooter = (tx, ty, rot, scale = 1) => (
    <g transform={`translate(${tx} ${ty}) rotate(${rot}) scale(${scale})`}>
      {/* elastic band, passing behind the shell */}
      <rect x="-48" y="-15" width="96" height="30" rx="4" fill="#131418" />
      <g stroke="#25272d" strokeWidth="1.2">
        <path d="M-40 -15v30M-32 -15v30M-24 -15v30M24 -15v30M32 -15v30M40 -15v30" />
      </g>
      <rect x="-48" y="-15" width="96" height="30" rx="4" fill="none" stroke="#04050700" strokeWidth="1" />

      {/* shell — top-left facet catches the light, right facet mid, skirt dark */}
      <path d="M-22 -18 L0 -24 L22 -18 L22 2 L11 18 L-11 18 L-22 2 Z" fill="#c4221a" />
      <path d="M-22 -18 L0 -24 L0 -3 L-22 2 Z" fill="#f0503c" />
      <path d="M0 -24 L22 -18 L22 2 L0 -3 Z" fill="#cf2a1d" />
      <path d="M-22 2 L0 -3 L22 2 L11 18 L-11 18 Z" fill="#8e1a12" />
      {/* crisp facet edges */}
      <path
        d="M-22 -18 L0 -24 L22 -18 L22 2 L11 18 L-11 18 L-22 2 Z M0 -24 V-3 M-22 2 L0 -3 L22 2"
        fill="none"
        stroke="#61100b"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />

      {/* nozzle, sitting flush on the front face rather than standing up */}
      <path d="M-7 -22 L0 -30 L7 -22 Z" fill="#9c1c13" />
      <circle cx="0" cy="-21" r="4.4" fill="#d9d9d6" />
      <circle cx="0" cy="-21" r="2.2" fill="#1a1a1c" />

      {/* vent slots */}
      <g fill="#e9e9e6">
        <rect x="-17" y="-9" width="9" height="2" rx="1" />
        <rect x="-17" y="-5" width="9" height="2" rx="1" />
        <rect x="8" y="-9" width="9" height="2" rx="1" />
        <rect x="8" y="-5" width="9" height="2" rx="1" />
      </g>

      {/* trigger stud */}
      <circle cx="0" cy="8" r="4.2" fill="#5e0f09" />
      <circle cx="-1" cy="7" r="1.5" fill="#f2f2f0" opacity="0.7" />
    </g>
  )
  return (
    <svg viewBox="0 0 190 150" className={className} aria-hidden="true" {...rest}>
      {shooter(120, 44, 14, 0.84)}
      {shooter(64, 100, -9, 1)}
    </svg>
  )
}

/* ----------------------------------------------------------------- marker */
export function Marker({ className = '', barrel = '#1c1d21', cap = '#e4462f', ...rest }) {
  const u = useId()
  return (
    <svg viewBox="0 0 42 210" className={className} aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id={`${u}-b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="0.32" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* barrel */}
      <rect x="6" y="34" width="30" height="150" rx="6" fill={barrel} />
      {/* cap */}
      <rect x="4" y="8" width="34" height="52" rx="7" fill={cap} />
      <rect x="4" y="52" width="34" height="8" rx="3" fill="#000" opacity="0.25" />
      {/* end plug */}
      <rect x="8" y="180" width="26" height="18" rx="5" fill={cap} />
      {/* label band */}
      <rect x="6" y="96" width="30" height="26" fill="#f4f0e6" opacity="0.92" />
      <text
        x="21"
        y="113"
        textAnchor="middle"
        fontSize="9"
        fontFamily="'IBM Plex Mono', monospace"
        fontWeight="600"
        fill="#1c1d21"
      >
        05
      </text>
      {/* cylindrical shading over everything */}
      <rect x="4" y="8" width="34" height="190" rx="7" fill={`url(#${u}-b)`} />
    </svg>
  )
}

/* ------------------------------------------------------------ snap-off knife
   The one object that genuinely belongs on a cutting mat. */
export function CraftKnife({ className = '', ...rest }) {
  const u = useId()
  return (
    <svg viewBox="0 0 34 230" className={className} aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id={`${u}-h`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffe14d" />
          <stop offset="0.35" stopColor="#f4c40e" />
          <stop offset="1" stopColor="#b78d03" />
        </linearGradient>
        <linearGradient id={`${u}-bl`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f2f4f7" />
          <stop offset="0.4" stopColor="#c8ccd3" />
          <stop offset="1" stopColor="#8f959e" />
        </linearGradient>
      </defs>
      {/* blade, angled tip */}
      <path d="M9 4 25 22v52H9Z" fill={`url(#${u}-bl)`} />
      <path d="M9 4 25 22" stroke="#fff" strokeWidth="1.4" opacity="0.8" />
      {/* snap-off score lines */}
      <path d="M11 34h13M11 48h13M11 62h13" stroke="#9aa0a9" strokeWidth="0.9" />
      {/* handle */}
      <rect x="4" y="66" width="26" height="158" rx="5" fill={`url(#${u}-h)`} />
      <rect x="4" y="66" width="26" height="158" rx="5" fill="none" stroke="#8f6d02" strokeWidth="0.8" opacity="0.6" />
      {/* slider */}
      <rect x="8" y="96" width="18" height="30" rx="3" fill="#2b2c30" />
      <path d="M10 102h14M10 108h14M10 114h14" stroke="#55575d" strokeWidth="1.4" />
      <text
        x="17"
        y="172"
        textAnchor="middle"
        fontSize="7"
        fontFamily="'IBM Plex Mono', monospace"
        fill="#6a5202"
        letterSpacing="1"
        transform="rotate(90 17 172)"
      >
        A-300
      </text>
    </svg>
  )
}

/* --------------------------------------------------------------- earphones */
export function Earphones({ className = '', ...rest }) {
  return (
    <svg viewBox="0 0 260 190" className={className} aria-hidden="true">
      {/* the cable is the drawing — a lazy tangle, not a neat loop */}
      <path
        d="M42 26c-24 22-38 62-14 92 22 27 74 24 96-2 18-21 6-52-18-56-20-3-33 15-27 32 6 16 30 22 48 12 30-16 44-56 78-58"
        stroke="#f2f2f4"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M42 26c-24 22-38 62-14 92 22 27 74 24 96-2 18-21 6-52-18-56-20-3-33 15-27 32 6 16 30 22 48 12 30-16 44-56 78-58"
        stroke="#c9cace"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* buds */}
      <g>
        <rect x="30" y="6" width="17" height="30" rx="8" fill="#fafafb" />
        <rect x="33" y="30" width="11" height="26" rx="5" fill="#f0f0f2" transform="rotate(-8 38 40)" />
        <ellipse cx="38" cy="12" rx="8" ry="7" fill="#e6e6ea" />
      </g>
      <g transform="translate(206 -4) rotate(14)">
        <rect x="30" y="6" width="17" height="30" rx="8" fill="#fafafb" />
        <rect x="33" y="30" width="11" height="26" rx="5" fill="#f0f0f2" />
        <ellipse cx="38" cy="12" rx="8" ry="7" fill="#e6e6ea" />
      </g>
    </svg>
  )
}

/* -------------------------------------------------------------- paper clip */
export function PaperClip({ className = '', tone = '#c9ccd2', ...rest }) {
  return (
    <svg viewBox="0 0 40 96" className={className} aria-hidden="true" {...rest}>
      <path
        d="M13 82V22a9 9 0 0 1 18 0v56a15 15 0 0 1-30 0V26"
        stroke={tone}
        strokeWidth="4.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M13 82V22a9 9 0 0 1 18 0v56a15 15 0 0 1-30 0V26"
        stroke="#ffffff"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
        transform="translate(-0.8 -0.8)"
      />
    </svg>
  )
}

/* --------------------------------------------------------------- push pin */
export function PushPin({ className = '', color = '#e4462f', ...rest }) {
  const u = useId()
  return (
    <svg viewBox="0 0 34 34" className={className} aria-hidden="true" {...rest}>
      <defs>
        <radialGradient id={`${u}-p`} cx="0.34" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="0.35" stopColor={color} />
          <stop offset="1" stopColor="#000000" stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <circle cx="17" cy="17" r="13" fill={color} />
      <circle cx="17" cy="17" r="13" fill={`url(#${u}-p)`} />
      <circle cx="17" cy="17" r="4" fill="#000" opacity="0.28" />
    </svg>
  )
}

/* ------------------------------------------------------------- action toy
   A generic articulated figure — no branded likeness, just the shape of a
   toy that has been on the desk since school. */
export function ActionFigure({ className = '', suit = '#c8302a', trim = '#1b3f8f', ...rest }) {
  return (
    <svg viewBox="0 0 90 150" className={className} aria-hidden="true" {...rest}>
      {/* legs */}
      <path d="M34 84h9l3 42-4 18h-10l4-20Z" fill={trim} />
      <path d="M47 84h9l6 40 2 20H54l-3-20Z" fill={trim} />
      {/* torso */}
      <path d="M31 44h28l5 26-4 18H30l-4-18Z" fill={suit} />
      {/* chest emblem */}
      <path d="M45 56l5 8-5 8-5-8Z" fill="#111" opacity="0.55" />
      {/* arms — one raised, so it reads as a posed figure not a mannequin */}
      <path d="M31 46 12 30l-7 5 16 22 10 4Z" fill={suit} />
      <path d="M59 46l20 12 4 12-9 3-19-16Z" fill={suit} />
      {/* hands */}
      <circle cx="8" cy="32" r="6" fill={trim} />
      <circle cx="80" cy="68" r="6" fill={trim} />
      {/* head */}
      <ellipse cx="45" cy="28" rx="16" ry="17" fill={suit} />
      <path d="M34 24c6-4 16-4 22 0-3 7-8 10-11 10s-8-3-11-10Z" fill="#f2f2f0" opacity="0.9" />
      {/* web-ish hatching, kept abstract */}
      <path
        d="M45 11v34M29 28h32M35 15l20 26M55 15 35 41"
        stroke="#000"
        strokeWidth="0.7"
        opacity="0.28"
        fill="none"
      />
      {/* boots */}
      <path d="M32 140h11v6H30Z" fill="#111" />
      <path d="M54 140h11v6H52Z" fill="#111" />
    </svg>
  )
}

/* ------------------------------------------------------------------ phone */
export function Phone({ className = '', ...rest }) {
  const u = useId()
  return (
    <svg viewBox="0 0 96 190" className={className} aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id={`${u}-scr`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#1c1f26" />
          <stop offset="0.55" stopColor="#0c0e12" />
          <stop offset="1" stopColor="#04050a" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="92" height="186" rx="16" fill="#26282e" />
      <rect x="5" y="5" width="86" height="180" rx="14" fill={`url(#${u}-scr)`} />
      {/* dynamic island */}
      <rect x="36" y="12" width="24" height="7" rx="3.5" fill="#000" />
      {/* a half-finished layout on screen — he is always mid-something */}
      <rect x="14" y="30" width="40" height="5" rx="2.5" fill="#ffd230" opacity="0.85" />
      <rect x="14" y="42" width="68" height="46" rx="4" fill="#ffffff" opacity="0.07" />
      <rect x="14" y="96" width="52" height="4" rx="2" fill="#ffffff" opacity="0.16" />
      <rect x="14" y="106" width="66" height="4" rx="2" fill="#ffffff" opacity="0.11" />
      <rect x="14" y="116" width="30" height="4" rx="2" fill="#ffffff" opacity="0.11" />
      <rect x="14" y="136" width="68" height="26" rx="5" fill="#e4462f" opacity="0.85" />
      <rect x="36" y="176" width="24" height="3" rx="1.5" fill="#fff" opacity="0.35" />
      {/* glass sheen */}
      <path d="M8 20c14-8 34-11 52-9L20 120c-8-30-12-70-12-100Z" fill="#fff" opacity="0.04" />
    </svg>
  )
}

/* ---------------------------------------------------------------- battery
   Small filler object — the kind of thing that is always loose on a desk. */
export function Eraser({ className = '', ...rest }) {
  return (
    <svg viewBox="0 0 70 40" className={className} aria-hidden="true" {...rest}>
      <rect x="1" y="1" width="68" height="38" rx="4" fill="#f4f0e6" />
      <rect x="1" y="1" width="68" height="14" rx="4" fill="#2f6b57" />
      <rect x="1" y="12" width="68" height="3" fill="#000" opacity="0.12" />
      <text
        x="35"
        y="11"
        textAnchor="middle"
        fontSize="7"
        fontFamily="'IBM Plex Mono', monospace"
        fontWeight="600"
        fill="#f4f0e6"
        letterSpacing="1.2"
      >
        UNDO
      </text>
      <rect x="1" y="1" width="68" height="38" rx="4" fill="none" stroke="#d8d0bd" strokeWidth="0.9" />
    </svg>
  )
}
