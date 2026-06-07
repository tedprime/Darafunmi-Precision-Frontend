import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  CheckCircle2,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Phone,
} from "lucide-react";



// Demo product data — replace with API call when ready
const demoProducts: Record<string, { id: number; name: string; description: string; longDescription: string; price: string; compareAtPrice?: string; image: string; images: string[]; category: string; sku: string; specifications: { label: string; value: string }[]; features: string[]; inStock: boolean }> = {
  "digital-pressure-gauge": { id: 1, name: "Digital Pressure Gauge", description: "High-precision digital pressure gauge with LCD display.", longDescription: "The Digital Pressure Gauge is a high-precision instrument designed for accurate pressure measurement in industrial and laboratory applications.", price: "85000.00", compareAtPrice: "95000.00", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop", images: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop"], category: "Pressure Instruments", sku: "DPG-100", specifications: [{ label: "Range", value: "0-100 bar" }, { label: "Accuracy", value: "±0.25% FS" }], features: ["High accuracy ±0.25% full scale", "Large LCD display", "Stainless steel construction"], inStock: true },
  "rtd-temperature-sensor": { id: 2, name: "RTD Temperature Sensor", description: "PT100 RTD temperature sensor with 3-wire configuration.", longDescription: "The PT100 RTD Temperature Sensor is a precision temperature measurement device suitable for industrial process control.", price: "45000.00", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop", images: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop"], category: "Temperature Instruments", sku: "RTD-PT100", specifications: [{ label: "Range", value: "-200°C to 600°C" }, { label: "Accuracy", value: "±0.15°C" }], features: ["Class A accuracy", "Wide temperature range"], inStock: true },
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const queryClient = useQueryClient();

  const product = demoProducts[slug || ""] || demoProducts["digital-pressure-gauge"];

  const addToCartMutation = useMutation({
    mutationFn: (data: { productId: number; quantity?: number }) =>
      api.post("/cart", data).then((r) => r.data?.data ?? r.data),
    onSuccess: () => {
      toast.success(`${quantity} item(s) added to cart!`);
      // Invalidate the shared ["cart"] query so Header badge and Cart page
      // both update immediately without needing a page refresh
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Failed to add product to cart");
    },
  });

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const handleAddToCart = () => {
    addToCartMutation.mutate({ productId: product.id, quantity });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container py-4">
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Product Details */}
        <section className="container pb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <Badge variant="secondary" className="mb-4">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                    <Badge variant="destructive">
                      {Math.round((1 - parseFloat(product.price) / parseFloat(product.compareAtPrice)) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-green-500 font-medium">In Stock</span>
                  </>
                ) : (
                  <span className="text-red-500 font-medium">Out of Stock</span>
                )}
                <span className="text-muted-foreground">• SKU: {product.sku}</span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-0"
                    min={1}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addToCartMutation.isPending}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">1 Year Warranty</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">30-Day Returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mt-16">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Features
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                {product.longDescription}
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 border-b"
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="features" className="pt-6">
              <div className="grid md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA */}
        <section className="section bg-muted/30">
          <div className="container">
            <Card className="gradient-cta text-white overflow-hidden">
              <CardContent className="p-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  Our technical experts can help you select the right equipment for your application.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" variant="secondary">
                      Contact Us
                    </Button>
                  </Link>
                  <a href="tel:+2348034680544">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </Button>
                  </a>
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