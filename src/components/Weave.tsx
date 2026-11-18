/*
 * The woven hexagon from the GP-HC logo, drawn as line art.
 *
 * Two sets of bands cross at right angles (rotated by 45°) and alternate
 * over/under like a weave: individual threads that only hold together as a
 * fabric. The weave is cut to an inner hexagon that runs parallel to the outer
 * frame (an inward offset, corners included), so the margin between frame and
 * weave is the same all the way round.
 *
 * Rendered as static SVG at build time; the draw-in animation is pure CSS
 * (see .weave-thread / .weave-fade) and is skipped for reduced motion.
 */

const FRAME_APOTHEM = 81 // centre to the middle of a frame edge
const FRAME_CORNER = 18 // corner radius of the frame
const FRAME_STROKE = 2.2
const LINE_STROKE = 1.1
const MARGIN = 20 // clear space between frame and weave
const BAND = 10 // band width
const PITCH = 20 // distance between band centres
const GAP = 1.8 // breathing room where one band passes under another

// Inner hexagon: offset inwards so that the clear space between the inside of
// the frame stroke and the weave equals MARGIN everywhere.
const OFFSET = FRAME_STROKE / 2 + MARGIN
const FIELD_APOTHEM = FRAME_APOTHEM - OFFSET
const FIELD_CORNER = Math.max(FRAME_CORNER - OFFSET, 4) // keep a soft corner
const FIELD_RADIUS = (FIELD_APOTHEM * 2) / Math.sqrt(3)

const fmt = (n: number) => Number(n.toFixed(2))

/*
 * Hexagon with flat top and bottom (points to the left and right, like the
 * logo) and true circular corners, so that two of them with the same centre
 * are exact offsets of each other.
 */
function hexagonPath(apothem: number, corner: number) {
  const radius = (apothem * 2) / Math.sqrt(3)
  const vertices = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i
    return [radius * Math.cos(angle), radius * Math.sin(angle)] as const
  })
  // Distance from a vertex to where the corner arc meets the edge
  const tangent = corner * Math.tan(Math.PI / 6)
  const parts: string[] = []
  vertices.forEach((vertex, i) => {
    const prev = vertices[(i + 5) % 6]
    const next = vertices[(i + 1) % 6]
    const toward = (target: readonly [number, number]) => {
      const dx = target[0] - vertex[0]
      const dy = target[1] - vertex[1]
      const length = Math.hypot(dx, dy)
      return [vertex[0] + (dx / length) * tangent, vertex[1] + (dy / length) * tangent]
    }
    const [ax, ay] = toward(prev)
    const [bx, by] = toward(next)
    parts.push(
      `${i === 0 ? 'M' : 'L'}${fmt(ax)} ${fmt(ay)}`,
      corner > 0 ? `A${fmt(corner)} ${fmt(corner)} 0 0 1 ${fmt(bx)} ${fmt(by)}` : '',
    )
  })
  return parts.join('') + 'Z'
}

// Band centre lines, in a frame rotated by 45°: warp runs horizontally,
// weft vertically. Bands reach past the field and are cut by the clip path.
const reach = Math.ceil((FIELD_RADIUS + BAND / 2) / PITCH)
const offsets = Array.from({ length: reach * 2 + 1 }, (_, i) => (i - reach) * PITCH)
const LENGTH = FIELD_RADIUS + BAND

function delay(ms: number) {
  return { '--delay': `${Math.round(ms)}ms` } as React.CSSProperties
}

export function Weave({ className }: { className?: string }) {
  const half = BAND / 2
  const field = hexagonPath(FIELD_APOTHEM, FIELD_CORNER)
  const crossings = offsets
    .flatMap((y) => offsets.map((x) => ({ x, y })))
    .filter(({ x, y }) => Math.round((x + y) / PITCH) % 2 === 0)

  return (
    <svg
      viewBox="-100 -100 200 200"
      aria-hidden="true"
      className={className}
      fill="none"
      strokeLinejoin="round"
    >
      <defs>
        <clipPath id="weave-field">
          <path d={field} />
        </clipPath>
      </defs>

      <path
        d={hexagonPath(FRAME_APOTHEM, FRAME_CORNER)}
        pathLength={1}
        className="weave-thread stroke-teal"
        strokeWidth={FRAME_STROKE}
        style={delay(0)}
      />

      <g clipPath="url(#weave-field)">
        <g transform="rotate(45)" strokeWidth={LINE_STROKE} className="stroke-teal">
          {/* Warp: drawn first, lies underneath by default */}
          {offsets.map((y, i) => (
            <g key={`warp-${y}`}>
              {[y - half, y + half].map((edge) => (
                <path
                  key={edge}
                  d={`M${fmt(-LENGTH)} ${fmt(edge)}H${fmt(LENGTH)}`}
                  pathLength={1}
                  className="weave-thread"
                  style={delay(150 + i * 60)}
                />
              ))}
            </g>
          ))}

          {/* Weft: crosses over every warp band */}
          {offsets.map((x, j) => (
            <g key={`weft-${x}`} className="weave-fade" style={delay(600 + j * 60)}>
              <rect
                x={fmt(x - half - GAP)}
                y={fmt(-LENGTH)}
                width={fmt(BAND + 2 * GAP)}
                height={fmt(2 * LENGTH)}
                className="fill-paper stroke-none"
              />
              {[x - half, x + half].map((edge) => (
                <path
                  key={edge}
                  d={`M${fmt(edge)} ${fmt(-LENGTH)}V${fmt(LENGTH)}`}
                  pathLength={1}
                  className="weave-thread"
                  style={delay(600 + j * 60)}
                />
              ))}
            </g>
          ))}

          {/* Interlace: every other crossing lifts the warp back on top */}
          {crossings.map(({ x, y }) => {
            const start = x - half - GAP
            const length = BAND + 2 * GAP
            return (
              <g
                key={`over-${x}-${y}`}
                className="weave-fade"
                style={delay(1700 + ((x + y) / PITCH + 2 * reach) * 35)}
              >
                <rect
                  x={fmt(start)}
                  y={fmt(y - half - GAP)}
                  width={fmt(length)}
                  height={fmt(BAND + 2 * GAP)}
                  className="fill-paper stroke-none"
                />
                <path
                  d={`M${fmt(start)} ${fmt(y - half)}h${fmt(length)}M${fmt(start)} ${fmt(y + half)}h${fmt(length)}`}
                />
              </g>
            )
          })}
        </g>
      </g>

    </svg>
  )
}
