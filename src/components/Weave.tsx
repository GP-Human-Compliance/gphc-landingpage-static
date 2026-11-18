/*
 * The woven hexagon from the GP-HC logo, drawn as line art.
 *
 * Two sets of bands cross and alternate over/under like a weave: individual
 * threads that only hold together as a fabric. The bands run at ±60°, so the
 * weave lattice lines up with the hexagon: every band is a complete bar with
 * closed ends, and the band spacing is stretched to fit, so that the clear
 * space between frame and weave is the same on all six sides.
 *
 * Rendered as static SVG at build time; the draw-in animation is pure CSS
 * (see .weave-thread / .weave-fade) and is skipped for reduced motion.
 */

const FRAME_APOTHEM = 81 // centre to the middle of a frame edge
const FRAME_CORNER = 18 // corner radius of the frame
const FRAME_STROKE = 2.2
const LINE_STROKE = 1.1
const MARGIN = 20 // clear space between frame and weave
const RINGS = 2 // crossings from the centre to the edge of the weave
const HALF = 6.5 // half a band's width, measured along the crossing band
const GAP = 1.8 // breathing room where one band passes under another
const TUCK = 3.5 // how far a band reaches past its last crossing at top and bottom

const SIN60 = Math.sqrt(3) / 2

/*
 * Lattice coordinates: s runs along the first set of bands (warp, 60°), t
 * along the second (weft, 120°). In these coordinates the hexagon is
 * |s| ≤ EXTENT, |t| ≤ EXTENT, |s + t| ≤ EXTENT.
 */
const FIELD_APOTHEM = FRAME_APOTHEM - FRAME_STROKE / 2 - MARGIN - LINE_STROKE / 2
const EXTENT = FIELD_APOTHEM / SIN60
const OVERHANG = HALF + TUCK // past the last crossing on the slanted sides
const PITCH = (EXTENT - HALF - OVERHANG) / RINGS

const fmt = (n: number) => Number(n.toFixed(2))

function point(s: number, t: number) {
  return `${fmt((s - t) / 2)} ${fmt(SIN60 * (s + t))}`
}

function polygon(...corners: [number, number][]) {
  return 'M' + corners.map(([s, t]) => point(s, t)).join('L') + 'Z'
}

// Where a band centred at offset c starts and ends along its own direction
function reach(c: number): [number, number] {
  return [Math.max(-EXTENT, -EXTENT - c + HALF), Math.min(EXTENT, EXTENT - c - HALF)]
}

/*
 * Frame: hexagon with flat top and bottom (points to the left and right, like
 * the logo) and circular corners.
 */
function framePath(apothem: number, corner: number) {
  const radius = (apothem * 2) / Math.sqrt(3)
  const vertices = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i
    return [radius * Math.cos(angle), radius * Math.sin(angle)] as const
  })
  const tangent = corner * Math.tan(Math.PI / 6)
  const parts: string[] = []
  vertices.forEach((vertex, i) => {
    const toward = (target: readonly [number, number]) => {
      const dx = target[0] - vertex[0]
      const dy = target[1] - vertex[1]
      const length = Math.hypot(dx, dy)
      return [vertex[0] + (dx / length) * tangent, vertex[1] + (dy / length) * tangent]
    }
    const [ax, ay] = toward(vertices[(i + 5) % 6])
    const [bx, by] = toward(vertices[(i + 1) % 6])
    parts.push(
      `${i === 0 ? 'M' : 'L'}${fmt(ax)} ${fmt(ay)}`,
      `A${fmt(corner)} ${fmt(corner)} 0 0 1 ${fmt(bx)} ${fmt(by)}`,
    )
  })
  return parts.join('') + 'Z'
}

const indices = Array.from({ length: RINGS * 2 + 1 }, (_, i) => i - RINGS)

function delay(ms: number) {
  return { '--delay': `${Math.round(ms)}ms` } as React.CSSProperties
}

export function Weave({ className }: { className?: string }) {
  const h = HALF
  const crossings = indices
    .flatMap((i) => indices.map((j) => ({ i, j })))
    .filter(({ i, j }) => Math.abs(i + j) <= RINGS && (i + j) % 2 === 0)

  return (
    <svg
      viewBox="-100 -100 200 200"
      aria-hidden="true"
      className={className}
      fill="none"
      strokeLinejoin="round"
    >
      <path
        d={framePath(FRAME_APOTHEM, FRAME_CORNER)}
        pathLength={1}
        className="weave-thread stroke-teal"
        strokeWidth={FRAME_STROKE}
        style={delay(0)}
      />

      <g strokeWidth={LINE_STROKE} className="stroke-teal">
        {/* Warp: drawn first, lies underneath by default */}
        {indices.map((j) => {
          const t = j * PITCH
          const [from, to] = reach(t)
          return (
            <path
              key={`warp${j}`}
              d={polygon([from, t - h], [to, t - h], [to, t + h], [from, t + h])}
              pathLength={1}
              className="weave-thread"
              style={delay(150 + (j + RINGS) * 70)}
            />
          )
        })}

        {/* Weft: crosses over every warp band */}
        {indices.map((i) => {
          const s = i * PITCH
          const [from, to] = reach(s)
          return (
            <g key={`weft${i}`} className="weave-fade" style={delay(650 + (i + RINGS) * 70)}>
              <path
                d={polygon([s - h - GAP, from], [s + h + GAP, from], [s + h + GAP, to], [s - h - GAP, to])}
                className="fill-paper stroke-none"
              />
              <path
                d={polygon([s - h, from], [s - h, to], [s + h, to], [s + h, from])}
                pathLength={1}
                className="weave-thread"
                style={delay(650 + (i + RINGS) * 70)}
              />
            </g>
          )
        })}

        {/* Interlace: every other crossing lifts the warp back on top */}
        {crossings.map(({ i, j }) => {
          const s = i * PITCH
          const t = j * PITCH
          const s0 = s - h - GAP
          const s1 = s + h + GAP
          return (
            <g
              key={`over${i}_${j}`}
              className="weave-fade"
              style={delay(1750 + (i + j + 2 * RINGS) * 45)}
            >
              <path
                d={polygon([s0, t - h - GAP], [s1, t - h - GAP], [s1, t + h + GAP], [s0, t + h + GAP])}
                className="fill-paper stroke-none"
              />
              <path d={`M${point(s0, t - h)}L${point(s1, t - h)}M${point(s0, t + h)}L${point(s1, t + h)}`} />
            </g>
          )
        })}
      </g>
    </svg>
  )
}
