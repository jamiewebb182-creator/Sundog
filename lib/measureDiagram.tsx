/** Hand-drawn-style diagrams explaining "tight" vs "visible" measurements,
 * shown under the measurement fields on the commission page until real
 * reference photos are added (see the deployment notes). */
export function MeasureDiagram({ kind }: { kind: "tight" | "visible" }) {
  const isTight = kind === "tight";
  const wx1 = isTight ? 64 : 50,
    wx2 = isTight ? 216 : 230,
    wy = isTight ? 16 : 10;
  const hy1 = isTight ? 50 : 38,
    hy2 = isTight ? 140 : 152,
    hx = isTight ? 22 : 12;

  function tri(x: number, y: number, dir: "up" | "down" | "left" | "right") {
    const s = 4;
    if (dir === "left") return `M${x},${y} l${s},-${s} l0,${2 * s} z`;
    if (dir === "right") return `M${x},${y} l-${s},-${s} l0,${2 * s} z`;
    if (dir === "up") return `M${x},${y} l-${s},${s} l${2 * s},0 z`;
    return `M${x},${y} l-${s},-${s} l${2 * s},0 z`;
  }

  const widthLabel = isTight ? "tight width" : "visible width";
  const heightLabel = isTight ? "tight height" : "visible height";

  return (
    <svg
      viewBox="0 0 280 175"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={isTight ? "How to take the tight measurement" : "How to take the visible measurement"}
      style={{ color: "var(--ink)" }}
    >
      <rect x={40} y={28} width={200} height={134} rx={4} fill="none" stroke="currentColor" strokeOpacity={0.55} strokeWidth={2} />
      {isTight ? (
        <rect x={64} y={50} width={152} height={90} rx={2} fill="none" stroke="currentColor" strokeDasharray="5 4" strokeWidth={1.6} />
      ) : (
        <rect x={50} y={38} width={180} height={114} rx={2} fill="currentColor" fillOpacity={0.07} stroke="currentColor" strokeDasharray="5 4" strokeWidth={1.6} />
      )}
      <g style={{ color: "var(--amber)" }} stroke="currentColor" fill="currentColor">
        <line x1={wx1} y1={wy} x2={wx2} y2={wy} strokeWidth={1.4} />
        <path d={tri(wx1, wy, "left")} />
        <path d={tri(wx2, wy, "right")} />
        <text x={(wx1 + wx2) / 2} y={wy - 6} fontSize={9} textAnchor="middle" fontFamily="JetBrains Mono, monospace" stroke="none">
          {widthLabel}
        </text>
        <line x1={hx} y1={hy1} x2={hx} y2={hy2} strokeWidth={1.4} />
        <path d={tri(hx, hy1, "up")} />
        <path d={tri(hx, hy2, "down")} />
        <text
          x={hx}
          y={(hy1 + hy2) / 2}
          fontSize={9}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          stroke="none"
          transform={`rotate(-90 ${hx} ${(hy1 + hy2) / 2})`}
        >
          {heightLabel}
        </text>
      </g>
    </svg>
  );
}
