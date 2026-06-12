import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

export default function CaseStudies() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["case-studies", "list"],
    queryFn: () =>
      api
        .get("/case-studies", { params: { limit: 20, status: "published" } })
        .then((r) => r.data?.data ?? r.data),
  });

  const caseStudies = data ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">Case Studies</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Success <span className="text-primary">Stories</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover how we've helped organisations across Nigeria achieve
                measurement excellence and operational efficiency.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "50+", label: "Projects Completed" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "35%", label: "Avg. Efficiency Gain" },
                { value: "10+", label: "Industries Served" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-4xl font-bold text-primary">{s.value}</p>
                  <p className="text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="section">
          <div className="container">

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
                <p className="font-medium text-gray-700">Failed to load case studies</p>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Please check your connection and try again.
                </p>
                <Button variant="outline" onClick={() => refetch()}>Retry</Button>
              </div>
            )}

            {/* Empty */}
            {!isLoading && !isError && caseStudies.length === 0 && (
              <div className="text-center py-24 text-muted-foreground">
                No case studies found.
              </div>
            )}

            {/* Content */}
            {!isLoading && !isError && caseStudies.length > 0 && (
              <div className="space-y-12">
                {caseStudies.map((study: any, index: number) => (
                  <Card key={study.id} className="overflow-hidden">
                    <div className="grid md:grid-cols-2">
                      <div className={`aspect-video md:aspect-auto ${index % 2 === 1 ? "md:order-2" : ""}`}>
                        {study.imageUrl ?? study.featuredImage ? (
                          <img
                            src={study.imageUrl ?? study.featuredImage}
                            alt={study.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full min-h-[240px] bg-gradient-to-br from-primary/20 to-secondary/20" />
                        )}
                      </div>
                      <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? "md:order-1" : ""}`}>
                        <div className="flex items-center gap-2 mb-4">
                          {study.industry && (
                            <Badge variant="secondary">{study.industry}</Badge>
                          )}
                          {study.year && (
                            <Badge variant="outline">{study.year}</Badge>
                          )}
                        </div>

                        <h2 className="text-2xl font-bold mb-3">{study.title}</h2>

                        <p className="text-muted-foreground mb-5">
                          {study.challenge ?? study.excerpt ?? study.description}
                        </p>

                        {/* Results — handle both array and newline-separated string */}
                        {study.results && (
                          <div className="mb-6">
                            <p className="font-semibold mb-2">Key Results:</p>
                            <ul className="space-y-2">
                              {(Array.isArray(study.results)
                                ? study.results
                                : String(study.results).split("\n").filter(Boolean)
                              ).slice(0, 3).map((result: string, i: number) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                          {study.client && (
                            <span className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              {study.client}
                            </span>
                          )}
                          {study.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {study.duration}
                            </span>
                          )}
                          {study.metric && (
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              {study.metric}
                            </span>
                          )}
                        </div>

                        <Link href={`/case-studies/${study.slug ?? study.id}`}>
                          <Button className="w-fit">
                            Read Full Case Study
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
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
            <Card className="gradient-cta text-white overflow-hidden">
              <CardContent className="p-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h2>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  Let us help you achieve measurement excellence and operational efficiency.
                  Contact us today to discuss your requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/quote">
                    <Button size="lg" variant="secondary">Get a Quote</Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
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