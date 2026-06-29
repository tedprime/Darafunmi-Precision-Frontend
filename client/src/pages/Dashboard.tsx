import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/lib/api";
import { getMyOrders } from "@/services/orderService";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Loader2,
  Pencil,
  X,
  Save,
  KeyRound,
} from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────

const formatPrice = (price: string | number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(typeof price === "string" ? parseFloat(price) : price);

const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const STATUS_CONFIG: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: any; label?: string }> = {
  pending:    { variant: "outline",     icon: Clock },
  confirmed:  { variant: "secondary",   icon: CheckCircle2 },
  processing: { variant: "secondary",   icon: Clock },
  shipped:    { variant: "secondary",   icon: Package },
  delivered:  { variant: "default",     icon: CheckCircle2 },
  completed:  { variant: "default",     icon: CheckCircle2 },
  cancelled:  { variant: "destructive", icon: XCircle },
  draft:      { variant: "outline",     icon: FileText },
  quoted:     { variant: "secondary",   icon: FileText },
  accepted:   { variant: "default",     icon: CheckCircle2 },
  declined:   { variant: "destructive", icon: XCircle },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { variant: "outline", icon: AlertCircle };
  const Icon = cfg.icon;
  return (
    <Badge variant={cfg.variant} className="capitalize">
      <Icon className="h-3 w-3 mr-1" />
      {cfg.label ?? status}
    </Badge>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function EditProfileCard() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? "", phone: user?.phone ?? "", company: user?.company ?? "" });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () => updateProfile(form),
    onSuccess: () => {
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    },
    onError: (err: any) => setError(err.message ?? "Failed to save"),
  });

  const startEdit = () => {
    setForm({ name: user?.name ?? "", phone: user?.phone ?? "", company: user?.company ?? "" });
    setError("");
    setEditing(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </div>
        {!editing ? (
          <Button variant="outline" size="sm" onClick={startEdit}>
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
        ) : (
          <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {editing ? (
          <>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+234..." />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="Company name (optional)" />
              </div>
            </div>
            <Button onClick={() => mutation.mutate()} disabled={mutation.isPending} size="sm">
              {mutation.isPending ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
              Save Changes
            </Button>
          </>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{user?.name || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{user?.phone || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Company</p>
              <p className="font-medium">{user?.company || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">{user?.createdAt ? formatDate(user.createdAt) : "—"}</p>
            </div>
            {saved && (
              <div className="md:col-span-2 text-sm text-green-600 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Profile updated successfully.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ChangePasswordCard() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (form.newPassword !== form.confirm) {
      setError("New passwords do not match.");
      return;
    }
    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setStatus("saving");
    try {
      await api.patch("/user/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setStatus("success");
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err: any) {
      setError(err.message ?? "Failed to change password.");
      setStatus("error");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5" />
          Change Password
        </CardTitle>
        <CardDescription>Update your account password</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <p className="text-sm text-destructive">{error}</p>}
        {status === "success" && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            Password changed successfully.
          </p>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="cur-pw">Current Password</Label>
          <Input id="cur-pw" type="password" value={form.currentPassword} onChange={(e) => setForm((f) => ({ ...f, currentPassword: e.target.value }))} placeholder="Current password" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="new-pw">New Password</Label>
          <Input id="new-pw" type="password" value={form.newPassword} onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))} placeholder="Min 6 characters" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="conf-pw">Confirm New Password</Label>
          <Input id="conf-pw" type="password" value={form.confirm} onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))} placeholder="Repeat new password" />
        </div>
        <Button onClick={handleSubmit} disabled={status === "saving"} size="sm">
          {status === "saving" ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
          Update Password
        </Button>
      </CardContent>
    </Card>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders", "my"],
    queryFn: getMyOrders,
    enabled: isAuthenticated,
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["bookings", "my"],
    queryFn: () =>
      api.get("/bookings/my").then((r) => {
        const d = r.data?.data ?? r.data;
        return Array.isArray(d) ? d : (d?.data ?? []);
      }),
    enabled: isAuthenticated,
  });

  const { data: quoteRequests, isLoading: quotesLoading } = useQuery({
    queryKey: ["quote-requests", "my"],
    queryFn: () =>
      api.get("/quote-requests/my").then((r) => {
        const d = r.data?.data ?? r.data;
        return Array.isArray(d) ? d : (d?.data ?? []);
      }),
    enabled: isAuthenticated,
  });

  // ── Guards ───────────────────────────────────────────────────────────────

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
              <CardDescription>Please sign in to access your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/login" className="block">
                <Button className="w-full">Sign In</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">Back to Home</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────

  const pendingQuotes = quoteRequests?.filter((q: any) => ["pending", "draft"].includes(q.status)) ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            {/* Welcome */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-1">Welcome, {user?.name?.split(" ")[0] || "Customer"}</h1>
                <p className="text-muted-foreground">Manage your orders, bookings, quotes, and account settings.</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link href="/book-service">
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Service
                  </Button>
                </Link>
                <Link href="/quote">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Request Quote
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Shop
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      {ordersLoading ? <div className="h-8 w-10 bg-muted animate-pulse rounded mb-1" /> : <p className="text-2xl font-bold">{orders?.length ?? 0}</p>}
                      <p className="text-sm text-muted-foreground">Orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      {bookingsLoading ? <div className="h-8 w-10 bg-muted animate-pulse rounded mb-1" /> : <p className="text-2xl font-bold">{bookings?.length ?? 0}</p>}
                      <p className="text-sm text-muted-foreground">Bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      {quotesLoading ? <div className="h-8 w-10 bg-muted animate-pulse rounded mb-1" /> : <p className="text-2xl font-bold">{quoteRequests?.length ?? 0}</p>}
                      <p className="text-sm text-muted-foreground">Quote Requests</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      {bookingsLoading ? <div className="h-8 w-10 bg-muted animate-pulse rounded mb-1" /> : (
                        <p className="text-2xl font-bold">
                          {bookings?.filter((b: any) => ["completed", "delivered"].includes(b.status)).length ?? 0}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">Completed</p>
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
                <TabsTrigger value="quotes" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Quotes
                  {pendingQuotes.length > 0 && (
                    <span className="ml-1 bg-amber-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none">
                      {pendingQuotes.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="account" className="gap-2">
                  <User className="h-4 w-4" />
                  Account
                </TabsTrigger>
              </TabsList>

              {/* Orders */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Orders</CardTitle>
                    <CardDescription>View and track your product orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {ordersLoading ? (
                      <div className="text-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                      </div>
                    ) : orders && orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order: any) => (
                          <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-1 mb-4 md:mb-0">
                              <div className="flex items-center gap-3">
                                <span className="font-semibold">{order.orderNumber}</span>
                                <StatusBadge status={order.status} />
                              </div>
                              <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-semibold text-primary">{formatPrice(order.total)}</span>
                              <Link href={`/order-confirmation/${order.orderNumber}`}>
                                <Button variant="outline" size="sm">
                                  View Details <ArrowRight className="ml-2 h-4 w-4" />
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
                        <p className="text-muted-foreground mb-4">Start shopping to see your orders here.</p>
                        <Link href="/products"><Button>Browse Products</Button></Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bookings */}
              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Bookings</CardTitle>
                    <CardDescription>View and manage your service bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bookingsLoading ? (
                      <div className="text-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                      </div>
                    ) : bookings && bookings.length > 0 ? (
                      <div className="space-y-4">
                        {bookings.map((booking: any) => (
                          <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-1 mb-4 md:mb-0">
                              <div className="flex items-center gap-3">
                                <span className="font-semibold">{booking.bookingNumber}</span>
                                <StatusBadge status={booking.status} />
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {booking.scheduledDate
                                  ? <>Scheduled for {formatDate(booking.scheduledDate)}{booking.scheduledTime && ` at ${booking.scheduledTime}`}</>
                                  : <>Submitted on {formatDate(booking.createdAt)}</>}
                              </p>
                            </div>
                            <Link href={`/booking-confirmation/${booking.bookingNumber}`}>
                              <Button variant="outline" size="sm">
                                View Details <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">No bookings yet</h3>
                        <p className="text-muted-foreground mb-4">Book a service to see your bookings here.</p>
                        <Link href="/book-service"><Button>Book a Service</Button></Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Quote Requests */}
              <TabsContent value="quotes">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Quote Requests</CardTitle>
                    <CardDescription>Track quotes submitted to Darafunmi Precision</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {quotesLoading ? (
                      <div className="text-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                      </div>
                    ) : quoteRequests && quoteRequests.length > 0 ? (
                      <div className="space-y-4">
                        {quoteRequests.map((qr: any) => (
                          <div key={qr.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-1 mb-4 md:mb-0">
                              <div className="flex items-center gap-3">
                                <span className="font-semibold">#{qr.id}</span>
                                <StatusBadge status={qr.status} />
                                {qr.serviceType && <span className="text-xs text-muted-foreground">{qr.serviceType}</span>}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {qr.description
                                  ? qr.description.length > 80
                                    ? qr.description.slice(0, 80) + "…"
                                    : qr.description
                                  : "No description"}
                              </p>
                              <p className="text-xs text-muted-foreground">Submitted {formatDate(qr.createdAt)}</p>
                            </div>
                            {/* If a quote was generated from this request, link to it */}
                            {qr.quoteId ? (
                              <Badge variant="secondary" className="self-start md:self-auto">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Quote Ready
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="self-start md:self-auto">
                                <Clock className="h-3 w-3 mr-1" />
                                Awaiting Quote
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">No quote requests yet</h3>
                        <p className="text-muted-foreground mb-4">Request a quote for calibration or engineering services.</p>
                        <Link href="/quote"><Button>Request a Quote</Button></Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account */}
              <TabsContent value="account" className="space-y-6">
                <EditProfileCard />
                <ChangePasswordCard />
                <Card>
                  <CardContent className="pt-6">
                    <Button variant="outline" onClick={() => logout()} className="text-destructive hover:text-destructive border-destructive/30">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
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
