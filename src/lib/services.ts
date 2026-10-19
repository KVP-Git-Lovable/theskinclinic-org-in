import {
  Activity,
  Droplets,
  Dumbbell,
  Eraser,
  Flame,
  FlaskConical,
  Gem,
  Heart,
  Layers,
  Leaf,
  ScanFace,
  Sparkles,
  Sun,
  Syringe,
  Target,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategoryId = "skin" | "ageing" | "hair" | "body";

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
  blurb: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: "skin", label: "Skin & pigmentation", blurb: "Tone, texture, scars and clarity." },
  { id: "ageing", label: "Anti-ageing & lifting", blurb: "Firmer, smoother, naturally refreshed." },
  { id: "hair", label: "Hair", blurb: "Care for thinning and falling hair." },
  { id: "body", label: "Body & laser", blurb: "Contouring, hair reduction and tattoo removal." },
];

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategoryId;
  icon: LucideIcon;
  /** One line shown on cards. */
  tagline: string;
  whatItIs: string;
  bestFor: string[];
  howItWorks: string[];
  sessions: string;
  downtime: string;
  /** Optional extra fact tiles. */
  extras?: { label: string; value: string }[];
  device?: string;
}

// Content from the clinic's service list and brochure. Wording is kept close to the clinic's own;
// results vary between people and suitability is always assessed at consultation.
export const SERVICES: Service[] = [
  {
    slug: "revlite-laser",
    name: "Revlite Laser",
    category: "skin",
    icon: Zap,
    tagline: "Advanced laser for pigmentation, melasma, freckles and acne marks.",
    whatItIs: "A Q-switched Nd:YAG laser, used for pigmentation concerns and for toning the skin.",
    bestFor: ["Pigmentation and melasma", "Freckles and sun spots", "Post-inflammatory marks and acne marks", "Lip darkening", "Birthmark reduction and tattoos"],
    howItWorks: ["The laser delivers short, high-intensity pulses that break pigment into tiny fragments.", "Your body then clears the fragments naturally, so skin brightens gradually over sessions."],
    sessions: "3–6, depending on the concern",
    downtime: "Minimal",
    device: "Q-switched Nd:YAG",
    extras: [{ label: "Skin types", value: "Assessed at consultation" }],
  },
  {
    slug: "chemical-peels",
    name: "Chemical Peels",
    category: "skin",
    icon: FlaskConical,
    tagline: "Medical-grade exfoliation for dull, tanned or uneven skin.",
    whatItIs: "A controlled exfoliation using medical acids such as glycolic, salicylic and TCA (AHA and BHA peels).",
    bestFor: ["Dull skin and tanning", "Uneven tone and pigmentation", "Acne and mild acne scars", "Texture irregularities and fine lines"],
    howItWorks: ["The peel removes the outer, damaged layers of skin.", "Fresher, brighter, smoother skin is revealed underneath."],
    sessions: "3–8, depending on your skin",
    downtime: "Short: a few hours to 2 days",
    extras: [{ label: "Result", value: "Brighter, smoother, even-toned skin" }],
  },
  {
    slug: "scar-treatment",
    name: "Scar Treatment",
    category: "skin",
    icon: Layers,
    tagline: "Customised laser, microneedling and PRP plans for acne scars.",
    whatItIs: "A combination protocol of fractional laser, microneedling and PRP, planned around your type of scarring.",
    bestFor: ["Pitted (atrophic) acne scars", "Textural irregularities", "Scars on the face or body, assessed at consultation"],
    howItWorks: ["Fractional laser creates tiny controlled injuries that trigger new collagen.", "Microneedling stimulates the skin's own healing.", "PRP (platelet-rich plasma) supports regeneration."],
    sessions: "3–6 or more",
    downtime: "Varies with the method used",
    extras: [{ label: "Result", value: "Improved texture and firmness over time" }],
  },
  {
    slug: "pore-refining",
    name: "Pore Refining",
    category: "skin",
    icon: Target,
    tagline: "Smoother, more refined skin and less visible pores.",
    whatItIs: "A combination of lasers, peels, microneedling and radiofrequency chosen for your skin.",
    bestFor: ["Enlarged pores", "Rough or uneven texture"],
    howItWorks: ["The treatments tighten the skin and stimulate collagen.", "Over time pores look smaller and skin looks smoother."],
    sessions: "3–6",
    downtime: "Depends on the combination used",
    extras: [{ label: "Result", value: "Smoother, more refined skin" }],
  },
  {
    slug: "hydrafacial",
    name: "HydraFacial",
    category: "skin",
    icon: Droplets,
    tagline: "Medical-grade hydradermabrasion for an instant glow.",
    whatItIs: "A multi-step facial that cleanses, exfoliates, extracts impurities and infuses hydrating serums.",
    bestFor: ["Dull skin", "Dehydrated skin", "A pre-event glow"],
    howItWorks: ["A handheld device gently exfoliates and removes impurities from pores.", "Hydrating serums are infused into the skin at the same time."],
    sessions: "Single session or as a regular course",
    downtime: "None",
    device: "HydraFacial MD",
    extras: [{ label: "Result", value: "Instant glow and hydration" }],
  },
  {
    slug: "ipl-photofacial",
    name: "IPL (Intense Pulsed Light)",
    category: "skin",
    icon: Sun,
    tagline: "Light-based treatment for sun damage, redness and uneven tone.",
    whatItIs: "Intense pulsed light that targets pigment and tiny blood vessels, also known as a photofacial.",
    bestFor: ["Sun damage", "Freckles", "Rosacea and redness"],
    howItWorks: ["Light energy is absorbed by pigment and blood vessels in the skin.", "This reduces patchiness and redness over a few sessions."],
    sessions: "3–5",
    downtime: "Minimal",
    extras: [{ label: "Result", value: "Brighter, more even skin tone" }],
  },
  {
    slug: "lip-toning",
    name: "Lip Toning & Lip Perk",
    category: "skin",
    icon: Heart,
    tagline: "Gentle treatment for dark, uneven or dry lips.",
    whatItIs: "Two options: lip toning uses laser to reduce pigmentation, and Lip Perk exfoliates and hydrates deeply.",
    bestFor: ["Dark lips", "Uneven lip tone", "Dry lips"],
    howItWorks: ["Lip toning uses laser to lighten pigmentation.", "Lip Perk exfoliates and deeply hydrates the lips."],
    sessions: "3–6 for laser toning",
    downtime: "Minimal",
    extras: [{ label: "Result", value: "Softer, brighter lips" }],
  },

  {
    slug: "exion-face",
    name: "Exion Face",
    category: "ageing",
    icon: Sparkles,
    tagline: "Skin tightening and rejuvenation for fine lines and firmness.",
    whatItIs: "An advanced treatment for skin tightening and rejuvenation of the face.",
    bestFor: ["Fine lines and wrinkles", "Texture irregularities", "Loss of firmness", "Moderate to deeper concerns, assessed at consultation"],
    howItWorks: ["Energy is delivered to the skin in controlled zones.", "The skin then remodels itself and builds new collagen."],
    sessions: "Planned at consultation",
    downtime: "Depends on the settings used; your doctor will explain",
    device: "Exion",
    extras: [{ label: "Result", value: "Smoother, firmer-looking skin" }],
  },
  {
    slug: "emface",
    name: "Emface",
    category: "ageing",
    icon: ScanFace,
    tagline: "Non-surgical, needle-free facial lifting and tightening.",
    whatItIs: "A non-invasive facial lifting and tightening device combining HIFES muscle stimulation with radiofrequency.",
    bestFor: ["Facial sagging", "Jowls", "Cheek lift", "Jawline definition"],
    howItWorks: ["HIFES stimulates and tones the facial muscles.", "Radiofrequency tightens the skin at the same time."],
    sessions: "4–6 for best results",
    downtime: "None",
    device: "Emface (HIFES + RF)",
    extras: [{ label: "Needles", value: "None" }],
  },
  {
    slug: "legend-pro",
    name: "Legend Pro",
    category: "ageing",
    icon: Gem,
    tagline: "Radiofrequency skin tightening and collagen stimulation.",
    whatItIs: "An advanced non-surgical skin-tightening device using TriPollar radiofrequency.",
    bestFor: ["Skin tightening", "Wrinkles", "Acne scars", "Texture improvement"],
    howItWorks: ["Radiofrequency energy heats the deeper layers of skin.", "This stimulates deep collagen remodelling."],
    sessions: "4–6 recommended",
    downtime: "Minimal",
    device: "Lumenis Legend Pro (TriPollar RF)",
    extras: [{ label: "Result", value: "Firmer, smoother skin over time" }],
  },
  {
    slug: "dermal-fillers",
    name: "Dermal Fillers",
    category: "ageing",
    icon: Syringe,
    tagline: "Restore volume and contour to lips, cheeks, jawline and under-eyes.",
    whatItIs: "Injectable hyaluronic acid (or other) gels that add volume and support facial structure.",
    bestFor: ["Volume loss", "Cheeks and jawline", "Lips", "Under-eyes", "Fine lines"],
    howItWorks: ["The gel is placed in carefully chosen areas to plump and support the face.", "The improvement can be seen straight away."],
    sessions: "Usually a single session, with top-ups",
    downtime: "Minimal",
    extras: [{ label: "Lasts", value: "About 6–18 months, depending on area and product" }],
  },
  {
    slug: "botox",
    name: "Botox",
    category: "ageing",
    icon: Syringe,
    tagline: "Soften expression lines on the forehead, frown and eyes.",
    whatItIs: "A muscle-relaxing injectable used to reduce expression lines.",
    bestFor: ["Forehead lines", "Frown lines", "Crow's feet", "Jaw slimming", "Excessive sweating"],
    howItWorks: ["Small amounts relax the targeted muscles.", "Wrinkles soften because the muscles move less."],
    sessions: "Repeated when the effect fades",
    downtime: "Minimal",
    extras: [{ label: "Lasts", value: "About 4–6 months" }],
  },

  {
    slug: "scalp-booster",
    name: "Scalp Booster",
    category: "hair",
    icon: Leaf,
    tagline: "Nutrient therapy for thinning hair and weak roots.",
    whatItIs: "An injectable or microneedling-based nutrient therapy for the scalp.",
    bestFor: ["Hair thinning", "Weak hair roots"],
    howItWorks: ["Vitamins and growth factors are delivered directly into the scalp.", "This supports the follicles to grow stronger hair."],
    sessions: "3–6",
    downtime: "Minimal",
    extras: [{ label: "Result", value: "Stronger, healthier hair growth" }],
  },
  {
    slug: "gfc-hair",
    name: "GFC (Growth Factor Concentrate)",
    category: "hair",
    icon: Activity,
    tagline: "A concentrated, refined form of PRP for hair fall.",
    whatItIs: "An advanced version of PRP made from growth factors extracted from your own blood.",
    bestFor: ["Hair fall", "Hair thinning"],
    howItWorks: ["Growth factors are separated from a small blood sample.", "They are placed in the scalp to stimulate the follicles."],
    sessions: "3–4",
    downtime: "Minimal",
    extras: [{ label: "Compared with PRP", value: "More concentrated and refined" }],
  },
  {
    slug: "prp-hair",
    name: "PRP for Hair",
    category: "hair",
    icon: Droplets,
    tagline: "Your own platelets to activate early hair loss and thinning.",
    whatItIs: "Platelet-rich plasma therapy for the scalp.",
    bestFor: ["Early hair loss", "Thinning hair"],
    howItWorks: ["Platelets are taken from your own blood.", "They are injected into the scalp to activate hair growth."],
    sessions: "4–6",
    downtime: "Minimal",
  },
  {
    slug: "qr678-neo",
    name: "QR678 Neo",
    category: "hair",
    icon: Flame,
    tagline: "Growth-factor injection therapy for pattern and diffuse hair loss.",
    whatItIs: "A non-surgical hair regrowth treatment using a ready-mixed growth-factor solution.",
    bestFor: ["Male and female pattern hair loss", "Diffuse thinning"],
    howItWorks: ["The solution is injected into the scalp.", "It stimulates the follicles to reduce hair fall and improve density."],
    sessions: "6–8",
    downtime: "Minimal",
    extras: [{ label: "Result", value: "Reduced hair fall and improved density" }],
  },

  {
    slug: "laser-hair-reduction",
    name: "Laser Hair Reduction",
    category: "body",
    icon: Waves,
    tagline: "Long-term reduction of unwanted hair on face and body.",
    whatItIs: "Diode or Alexandrite laser that targets hair follicles. Other devices are used for different skin tones.",
    bestFor: ["Face and underarms", "Arms and legs", "Bikini area", "Full body"],
    howItWorks: ["Laser heat damages the hair follicle.", "Regrowth reduces over the course of sessions."],
    sessions: "6–10 or more, spaced 4–8 weeks apart",
    downtime: "Minimal",
    device: "LightSheer Duet, Deka Again",
    extras: [{ label: "Best results", value: "Dark hair; protocols adapted for other skin tones" }],
  },
  {
    slug: "emsculpt-neo",
    name: "Emsculpt Neo",
    category: "body",
    icon: Dumbbell,
    tagline: "Non-surgical fat reduction and muscle toning.",
    whatItIs: "A body-contouring device that combines radiofrequency with HIFEM.",
    bestFor: ["Abdomen", "Arms", "Thighs", "Other body areas, assessed at consultation"],
    howItWorks: ["Radiofrequency heats and breaks down fat cells.", "HIFEM triggers deep muscle contractions to tone and strengthen."],
    sessions: "4–6 are most effective",
    downtime: "None expected",
    device: "Emsculpt Neo",
    extras: [{ label: "Result", value: "Leaner, firmer body contours" }],
  },
  {
    slug: "tattoo-removal",
    name: "Tattoo Removal",
    category: "body",
    icon: Eraser,
    tagline: "Gradual fading of unwanted tattoos with PicoCare laser.",
    whatItIs: "Laser tattoo removal using the PicoCare picosecond laser.",
    bestFor: ["Unwanted tattoos"],
    howItWorks: ["The laser breaks tattoo ink into tiny particles.", "Your body clears them, so the tattoo fades with each session."],
    sessions: "4–8 or more, depending on size, depth and colour",
    downtime: "Mild redness or swelling",
    device: "PicoCare",
    extras: [{ label: "Gap between sessions", value: "4–6 weeks" }],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const getCategory = (id: ServiceCategoryId) => SERVICE_CATEGORIES.find((c) => c.id === id)!;

export const MEDICAL_CONDITIONS = [
  "Acne", "Atopic eczema", "Psoriasis", "Vitiligo", "Urticaria", "Pruritus (itching)",
  "Seborrhoeic dermatitis", "Allergic & irritant contact dermatitis", "Lichen planus",
  "Viral, bacterial & fungal infections", "Drug reactions", "Autoimmune disorders", "Vasculitis",
  "Alopecia areata & patterned hair loss", "Nail disorders", "Pregnancy dermatoses",
  "Paediatric dermatoses", "Geriatric dermatoses",
];

export const AESTHETIC_CONCERNS = [
  "Ageing skin", "Photo-ageing & pigmentation", "Melasma", "Freckles", "Acne scars", "Stretch marks",
  "Burn scars", "Keloids", "Under-eye wrinkles & dark circles", "Neck & chest rejuvenation",
  "Pore size reduction", "Rosacea", "Hirsutism (unwanted hair)", "Tattoo removal",
  "Excessive sweating (underarms & palms)", "Aged hands", "Darkened upper back", "Moles",
  "Body contouring", "Stubborn fat & cellulite reduction",
];

export const TECHNOLOGY: { device: string; usedFor: string }[] = [
  { device: "Revlite", usedFor: "Pigmentation, toning, birthmark reduction" },
  { device: "PicoCare", usedFor: "Scars, pores, tattoo removal, toning" },
  { device: "Ultrapulse CO₂", usedFor: "Mole removal, skin rejuvenation" },
  { device: "Ellman RF", usedFor: "Mole and skin tag removal" },
  { device: "LightSheer Duet", usedFor: "Hair reduction" },
  { device: "Deka Again", usedFor: "Hair reduction, vein treatment" },
  { device: "HydraFacial MD", usedFor: "Cleansing, exfoliation, hydration" },
  { device: "Lumenis M22", usedFor: "Skin rejuvenation, stretch marks, photofacial" },
  { device: "Deka Onda, Emsculpt Neo & Exion body", usedFor: "Body sculpting" },
  { device: "Excimer", usedFor: "Light therapy for vitiligo, psoriasis, alopecia areata" },
  { device: "Emface, Lumenis Legend Pro & Viora V10", usedFor: "Anti-ageing" },
];
