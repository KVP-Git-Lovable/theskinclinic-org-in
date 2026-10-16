import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  storefrontApiRequest,
  STOREFRONT_QUERY,
  formatINR,
  type ShopifyProduct,
} from "@/lib/shopify";

export const Route = createFileRoute("/shop")({
  beforeLoad: () => {
    // Formula V storefront is hidden for now
    throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Formula V — Clinical Skincare | Tha Skin Clinic" },
      {
        name: "description",
        content:
          "Formula V — dermatologist-formulated skincare designed at Tha Skin Clinic for coastal Indian skin. Serums, moisturizers, brightening cream & more.",
      },
      { property: "og:title", content: "Formula V — Clinical Skincare" },
      { property: "og:description", content: "Formula V — dermatologist-formulated skincare designed at Tha Skin Clinic for coastal Indian skin. Serums, moisturizers, brightening cream & more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { data, isLoading } = useQuery({
    queryKey: ["shop-products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(STOREFRONT_QUERY, { first: 24, query: null });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  return (
    <div className="min-h-screen bg-ivory text-navy">
      <SiteHeader />

      <section className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-8">
          The Apothecary
        </p>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.95]">
          Formula <em className="text-sage">V</em>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed opacity-75">
          Each formula is developed alongside real patient outcomes at Tha Skin Clinic.
          Ingredients chosen for evidence. Textures chosen for you.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-mist/30 animate-pulse" />
            ))}
          </div>
        )}
        {!isLoading && (!data || data.length === 0) && (
          <div className="text-center py-32 opacity-60">
            <p className="font-display text-3xl">No products yet.</p>
            <p className="text-sm mt-2">Check back soon.</p>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {data?.map((p) => (
            <Link
              key={p.node.id}
              to="/product/$handle"
              params={{ handle: p.node.handle }}
              className="group block"
            >
              <div className="aspect-[4/5] bg-mist/40 overflow-hidden mb-5">
                {p.node.images.edges[0] && (
                  <img
                    src={p.node.images.edges[0].node.url}
                    alt={p.node.images.edges[0].node.altText ?? p.node.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                )}
              </div>
              <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">
                {p.node.options[0]?.values[0] ?? "Formula V"}
              </p>
              <h4 className="font-display text-xl leading-tight">{p.node.title}</h4>
              <p className="text-sm opacity-70 mt-2">
                {formatINR(p.node.priceRange.minVariantPrice.amount)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
