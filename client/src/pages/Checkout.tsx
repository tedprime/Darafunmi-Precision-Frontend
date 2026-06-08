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
import { createOrder } from "@/services/orderService";
import { toast } from "sonner";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";

export default function Checkout() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      country: "Nigeria",
      postalCode: "",
    },
    billingAddress: {
      street: "",
      city: "",
      state: "",
      country: "Nigeria",
      postalCode: "",
    },
    notes: "",
  });

  const queryClient = useQueryClient();

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => api.get("/cart").then((r) => r.data?.data ?? r.data),
    enabled: isAuthenticated,
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      toast.success("Order placed successfully!");
      queryClient.removeQueries({ queryKey: ["cart"] });
      // Clear cart in background — don't block navigation
      api.delete("/cart").catch(() => {});
      navigate(`/order-confirmation/${order.orderNumber}`);
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to place order. Please try again.");
    },
  });

  const formatPrice = (price: string | number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(typeof price === "string" ? parseFloat(price) : price);

  const displayItems = isAuthenticated ? (cartItems || []) : [];
  const subtotal = displayItems.reduce(
    (sum: number, item: any) =>
      sum + parseFloat(item.product?.price || "0") * item.quantity,
    0
  );
  const shipping = subtotal > 100000 ? 0 : 5000;
  const tax = subtotal * 0.075;
  const total = subtotal + shipping + tax;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (
    type: "shippingAddress" | "billingAddress",
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please sign in to complete your order");
      return;
    }

    if (!formData.shippingAddress.street || !formData.shippingAddress.city || !formData.shippingAddress.state) {
      toast.error("Please fill in your shipping address");
      return;
    }

    if (displayItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const billingAddr = sameAsBilling
      ? formData.shippingAddress
      : formData.billingAddress;

    createOrderMutation.mutate({
      // Send user ID under every field name the backend might check
      siteUserId:   user?.id,
      userId:       user?.id,
      user_id:      user?.id,
      site_user_id: user?.id,

      customerName:  formData.customerName  || user?.name  || "",
      customerEmail: formData.customerEmail || user?.email || "",
      customerPhone: formData.customerPhone || "",

      items: displayItems.map((item: any) => ({
        productId:   item.productId,
        quantity:    item.quantity,
        unitPrice:   parseFloat(item.product?.price || "0"),
        productName: item.product?.name || "",
        productSku:  item.product?.sku  || "",
      })),

      shippingAddress: formData.shippingAddress,
      billingAddress:  billingAddr,
      paymentMethod:   "bank_transfer",
      notes:           formData.notes,
    });
  };

  if (authLoading || (isAuthenticated && isLoading)) {
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
              <CardDescription>
                Please sign in to complete your checkout.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/login" className="block">
                <Button className="w-full">Sign In to Continue</Button>
              </Link>
              <Link href="/cart">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Cart
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
            <Link href="/cart">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cart
              </Button>
            </Link>

            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* ── Left column ───────────────────────────────── */}
                <div className="lg:col-span-2 space-y-8">

                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="customerName">Full Name *</Label>
                          <Input
                            id="customerName"
                            placeholder="John Doe"
                            value={formData.customerName || user?.name || ""}
                            onChange={(e) => handleChange("customerName", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="customerEmail">Email *</Label>
                          <Input
                            id="customerEmail"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.customerEmail || user?.email || ""}
                            onChange={(e) => handleChange("customerEmail", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customerPhone">Phone Number</Label>
                        <Input
                          id="customerPhone"
                          placeholder="+234 xxx xxx xxxx"
                          value={formData.customerPhone}
                          onChange={(e) => handleChange("customerPhone", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Shipping Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="shippingStreet">Street Address *</Label>
                        <Input
                          id="shippingStreet"
                          placeholder="123 Main Street"
                          value={formData.shippingAddress.street}
                          onChange={(e) => handleAddressChange("shippingAddress", "street", e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="shippingCity">City *</Label>
                          <Input
                            id="shippingCity"
                            placeholder="Lagos"
                            value={formData.shippingAddress.city}
                            onChange={(e) => handleAddressChange("shippingAddress", "city", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shippingState">State *</Label>
                          <Input
                            id="shippingState"
                            placeholder="Lagos State"
                            value={formData.shippingAddress.state}
                            onChange={(e) => handleAddressChange("shippingAddress", "state", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="shippingCountry">Country</Label>
                          <Input
                            id="shippingCountry"
                            value={formData.shippingAddress.country}
                            onChange={(e) => handleAddressChange("shippingAddress", "country", e.target.value)}
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shippingPostal">Postal Code</Label>
                          <Input
                            id="shippingPostal"
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
                          <CreditCard className="h-5 w-5" />
                          Billing Address
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sameAsBilling"
                            checked={sameAsBilling}
                            onCheckedChange={(checked) => setSameAsBilling(checked as boolean)}
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
                          <Label htmlFor="billingStreet">Street Address *</Label>
                          <Input
                            id="billingStreet"
                            placeholder="123 Main Street"
                            value={formData.billingAddress.street}
                            onChange={(e) => handleAddressChange("billingAddress", "street", e.target.value)}
                            required={!sameAsBilling}
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="billingCity">City *</Label>
                            <Input
                              id="billingCity"
                              placeholder="Lagos"
                              value={formData.billingAddress.city}
                              onChange={(e) => handleAddressChange("billingAddress", "city", e.target.value)}
                              required={!sameAsBilling}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingState">State *</Label>
                            <Input
                              id="billingState"
                              placeholder="Lagos State"
                              value={formData.billingAddress.state}
                              onChange={(e) => handleAddressChange("billingAddress", "state", e.target.value)}
                              required={!sameAsBilling}
                            />
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Order Notes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Order Notes (Optional)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Any special instructions for your order..."
                        value={formData.notes}
                        onChange={(e) => handleChange("notes", e.target.value)}
                        rows={3}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* ── Order Summary ──────────────────────────────── */}
                <div>
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {displayItems.map((item: any) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.product?.name} × {item.quantity}</span>
                            <span>{formatPrice(parseFloat(item.product?.price || "0") * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
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
                        disabled={createOrderMutation.isPending || displayItems.length === 0}
                      >
                        {createOrderMutation.isPending ? "Processing..." : "Place Order"}
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}