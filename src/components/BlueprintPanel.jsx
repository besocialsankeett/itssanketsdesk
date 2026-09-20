import './BlueprintPanel.css'

/**
 * A reusable engineering-drawing frame: blueprint ground, inner border,
 * corner registration marks and a title block in the lower right — the way
 * a real technical sheet is laid out.
 */
export default function BlueprintPanel({
  title,
  sheet = '01',
  scale = '1:1',
  rev = 'C',
  drawnBy = 'S. ATHAWALE',
  className = '',
  children,
  ...rest
}) {
  return (
    <div className={`bp blueprint-surface ${className}`} {...rest}>
      {/* border + registration marks */}
      <svg className="bp__frame" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="1.2" y="1.2" width="97.6" height="97.6" fill="none" stroke="rgba(190,222,255,.5)" strokeWidth="0.22" vectorEffect="non-scaling-stroke" />
        <rect x="2.6" y="2.6" width="94.8" height="94.8" fill="none" stroke="rgba(190,222,255,.22)" strokeWidth="0.15" strokeDasharray="1.6 1.2" vectorEffect="non-scaling-stroke" />
      </svg>

      <span className="bp__corner bp__corner--tl" aria-hidden="true" />
      <span className="bp__corner bp__corner--tr" aria-hidden="true" />
      <span className="bp__corner bp__corner--bl" aria-hidden="true" />
      <span className="bp__corner bp__corner--br" aria-hidden="true" />

      <div className="bp__body">{children}</div>

      <div className="bp__block" aria-hidden="true">
        <span className="bp__block-title">{title}</span>
        <span className="bp__block-row">
          <b>DRAWN</b>
          {drawnBy}
        </span>
        <span className="bp__block-row">
          <b>SHEET</b>
          {sheet}
        </span>
        <span className="bp__block-row">
          <b>SCALE</b>
          {scale}
        </span>
        <span className="bp__block-row">
          <b>REV</b>
          {rev}
        </span>
      </div>
    </div>
  )
}
