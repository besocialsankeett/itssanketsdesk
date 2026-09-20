/**
 * A real object, photographed, background removed.
 *
 * Files live in /public/assets/objects/<name>.png (2x) and <name>@1x.png.
 * `grade` nudges exposure so five photos taken under five different lights
 * sit on the same desk — kept tiny, and never applied to colour hue.
 *
 * TO ADD ONE: drop the cut-out PNGs in the folder and pass its name.
 */
const GRADES = {
  headphones: 'brightness(0.94) contrast(1.06) saturate(0.9)',
  mouse: 'brightness(0.98) contrast(1.05)',
  macbook: 'brightness(0.96) contrast(1.04)',
  ruler: 'brightness(0.88) contrast(1.04) saturate(0.8)',
  earphones: 'brightness(1.03) contrast(1.02) saturate(0.85)',
  cutter: 'brightness(0.94) contrast(1.05) saturate(0.94)',
  phone: 'brightness(0.92) contrast(1.06) saturate(0.9)',
}

export default function PhotoObject({ name, alt = '', width, height, priority = false, className = '', style }) {
  return (
    <img
      className={`photo-obj ${className}`}
      src={`/assets/objects/${name}@1x.png`}
      srcSet={`/assets/objects/${name}@1x.png 1x, /assets/objects/${name}.png 2x`}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable="false"
      style={{ filter: GRADES[name], ...style }}
    />
  )
}
