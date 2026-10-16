import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  storefrontApiRequest,
  PRODUCT_BY_HANDLE_QUERY,
  formatINR,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({
  beforeLoad: () => {
    // Formula V storefront is hidden for now
    throw redirect({ to: "/" });
  },
  head: ({ params }) => {
    const productName = params.handle.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    const title = `${productName} — Formula V | Tha Skin Clinic`;
    const description = `Explore ${productName} from Formula V at Tha Skin Clinic. View product details and shopping options.`;
    return { meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const [added, setAdded] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return res?.data?.product ?? null;
    },
  });

  const handleAdd = async () => {
    if (!data) return;
    const variant = data.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product: { node: data },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    setAdded(true);
    toast.success("Added to cart", { description: data.title });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-ivory text-navy">
      <SiteHeader />
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] opacity-60 hover:opacity-100"
        >
          <ArrowLeft className="size-3" /> Back to Formula V
        </Link>
      </div>

      {isPending && (
        <div className="max-w-7xl mx-auto px-6 py-32 flex justify-center">
          <Loader2 className="size-6 animate-spin opacity-40" />
        </div>
      )}

      {!isPending && !data && (
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <p className="font-display text-4xl">Product not found</p>
        </div>
      )}

      {data && (
        <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
          <div className="aspect-square bg-mist/40 overflow-hidden sticky top-24 self-start">
            {data.images.edges[0] && (
              <img
                src={data.images.edges[0].node.url}
                alt={data.images.edges[0].node.altText ?? data.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">Formula V</p>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05]">{data.title}</h1>
            <p className="mt-6 font-display text-3xl text-sage">
              {formatINR(data.priceRange.minVariantPrice.amount)}
            </p>
            <div className="h-px w-12 bg-sage my-10" />
            <p className="text-lg leading-relaxed opacity-80 whitespace-pre-line">
              {data.description}
            </p>

            <button
              onClick={handleAdd}
              disabled={isLoading}
              className="mt-12 w-full bg-navy text-ivory h-14 text-[11px] uppercase tracking-[0.25em] hover:bg-sage-dark transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : added ? (
                <>
                  <Check className="size-4" /> Added to cart
                </>
              ) : (
                <>Add to cart — {formatINR(data.priceRange.minVariantPrice.amount)}</>
              )}
            </button>

            <div className="mt-12 space-y-4 text-sm">
              <Row label="Dermatologist-formulated" />
              <Row label="Cruelty-free & vegan" />
              <Row label="Made in India" />
              <Row label="Free shipping over ₹2,000" />
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}

function Row({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 opacity-70">
      <Check className="size-4 text-sage" strokeWidth={1.5} />
      <span>{label}</span>
    </div>
  );
}
