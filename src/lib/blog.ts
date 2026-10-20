import { Activity, Apple, Dumbbell, Droplets, Scissors, Sparkles, Sun, type LucideIcon } from "lucide-react";
import vidLaserHair from "@/assets/blog/videos/laser-hair-reduction.mp4";
import vidHairThinning from "@/assets/blog/videos/hair-thinning-prp-gfc.mp4";
import vidRfPico from "@/assets/blog/videos/rf-microneedling-picosecond.mp4";
import vidEmsculpt from "@/assets/blog/videos/emsculpt-neo.mp4";
import imgEveryAge from "@/assets/blog/skincare-for-every-age.jpg";
import imgDiet from "@/assets/blog/how-diet-affects-your-skin.jpg";
import imgAcne from "@/assets/blog/medical-acne-treatment.jpg";

export type Block =
  | { type: "h"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogVideo {
  /** Vertical (9:16) clip from the clinic. */
  src: string;
  /** Shown on the card, e.g. "0:59". */
  duration: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string; // ISO yyyy-mm-dd
  readingMinutes: number;
  icon: LucideIcon;
  /** Tailwind gradient classes used when a post has no image. */
  cover: string;
  /** Cover photo (see assets/blog/CREDITS.md) and where to centre it when cropped. */
  image?: string;
  imagePosition?: string;
  /** When set, the post is a video story: the clip plays beside the article. */
  video?: BlogVideo;
  /** Link to the matching treatment page, if there is one. */
  treatmentSlug?: string;
  body: Block[];
}

// Starter articles on the topics of the clinic's earlier posts, rewritten for this site.
// Add new posts to the top of this list; each needs a unique slug.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "laser-hair-reduction-explained",
    title: "Laser hair reduction: how it works and what to expect",
    excerpt: "Unwanted hair on the face, underarms or legs doesn't have to be a weekly chore. Here is how laser hair reduction works, in under a minute.",
    category: "Laser",
    author: "The Skin Clinic team",
    date: "2026-10-20",
    readingMinutes: 2,
    icon: Scissors,
    cover: "from-sage/50 via-mist to-ivory",
    video: { src: vidLaserHair, duration: "0:59" },
    treatmentSlug: "laser-hair-reduction",
    body: [
      { type: "p", text: "Laser hair reduction uses a laser that is absorbed by the pigment in the hair. The heat damages the hair follicle, so over a course of sessions less hair grows back, and the hair that does return is usually finer." },
      { type: "h", text: "What to expect" },
      { type: "ul", items: ["Areas commonly treated include the upper lip, chin, face, underarms, arms, legs and bikini area", "Most people need around 6 to 10 sessions, spaced 4 to 8 weeks apart", "Dark hair responds best; plans are adapted for different skin and hair types", "Downtime is minimal, though the skin can look slightly red for a short while afterwards"] },
      { type: "h", text: "Before you start" },
      { type: "p", text: "A short consultation lets your dermatologist check your skin and hair, explain how many sessions are likely and tell you how to prepare, for example avoiding sun exposure and waxing between sessions. Results and recovery vary from person to person." },
    ],
  },
  {
    slug: "hair-thinning-prp-and-gfc",
    title: "Hair getting thinner? Understanding PRP and GFC",
    excerpt: "PRP and GFC use growth factors from your own blood to support the scalp. A quick look at what they are and how a session goes.",
    category: "Hair",
    author: "The Skin Clinic team",
    date: "2026-10-20",
    readingMinutes: 3,
    icon: Activity,
    cover: "from-emerald-100 via-mist to-ivory",
    video: { src: vidHairThinning, duration: "0:47" },
    treatmentSlug: "prp-hair",
    body: [
      { type: "p", text: "Hair that slowly gets thinner can have many causes, from hormones and nutrition to stress and genetics, so the first step is always finding out why. Where it is suitable, treatments such as PRP and GFC can be added to support the scalp." },
      { type: "h", text: "How they work" },
      { type: "ul", items: ["A small sample of your own blood is taken", "It is processed to separate the platelets and growth factors from the rest", "The concentrate is then injected into the scalp to support the hair follicles", "GFC is a more concentrated, refined version of the same idea"] },
      { type: "h", text: "What to expect" },
      { type: "p", text: "A course usually means several sessions (typically 3 to 6, depending on the treatment) with little downtime. Hair care is gradual, and your dermatologist will tell you what is realistic for you. This is general information, not a diagnosis." },
    ],
  },
  {
    slug: "rf-microneedling-and-picosecond-laser",
    title: "Crepey skin and acne scars: RF microneedling and picosecond laser",
    excerpt: "Dr. Punya Suvarna explains two of the technologies we use to improve skin texture, from crepey skin to acne scars.",
    category: "Skin texture",
    author: "The Skin Clinic team",
    date: "2026-10-20",
    readingMinutes: 2,
    icon: Sparkles,
    cover: "from-amber-100 via-orange-50 to-ivory",
    video: { src: vidRfPico, duration: "0:38" },
    treatmentSlug: "scar-treatment",
    body: [
      { type: "p", text: "Thin, crinkled or crepey skin and acne scars both come down to the skin's structure and collagen. Two technologies we use to improve texture are RF microneedling and picosecond laser." },
      { type: "h", text: "The two technologies" },
      { type: "ul", items: ["RF microneedling combines tiny needles with radiofrequency energy to stimulate the skin's own collagen", "Picosecond laser uses extremely short pulses of light and is used for texture, scars and pigmentation", "Your dermatologist may use one of them or combine them with other treatments, depending on your skin"] },
      { type: "h", text: "Planning your care" },
      { type: "p", text: "How many sessions you need depends on the type and depth of the concern, and improvement is gradual. A consultation is the best way to find out which option suits your skin. Results vary from person to person." },
    ],
  },
  {
    slug: "emsculpt-neo-body-contouring",
    title: "Emsculpt Neo: body contouring in about 30 minutes",
    excerpt: "A non-surgical way to help reduce fat and tone muscle, with no downtime expected. See how a session works.",
    category: "Body",
    author: "The Skin Clinic team",
    date: "2026-10-20",
    readingMinutes: 2,
    icon: Dumbbell,
    cover: "from-slate-200 via-slate-100 to-ivory",
    video: { src: vidEmsculpt, duration: "1:04" },
    treatmentSlug: "emsculpt-neo",
    body: [
      { type: "p", text: "Emsculpt Neo is a body-contouring treatment that combines radiofrequency with HIFEM (high-intensity focused electromagnetic energy). The radiofrequency warms and breaks down fat cells while the electromagnetic energy makes the muscle contract strongly, helping to tone and strengthen it." },
      { type: "h", text: "What a session is like" },
      { type: "ul", items: ["Applicator pads are placed on the area being treated, such as the abdomen, arms or thighs", "A session takes about 30 minutes", "There is no surgery and no downtime is expected, so you can return to your day", "Most people benefit from a course of around 4 to 6 sessions"] },
      { type: "h", text: "Is it right for you?" },
      { type: "p", text: "Emsculpt Neo is not a weight-loss treatment, and suitability depends on your health and goals. Your dermatologist will examine the area, explain what is realistic and tell you if you should avoid it. Results vary from person to person." },
    ],
  },
  {
    slug: "skincare-for-every-age",
    title: "Skincare for every age: a simple routine from childhood to your 40s",
    excerpt: "The basics barely change with age: cleanse gently, moisturise, protect from the sun. What changes is what you add on top.",
    category: "Skin care",
    author: "The Skin Clinic team",
    date: "2026-10-16",
    readingMinutes: 4,
    icon: Sun,
    cover: "from-sage/60 via-mist to-ivory",
    image: imgEveryAge,
    imagePosition: "center 62%",
    body: [
      { type: "p", text: "Good skin care is less complicated than the products on a shelf suggest. At every age the foundations are the same: gentle cleansing, moisture, and daily protection from the sun. What changes over the years is what your skin needs in addition." },
      { type: "h", text: "Children" },
      { type: "ul", items: ["A mild, fragrance-free cleanser, used once or twice a day", "A simple moisturiser, especially after bathing", "A broad-spectrum sunscreen on skin that will be outdoors"] },
      { type: "h", text: "Pre-teens and teenagers" },
      { type: "p", text: "Oil production rises with hormones, so breakouts are common. Keep to a gentle routine and avoid picking. Persistent, painful or scarring acne deserves a dermatologist's assessment rather than a stack of over-the-counter products." },
      { type: "h", text: "Your 20s" },
      { type: "p", text: "Prevention matters most now. A daily sunscreen is the single most useful habit, and an antioxidant serum such as vitamin C can sit comfortably in the morning routine. If you want to try retinoids, start slowly and ask your doctor, particularly if you are pregnant or planning to be." },
      { type: "h", text: "Your 30s" },
      { type: "p", text: "Fine lines and uneven tone start to show. Keep up sun protection, add a retinoid at night if it suits your skin, and remember the neck and the backs of the hands, which are often forgotten." },
      { type: "h", text: "40s and beyond" },
      { type: "p", text: "Skin becomes drier and thinner, so richer moisturisers and consistent sun care become even more important. A dermatologist can advise on prescription options and procedures if you want to address specific concerns." },
      { type: "p", text: "This article is general information, not a substitute for medical advice. Skin differs from person to person; book a consultation for a plan that suits yours." },
    ],
  },
  {
    slug: "how-diet-affects-your-skin",
    title: "How your diet can affect your skin",
    excerpt: "No single food clears or ruins skin, but what you eat day to day can influence breakouts, dryness and how your skin ages.",
    category: "Skin & lifestyle",
    author: "The Skin Clinic team",
    date: "2026-10-16",
    readingMinutes: 4,
    icon: Apple,
    cover: "from-ivory via-mist to-sage/50",
    image: imgDiet,
    imagePosition: "center",
    body: [
      { type: "p", text: "Fad diets promise glowing skin, but the evidence is more modest and more useful: an overall balanced diet supports healthy skin, and for some people certain foods can make skin conditions worse." },
      { type: "h", text: "Things worth cutting back on" },
      { type: "ul", items: ["Sugary foods and refined carbohydrates, which are linked with more breakouts in some people", "Dairy, particularly skimmed milk, which some studies associate with acne", "Very salty, heavily processed snacks, which can contribute to puffiness"] },
      { type: "p", text: "These effects vary widely between individuals. If you suspect a food is a trigger, try reducing it for several weeks and see whether your skin changes, rather than cutting out whole food groups at once." },
      { type: "h", text: "Foods that support healthy skin" },
      { type: "ul", items: ["Colourful fruit and vegetables, rich in antioxidants", "Nuts, seeds, avocado and leafy greens for healthy fats and vitamin E", "Fish a couple of times a week for omega-3 fatty acids", "Enough water through the day to keep skin hydrated"] },
      { type: "p", text: "Diet works alongside, not instead of, sun protection, a sensible routine and medical care. Persistent acne, eczema or pigmentation should be assessed by a dermatologist." },
    ],
  },
  {
    slug: "medical-acne-treatment",
    title: "Acne treatment: what a dermatologist can do beyond creams from the chemist",
    excerpt: "Acne is common, but it is not something you have to live with. Here is what to expect when you see a dermatologist.",
    category: "Acne",
    author: "The Skin Clinic team",
    date: "2026-10-16",
    readingMinutes: 5,
    icon: Droplets,
    cover: "from-mist via-sage/40 to-ivory",
    image: imgAcne,
    imagePosition: "center 50%",
    body: [
      { type: "p", text: "Acne often begins in the teenage years but can continue, or start, in adulthood. Besides the discomfort, it can leave marks and scars, and it can affect confidence. The earlier it is treated properly, the better the chance of avoiding scarring." },
      { type: "h", text: "At your first visit" },
      { type: "p", text: "Your dermatologist will look at the type of acne you have, how severe it is, whether there is scarring, and what you have already tried. They will also ask about your health, medicines and, where relevant, pregnancy plans, because some acne treatments are unsuitable in pregnancy." },
      { type: "h", text: "What treatment may include" },
      { type: "ul", items: ["Prescription creams or gels that unblock pores and calm inflammation", "A course of oral medicines for more severe or stubborn acne, with monitoring", "Procedures such as chemical peels or light and laser treatments for selected patients", "Advice on cleansing, moisturising and sun protection that will not irritate acne-prone skin"] },
      { type: "h", text: "What to expect" },
      { type: "p", text: "Acne treatment takes time. Most plans need several weeks before the difference is clear, and regular follow-ups let your doctor adjust treatment as your skin responds. Avoid picking or squeezing spots, which raises the chance of scars." },
      { type: "p", text: "This article is general information, not a diagnosis. Book a consultation for advice tailored to you." },
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
