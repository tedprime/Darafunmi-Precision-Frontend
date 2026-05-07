import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle2,
  Factory,
  Droplets,
  Pill,
  Leaf,
} from "lucide-react";

const caseStudies = [
  {
    id: 1,
    slug: "oil-gas-calibration-optimization",
    title: "Reducing Equipment Downtime by 40% for Major Oil Company",
    client: "Leading Nigerian Oil & Gas Company",
    industry: "Oil & Gas",
    icon: Droplets,
    challenge: "The client was experiencing frequent equipment failures due to inaccurate pressure and temperature readings, resulting in costly production shutdowns.",
    solution: "Implemented a comprehensive calibration program with predictive maintenance scheduling and on-site calibration services.",
    results: [
      "40% reduction in unplanned downtime",
      "25% decrease in maintenance costs",
      "99.9% measurement accuracy achieved",
      "ROI realized within 6 months",
    ],
    imageUrl: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600&h=400&fit=crop",
    duration: "12 months",
    year: "2023",
  },
  {
    id: 2,
    slug: "pharmaceutical-compliance",
    title: "Achieving FDA Compliance for Pharmaceutical Manufacturer",
    client: "Major Pharmaceutical Company",
    industry: "Pharmaceutical",
    icon: Pill,
    challenge: "The pharmaceutical manufacturer needed to meet strict FDA and NAFDAC requirements for their laboratory and production equipment calibration.",
    solution: "Provided ISO 17025 accredited calibration services with comprehensive documentation and traceability to international standards.",
    results: [
      "100% FDA audit compliance",
      "Zero non-conformances in NAFDAC inspection",
      "Reduced calibration turnaround by 50%",
      "Complete documentation system implemented",
    ],
    imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&h=400&fit=crop",
    duration: "8 months",
    year: "2023",
  },
  {
    id: 3,
    slug: "manufacturing-quality-improvement",
    title: "Improving Product Quality by 35% for Manufacturing Plant",
    client: "Industrial Manufacturing Company",
    industry: "Manufacturing",
    icon: Factory,
    challenge: "High defect rates in production due to measurement inconsistencies across multiple production lines.",
    solution: "Calibrated all measurement equipment, implemented standardized procedures, and trained staff on proper equipment handling.",
    results: [
      "35% reduction in product defects",
      "20% increase in production efficiency",
      "Standardized measurement procedures",
      "Staff trained and certified",
    ],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    duration: "6 months",
    year: "2022",
  },
  {
    id: 4,
    slug: "environmental-monitoring",
    title: "Environmental Monitoring System for Research Institute",
    client: "Government Research Institute",
    industry: "Environmental",
    icon: Leaf,
    challenge: "Required accurate and reliable environmental monitoring equipment for air and water quality research projects.",
    solution: "Calibrated all environmental monitoring sensors and established a regular calibration schedule with on-site support.",
    results: [
      "Research data accuracy improved to 99.5%",
      "Regulatory compliance achieved",
      "Long-term calibration partnership established",
      "Custom calibration protocols developed",
    ],
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
    duration: "Ongoing",
    year: "2022",
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">Case Studies</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Success <span className="text-primary">Stories</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover how we've helped organizations across Nigeria achieve 
                measurement excellence and operational efficiency.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">50+</p>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">98%</p>
                <p className="text-muted-foreground">Client Satisfaction</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">35%</p>
                <p className="text-muted-foreground">Avg. Efficiency Gain</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">10+</p>
                <p className="text-muted-foreground">Industries Served</p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="section">
          <div className="container">
            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <Card key={study.id} className="overflow-hidden">
                  <div className={`grid md:grid-cols-2 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`aspect-video md:aspect-auto ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <img
                        src={study.imageUrl}
                        alt={study.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="gap-1">
                          <study.icon className="h-3 w-3" />
                          {study.industry}
                        </Badge>
                        <Badge variant="outline">{study.year}</Badge>
                      </div>
                      <h2 className="text-2xl font-bold mb-4">{study.title}</h2>
                      <p className="text-muted-foreground mb-4">{study.challenge}</p>
                      
                      <div className="mb-6">
                        <p className="font-semibold mb-2">Key Results:</p>
                        <ul className="space-y-2">
                          {study.results.slice(0, 3).map((result, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {study.client}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {study.duration}
                        </span>
                      </div>

                      <Button className="w-fit">
                        Read Full Case Study
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
                    <Button size="lg" variant="secondary">
                      Get a Quote
                    </Button>
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
