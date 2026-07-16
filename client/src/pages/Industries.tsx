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
  Package,
  Beaker,
  CheckCircle2,
  UtensilsCrossed,
  Zap,
  HardHat,
  ShoppingBag,
  Truck,
  Landmark,
} from "lucide-react";

const industries = [
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
    name: "Oil & Gas",
    description: "Supporting safe and efficient operations across upstream, midstream, and downstream.",
    longDescription: "The oil and gas industry operates in demanding environments where safety and accuracy are paramount. Our calibration services ensure that critical measurement instruments perform reliably under challenging conditions.",
    services: ["Pressure and temperature calibration", "Flow measurement systems", "Safety instrumented systems", "Hazardous area equipment"],
    color: "bg-amber-500",
  },
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
    slug: "food-beverage",
    icon: UtensilsCrossed,
    name: "Food & Beverage",
    description: "Maintaining product safety, quality, and consistency across food and beverage production.",
    longDescription: "The food and beverage industry demands precise control of temperature, pressure, flow, and weight to ensure product safety and regulatory compliance. We help manufacturers meet NAFDAC, HACCP, and ISO 22000 requirements.",
    services: ["Temperature monitoring calibration", "Flow meter calibration", "pH and conductivity meters", "Filling line and weighing equipment"],
    color: "bg-green-500",
  },
  {
    slug: "power-energy",
    icon: Zap,
    name: "Power & Energy",
    description: "Keeping power generation and energy facilities running safely and efficiently.",
    longDescription: "Power generation and energy facilities rely on precise instrumentation for safe, efficient, and compliant operations. We provide calibration, maintenance, and engineering services for power plants and energy assets across Nigeria.",
    services: ["Electrical instrument calibration", "Pressure and temperature calibration", "Flow measurement systems", "Preventive maintenance programs"],
    color: "bg-yellow-500",
  },
  {
    slug: "chemical",
    icon: Beaker,
    name: "Chemical Processing",
    description: "Supporting safe plant operations and process efficiency in chemical manufacturing.",
    longDescription: "Chemical processing plants operate under demanding conditions with strict safety and quality requirements. We provide calibration and technical services that support regulatory compliance, functional safety, and process efficiency.",
    services: ["Process instrument calibration", "SIS calibration and testing", "Analyzer maintenance", "Engineering and maintenance services"],
    color: "bg-purple-500",
  },
  {
    slug: "engineering-construction",
    icon: HardHat,
    name: "Engineering & Construction",
    description: "Precise calibration and commissioning support for engineering and construction projects.",
    longDescription: "From groundbreak to handover, we support engineering and construction projects with instrument calibration, pre commissioning checks, loop testing, and commissioning services — ensuring projects are delivered on time and to specification.",
    services: ["Pre commissioning calibration", "Loop checking and verification", "Commissioning support", "Procurement of instrumentation"],
    color: "bg-orange-500",
  },
  {
    slug: "fmcg",
    icon: ShoppingBag,
    name: "FMCG",
    description: "Accurate calibration and quality services for fast moving consumer goods manufacturers.",
    longDescription: "High volume FMCG production demands consistent measurement accuracy, weight compliance, and product safety. We help FMCG manufacturers meet NAFDAC requirements and maintain quality standards with minimal production disruption.",
    services: ["Weighing and filling equipment calibration", "Temperature and flow calibration", "NAFDAC compliance support", "Quality inspection services"],
    color: "bg-pink-500",
  },
  {
    slug: "logistics-warehousing",
    icon: Truck,
    name: "Logistics & Warehousing",
    description: "Weighing, temperature monitoring, and measurement services for logistics operations.",
    longDescription: "Accurate weighing, cold chain integrity, and regulatory compliance are critical in logistics and warehousing. We calibrate weighbridges, platform scales, temperature loggers, and cold room systems to keep your operations compliant and efficient.",
    services: ["Weighbridge calibration", "Platform and bench scale calibration", "Cold room temperature mapping", "Temperature logger verification"],
    color: "bg-teal-500",
  },
  {
    slug: "government-agencies",
    icon: Landmark,
    name: "Government Agencies",
    description: "Calibration, procurement, and quality assurance services for public institutions.",
    longDescription: "We serve government agencies, parastatals, and public institutions with compliant calibration, procurement, and technical services — helping deliver reliable public service infrastructure backed by accurate, auditable measurement systems.",
    services: ["Laboratory instrument calibration", "Government procurement support", "Quality assurance and audit support", "Capacity development and training"],
    color: "bg-indigo-500",
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
                  { value: "10+", label: "Industries Served" },
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
