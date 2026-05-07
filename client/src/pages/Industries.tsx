import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Pill,
  Factory,
  Droplets,
  Ship,
  Package,
  Beaker,
  CheckCircle2,
} from "lucide-react";

const industries = [
  {
    slug: "pharmaceutical",
    icon: Pill,
    name: "Pharmaceutical",
    description: "Ensuring precision and compliance in pharmaceutical manufacturing and quality control.",
    longDescription: "The pharmaceutical industry demands the highest levels of accuracy and regulatory compliance. Our calibration services help pharmaceutical companies maintain GMP compliance, ensure product quality, and meet FDA and NAFDAC requirements.",
    services: ["Laboratory equipment calibration", "Clean room monitoring", "Process validation", "GMP compliance support"],
    color: "bg-blue-500",
  },
  {
    slug: "manufacturing",
    icon: Factory,
    name: "Manufacturing",
    description: "Optimizing production processes through accurate measurement and control.",
    longDescription: "Manufacturing facilities rely on precise measurements for quality control and process optimization. We provide comprehensive calibration services for production equipment, ensuring consistent product quality and operational efficiency.",
    services: ["Process instrument calibration", "Quality control equipment", "Production line optimization", "Preventive maintenance"],
    color: "bg-gray-500",
  },
  {
    slug: "oil-and-gas",
    icon: Droplets,
    name: "Oil and Gas",
    description: "Supporting safe and efficient operations in the energy sector.",
    longDescription: "The oil and gas industry operates in demanding environments where safety and accuracy are paramount. Our calibration services ensure that critical measurement instruments perform reliably under challenging conditions.",
    services: ["Pressure and temperature calibration", "Flow measurement", "Safety system testing", "Hazardous area equipment"],
    color: "bg-amber-500",
  },
  {
    slug: "marine",
    icon: Ship,
    name: "Marine",
    description: "Ensuring navigation and operational safety in maritime applications.",
    longDescription: "Marine operations require reliable instrumentation for navigation, safety, and cargo handling. We provide calibration services for marine vessels and port facilities, ensuring compliance with maritime regulations.",
    services: ["Navigation equipment", "Cargo monitoring systems", "Safety equipment calibration", "Port facility instruments"],
    color: "bg-cyan-500",
  },
  {
    slug: "beverages",
    icon: Beaker,
    name: "Beverages",
    description: "Maintaining quality and consistency in beverage production.",
    longDescription: "The beverage industry requires precise control of temperature, pressure, and flow to ensure product quality and consistency. Our calibration services help beverage manufacturers maintain high standards throughout the production process.",
    services: ["Temperature monitoring", "Flow meter calibration", "pH and conductivity", "Filling line equipment"],
    color: "bg-green-500",
  },
  {
    slug: "packaging",
    icon: Package,
    name: "Packaging",
    description: "Ensuring accuracy in packaging operations and quality control.",
    longDescription: "Packaging operations require precise measurements for weight, dimensions, and seal integrity. We provide calibration services that help packaging companies maintain accuracy and reduce waste.",
    services: ["Weighing equipment", "Dimensional measurement", "Seal testing equipment", "Quality inspection tools"],
    color: "bg-purple-500",
  },
];

export default function Industries() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-hero py-20 md:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">Industries We Serve</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Expertise Across <span className="text-primary">Multiple Sectors</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We understand the unique challenges of each industry and provide tailored 
                calibration solutions that meet sector-specific requirements and regulations.
              </p>
              <Link href="/quote">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                  Get Industry-Specific Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry) => (
                <Link key={industry.slug} href={`/industries/${industry.slug}`}>
                  <Card className="h-full card-hover cursor-pointer group">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-lg ${industry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <industry.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{industry.name}</CardTitle>
                      <CardDescription className="text-base">
                        {industry.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {industry.longDescription}
                      </p>
                      <div className="space-y-2">
                        {industry.services.slice(0, 3).map((service, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Industry Expertise Matters */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Why It Matters</Badge>
                <h2 className="section-title">Industry-Specific Expertise</h2>
                <p className="text-muted-foreground mb-8">
                  Different industries have unique requirements, regulations, and challenges. 
                  Our team understands these nuances and provides calibration services that 
                  are tailored to your specific needs.
                </p>
                <div className="space-y-4">
                  {[
                    "Understanding of industry-specific regulations",
                    "Experience with sector-specific equipment",
                    "Knowledge of best practices and standards",
                    "Customized documentation and reporting",
                    "Compliance support for audits and inspections",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "18+", label: "Years Experience" },
                  { value: "6+", label: "Industries Served" },
                  { value: "100+", label: "Clients" },
                  { value: "99%", label: "Satisfaction Rate" },
                ].map((stat, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section gradient-cta text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Discuss Your Industry Needs?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to learn how our industry-specific expertise can help 
              you achieve precision and compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" variant="secondary">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
