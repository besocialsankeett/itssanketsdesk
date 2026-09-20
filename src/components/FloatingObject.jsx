import './FloatingObject.css'

/**
 * Places one thing on the desk.
 *
 * Positioning is percentage-based off the scene box so the composition
 * survives any viewport. Each object declares its own depth (parallax
 * multiplier), rotation, and which shadow tier it belongs to — paper is
 * thin and sits close, cardboard is thick and casts further.
 *
 * `hide` drops an object at a breakpoint. The mobile desk is a different
 * composition, not a shrunken one, so roughly half the objects opt out.
 */
export default function FloatingObject({
  x,
  y,
  width,
  rotate = 0,
  depth = 0.12,
  z = 20,
  shadow = 'object',
  hide,
  breathe = true,
  delay = 0,
  label,
  ground = false,
  className = '',
  style,
  children,
  ...rest
}) {
  const classes = ['obj', `obj--sh-${shadow}`, hide ? `obj--hide-${hide}` : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      data-depth={depth}
      style={{
        '--x': x,
        '--y': y,
        '--w': width,
        '--rot': `${rotate}deg`,
        '--breathe-delay': `${delay}s`,
        '--breathe-dur': `${8 + (delay % 3) * 1.7}s`,
        zIndex: z,
        ...style,
      }}
      {...rest}
    >
      {/* A photographed object needs a contact shadow that is NOT its own
          silhouette: the soft pool of darkness where it meets the mat. It
          sits under everything, offset down-right, away from the light. */}
      {ground ? <span className="obj__ground" aria-hidden="true" /> : null}

      {/* The visual sits in its own element so parallax (GSAP, on .obj) and
          the resting rotation + idle drift (CSS, on .obj__inner) never fight
          over one transform — a CSS animation would otherwise override the
          inline transform GSAP writes. */}
      <div className={`obj__inner${breathe ? ' anim-breathe' : ''}`}>{children}</div>
      {label ? <span className="obj__label t-micro">{label}</span> : null}
    </div>
  )
}
