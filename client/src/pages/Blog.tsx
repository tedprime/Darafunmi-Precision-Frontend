import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Tag,
} from "lucide-react";

const blogCategories = [
  { id: "all", name: "All Posts" },
  { id: "calibration", name: "Calibration" },
  { id: "industry", name: "Industry News" },
  { id: "technology", name: "Technology" },
  { id: "best-practices", name: "Best Practices" },
];

const demoBlogPosts = [
  {
    id: 1,
    slug: "importance-of-regular-calibration",
    title: "The Importance of Regular Instrument Calibration",
    excerpt: "Discover why maintaining a consistent calibration schedule is crucial for measurement accuracy and regulatory compliance.",
    content: "",
    author: "Dr. Adeyemi Okonkwo",
    category: "calibration",
    tags: ["calibration", "accuracy", "compliance"],
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
    readTime: "5 min read",
    publishedAt: "2024-01-20",
  },
  {
    id: 2,
    slug: "iso-17025-certification-guide",
    title: "Understanding ISO 17025 Certification Requirements",
    excerpt: "A comprehensive guide to achieving and maintaining ISO 17025 accreditation for your calibration laboratory.",
    content: "",
    author: "Engr. Funmi Daramola",
    category: "best-practices",
    tags: ["ISO 17025", "certification", "laboratory"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    readTime: "8 min read",
    publishedAt: "2024-01-15",
  },
  {
    id: 3,
    slug: "digital-transformation-calibration",
    title: "Digital Transformation in Calibration Services",
    excerpt: "How modern technology is revolutionizing the calibration industry with automated systems and IoT integration.",
    content: "",
    author: "Tech Team",
    category: "technology",
    tags: ["digital", "IoT", "automation"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    readTime: "6 min read",
    publishedAt: "2024-01-10",
  },
  {
    id: 4,
    slug: "oil-gas-calibration-challenges",
    title: "Calibration Challenges in the Oil & Gas Industry",
    excerpt: "Addressing the unique calibration requirements and challenges faced by the oil and gas sector in Nigeria.",
    content: "",
    author: "Industry Expert",
    category: "industry",
    tags: ["oil & gas", "challenges", "solutions"],
    imageUrl: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600&h=400&fit=crop",
    readTime: "7 min read",
    publishedAt: "2024-01-05",
  },
  {
    id: 5,
    slug: "temperature-calibration-best-practices",
    title: "Best Practices for Temperature Calibration",
    excerpt: "Essential tips and techniques for achieving accurate temperature measurements in industrial applications.",
    content: "",
    author: "Dr. Adeyemi Okonkwo",
    category: "calibration",
    tags: ["temperature", "best practices", "industrial"],
    imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop",
    readTime: "6 min read",
    publishedAt: "2024-01-01",
  },
  {
    id: 6,
    slug: "pharmaceutical-calibration-requirements",
    title: "Calibration Requirements in Pharmaceutical Manufacturing",
    excerpt: "Understanding the strict calibration standards and documentation requirements for pharmaceutical equipment.",
    content: "",
    author: "Compliance Team",
    category: "industry",
    tags: ["pharmaceutical", "compliance", "FDA"],
    imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&h=400&fit=crop",
    readTime: "9 min read",
    publishedAt: "2023-12-28",
  },
];

export default function Blog() {
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ["blog", "list", 10],
    queryFn: () => api.get("/blog", { params: { limit: 10, status: "published" } }).then((r) => r.data?.data ?? r.data),
  });
  const displayPosts = blogPosts && blogPosts.length > 0 ? blogPosts : demoBlogPosts;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">Blog</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Insights & <span className="text-primary">Updates</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Stay informed with the latest news, technical insights, and best practices 
                in calibration and precision measurement.
              </p>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="section">
          <div className="container">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blogCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={category.id === "all" ? "default" : "outline"}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Featured Post */}
            {displayPosts[0] && (
              <Card className="mb-12 overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto">
                    <img
                      src={(displayPosts[0] as any).imageUrl}
                      alt={(displayPosts[0] as any).title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 capitalize">{(displayPosts[0] as any).category}</Badge>
                    <h2 className="text-2xl font-bold mb-4">{(displayPosts[0] as any).title}</h2>
                    <p className="text-muted-foreground mb-6">{(displayPosts[0] as any).excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {(displayPosts[0] as any).author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date((displayPosts[0] as any).publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {(displayPosts[0] as any).readTime}
                      </span>
                    </div>
                    <Link href={`/blog/${(displayPosts[0] as any).slug}`}>
                      <Button>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            )}

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPosts.slice(1).map((post: any) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3 capitalize">{post.category}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section bg-muted/30">
          <div className="container">
            <Card className="gradient-cta text-white overflow-hidden">
              <CardContent className="p-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Never Miss an Update</h2>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter and get the latest articles, 
                  industry news, and technical insights delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Input
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button variant="secondary">
                    Subscribe
                  </Button>
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
