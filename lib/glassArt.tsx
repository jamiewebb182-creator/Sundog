/**
 * Procedural "stained glass" artwork — the same generated placeholder look
 * used throughout the site wherever a real photo hasn't been added yet
 * (see lib/content.ts). Deterministic per `seed`, so the same item always
 * renders the same pattern.
 */

const PALETTES = [
  ["#2c4a7c", "#4468a3", "#c98a2c", "#8c2f39", "#f3e3c2"],
  ["#35634f", "#57987a", "#c98a2c", "#274435", "#f3e3c2"],
  ["#8c2f39", "#b6535f", "#c98a2c", "#2c4a7c", "#f3e3c2"],
  ["#c98a2c", "#e2ac5c", "#2c4a7c", "#35634f", "#f7ebcf"],
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

function mulberry32(seed: number) {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Point = [number, number];

export function GlassArt({
  seed,
  palette = 0,
  cols = 6,
  rows = 4,
  className,
}: {
  seed: string;
  palette?: number;
  cols?: number;
  rows?: number;
  className?: string;
}) {
  const w = 400,
    h = 300;
  const colours = PALETTES[palette % PALETTES.length];
  const rand = mulberry32(hashStr(seed));
  const cw = w / cols,
    ch = h / rows;
  const pts: Point[][] = [];
  for (let r = 0; r <= rows; r++) {
    const row: Point[] = [];
    for (let c = 0; c <= cols; c++) {
      const jx = c > 0 && c < cols ? (rand() - 0.5) * cw * 0.6 : 0;
      const jy = r > 0 && r < rows ? (rand() - 0.5) * ch * 0.6 : 0;
      row.push([c * cw + jx, r * ch + jy]);
    }
    pts.push(row);
  }
  const polys: { points: string; fill: string; brightness: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const p00 = pts[r][c],
        p10 = pts[r][c + 1],
        p01 = pts[r + 1][c],
        p11 = pts[r + 1][c + 1];
      const flip = rand() > 0.5;
      const triA = flip ? [p00, p10, p11] : [p00, p10, p01];
      const triB = flip ? [p00, p11, p01] : [p10, p11, p01];
      for (const tri of [triA, triB]) {
        const colour = colours[Math.floor(rand() * colours.length)];
        const brightness = 1 + (rand() * 0.22 - 0.11);
        polys.push({
          points: tri.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" "),
          fill: colour,
          brightness,
        });
      }
    }
  }
  const gid = "sheen-" + seed.replace(/[^a-z0-9]/gi, "");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Generated stained glass swatch"
      className={className}
    >
      <rect width={w} height={h} fill="#14110f" />
      <g stroke="#1a1510" strokeWidth={2.4} strokeLinejoin="round">
        {polys.map((p, i) => (
          <polygon key={i} points={p.points} fill={p.fill} style={{ filter: `brightness(${p.brightness.toFixed(2)})` }} />
        ))}
      </g>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity={0.5} />
          <stop offset="35%" stopColor="#fff" stopOpacity={0} />
          <stop offset="70%" stopColor="#fff" stopOpacity={0} />
          <stop offset="100%" stopColor="#fff" stopOpacity={0.22} />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${gid})`} />
    </svg>
  );
}
