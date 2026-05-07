import { useMutation } from "@tanstack/react-query";
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
} from "lucide-react";

// Demo products data — replace with API call when ready
const demoProducts = [
  { id: 1, name: "Digital Pressure Gauge", slug: "digital-pressure-gauge", description: "High-precision digital pressure gauge with LCD display. Range: 0-100 bar.", price: "85000.00", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop", category: "Pressure Instruments", isFeatured: true },
  { id: 2, name: "RTD Temperature Sensor", slug: "rtd-temperature-sensor", description: "PT100 RTD temperature sensor with 3-wire configuration.", price: "45000.00", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop", category: "Temperature Instruments", isFeatured: true },
  { id: 3, name: "Electromagnetic Flow Meter", slug: "electromagnetic-flow-meter", description: "Industrial electromagnetic flow meter for conductive liquids.", price: "250000.00", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop", category: "Flow Instruments", isFeatured: true },
  { id: 4, name: "pH Meter with Probe", slug: "ph-meter-with-probe", description: "Portable pH meter with automatic temperature compensation.", price: "65000.00", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop", category: "Analytical Instruments", isFeatured: false },
  { id: 5, name: "Analytical Balance", slug: "analytical-balance", description: "Precision analytical balance with 0.0001g readability.", price: "180000.00", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop", category: "Laboratory Equipment", isFeatured: true },
  { id: 6, name: "Calibration Weight Set", slug: "calibration-weight-set", description: "OIML Class E2 calibration weight set.", price: "120000.00", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop", category: "Calibration Standards", isFeatured: false },
  { id: 7, name: "Digital Multimeter", slug: "digital-multimeter", description: "Professional digital multimeter with true RMS.", price: "35000.00", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop", category: "Electrical Instruments", isFeatured: false },
  { id: 8, name: "Conductivity Meter", slug: "conductivity-meter", description: "Portable conductivity meter with ATC.", price: "55000.00", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop", category: "Analytical Instruments", isFeatured: false },
];

const categories = ["All Categories","Pressure Instruments","Temperature Instruments","Flow Instruments","Analytical Instruments","Laboratory Equipment","Calibration Standards","Electrical Instruments"];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const addToCartMutation = useMutation({
    mutationFn: (data: { productId: number; quantity?: number }) =>
      api.post("/cart", data).then((r) => r.data?.data ?? r.data),
    onSuccess: () => {
      toast.success("Product added to cart!");
    },
    onError: () => {
      toast.error("Failed to add product to cart");
    },
  });

  // Filter products
  let filteredProducts = demoProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

        {/* Products Grid */}
        <section className="section">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("All Categories"); }}>
                  Clear Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="card-hover group overflow-hidden">
                    <div className="relative aspect-square bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isFeatured && (
                        <Badge className="absolute top-3 left-3 bg-secondary">Featured</Badge>
                      )}
                      {product.compareAtPrice && (
                        <Badge variant="destructive" className="absolute top-3 right-3">Sale</Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {product.description}
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
                    <CardFooter className="gap-2">
                      <Link href={`/products/${product.slug}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        size="icon"
                        onClick={() => addToCartMutation.mutate({ productId: product.id })}
                        disabled={addToCartMutation.isPending}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="card-hover">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-48 bg-muted flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-muted-foreground mb-4">{product.description}</p>
                            <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
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
                              <Link href={`/products/${product.slug}`}>
                                <Button variant="outline">View Details</Button>
                              </Link>
                              <Button
                                onClick={() => addToCartMutation.mutate({ productId: product.id })}
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
