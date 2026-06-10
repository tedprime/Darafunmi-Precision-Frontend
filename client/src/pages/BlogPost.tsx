import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Tag,
  AlertTriangle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────
interface BlogPostData {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  author: string | { name: string };
  authorBio?: string;
  category: string;
  tags?: string[];
  featuredImage?: string;
  imageUrl?: string;
  readTime?: string;
  publishedAt?: string;
  createdAt?: string;
}

interface RelatedPost {
  id: number;
  slug?: string;
  title: string;
  featuredImage?: string;
  imageUrl?: string;
  publishedAt?: string;
  createdAt?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────
const getAuthorName = (author: BlogPostData["author"]): string =>
  typeof author === "object" ? author.name : author;

const getImage = (post: BlogPostData | RelatedPost): string =>
  (post as BlogPostData).featuredImage ?? (post as BlogPostData).imageUrl ?? "";

const getDate = (post: BlogPostData | RelatedPost): string => {
  const raw = (post as BlogPostData).publishedAt ?? (post as BlogPostData).createdAt;
  return raw ? new Date(raw).toLocaleDateString() : "";
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useQuery<BlogPostData>({
    queryKey: ["blog", slug],
    queryFn: () =>
      api.get(`/blog/${slug}`).then((r) => r.data?.data ?? r.data),
    enabled: !!slug,
  });

  const { data: relatedPosts = [] } = useQuery<RelatedPost[]>({
    queryKey: ["blog", "related", post?.category],
    queryFn: () =>
      api
        .get("/blog", {
          params: {
            category: post!.category,
            limit: 3,
            status: "published",
          },
        })
        .then((r) => {
          const list: BlogPostData[] = r.data?.data ?? r.data ?? [];
          // Exclude the current post
          return list.filter((p) => p.id !== post!.id).slice(0, 2);
        }),
    enabled: !!post?.category,
  });

  // ── Loading ────────────────────────────────────────────────────
  if (isLoading) {
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

  // ── Error ──────────────────────────────────────────────────────
  if (isError || !post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-24">
          <AlertTriangle className="h-10 w-10 text-muted-foreground" />
          <p className="font-medium text-gray-700">Failed to load this article</p>
          <p className="text-sm text-muted-foreground">
            It may have been moved or the connection failed.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
            <Link href="/blog">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Share helpers ──────────────────────────────────────────────
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px]">
          <img
            src={getImage(post)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container">
              <Link href="/blog">
                <Button variant="ghost" className="text-white mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
              <Badge className="mb-4 capitalize">{post.category}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {getAuthorName(post.author)}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {getDate(post)}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="section">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: post.content?.replace(/\n/g, "<br/>") ?? "",
                  }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share */}
                <div className="mt-8 pt-8 border-t">
                  <p className="font-semibold mb-4">Share this article</p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                          "_blank"
                        )
                      }
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`,
                          "_blank"
                        )
                      }
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        window.open(
                          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                          "_blank"
                        )
                      }
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigator.clipboard.writeText(shareUrl)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Author */}
                <Card>
                  <CardContent className="p-6">
                    <p className="font-semibold mb-2">About the Author</p>
                    <p className="text-lg font-medium mb-2">
                      {getAuthorName(post.author)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {post.authorBio ??
                        "Expert contributor at Darafunmi Precision Technologies."}
                    </p>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <p className="font-semibold mb-4">Related Articles</p>
                      <div className="space-y-4">
                        {relatedPosts.map((related) => (
                          <Link
                            key={related.id}
                            href={`/blog/${related.slug ?? related.id}`}
                          >
                            <div className="flex gap-4 group cursor-pointer">
                              <img
                                src={getImage(related)}
                                alt={related.title}
                                className="w-20 h-16 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                  {related.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {getDate(related)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA */}
                <Card className="gradient-cta text-white">
                  <CardContent className="p-6">
                    <p className="font-semibold mb-2">Need Calibration Services?</p>
                    <p className="text-sm text-white/80 mb-4">
                      Contact us today for professional calibration services.
                    </p>
                    <Link href="/contact">
                      <Button variant="secondary" className="w-full">
                        Get in Touch
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}