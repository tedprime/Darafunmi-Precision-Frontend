import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Microscope,
  Wrench,
  GraduationCap,
  Target,
  CheckCircle2,
  Clock,
  Shield,
  Award,
  Phone,
  Cog,
  Package,
  ClipboardCheck,
} from "lucide-react";

const services = [
  {
    slug: "calibration",
    icon: Microscope,
    title: "Calibration Services",
    shortDescription: "ISO-compliant calibration for laboratory and medical equipment",
    description: "Our calibration services ensure your measuring instruments meet international standards. We provide traceable calibration with comprehensive documentation for regulatory compliance.",
    features: [
      "ISO 17025 accredited calibration",
      "Traceable measurement standards",
      "Comprehensive calibration certificates",
      "On-site and laboratory calibration",
      "Quick turnaround time",
      "Regulatory compliance support",
    ],
    industries: ["Pharmaceutical", "Healthcare", "Manufacturing", "Oil & Gas"],
  },
  {
    slug: "maintenance",
    icon: Wrench,
    title: "Maintenance & Repair",
    shortDescription: "Comprehensive maintenance and repair services for process instruments",
    description: "Keep your equipment running at peak performance with our preventive maintenance and repair services. We minimize downtime and extend equipment lifespan.",
    features: [
      "Preventive maintenance programs",
      "Emergency repair services",
      "Spare parts supply",
      "Equipment overhaul",
      "Performance optimization",
      "24/7 support availability",
    ],
    industries: ["Manufacturing", "Oil & Gas", "Marine", "Beverages"],
  },
  {
    slug: "training",
    icon: GraduationCap,
    title: "Training Programs",
    shortDescription: "Technical training for equipment operation and calibration",
    description: "Empower your team with the knowledge and skills to operate and maintain calibration equipment effectively. Our training programs are designed for all skill levels.",
    features: [
      "Hands-on practical training",
      "Customized curriculum",
      "Certified instructors",
      "On-site and virtual options",
      "Certification upon completion",
      "Ongoing support",
    ],
    industries: ["All Industries"],
  },
  {
    slug: "consulting",
    icon: Target,
    title: "Technical Consultancy",
    shortDescription: "Process optimization and compliance consulting",
    description: "Our expert consultants help you optimize your processes, achieve regulatory compliance, and implement best practices in calibration and quality management.",
    features: [
      "Manufacturing improvement",
      "Process optimization",
      "Productivity enhancement",
      "Operational excellence",
      "Engineering project management",
      "Technical training",
    ],
    industries: ["Pharmaceutical", "Manufacturing", "Healthcare", "Oil & Gas"],
  },
  {
    slug: "engineering",
    icon: Cog,
    title: "Engineering Services",
    shortDescription: "Mechanical engineering solutions, equipment installation and plant maintenance",
    description: "We provide end-to-end engineering support — from equipment installation and commissioning to preventive maintenance programs and technical troubleshooting — keeping your plant running at optimal performance.",
    features: [
      "Mechanical engineering solutions",
      "Industrial equipment installation",
      "Plant maintenance",
      "Preventive & predictive maintenance",
      "Equipment troubleshooting",
      "Technical support services",
    ],
    industries: ["Manufacturing", "Oil & Gas", "Power & Energy", "Chemical Processing"],
  },
  {
    slug: "procurement",
    icon: Package,
    title: "Procurement & Supply Chain",
    shortDescription: "Industrial procurement, vendor development and supply chain management",
    description: "We support your procurement needs through strategic sourcing, vendor development, and supply chain management — ensuring you get the right equipment at the right time and price.",
    features: [
      "Industrial procurement",
      "Vendor development",
      "Strategic sourcing",
      "Supply chain management",
      "Inventory management",
      "Procurement consultancy",
    ],
    industries: ["Manufacturing", "Oil & Gas", "FMCG", "Government Agencies"],
  },
  {
    slug: "quality-assurance",
    icon: ClipboardCheck,
    title: "Quality Assurance & Compliance",
    shortDescription: "ISO management system implementation, audits and quality inspection",
    description: "We help organizations implement and maintain robust quality management systems, conduct internal audits, evaluate suppliers, and manage risk — ensuring compliance with ISO 9001:2015 and other applicable standards.",
    features: [
      "ISO management system implementation",
      "Internal quality audits",
      "Supplier evaluation",
      "Quality inspection",
      "Process improvement",
      "Risk management",
    ],
    industries: ["Pharmaceutical", "Manufacturing", "Oil & Gas", "Government Agencies"],
  },
];

const processSteps = [
  { step: 1, title: "Initial Consultation", description: "We assess your needs and requirements" },
  { step: 2, title: "Proposal & Quote", description: "Detailed proposal with transparent pricing" },
  { step: 3, title: "Service Delivery", description: "Expert execution with minimal disruption" },
  { step: 4, title: "Documentation", description: "Comprehensive reports and certificates" },
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-hero py-20 md:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">Our Services</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Comprehensive <span className="text-primary">Calibration Solutions</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                From calibration and maintenance to training and consulting, we provide 
                end-to-end solutions to keep your operations running at peak performance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/book-service">
                  <Button size="lg" variant="outline">
                    Book a Service
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section">
          <div className="container">
            <div className="grid gap-12">
              {services.map((service, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="bg-primary/5 p-8 flex flex-col justify-center">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                      <p className="text-muted-foreground mb-6">{service.shortDescription}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.industries.map((industry, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2 p-8">
                      <p className="text-muted-foreground mb-6">{service.description}</p>
                      <h3 className="font-semibold mb-4">Key Features:</h3>
                      <div className="grid sm:grid-cols-2 gap-3 mb-6">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Link href={`/services/${service.slug}`}>
                        <Button>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Our Process</Badge>
              <h2 className="section-title">How We Work</h2>
              <p className="section-subtitle mx-auto">
                Our streamlined process ensures efficient service delivery with minimal disruption to your operations.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground mx-auto flex items-center justify-center text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Services */}
        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Why Choose Us</Badge>
                <h2 className="section-title">Service Excellence Guaranteed</h2>
                <p className="text-muted-foreground mb-8">
                  With nearly two decades of experience, we deliver calibration services 
                  that meet the highest international standards.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">ISO Certified</h3>
                      <p className="text-muted-foreground text-sm">
                        Our laboratory is ISO 17025 accredited, ensuring traceable and reliable calibration.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Quick Turnaround</h3>
                      <p className="text-muted-foreground text-sm">
                        We understand the importance of minimizing downtime. Most calibrations completed within 48 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Expert Team</h3>
                      <p className="text-muted-foreground text-sm">
                        Our certified engineers have extensive experience across multiple industries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-8">
                <h3 className="text-xl font-bold mb-6">Equipment We Calibrate</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Pressure Gauges",
                    "Temperature Sensors",
                    "Flow Meters",
                    "pH Meters",
                    "Conductivity Meters",
                    "Analytical Balances",
                    "Pipettes",
                    "Thermometers",
                    "Humidity Meters",
                    "Electrical Meters",
                    "Dimensional Tools",
                    "Process Controllers",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section gradient-cta text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Our Services?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Our team is ready 
              to help you achieve precision in every measurement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" variant="secondary">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:+2348061535441">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
