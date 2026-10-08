import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { useCartSync } from "../hooks/useCartSync";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] opacity-50">Error 404</p>
        <h1 className="font-display text-6xl mt-6 text-navy">Not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-navy px-8 py-3 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-sage transition-colors"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-navy">Something interrupted this page</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Try refreshing, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-navy px-6 py-2 text-[11px] uppercase tracking-widest text-ivory hover:bg-sage transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-navy/20 px-6 py-2 text-[11px] uppercase tracking-widest hover:bg-navy hover:text-ivory transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tha Skin Clinic — Dermatology & Aesthetics in Mangalore" },
      {
        name: "description",
        content:
          "Board-certified dermatology, laser aesthetics and Formula V medical skincare, led by Dr. Vindhya A. Pai in Mangalore since 2018.",
      },
      { name: "author", content: "Tha Skin Clinic" },
      { property: "og:title", content: "Tha Skin Clinic — Dermatology & Aesthetics in Mangalore" },
      {
        property: "og:description",
        content:
          "Board-certified dermatology, laser aesthetics and Formula V medical skincare in Mangalore.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Karla:wght@300;400;500;600&display=swap",
      },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartSyncBridge />
      <Outlet />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

function CartSyncBridge() {
  useCartSync();
  return null;
}
