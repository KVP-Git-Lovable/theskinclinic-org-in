import { Apple, Droplets, Sun, type LucideIcon } from "lucide-react";

export type Block =
  | { type: "h"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string; // ISO yyyy-mm-dd
  readingMinutes: number;
  icon: LucideIcon;
  /** Tailwind gradient classes for the cover tile until a photo is added. */
  cover: string;
  body: Block[];
}

// Starter articles on the topics of the clinic's earlier posts, rewritten for this site.
// Add new posts to the top of this list; each needs a unique slug.
export const BLOG_POSTS: BlogPost[] = [
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
