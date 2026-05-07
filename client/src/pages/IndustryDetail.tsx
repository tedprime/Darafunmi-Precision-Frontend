import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  ArrowLeft,
  Pill,
  Factory,
  Droplets,
  Ship,
  Package,
  Beaker,
  CheckCircle2,
  Phone,
} from "lucide-react";

const industriesData: Record<string, {
  icon: any;
  name: string;
  description: string;
  challenges: string[];
  solutions: string[];
  services: string[];
  equipment: string[];
  regulations: string[];
  caseStudy?: { title: string; description: string; result: string };
  color: string;
}> = {
  pharmaceutical: {
    icon: Pill,
    name: "Pharmaceutical",
    description: "The pharmaceutical industry demands the highest levels of accuracy and regulatory compliance. Our calibration services help pharmaceutical companies maintain GMP compliance, ensure product quality, and meet FDA and NAFDAC requirements.",
    challenges: [
      "Strict regulatory requirements (FDA, NAFDAC, WHO)",
      "Need for traceable calibration records",
      "Clean room and controlled environment requirements",
      "Product quality and patient safety concerns",
      "Frequent audit and inspection requirements",
    ],
    solutions: [
      "ISO 17025 accredited calibration services",
      "GMP-compliant documentation and certificates",
      "Clean room compatible calibration procedures",
      "Validation support and IQ/OQ/PQ protocols",
      "Audit-ready documentation packages",
    ],
    services: [
      "Laboratory equipment calibration",
      "Clean room monitoring equipment",
      "Process analytical instruments",
      "Temperature mapping studies",
      "Validation services",
      "Quality control equipment",
    ],
    equipment: [
      "Analytical balances and scales",
      "pH meters and conductivity meters",
      "Spectrophotometers",
      "HPLC and GC systems",
      "Temperature and humidity sensors",
      "Pressure gauges and transmitters",
      "Pipettes and volumetric equipment",
      "Autoclaves and sterilizers",
    ],
    regulations: ["FDA 21 CFR Part 11", "NAFDAC GMP", "WHO Guidelines", "ISO 17025", "ICH Guidelines"],
    caseStudy: {
      title: "Leading Pharmaceutical Manufacturer",
      description: "Implemented comprehensive calibration program for 200+ instruments across multiple production lines.",
      result: "Achieved 100% compliance in NAFDAC audit with zero observations related to calibration.",
    },
    color: "bg-blue-500",
  },
  manufacturing: {
    icon: Factory,
    name: "Manufacturing",
    description: "Manufacturing facilities rely on precise measurements for quality control and process optimization. We provide comprehensive calibration services for production equipment, ensuring consistent product quality and operational efficiency.",
    challenges: [
      "Production downtime during calibration",
      "Maintaining consistent product quality",
      "Meeting ISO 9001 requirements",
      "Managing large equipment inventories",
      "Cost optimization without compromising quality",
    ],
    solutions: [
      "On-site calibration to minimize downtime",
      "Preventive maintenance programs",
      "Calibration management systems",
      "Express and after-hours service options",
      "Flexible scheduling and planning",
    ],
    services: [
      "Process instrument calibration",
      "Quality control equipment",
      "Dimensional measurement tools",
      "Electrical test equipment",
      "Preventive maintenance",
      "Equipment repair and overhaul",
    ],
    equipment: [
      "Pressure transmitters and gauges",
      "Temperature controllers",
      "Flow meters",
      "Level sensors",
      "Calipers and micrometers",
      "Torque wrenches",
      "Multimeters and calibrators",
      "PLCs and control systems",
    ],
    regulations: ["ISO 9001", "ISO 14001", "IATF 16949", "AS9100"],
    caseStudy: {
      title: "Automotive Parts Manufacturer",
      description: "Established calibration program for 500+ measuring instruments with automated tracking system.",
      result: "Reduced calibration-related production delays by 75% and achieved ISO 9001 certification.",
    },
    color: "bg-gray-500",
  },
  "oil-and-gas": {
    icon: Droplets,
    name: "Oil and Gas",
    description: "The oil and gas industry operates in demanding environments where safety and accuracy are paramount. Our calibration services ensure that critical measurement instruments perform reliably under challenging conditions.",
    challenges: [
      "Harsh operating environments",
      "Safety-critical measurements",
      "Remote location access",
      "Hazardous area requirements",
      "Regulatory compliance (DPR, NUPRC)",
    ],
    solutions: [
      "Hazardous area certified equipment",
      "Mobile calibration units for remote sites",
      "SIL-rated instrument calibration",
      "24/7 emergency service availability",
      "Comprehensive safety documentation",
    ],
    services: [
      "Pressure and temperature calibration",
      "Flow measurement systems",
      "Safety instrumented systems (SIS)",
      "Gas detection equipment",
      "Custody transfer meters",
      "SCADA system instruments",
    ],
    equipment: [
      "Pressure transmitters (0-10,000 psi)",
      "Temperature sensors and RTDs",
      "Flow meters (ultrasonic, Coriolis)",
      "Level transmitters",
      "Gas analyzers",
      "Flame and gas detectors",
      "Control valves and actuators",
      "Emergency shutdown systems",
    ],
    regulations: ["API Standards", "DPR Regulations", "NUPRC Guidelines", "IEC 61511", "ATEX/IECEx"],
    caseStudy: {
      title: "Major Oil & Gas Operator",
      description: "Provided calibration services for offshore platform with 1,000+ instruments.",
      result: "Zero safety incidents related to instrument failure over 5-year contract period.",
    },
    color: "bg-amber-500",
  },
  marine: {
    icon: Ship,
    name: "Marine",
    description: "Marine operations require reliable instrumentation for navigation, safety, and cargo handling. We provide calibration services for marine vessels and port facilities, ensuring compliance with maritime regulations.",
    challenges: [
      "Limited calibration windows during port calls",
      "Compliance with maritime regulations",
      "Harsh marine environment",
      "Navigation safety requirements",
      "International certification requirements",
    ],
    solutions: [
      "Rapid turnaround calibration services",
      "Port-based mobile calibration units",
      "SOLAS-compliant documentation",
      "Class society approved procedures",
      "International certification support",
    ],
    services: [
      "Navigation equipment calibration",
      "Cargo monitoring systems",
      "Safety equipment testing",
      "Engine room instruments",
      "Ballast system monitors",
      "Environmental monitoring",
    ],
    equipment: [
      "Radar and ECDIS systems",
      "GPS and navigation aids",
      "Pressure and temperature gauges",
      "Tank level indicators",
      "Fire detection systems",
      "Gas detection equipment",
      "Load cells and weighing systems",
      "Flow meters",
    ],
    regulations: ["SOLAS", "IMO Standards", "Class Society Rules", "Flag State Requirements"],
    caseStudy: {
      title: "Shipping Company Fleet",
      description: "Established calibration program for 20-vessel fleet with coordinated port call scheduling.",
      result: "Achieved 100% compliance with class society requirements and reduced detention risks.",
    },
    color: "bg-cyan-500",
  },
  beverages: {
    icon: Beaker,
    name: "Beverages",
    description: "The beverage industry requires precise control of temperature, pressure, and flow to ensure product quality and consistency. Our calibration services help beverage manufacturers maintain high standards throughout the production process.",
    challenges: [
      "Product quality consistency",
      "Food safety compliance (NAFDAC)",
      "High-speed production line accuracy",
      "Temperature-sensitive processes",
      "Hygiene and sanitation requirements",
    ],
    solutions: [
      "HACCP-compliant calibration procedures",
      "Sanitary design calibration equipment",
      "Minimal production disruption scheduling",
      "Temperature mapping for cold chain",
      "Comprehensive traceability documentation",
    ],
    services: [
      "Temperature monitoring systems",
      "Flow meter calibration",
      "pH and conductivity meters",
      "Filling line equipment",
      "Pressure gauges",
      "Weighing systems",
    ],
    equipment: [
      "Temperature sensors and controllers",
      "Flow meters (magnetic, mass)",
      "pH meters",
      "Conductivity meters",
      "Brix refractometers",
      "Pressure transmitters",
      "Check weighers",
      "Filling machine sensors",
    ],
    regulations: ["NAFDAC Regulations", "HACCP", "ISO 22000", "FSSC 22000"],
    caseStudy: {
      title: "Major Beverage Manufacturer",
      description: "Implemented calibration program for 5 production lines with 300+ instruments.",
      result: "Reduced product quality deviations by 60% and achieved FSSC 22000 certification.",
    },
    color: "bg-green-500",
  },
  packaging: {
    icon: Package,
    name: "Packaging",
    description: "Packaging operations require precise measurements for weight, dimensions, and seal integrity. We provide calibration services that help packaging companies maintain accuracy and reduce waste.",
    challenges: [
      "High-speed packaging line accuracy",
      "Weight and measure compliance",
      "Seal integrity verification",
      "Dimensional accuracy requirements",
      "Waste reduction goals",
    ],
    solutions: [
      "High-precision weighing calibration",
      "Dimensional measurement services",
      "Seal testing equipment calibration",
      "Production line optimization",
      "Statistical process control support",
    ],
    services: [
      "Weighing equipment calibration",
      "Dimensional measurement tools",
      "Seal testing equipment",
      "Vision system verification",
      "Pressure and vacuum gauges",
      "Temperature monitoring",
    ],
    equipment: [
      "Check weighers",
      "Platform scales",
      "Dimensional gauges",
      "Seal testers",
      "Leak detectors",
      "Pressure gauges",
      "Temperature sensors",
      "Vision systems",
    ],
    regulations: ["Weights and Measures Act", "ISO 9001", "Customer Specifications"],
    caseStudy: {
      title: "Consumer Goods Packaging Company",
      description: "Calibrated 150+ weighing and measuring instruments across 3 facilities.",
      result: "Achieved 99.5% fill weight accuracy and reduced product giveaway by 40%.",
    },
    color: "bg-purple-500",
  },
};

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const industry = industriesData[slug || ""];

  if (!industry) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Industry Not Found</h1>
            <Link href="/industries">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Industries
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IndustryIcon = industry.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-hero py-20 md:py-28">
          <div className="container">
            <Link href="/industries">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Industries
              </Button>
            </Link>
            <div className="max-w-3xl">
              <div className={`w-16 h-16 rounded-lg ${industry.color} flex items-center justify-center mb-6`}>
                <IndustryIcon className="h-8 w-8 text-white" />
              </div>
              <Badge variant="outline" className="mb-4">{industry.name} Industry</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Calibration Solutions for {industry.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {industry.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                    Get Industry Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Industry Challenges</h2>
                <div className="space-y-4">
                  {industry.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                      <span className="text-red-500 font-bold">{index + 1}</span>
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Solutions</h2>
                <div className="space-y-4">
                  {industry.solutions.map((solution, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services & Equipment */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Services We Provide</h2>
                  <div className="space-y-3">
                    {industry.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Equipment We Calibrate</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {industry.equipment.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Regulations */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">Regulatory Compliance Support</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We help you meet the following industry standards and regulations:
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {industry.regulations.map((reg, index) => (
                <Badge key={index} variant="outline" className="text-lg py-2 px-4">
                  {reg}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study */}
        {industry.caseStudy && (
          <section className="section bg-primary text-primary-foreground">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4">Case Study</Badge>
                <h2 className="text-2xl font-bold mb-4">{industry.caseStudy.title}</h2>
                <p className="text-primary-foreground/80 mb-6">
                  {industry.caseStudy.description}
                </p>
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6">
                    <p className="text-lg font-medium">
                      <span className="text-secondary">Result: </span>
                      {industry.caseStudy.result}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="section">
          <div className="container">
            <Card className="gradient-cta text-white overflow-hidden">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Discuss Your {industry.name} Needs?
                </h2>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  Contact us today for a consultation and customized quote for your {industry.name.toLowerCase()} calibration requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/quote">
                    <Button size="lg" variant="secondary">
                      Request a Quote
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <a href="tel:+2348034680544">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                      <Phone className="mr-2 h-5 w-5" />
                      Call Us Now
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
