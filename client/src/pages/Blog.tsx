import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Calendar, Clock, User, ArrowRight, AlertTriangle } from "lucide-react";

const blogCategories = [
  { id: "all", name: "All Posts" },
  { id: "calibration", name: "Calibration" },
  { id: "industry", name: "Industry News" },
  { id: "technology", name: "Technology" },
  { id: "best-practices", name: "Best Practices" },
];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: blogPosts, isLoading, isError, refetch } = useQuery({
    queryKey: ["blog", "list", activeCategory, search],
    queryFn: () =>
      api
        .get("/blog", {
          params: {
            limit: 10,
            status: "published",
            ...(search && { search }),
            ...(activeCategory !== "all" && { category: activeCategory }),
          },
        })
        .then((r) => r.data?.data ?? r.data),
  });

  const posts = blogPosts ?? [];

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="flex justify-center items-center py-24">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="font-medium text-gray-700">Failed to load blog posts</p>
                <p className="text-sm text-muted-foreground mt-1 mb-4">Please check your connection and try again.</p>
                <Button variant="outline" onClick={() => refetch()}>Retry</Button>
              </div>
            )}

            {/* Empty */}
            {!isLoading && !isError && posts.length === 0 && (
              <div className="text-center py-24 text-muted-foreground">
                No blog posts found.
              </div>
            )}

            {/* Content */}
            {!isLoading && !isError && posts.length > 0 && (
              <>
                {/* Featured Post */}
                <Card className="mb-12 overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-video md:aspect-auto">
                      <img
                        src={posts[0].featuredImage ?? posts[0].imageUrl}
                        alt={posts[0].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <Badge className="w-fit mb-4 capitalize">{posts[0].category}</Badge>
                      <h2 className="text-2xl font-bold mb-4">{posts[0].title}</h2>
                      <p className="text-muted-foreground mb-6">{posts[0].excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {typeof posts[0].author === "object" ? posts[0].author?.name : posts[0].author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(posts[0].publishedAt ?? posts[0].createdAt).toLocaleDateString()}
                        </span>
                        {posts[0].readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {posts[0].readTime}
                          </span>
                        )}
                      </div>
                      <Link href={`/blog/${posts[0].slug ?? posts[0].id}`}>
                        <Button>
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>

                {/* Posts Grid */}
                {posts.length > 1 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.slice(1).map((post: any) => (
                      <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={post.featuredImage ?? post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-3 left-3 capitalize">{post.category}</Badge>
                        </div>
                        <CardHeader>
                          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString()}
                          </div>
                          <Link href={`/blog/${post.slug ?? post.id}`}>
                            <Button variant="ghost" size="sm">
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Load More */}
            {!isLoading && !isError && posts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            )}
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
                  <Button variant="secondary">Subscribe</Button>
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



