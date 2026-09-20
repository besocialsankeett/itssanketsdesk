import './CardboardLabel.css'

/**
 * A strip of cardboard with something printed on it.
 * Used for hero typography, section markers, buttons and nav.
 *
 * variant:
 *   'strip'  — plain corrugated strip
 *   'stamp'  — inked rubber-stamp look, rotated, red
 *   'tag'    — small shipping tag with a punched hole
 */
export default function CardboardLabel({
  as: Tag = 'div',
  variant = 'strip',
  rotate = 0,
  tape = false,
  className = '',
  children,
  style,
  ...rest
}) {
  return (
    <Tag
      className={`cbl cbl--${variant} ${className}`}
      style={{ '--rot': `${rotate}deg`, ...style }}
      {...rest}
    >
      {tape ? <span className="tape cbl__tape" aria-hidden="true" /> : null}
      <span className="cbl__face">{children}</span>
    </Tag>
  )
}
