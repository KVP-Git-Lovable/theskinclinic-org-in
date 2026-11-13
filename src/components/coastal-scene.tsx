interface Scene {
  sky: [string, string, string];
  sun?: { x: number; y: number; r: number; core: string; glow: string };
  moon?: { x: number; y: number; r: number };
  stars?: boolean;
  clouds: number;
  hill: string;
  sea: [string, string];
}

// One light, quiet coastal scene for each part of the day.
const SCENES: Scene[] = [
  { sky: ["#fde1c9", "#fff1e3", "#e9f4f1"], sun: { x: 118, y: 330, r: 30, core: "#ffc98a", glow: "#ffd8a6" }, clouds: 0.55, hill: "#dce7e0", sea: ["#cfe8e9", "#eaf6f4"] },
  { sky: ["#bde2f6", "#e2f2fb", "#f6fbfd"], sun: { x: 312, y: 105, r: 28, core: "#fff0a8", glow: "#fff6c6" }, clouds: 0.95, hill: "#d0e6dc", sea: ["#b8e0ea", "#e1f3f6"] },
  { sky: ["#f5c3b0", "#fde2cf", "#f7dbe7"], sun: { x: 334, y: 338, r: 34, core: "#ff9d6c", glow: "#ffc19a" }, clouds: 0.5, hill: "#e7d0d2", sea: ["#f2cbc2", "#f8e4dd"] },
  { sky: ["#c5cbec", "#dcdff3", "#ecebf7"], moon: { x: 322, y: 118, r: 20 }, stars: true, clouds: 0.3, hill: "#ced2e5", sea: ["#cbd1eb", "#e5e7f5"] },
];

const STARS = [[60, 70], [130, 40], [200, 95], [260, 50], [380, 80], [410, 150], [90, 150], [350, 190], [180, 160]];

/** A soft coastal illustration (sky, sun or moon, clouds, hills, sea and waves) that fills its parent. */
export function CoastalScene({ index }: { index: number }) {
  const s = SCENES[index];
  const id = `scene-${index}`;
  return (
    <svg aria-hidden="true" viewBox="0 0 448 560" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.sky[0]} />
          <stop offset="0.6" stopColor={s.sky[1]} />
          <stop offset="1" stopColor={s.sky[2]} />
        </linearGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.sea[0]} />
          <stop offset="1" stopColor={s.sea[1]} />
        </linearGradient>
        {s.sun && (
          <radialGradient id={`${id}-glow`}>
            <stop offset="0" stopColor={s.sun.glow} stopOpacity="0.9" />
            <stop offset="1" stopColor={s.sun.glow} stopOpacity="0" />
          </radialGradient>
        )}
      </defs>
      <rect width="448" height="560" fill={`url(#${id}-sky)`} />

      {s.stars && STARS.map(([x, y], k) => <circle key={k} cx={x} cy={y} r={k % 3 === 0 ? 1.6 : 1} fill="#ffffff" opacity={0.8} />)}
      {s.moon && (
        <g className="ai-float-slow">
          <circle cx={s.moon.x} cy={s.moon.y} r={s.moon.r * 2.6} fill="#ffffff" opacity="0.22" />
          <circle cx={s.moon.x} cy={s.moon.y} r={s.moon.r} fill="#fbfaf2" />
          <circle cx={s.moon.x + 8} cy={s.moon.y - 5} r={s.moon.r * 0.85} fill={s.sky[0]} opacity="0.55" />
        </g>
      )}
      {s.sun && (
        <g className="ai-float-slow">
          <circle cx={s.sun.x} cy={s.sun.y} r={s.sun.r * 3.4} fill={`url(#${id}-glow)`} />
          <circle cx={s.sun.x} cy={s.sun.y} r={s.sun.r} fill={s.sun.core} />
        </g>
      )}

      <g opacity={s.clouds} className="ai-drift-slow">
        <ellipse cx="90" cy="150" rx="46" ry="12" fill="#ffffff" />
        <ellipse cx="122" cy="141" rx="30" ry="12" fill="#ffffff" />
        <ellipse cx="330" cy="215" rx="52" ry="13" fill="#ffffff" />
        <ellipse cx="364" cy="205" rx="30" ry="12" fill="#ffffff" />
      </g>

      <path d="M0 372 C60 332 120 346 180 356 C240 366 300 326 360 342 C400 352 430 362 448 360 L448 380 L0 380 Z" fill={s.hill} />
      <rect y="372" width="448" height="188" fill={`url(#${id}-sea)`} />
      {s.sun && <ellipse cx={s.sun.x} cy="398" rx={s.sun.r * 1.3} ry="4" fill={s.sun.core} opacity="0.45" />}
      <g className="ai-drift" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.7">
        <path d="M-20 414 q22 -8 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0" />
        <path d="M-40 446 q22 -8 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0" />
        <path d="M-10 482 q22 -8 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0" />
      </g>
    </svg>
  );
}
