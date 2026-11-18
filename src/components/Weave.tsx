/*
 * The woven hexagon from the GP-HC logo, drawn as line art.
 *
 * Two sets of bands cross at right angles (rotated by 45°) and alternate
 * over/under like a weave: individual threads that only hold together as a
 * fabric. Rendered as static SVG at build time; the draw-in animation is pure
 * CSS (see .weave-thread / .weave-fade) and is skipped for reduced motion.
 */

const FRAME_RADIUS = 94 // circumradius of the outer hexagon frame
const FRAME_CORNER = 9 // corner rounding of the frame
const FIELD_RADIUS = 76 // bands are kept inside this hexagon
const BAND = 10 // band width
const PITCH = 20 // distance between band centres
const GAP = 1.8 // breathing room where one band passes under another
const MIN_LENGTH = PITCH * 2 // leave out the short bars at the edges

type Point = [number, number]
type Band = { offset: number; from: number; to: number }

const fmt = (n: number) => Number(n.toFixed(2))

function hexagon(radius: number): Point[] {
  // Flat top and bottom, points to the left and right, like the logo
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i
    return [radius * Math.cos(angle), radius * Math.sin(angle)]
  })
}

function roundedPolygonPath(points: Point[], corner: number) {
  const n = points.length
  const parts: string[] = []
  points.forEach((vertex, i) => {
    const prev = points[(i - 1 + n) % n]
    const next = points[(i + 1) % n]
    const toward = (target: Point): Point => {
      const dx = target[0] - vertex[0]
      const dy = target[1] - vertex[1]
      const length = Math.hypot(dx, dy)
      return [vertex[0] + (dx / length) * corner, vertex[1] + (dy / length) * corner]
    }
    const a = toward(prev)
    const b = toward(next)
    parts.push(
      `${i === 0 ? 'M' : 'L'}${fmt(a[0])} ${fmt(a[1])}`,
      `Q${fmt(vertex[0])} ${fmt(vertex[1])} ${fmt(b[0])} ${fmt(b[1])}`,
    )
  })
  return parts.join('') + 'Z'
}

/*
 * Bands are laid out in a frame rotated by 45°, where the first set runs
 * horizontally and the second vertically. The field hexagon is expressed in
 * that frame as six half-planes; each band is clipped to them so that it ends
 * with a closed, square end inside the frame instead of being cut off.
 */
const ROTATION = Math.PI / 4
const APOTHEM = (FIELD_RADIUS * Math.sqrt(3)) / 2
const halfPlanes = Array.from({ length: 6 }, (_, i) => {
  const angle = Math.PI / 6 + (Math.PI / 3) * i - ROTATION
  return { nx: Math.cos(angle), ny: Math.sin(angle) }
})

function span(horizontal: boolean, offset: number): Band | null {
  let from = -Infinity
  let to = Infinity
  for (const { nx, ny } of halfPlanes) {
    // Point on the band's centre line: (t, offset) or (offset, t)
    const along = horizontal ? nx : ny
    const fixed = (horizontal ? ny : nx) * offset
    // The band edge closest to this side must stay inside as well
    const limit = APOTHEM - Math.abs((horizontal ? ny : nx) * (BAND / 2)) - fixed
    if (Math.abs(along) < 1e-9) {
      if (limit < 0) return null
      continue
    }
    const t = limit / along
    if (along > 0) to = Math.min(to, t)
    else from = Math.max(from, t)
  }
  // Leave a little room between the band ends and the field edge
  from += BAND / 2
  to -= BAND / 2
  return to - from >= MIN_LENGTH ? { offset, from, to } : null
}

function bands(horizontal: boolean) {
  const count = Math.ceil(FIELD_RADIUS / PITCH)
  const result: Band[] = []
  for (let k = -count; k <= count; k++) {
    const band = span(horizontal, k * PITCH)
    if (band) result.push(band)
  }
  return result
}

/*
 * A band that stops inside another band, or just past it, would leave a stub
 * poking out. Pull such ends back so they stop in the gap before that band.
 */
const CLEARANCE = 2

