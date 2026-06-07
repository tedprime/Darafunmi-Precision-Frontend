import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Package,
  Calendar,
  FileText,
  ShoppingCart,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  LogOut,
} from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders", "my"],
    queryFn: () => api.get("/orders/my").then((r) => r.data?.data ?? r.data),
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["bookings", "my"],
    queryFn: () => api.get("/bookings/my").then((r) => r.data?.data ?? r.data),
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
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: any }> = {
      pending: { variant: "outline", icon: Clock },
      confirmed: { variant: "secondary", icon: CheckCircle2 },
      processing: { variant: "secondary", icon: Clock },
      shipped: { variant: "secondary", icon: Package },
      delivered: { variant: "default", icon: CheckCircle2 },
      completed: { variant: "default", icon: CheckCircle2 },
      cancelled: { variant: "destructive", icon: XCircle },
    };
    const config = statusConfig[status] || { variant: "outline", icon: AlertCircle };
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="capitalize">
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    );
  };

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <CardTitle>Sign In Required</CardTitle>
              <CardDescription>
                Please sign in to access your dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/login" className="block">
                <Button className="w-full">Sign In</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Back to Home
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
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome, {user?.name || "Customer"}
                </h1>
                <p className="text-muted-foreground">
                  Manage your orders, bookings, and account settings.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/book-service">
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Service
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Shop Products
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats — all driven by live API data */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Total Orders */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      {ordersLoading ? (
                        <div className="h-8 w-10 bg-muted animate-pulse rounded mb-1" />
                      ) : (
                        <p className="text-2xl font-bold">{orders?.length ?? 0}</p>
                      )}
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Total Bookings */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      {bookingsLoading ? (
                        <div className="h-8 w-10 bg-muted animate-pulse rounded mb-1" />
                      ) : (
                        <p className="text-2xl font-bold">{bookings?.length ?? 0}</p>
                      )}
                      <p className="text-sm text-muted-foreground">Service Bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Completed — bookings with status completed or delivered */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      {bookingsLoading ? (
                        <div className="h-8 w-10 bg-muted animate-pulse rounded mb-1" />
                      ) : (
                        <p className="text-2xl font-bold">
                          {bookings?.filter((b: any) =>
                            ["completed", "delivered"].includes(b.status)
                          ).length ?? 0}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* In Progress — bookings not yet completed or cancelled */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      {bookingsLoading ? (
                        <div className="h-8 w-10 bg-muted animate-pulse rounded mb-1" />
                      ) : (
                        <p className="text-2xl font-bold">
                          {bookings?.filter((b: any) =>
                            ["pending", "confirmed", "processing"].includes(b.status)
                          ).length ?? 0}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">In Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList>
                <TabsTrigger value="orders" className="gap-2">
                  <Package className="h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="bookings" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="account" className="gap-2">
                  <User className="h-4 w-4" />
                  Account
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Orders</CardTitle>
                    <CardDescription>View and track your product orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {ordersLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      </div>
                    ) : orders && orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order: any) => (
                          <div
                            key={order.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="space-y-1 mb-4 md:mb-0">
                              <div className="flex items-center gap-3">
                                <span className="font-semibold">{order.orderNumber}</span>
                                {getStatusBadge(order.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Placed on {formatDate(order.createdAt)}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-semibold text-primary">
                                {formatPrice(order.total)}
                              </span>
                              <Link href={`/order-confirmation/${order.orderNumber}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Start shopping to see your orders here.
                        </p>
                        <Link href="/products">
                          <Button>Browse Products</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Bookings</CardTitle>
                    <CardDescription>View and manage your service bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bookingsLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      </div>
                    ) : bookings && bookings.length > 0 ? (
                      <div className="space-y-4">
                        {bookings.map((booking: any) => (
                          <div
                            key={booking.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="space-y-1 mb-4 md:mb-0">
                              <div className="flex items-center gap-3">
                                <span className="font-semibold">{booking.bookingNumber}</span>
                                {getStatusBadge(booking.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {booking.scheduledDate ? (
                                  <>Scheduled for {formatDate(booking.scheduledDate)} {booking.scheduledTime && `at ${booking.scheduledTime}`}</>
                                ) : (
                                  <>Submitted on {formatDate(booking.createdAt)}</>
                                )}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <Link href={`/booking-confirmation/${booking.bookingNumber}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">No bookings yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Book a service to see your bookings here.
                        </p>
                        <Link href="/book-service">
                          <Button>Book a Service</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Your profile and account settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{user?.name || "Not provided"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user?.email || "Not provided"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Account Type</p>
                        <Badge variant="secondary" className="capitalize">
                          {user?.role || "Customer"}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-medium">
                          {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={() => logout()}
                        className="text-destructive hover:text-destructive"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}