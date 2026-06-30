import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  Search,
  ShoppingCart,
  Filter,
  Grid3X3,
  List,
  ArrowRight,
  AlertCircle,
  Package,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  description?: string;
  price: string;
  compareAtPrice?: string;
  image?: string;       // DB column is `image`, not `imageUrl`
  sku?: string;
  status: string;
  isFeatured?: boolean;
  category?: { id: number; name: string };
  categoryId?: number;
}

// ─── Skeleton ─────────────────────────────────────────────────────
const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-muted rounded-md ${className}`} />
);

const ProductCardSkeleton = () => (
  <Card className="overflow-hidden pt-0">
    <Skeleton className="aspect-square w-full rounded-none" />
    <CardHeader className="pb-2">
      <Skeleton className="h-3 w-24 mb-2" />
      <Skeleton className="h-5 w-40" />
    </CardHeader>
    <CardContent className="pb-2">
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-3/4 mb-3" />
      <Skeleton className="h-6 w-28" />
    </CardContent>
    <CardFooter className="gap-2">
      <Skeleton className="h-9 flex-1" />
      <Skeleton className="h-9 w-9" />
    </CardFooter>
  </Card>
);

export default function Products() {
  const [searchQuery, setSearchQuery]       = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy]                 = useState("featured");
  const [viewMode, setViewMode]             = useState<"grid" | "list">("grid");
  const [searchTimer, setSearchTimer]       = useState<ReturnType<typeof setTimeout> | null>(null);

  const queryClient = useQueryClient();

  // ── Debounce search input ──────────────────────────────────────
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (searchTimer) clearTimeout(searchTimer);
    const timer = setTimeout(() => setDebouncedSearch(value), 400);
    setSearchTimer(timer);
  };

  // ── Fetch products ─────────────────────────────────────────────
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("limit", "100");
      params.set("status", "active");
      if (debouncedSearch) params.set("search", debouncedSearch);
      const res = await api.get(`/products?${params.toString()}`);
      const body = res.data;
      // Handle { success, data: [] } or { success, data: { data: [] } }
      if (Array.isArray(body?.data)) return body.data as Product[];
      if (Array.isArray(body?.data?.data)) return body.data.data as Product[];
      if (Array.isArray(body)) return body as Product[];
      return [] as Product[];
    },
    staleTime: 1000 * 60 * 2,
  });

  const products = data ?? [];

  // ── Add to cart ────────────────────────────────────────────────
  const addToCartMutation = useMutation({
    mutationFn: (productId: number) =>
      api.post("/cart", { productId, quantity: 1 }).then((r) => r.data?.data ?? r.data),
    onSuccess: () => {
      toast.success("Added to cart!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Failed to add to cart"),
  });

  // ── Sort client-side (API has no sort param) ───────────────────
  const sorted = [...products].sort((a, b) => {
    if (sortBy === "price-low") return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === "price-high") return parseFloat(b.price) - parseFloat(a.price);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0); // featured
  });

  const formatPrice = (price: string) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(parseFloat(price));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative gradient-hero py-16 md:py-20">
          <div className="container">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">Product Catalog</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Quality <span className="text-primary">Instruments & Equipment</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Browse our selection of high-quality calibration instruments, laboratory
                equipment, and process control devices.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b bg-background">
          <div className="container py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="section">
          <div className="container">

            {/* Error */}
            {error && !isLoading && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Failed to load products</h3>
                <p className="text-muted-foreground mb-4 text-sm">{(error as Error).message}</p>
                <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["products"] })}>
                  Retry
                </Button>
              </div>
            )}

            {/* Skeletons */}
            {isLoading && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            )}

            {/* Empty */}
            {!isLoading && !error && sorted.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {debouncedSearch ? `No results for "${debouncedSearch}"` : "No products available yet."}
                </p>
                {debouncedSearch && (
                  <Button variant="outline" onClick={() => { setSearchQuery(""); setDebouncedSearch(""); }}>
                    Clear Search
                  </Button>
                )}
              </div>
            )}

            {/* Grid view */}
            {!isLoading && !error && sorted.length > 0 && viewMode === "grid" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sorted.map((product) => (
                  <Card key={product.id} className="card-hover group overflow-hidden flex flex-col pt-0">
                    <div className="relative aspect-square bg-muted flex-shrink-0">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-16 w-16 text-muted-foreground/40" />
                        </div>
                      )}
                      {product.isFeatured && (
                        <Badge className="absolute top-3 left-3 bg-secondary">Featured</Badge>
                      )}
                      {product.compareAtPrice && (
                        <Badge variant="destructive" className="absolute top-3 right-3">Sale</Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <p className="text-xs text-muted-foreground">{product.category?.name ?? "—"}</p>
                      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2 flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {product.description ?? ""}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2 mt-auto">
                      <Link href={`/products/${product.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">View Details</Button>
                      </Link>
                      <Button
                        size="icon"
                        onClick={() => addToCartMutation.mutate(product.id)}
                        disabled={addToCartMutation.isPending}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* List view */}
            {!isLoading && !error && sorted.length > 0 && viewMode === "list" && (
              <div className="space-y-4">
                {sorted.map((product) => (
                  <Card key={product.id} className="card-hover p-0 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-48 bg-muted flex-shrink-0 overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-12 w-12 text-muted-foreground/40" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">{product.category?.name ?? "—"}</p>
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-muted-foreground mb-4">{product.description ?? ""}</p>
                            {product.sku && <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>}
                          </div>
                          <div className="flex flex-col items-end gap-4">
                            <div className="text-right">
                              <span className="text-2xl font-bold text-primary">
                                {formatPrice(product.price)}
                              </span>
                              {product.compareAtPrice && (
                                <span className="block text-sm text-muted-foreground line-through">
                                  {formatPrice(product.compareAtPrice)}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/products/${product.id}`}>
                                <Button variant="outline">View Details</Button>
                              </Link>
                              <Button
                                onClick={() => addToCartMutation.mutate(product.id)}
                                disabled={addToCartMutation.isPending}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-muted/30">
          <div className="container">
            <Card className="gradient-primary text-primary-foreground overflow-hidden">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Can't Find What You Need?</h2>
                <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  We can source specific instruments and equipment for your requirements.
                  Contact us for custom orders and bulk pricing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/quote">
                    <Button size="lg" variant="secondary">
                      Request a Quote
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                      Contact Us
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