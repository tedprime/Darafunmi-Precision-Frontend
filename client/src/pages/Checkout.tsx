import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react";

// ─── API payload — matches POST /orders exactly ───────────────────
// { items: [{productId, quantity}], shippingAddress: {}, paymentMethod?, notes? }
interface OrderPayload {
  items:           { productId: number; quantity: number }[];
  shippingAddress: {
    street:     string;
    city:       string;
    state:      string;
    country:    string;
    postalCode: string;
  };
  paymentMethod?: string;
  notes?:         string;
}

interface CartItem {
  id:        number;
  productId: number;
  quantity:  number;
  product: {
    name:     string;
    price:    string;
    sku:      string;
    imageUrl?: string;
  };
}

export default function Checkout() {
  const [, navigate]  = useLocation();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const queryClient   = useQueryClient();
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const [formData, setFormData] = useState({
    shippingAddress: { street: "", city: "", state: "", country: "Nigeria", postalCode: "" },
    billingAddress:  { street: "", city: "", state: "", country: "Nigeria", postalCode: "" },
    paymentMethod:   "bank_transfer",
    notes:           "",
  });

  // ── Fetch live cart ────────────────────────────────────────────
  const { data: cartItems = [], isLoading: cartLoading } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: () => api.get("/cart").then((r) => r.data?.data ?? r.data ?? []),
    enabled: isAuthenticated,
  });

  // ── Place order — POST /orders ─────────────────────────────────
  const createOrderMutation = useMutation({
    mutationFn: (payload: OrderPayload) =>
      api.post("/orders", payload).then((r) => r.data?.data ?? r.data),
    onSuccess: (data) => {
      toast.success("Order placed successfully!");
      // Clear cart then navigate
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate(`/order-confirmation/${data.orderNumber}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to place order");
    },
  });

  const formatPrice = (price: string | number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency", currency: "NGN", minimumFractionDigits: 0,
    }).format(typeof price === "string" ? parseFloat(price) : price);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product?.price || "0") * item.quantity, 0
  );
  const shipping = subtotal > 100000 ? 0 : 5000;
  const tax      = subtotal * 0.075;
  const total    = subtotal + shipping + tax;

  const handleAddressChange = (
    type: "shippingAddress" | "billingAddress",
    field: string,
    value: string
  ) => setFormData((prev) => ({ ...prev, [type]: { ...prev[type], [field]: value } }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error("Please sign in to complete your order"); return; }
    if (cartItems.length === 0) { toast.error("Your cart is empty"); return; }
    if (!formData.shippingAddress.street || !formData.shippingAddress.city || !formData.shippingAddress.state) {
      toast.error("Please fill in your shipping address"); return;
    }

    // API only needs productId + quantity — nothing else in items
    createOrderMutation.mutate({
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity:  item.quantity,
      })),
      shippingAddress: sameAsBilling
        ? formData.shippingAddress
        : formData.billingAddress,
      paymentMethod: formData.paymentMethod || undefined,
      notes:         formData.notes         || undefined,
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <CardTitle>Sign In Required</CardTitle>
              <CardDescription>Please sign in to complete your checkout.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/login" className="block">
                <Button className="w-full">Sign In to Continue</Button>
              </Link>
              <Link href="/cart">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />Back to Cart
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/cart">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />Back to Cart
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Checkout</h1>
            </div>

            {cartLoading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : cartItems.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <p className="text-muted-foreground mb-4">Your cart is empty.</p>
                  <Link href="/products"><Button>Browse Products</Button></Link>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* ── Left: Address + Notes ──────────────────── */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Customer info summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Ordering as</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground space-y-1">
                        <p className="font-medium text-foreground">{user?.name}</p>
                        <p>{user?.email}</p>
                        {user?.phone   && <p>{user.phone}</p>}
                        {user?.company && <p>{user.company}</p>}
                      </CardContent>
                    </Card>

                    {/* Shipping Address */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Truck className="h-5 w-5" />Shipping Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="street">Street Address <span className="text-destructive">*</span></Label>
                          <Input
                            id="street"
                            placeholder="123 Main Street"
                            value={formData.shippingAddress.street}
                            onChange={(e) => handleAddressChange("shippingAddress", "street", e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
                            <Input
                              id="city"
                              placeholder="Lagos"
                              value={formData.shippingAddress.city}
                              onChange={(e) => handleAddressChange("shippingAddress", "city", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State <span className="text-destructive">*</span></Label>
                            <Input
                              id="state"
                              placeholder="Lagos State"
                              value={formData.shippingAddress.state}
                              onChange={(e) => handleAddressChange("shippingAddress", "state", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" value={formData.shippingAddress.country} disabled />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                              id="postalCode"
                              placeholder="100001"
                              value={formData.shippingAddress.postalCode}
                              onChange={(e) => handleAddressChange("shippingAddress", "postalCode", e.target.value)}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Billing Address */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />Billing Address
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="sameAsBilling"
                              checked={sameAsBilling}
                              onCheckedChange={(c) => setSameAsBilling(c as boolean)}
                            />
                            <label htmlFor="sameAsBilling" className="text-sm text-muted-foreground">
                              Same as shipping
                            </label>
                          </div>
                        </div>
                      </CardHeader>
                      {!sameAsBilling && (
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Street Address <span className="text-destructive">*</span></Label>
                            <Input
                              placeholder="123 Main Street"
                              value={formData.billingAddress.street}
                              onChange={(e) => handleAddressChange("billingAddress", "street", e.target.value)}
                              required
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>City <span className="text-destructive">*</span></Label>
                              <Input
                                placeholder="Lagos"
                                value={formData.billingAddress.city}
                                onChange={(e) => handleAddressChange("billingAddress", "city", e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>State <span className="text-destructive">*</span></Label>
                              <Input
                                placeholder="Lagos State"
                                value={formData.billingAddress.state}
                                onChange={(e) => handleAddressChange("billingAddress", "state", e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>

                    {/* Notes */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Order Notes (Optional)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          placeholder="Any special instructions for your order..."
                          value={formData.notes}
                          onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                          rows={3}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* ── Right: Order Summary ───────────────────── */}
                  <div>
                    <Card className="sticky top-24">
                      <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span>{item.product?.name} × {item.quantity}</span>
                              <span>{formatPrice(parseFloat(item.product?.price || "0") * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                        <Separator />
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">VAT (7.5%)</span>
                            <span>{formatPrice(tax)}</span>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total</span>
                          <span className="text-primary">{formatPrice(total)}</span>
                        </div>
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full"
                          disabled={createOrderMutation.isPending || cartItems.length === 0}
                        >
                          {createOrderMutation.isPending ? "Processing…" : "Place Order"}
                        </Button>
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <Shield className="h-4 w-4" />
                          <span>Secure checkout</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}