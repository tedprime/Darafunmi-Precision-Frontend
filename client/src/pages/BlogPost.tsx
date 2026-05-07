import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";

const demoBlogPost = {
  id: 1,
  slug: "importance-of-regular-calibration",
  title: "The Importance of Regular Instrument Calibration",
  excerpt: "Discover why maintaining a consistent calibration schedule is crucial for measurement accuracy and regulatory compliance.",
  content: `
## Introduction

In today's precision-driven industries, accurate measurements are not just a preference—they're a necessity. Whether you're in manufacturing, healthcare, oil and gas, or any other sector that relies on instrumentation, regular calibration is the cornerstone of quality assurance and regulatory compliance.

## What is Calibration?

Calibration is the process of comparing a measurement instrument's readings against a known standard to identify and correct any deviations. This ensures that your instruments provide accurate and reliable measurements consistently.

## Why Regular Calibration Matters

### 1. Measurement Accuracy

Over time, all instruments experience drift—a gradual change in their measurement accuracy. Environmental factors, mechanical wear, and electronic component aging all contribute to this phenomenon. Regular calibration identifies and corrects these deviations before they impact your operations.

### 2. Regulatory Compliance

Many industries are subject to strict regulatory requirements that mandate regular calibration of measurement equipment. In Nigeria, industries such as oil and gas, pharmaceuticals, and food processing must adhere to both local and international standards.

### 3. Quality Assurance

Accurate measurements are fundamental to product quality. In manufacturing, even small measurement errors can lead to defective products, costly recalls, and damaged reputation.

### 4. Safety

In critical applications, measurement accuracy can be a matter of safety. Pressure gauges in industrial processes, temperature sensors in pharmaceutical storage, and flow meters in chemical handling all require precise calibration to prevent accidents.

## Recommended Calibration Intervals

The appropriate calibration interval depends on several factors:

- **Instrument type and manufacturer recommendations**
- **Frequency of use**
- **Environmental conditions**
- **Criticality of measurements**
- **Historical drift data**

As a general guideline, most instruments should be calibrated annually, with more frequent calibration for critical applications or instruments in harsh environments.

## Choosing a Calibration Partner

When selecting a calibration service provider, consider:

1. **Accreditation**: Look for ISO 17025 accredited laboratories
2. **Experience**: Industry-specific expertise matters
3. **Traceability**: Ensure measurements are traceable to national or international standards
4. **Turnaround time**: Minimize equipment downtime
5. **Documentation**: Comprehensive calibration certificates

## Conclusion

Regular calibration is an investment in accuracy, compliance, and safety. By maintaining a consistent calibration schedule, you protect your operations, your products, and your reputation.

At Darafunmi Precision Technologies, we provide ISO-compliant calibration services across Nigeria. Contact us today to discuss your calibration needs.
  `,
  author: "Dr. Adeyemi Okonkwo",
  authorBio: "Chief Technical Officer at Darafunmi Precision Technologies with over 15 years of experience in metrology and calibration.",
  category: "calibration",
  tags: ["calibration", "accuracy", "compliance", "quality assurance"],
  imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=600&fit=crop",
  readTime: "5 min read",
  publishedAt: "2024-01-20",
};

const relatedPosts = [
  {
    id: 2,
    slug: "iso-17025-certification-guide",
    title: "Understanding ISO 17025 Certification Requirements",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop",
    publishedAt: "2024-01-15",
  },
  {
    id: 3,
    slug: "temperature-calibration-best-practices",
    title: "Best Practices for Temperature Calibration",
    imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=300&h=200&fit=crop",
    publishedAt: "2024-01-01",
  },
];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => api.get(`/blog/${slug}`).then((r) => r.data?.data ?? r.data),
    enabled: !!slug,
  });

  const displayPost = post || demoBlogPost;

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px]">
          <img
            src={(displayPost as any).imageUrl}
            alt={(displayPost as any).title}
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
              <Badge className="mb-4 capitalize">{(displayPost as any).category}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {(displayPost as any).title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {(displayPost as any).author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date((displayPost as any).publishedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {(displayPost as any).readTime}
                </span>
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
                <article className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: (displayPost as any).content?.replace(/\n/g, '<br/>') || '' }} />
                </article>

                {/* Tags */}
                <div className="mt-8 pt-8 border-t">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {((displayPost as any).tags || []).map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-8 pt-8 border-t">
                  <p className="font-semibold mb-4">Share this article</p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
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
                    <p className="text-lg font-medium mb-2">{(displayPost as any).author}</p>
                    <p className="text-sm text-muted-foreground">
                      {(displayPost as any).authorBio || "Expert contributor at Darafunmi Precision Technologies."}
                    </p>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                <Card>
                  <CardContent className="p-6">
                    <p className="font-semibold mb-4">Related Articles</p>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                          <div className="flex gap-4 group cursor-pointer">
                            <img
                              src={relatedPost.imageUrl}
                              alt={relatedPost.title}
                              className="w-20 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                {relatedPost.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(relatedPost.publishedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

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
