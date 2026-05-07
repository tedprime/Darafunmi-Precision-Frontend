import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CheckCircle2,
  Package,
  Truck,
  Clock,
  Mail,
  Phone,
  ArrowRight,
  Printer,
  Home,
} from "lucide-react";

export default function OrderConfirmation() {
  const { orderNumber } = useParams<{ orderNumber: string }>();

  const { data: order, isLoading, error } = useQuery({
    queryKey: ["orders", orderNumber],
    queryFn: () => api.get(`/orders/${orderNumber}`).then((r) => r.data?.data ?? r.data),
    enabled: !!orderNumber,
  });

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(typeof price === "string" ? parseFloat(price) : price);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusStep = (status: string) => {
    const steps = ["pending", "confirmed", "processing", "shipped", "delivered"];
    return steps.indexOf(status) + 1;
  };

  if (isLoading) {
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

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4 text-center">
            <CardContent className="p-8">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find an order with that number.
              </p>
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const currentStep = getStatusStep(order.status);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="section">
          <div className="container max-w-4xl">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for your order. We've sent a confirmation email to{" "}
                <span className="font-medium">{order.customerEmail}</span>
              </p>
            </div>

            {/* Order Number */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="text-2xl font-bold text-primary">{order.orderNumber}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" onClick={() => window.print()}>
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </Button>
                    <Link href="/dashboard">
                      <Button size="sm">
                        View All Orders
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  {["Pending", "Confirmed", "Processing", "Shipped", "Delivered"].map((step, index) => (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index + 1 <= currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {index + 1 <= currentStep ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className="text-xs mt-2 text-center hidden sm:block">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-primary transition-all"
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items?.map((item: any) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × {formatPrice(item.unitPrice)}
                        </p>
                      </div>
                      <p className="font-medium">{formatPrice(item.totalPrice)}</p>
                    </div>
                  ))}
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(order.subtotal || "0")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{parseFloat(order.shipping || "0") === 0 ? "Free" : formatPrice(order.shipping || "0")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">VAT (7.5%)</span>
                      <span>{formatPrice(order.tax || "0")}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(order.total || "0")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping & Contact */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{String(order.customerName || "N/A")}</p>
                    {order.shippingAddress ? (
                      <p className="text-muted-foreground">
                        {String((order.shippingAddress as any).street || "")}<br />
                        {String((order.shippingAddress as any).city || "")}, {String((order.shippingAddress as any).state || "")}<br />
                        {String((order.shippingAddress as any).country || "")} {String((order.shippingAddress as any).postalCode || "")}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{order.customerEmail}</span>
                    </div>
                    {order.customerPhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{order.customerPhone}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Order Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{formatDate(order.createdAt)}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Next Steps */}
            <Card className="mt-8 bg-muted/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
                <p className="text-muted-foreground mb-6">
                  We'll process your order and send you tracking information once it ships.
                  You can track your order status in your dashboard.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/products">
                    <Button variant="outline">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button>
                      <Home className="mr-2 h-4 w-4" />
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
