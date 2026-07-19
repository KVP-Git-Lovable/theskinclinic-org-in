import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatINR } from "@/lib/shopify";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="relative flex items-center gap-2 text-[11px] uppercase tracking-widest font-medium hover:opacity-70 transition-opacity"
          aria-label="Open cart"
        >
          <ShoppingBag className="size-4" />
          <span className="hidden sm:inline">Cart</span>
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-3 h-4 min-w-4 rounded-full px-1 flex items-center justify-center text-[9px] bg-accent text-accent-foreground border-0">
              {totalItems}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-ivory">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-3xl font-normal">Your Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "Your cart is empty."
              : `${totalItems} item${totalItems !== 1 ? "s" : ""} — Formula V by Tha Skin Clinic.`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <ShoppingBag className="size-10 text-muted-foreground mx-auto mb-4" strokeWidth={1} />
                <p className="text-sm text-muted-foreground">Nothing here yet.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-6">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4">
                    <div className="w-20 h-20 bg-mist/40 overflow-hidden flex-shrink-0">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-lg leading-tight">
                        {item.product.node.title}
                      </h4>
                      <p className="text-xs opacity-60 mt-1">{formatINR(item.price.amount)}</p>
                      <div className="flex items-center gap-1 mt-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-none"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        >
                          <Minus className="size-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-none"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        >
                          <Plus className="size-3" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 self-start"
                      onClick={() => removeItem(item.variantId)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex-shrink-0 space-y-4 pt-6 border-t border-border">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-widest opacity-60">Subtotal</span>
                  <span className="font-display text-2xl">{formatINR(totalPrice)}</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest opacity-40">
                  Shipping calculated at checkout
                </p>
                <Button
                  onClick={handleCheckout}
                  className="w-full rounded-none h-12 text-[11px] uppercase tracking-[0.2em] bg-navy hover:bg-navy/90 text-ivory"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      Secure Checkout
                      <ExternalLink className="size-3 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
