import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
  Package,
} from "lucide-react";

export default function Cart() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const { data: cartItems, isLoading, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: () => api.get("/cart").then((r) => r.data?.data ?? r.data),
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      api.patch(`/cart/${id}`, { quantity }).then((r) => r.data?.data ?? r.data),
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      toast.error("Failed to update quantity");
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: ({ id }: { id: number }) =>
      api.delete(`/cart/${id}`).then((r) => r.data?.data ?? r.data),
    onSuccess: () => {
      toast.success("Item removed from cart");
      refetch();
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => api.delete("/cart").then((r) => r.data?.data ?? r.data),
    onSuccess: () => {
      toast.success("Cart cleared");
      refetch();
    },
    onError: () => {
      toast.error("Failed to clear cart");
    },
  });

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(typeof price === "string" ? parseFloat(price) : price);
  };

  // Demo cart items for display when not authenticated
  const demoCartItems = [
    {
      id: 1,
      productId: 1,
      quantity: 2,
      product: {
        name: "Digital Pressure Gauge",
        price: "85000.00",
        imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100&h=100&fit=crop",
        sku: "DPG-100",
      },
    },
    {
      id: 2,
      productId: 2,
      quantity: 1,
      product: {
        name: "RTD Temperature Sensor",
        price: "45000.00",
        imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100&h=100&fit=crop",
        sku: "RTD-PT100",
      },
    },
  ];

  const displayItems = isAuthenticated ? (cartItems || []) : demoCartItems;
  const subtotal = displayItems.reduce((sum: number, item: any) => {
    return sum + parseFloat(item.product?.price || "0") * item.quantity;
  }, 0);
  const shipping = subtotal > 100000 ? 0 : 5000;
  const total = subtotal + shipping;

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
              <ShoppingCart className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
            </div>

            {displayItems.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                  <p className="text-muted-foreground mb-6">
                    Browse our products and add items to your cart.
                  </p>
                  <Link href="/products">
                    <Button>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {!isAuthenticated && (
                    <Card className="bg-yellow-50 border-yellow-200">
                      <CardContent className="p-4">
                        <p className="text-yellow-800 text-sm">
                          <strong>Demo Mode:</strong> Sign in to save your cart and complete checkout.
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {displayItems.map((item: any) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.product?.imageUrl}
                              alt={item.product?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-semibold">{item.product?.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  SKU: {item.product?.sku}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => isAuthenticated && removeItemMutation.mutate({ id: item.id })}
                                disabled={!isAuthenticated}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => isAuthenticated && updateQuantityMutation.mutate({
                                    id: item.id,
                                    quantity: Math.max(1, item.quantity - 1),
                                  })}
                                  disabled={item.quantity <= 1 || !isAuthenticated}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-12 text-center">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => isAuthenticated && updateQuantityMutation.mutate({
                                    id: item.id,
                                    quantity: item.quantity + 1,
                                  })}
                                  disabled={!isAuthenticated}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-primary">
                                  {formatPrice(parseFloat(item.product?.price || "0") * item.quantity)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {formatPrice(item.product?.price || "0")} each
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-between">
                    <Link href="/products">
                      <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Continue Shopping
                      </Button>
                    </Link>
                    {isAuthenticated && (
                      <Button
                        variant="outline"
                        onClick={() => clearCartMutation.mutate()}
                        disabled={clearCartMutation.isPending}
                      >
                        Clear Cart
                      </Button>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                      </div>
                      {shipping === 0 && (
                        <p className="text-xs text-green-600">
                          Free shipping on orders over ₦100,000
                        </p>
                      )}
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span className="text-primary">{formatPrice(total)}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-4">
                      {isAuthenticated ? (
                        <Link href="/checkout" className="w-full">
                          <Button size="lg" className="w-full">
                            Proceed to Checkout
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/login" className="w-full">
                          <Button size="lg" className="w-full">
                            Sign In to Checkout
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <p className="text-xs text-center text-muted-foreground">
                        Secure checkout powered by industry-standard encryption
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