function clearEnds(own: Band[], others: Band[]) {
  let changed = false
  for (const band of own) {
    for (const other of others) {
      // Only bands that actually reach across this one matter
      if (other.from > band.offset + BAND / 2 || other.to < band.offset - BAND / 2) continue
      const before = other.offset - BAND / 2 - GAP - CLEARANCE
      const after = other.offset + BAND / 2 + GAP + CLEARANCE
      if (band.to > before && band.to < after) {
        band.to = before
        changed = true
      }
      if (band.from > before && band.from < after) {
        band.from = after
        changed = true
      }
    }
  }
  return changed
}

const keep = (band: Band) => band.to - band.from >= MIN_LENGTH

let warp = bands(true) // first set: horizontal in the rotated frame
let weft = bands(false) // second set: vertical in the rotated frame
for (let changed = true; changed; ) {
  changed = clearEnds(warp, weft)
  changed = clearEnds(weft, warp) || changed
  warp = warp.filter(keep)
  weft = weft.filter(keep)
}

// Over and under alternate like a chequerboard
function warpOver(w: Band, v: Band) {
  const n = Math.round((w.offset + v.offset) / PITCH)
  return ((n % 2) + 2) % 2 === 0
}

function outline(x: number, y: number, width: number, height: number) {
  return `M${fmt(x)} ${fmt(y)}h${fmt(width)}v${fmt(height)}h${fmt(-width)}Z`
}

function delay(ms: number) {
  return { '--delay': `${Math.round(ms)}ms` } as React.CSSProperties
}

export function Weave({ className }: { className?: string }) {
  const half = BAND / 2
  const crossings = warp.flatMap((w, i) =>
    weft
      .map((v, j) => ({ w, v, i, j }))
      .filter(
        ({ w, v }) =>
          v.offset - half >= w.from &&
          v.offset + half <= w.to &&
          w.offset - half >= v.from &&
          w.offset + half <= v.to,
      ),
  )

  return (
    <svg
      viewBox="-100 -100 200 200"
      aria-hidden="true"
      className={className}
      fill="none"
      strokeLinejoin="round"
    >
      <path
        d={roundedPolygonPath(hexagon(FRAME_RADIUS), FRAME_CORNER)}
        pathLength={1}
        className="weave-thread stroke-teal"
        strokeWidth={2.2}
        style={delay(0)}
      />

      <g transform="rotate(45)" strokeWidth={1.1} className="stroke-teal">
        {/* Warp: drawn first, lies underneath by default */}
        {warp.map((band, i) => (
          <g key={`warp-${i}`}>
            <rect
              x={fmt(band.from)}
              y={fmt(band.offset - half - GAP)}
              width={fmt(band.to - band.from)}
              height={fmt(BAND + 2 * GAP)}
              className="fill-paper stroke-none"
            />
            <path
              d={outline(band.from, band.offset - half, band.to - band.from, BAND)}
              pathLength={1}
              className="weave-thread"
              style={delay(150 + i * 60)}
            />
          </g>
        ))}

        {/* Weft: crosses over every warp band */}
        {weft.map((band, j) => (
          <g key={`weft-${j}`} className="weave-fade" style={delay(600 + j * 60)}>
            <rect
              x={fmt(band.offset - half - GAP)}
              y={fmt(band.from)}
              width={fmt(BAND + 2 * GAP)}
              height={fmt(band.to - band.from)}
              className="fill-paper stroke-none"
            />
            <path
              d={outline(band.offset - half, band.from, BAND, band.to - band.from)}
              pathLength={1}
              className="weave-thread"
              style={delay(600 + j * 60)}
            />
          </g>
        ))}

        {/* Interlace: every other crossing lifts the warp back on top */}
        {crossings
          .filter(({ w, v }) => warpOver(w, v))
          .map(({ w, v, i, j }) => {
            const x = v.offset - half - GAP
            const length = BAND + 2 * GAP
            return (
              <g
                key={`over-${i}-${j}`}
                className="weave-fade"
                style={delay(1700 + (i + j) * 35)}
              >
                <rect
                  x={fmt(x)}
                  y={fmt(w.offset - half - GAP)}
                  width={fmt(length)}
                  height={fmt(BAND + 2 * GAP)}
                  className="fill-paper stroke-none"
                />
                <path
                  d={`M${fmt(x)} ${fmt(w.offset - half)}h${fmt(length)}M${fmt(x)} ${fmt(w.offset + half)}h${fmt(length)}`}
                />
              </g>
            )
          })}
      </g>
    </svg>
  )
}
