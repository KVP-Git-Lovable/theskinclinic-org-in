import type { Service, ServiceCategoryId } from "@/lib/services";
import { SERVICE_IMAGES, SERVICE_IMAGE_POSITION } from "@/lib/service-images";

const THEME: Record<ServiceCategoryId, { bg: string; ink: string; chip: string }> = {
  skin: { bg: "from-sage/45 via-mist to-ivory", ink: "text-sage-dark", chip: "bg-ivory/80 text-sage-dark" },
  ageing: { bg: "from-amber-100 via-orange-50 to-ivory", ink: "text-amber-800", chip: "bg-ivory/80 text-amber-900" },
  hair: { bg: "from-emerald-200/70 via-mist to-ivory", ink: "text-emerald-900", chip: "bg-ivory/80 text-emerald-950" },
  body: { bg: "from-slate-300/80 via-slate-100 to-ivory", ink: "text-slate-700", chip: "bg-ivory/80 text-slate-800" },
};

/** Soft line-art backdrop per category, drawn in currentColor. */
function Pattern({ category }: { category: ServiceCategoryId }) {
  const common = { className: "absolute inset-0 size-full transition-transform duration-[1200ms] ease-out group-hover:scale-110", viewBox: "0 0 400 240", preserveAspectRatio: "xMidYMid slice", fill: "none", stroke: "currentColor", "aria-hidden": true } as const;
  if (category === "skin")
    return (
      <svg {...common} strokeWidth="1" opacity="0.28">
        {[40, 80, 120, 160, 200].map((r) => (
          <circle key={r} cx="300" cy="70" r={r} />
        ))}
        <circle cx="60" cy="200" r="60" />
        <circle cx="60" cy="200" r="30" />
      </svg>
    );
  if (category === "ageing")
    return (
      <svg {...common} strokeWidth="1" opacity="0.3">
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M-20 ${30 + i * 28} C 100 ${i * 28 - 20}, 220 ${90 + i * 28}, 420 ${20 + i * 28}`} />
        ))}
      </svg>
    );
  if (category === "hair")
    return (
      <svg {...common} strokeWidth="1.2" opacity="0.28">
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d={`M${i * 36 - 20} 260 C ${i * 36 + 30} 170, ${i * 36 - 40} 100, ${i * 36 + 20} -20`} />
        ))}
      </svg>
    );
  return (
    <svg {...common} fill="currentColor" stroke="none" opacity="0.22">
      {Array.from({ length: 6 }).flatMap((_, r) =>
        Array.from({ length: 11 }).map((__, c) => <circle key={`${r}-${c}`} cx={20 + c * 36} cy={25 + r * 38} r={r % 2 ? 2.2 : 3} />),
      )}
    </svg>
  );
}

/** Illustrated cover tile for a service: category colour, line-art pattern and a framed icon. */
export function ServiceCover({
  service,
  categoryLabel,
  className = "aspect-[16/10]",
  showLabel = true,
}: {
  service: Service;
  categoryLabel?: string;
  className?: string;
  showLabel?: boolean;
}) {
  const t = THEME[service.category];
  const image = SERVICE_IMAGES[service.slug];
  if (image)
    return (
      <div className={`relative overflow-hidden bg-mist ${className}`}>
        <img
          src={image}
          alt={`${service.name}: illustration`}
          loading="lazy"
          width={1600}
          height={1000}
          style={{ objectPosition: SERVICE_IMAGE_POSITION[service.slug] ?? "center" }}
          className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        {showLabel && categoryLabel && (
          <span className={`absolute left-4 top-4 px-3 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm ${t.chip}`}>
            {categoryLabel}
          </span>
        )}
      </div>
    );
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${t.bg} ${t.ink} ${className}`}>
      <Pattern category={service.category} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex size-24 items-center justify-center rounded-full bg-ivory/80 shadow-xl backdrop-blur-sm ring-8 ring-ivory/40 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6">
          <service.icon className="size-10" strokeWidth={1.1} />
        </span>
      </div>
      {showLabel && categoryLabel && (
        <span className={`absolute left-4 top-4 px-3 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm ${t.chip}`}>
          {categoryLabel}
        </span>
      )}
    </div>
  );
}
