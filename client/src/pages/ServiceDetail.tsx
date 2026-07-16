import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  ArrowLeft,
  Microscope,
  Wrench,
  GraduationCap,
  Target,
  CheckCircle2,
  Phone,
  Clock,
  Shield,
  Award,
  Cog,
  Package,
  ClipboardCheck,
} from "lucide-react";

// Service data
const servicesData: Record<string, {
  icon: any;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  equipment: string[];
  process: { step: number; title: string; description: string }[];
  pricing: string;
}> = {
  calibration: {
    icon: Microscope,
    title: "Calibration Services",
    description: "ISO compliant calibration for laboratory and medical equipment with traceable standards",
    longDescription: "Our calibration services ensure your measuring instruments meet international standards and regulatory requirements. We provide traceable calibration with comprehensive documentation, helping you maintain compliance with industry regulations and quality management systems. Our ISO 17025 accredited laboratory uses reference standards traceable to national and international standards.",
    features: [
      "ISO 17025 accredited calibration laboratory",
      "Traceable measurement standards to SI units",
      "Comprehensive calibration certificates",
      "On site and laboratory calibration options",
      "Express service for urgent requirements",
      "Calibration reminder service",
      "Multipoint calibration available",
      "Uncertainty of measurement reporting",
    ],
    benefits: [
      "Ensure regulatory compliance",
      "Improve measurement accuracy",
      "Reduce production errors",
      "Minimize equipment downtime",
      "Extend equipment lifespan",
      "Support quality management systems",
    ],
    equipment: [
      "Pressure gauges and transmitters",
      "Temperature sensors and controllers",
      "Flow meters and totalizers",
      "pH and conductivity meters",
      "Analytical balances and scales",
      "Pipettes and volumetric equipment",
      "Thermometers and hygrometers",
      "Electrical multimeters and calibrators",
    ],
    process: [
      { step: 1, title: "Equipment Receipt", description: "We receive and inspect your equipment" },
      { step: 2, title: "Pre Calibration Check", description: "Initial assessment and documentation" },
      { step: 3, title: "Calibration", description: "Calibration against traceable standards" },
      { step: 4, title: "Documentation", description: "Certificate and report generation" },
    ],
    pricing: "Starting from ₦25,000 per instrument",
  },
  maintenance: {
    icon: Wrench,
    title: "Maintenance & Repair",
    description: "Comprehensive maintenance and repair services for process analytical instruments",
    longDescription: "Keep your equipment running at peak performance with our preventive maintenance and repair services. Our experienced technicians can service a wide range of process control instruments, minimizing downtime and extending equipment lifespan. We offer both scheduled maintenance programs and emergency repair services.",
    features: [
      "Preventive maintenance programs",
      "Emergency repair services",
      "Genuine spare parts supply",
      "Equipment overhaul and refurbishment",
      "Performance optimization",
      "24/7 emergency support",
      "On site service available",
      "Detailed service reports",
    ],
    benefits: [
      "Minimize unplanned downtime",
      "Extend equipment lifespan",
      "Optimize performance",
      "Reduce total cost of ownership",
      "Ensure operational reliability",
      "Maintain production quality",
    ],
    equipment: [
      "Process analyzers",
      "Control valves and actuators",
      "Transmitters and sensors",
      "PLCs and DCS systems",
      "Recorders and indicators",
      "Safety instrumented systems",
      "Laboratory equipment",
      "Medical devices",
    ],
    process: [
      { step: 1, title: "Diagnosis", description: "Identify issues and root causes" },
      { step: 2, title: "Quote", description: "Detailed repair estimate" },
      { step: 3, title: "Repair", description: "Expert repair with quality parts" },
      { step: 4, title: "Testing", description: "Thorough testing and calibration" },
    ],
    pricing: "Contact us for a customized quote",
  },
  training: {
    icon: GraduationCap,
    title: "Training Programs",
    description: "Technical training for equipment operation and calibration procedures",
    longDescription: "Empower your team with the knowledge and skills to operate and maintain calibration equipment effectively. Our comprehensive training programs are designed for all skill levels, from basic operation to advanced calibration techniques. We offer both standard courses and customized training tailored to your specific needs.",
    features: [
      "Hands on practical training",
      "Customized curriculum options",
      "Certified and experienced instructors",
      "On site and virtual training options",
      "Certification upon completion",
      "Training materials provided",
      "Post training support",
      "Group and individual sessions",
    ],
    benefits: [
      "Improve staff competency",
      "Reduce operational errors",
      "Enhance equipment handling",
      "Support career development",
      "Meet regulatory requirements",
      "Build internal capabilities",
    ],
    equipment: [
      "Calibration fundamentals",
      "Instrument operation",
      "Maintenance procedures",
      "Quality management systems",
      "ISO standards compliance",
      "Safety protocols",
      "Documentation practices",
      "Troubleshooting techniques",
    ],
    process: [
      { step: 1, title: "Needs Assessment", description: "Identify training requirements" },
      { step: 2, title: "Curriculum Design", description: "Customize training content" },
      { step: 3, title: "Delivery", description: "Interactive training sessions" },
      { step: 4, title: "Certification", description: "Assessment and certification" },
    ],
    pricing: "Starting from ₦150,000 per participant",
  },
  consulting: {
    icon: Target,
    title: "Technical Consultancy",
    description: "Process optimization, operational excellence, and engineering project management",
    longDescription: "Our expert consultants help you optimize your processes, achieve regulatory compliance, and implement best practices in calibration and quality management. We work closely with your team to identify improvement opportunities and develop practical solutions that deliver measurable results.",
    features: [
      "Manufacturing improvement programs",
      "Process optimization analysis",
      "Productivity enhancement strategies",
      "Operational excellence frameworks",
      "Engineering project management",
      "Technical training for staff",
      "Gap analysis and remediation",
      "Standard operating procedures",
    ],
    benefits: [
      "Achieve regulatory compliance",
      "Optimize operational efficiency",
      "Reduce quality related costs",
      "Improve process reliability",
      "Enhance competitive advantage",
      "Support business growth",
    ],
    equipment: [
      "ISO 17025 implementation",
      "ISO 9001 quality systems",
      "GMP compliance",
      "Process validation",
      "Measurement uncertainty",
      "Calibration program design",
      "Laboratory management",
      "Quality auditing",
    ],
    process: [
      { step: 1, title: "Discovery", description: "Understand your current state" },
      { step: 2, title: "Analysis", description: "Identify gaps and opportunities" },
      { step: 3, title: "Recommendations", description: "Develop action plan" },
      { step: 4, title: "Implementation", description: "Support execution and monitoring" },
    ],
    pricing: "Contact us for project based pricing",
  },
  engineering: {
    icon: Cog,
    title: "Engineering Services",
    description: "Mechanical engineering solutions, equipment installation, and plant maintenance",
    longDescription: "We provide end to end engineering support — from equipment installation and commissioning to preventive maintenance programs and technical troubleshooting — keeping your plant running at optimal performance. Our engineers bring hands on expertise across a wide range of industrial equipment and systems.",
    features: [
      "Mechanical engineering solutions",
      "Industrial equipment installation",
      "Equipment commissioning",
      "Plant maintenance programs",
      "Preventive & predictive maintenance",
      "Equipment troubleshooting",
      "Technical support services",
      "Performance monitoring",
    ],
    benefits: [
      "Minimize plant downtime",
      "Extend equipment service life",
      "Improve operational efficiency",
      "Reduce maintenance costs",
      "Ensure safe plant operations",
      "Support production continuity",
    ],
    equipment: [
      "Industrial pumps and compressors",
      "Heat exchangers",
      "Piping systems",
      "Mechanical drives and gearboxes",
      "Conveyor systems",
      "Pressure vessels",
      "Valves and actuators",
      "Rotating equipment",
    ],
    process: [
      { step: 1, title: "Site Assessment", description: "Evaluate equipment and plant conditions" },
      { step: 2, title: "Planning", description: "Develop installation or maintenance plan" },
      { step: 3, title: "Execution", description: "Professional on site service delivery" },
      { step: 4, title: "Commissioning", description: "Testing, sign off, and handover" },
    ],
    pricing: "Contact us for a customized quote",
  },
  procurement: {
    icon: Package,
    title: "Procurement & Supply Chain",
    description: "Industrial procurement, vendor development, and supply chain management",
    longDescription: "We support your procurement needs through strategic sourcing, vendor development, and supply chain management — ensuring you get the right equipment at the right time and price. Our procurement specialists have established relationships with leading manufacturers and distributors across Nigeria and internationally.",
    features: [
      "Industrial equipment procurement",
      "Vendor identification and development",
      "Strategic sourcing",
      "Supply chain management",
      "Inventory management support",
      "Import facilitation",
      "Quality inspection of procured items",
      "Procurement consultancy",
    ],
    benefits: [
      "Reduce procurement lead times",
      "Access competitive pricing",
      "Ensure product quality and authenticity",
      "Simplify supplier management",
      "Lower total procurement cost",
      "Mitigate supply chain risk",
    ],
    equipment: [
      "Laboratory instruments",
      "Process control equipment",
      "Industrial spare parts",
      "Safety equipment",
      "Calibration reference standards",
      "Analytical instruments",
      "Maintenance tools and consumables",
      "Electrical and instrumentation materials",
    ],
    process: [
      { step: 1, title: "Requirements", description: "Define specifications and quantities" },
      { step: 2, title: "Sourcing", description: "Identify and evaluate suppliers" },
      { step: 3, title: "Procurement", description: "Purchase, inspect, and ship" },
      { step: 4, title: "Delivery", description: "On time delivery with documentation" },
    ],
    pricing: "Contact us for project based pricing",
  },
  "quality-assurance": {
    icon: ClipboardCheck,
    title: "Quality Assurance & Compliance",
    description: "ISO management system implementation, internal audits, and quality inspection",
    longDescription: "We help organizations implement and maintain robust quality management systems, conduct internal audits, evaluate suppliers, and manage risk — ensuring compliance with ISO 9001:2015 and other applicable standards. Our QA specialists bring deep experience across manufacturing, pharmaceutical, oil & gas, and government sectors.",
    features: [
      "ISO 9001:2015 QMS implementation",
      "Internal quality audits",
      "Supplier evaluation and qualification",
      "Quality inspection services",
      "Process improvement programs",
      "Risk identification and management",
      "Document control systems",
      "Non conformance management",
    ],
    benefits: [
      "Achieve and maintain ISO certification",
      "Reduce quality related defects and costs",
      "Improve customer satisfaction",
      "Meet regulatory requirements",
      "Build a culture of continuous improvement",
      "Gain competitive advantage",
    ],
    equipment: [
      "ISO 9001:2015 standards",
      "Internal audit techniques",
      "Root cause analysis",
      "Corrective action processes",
      "Supplier audit protocols",
      "Inspection and test plans",
      "Statistical process control",
      "Management review facilitation",
    ],
    process: [
      { step: 1, title: "Gap Analysis", description: "Assess current state vs. ISO requirements" },
      { step: 2, title: "System Design", description: "Build QMS documentation and processes" },
      { step: 3, title: "Implementation", description: "Deploy and train staff on the system" },
      { step: 4, title: "Audit & Review", description: "Internal audit and continual improvement" },
    ],
    pricing: "Contact us for project based pricing",
  },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData[slug || ""];

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
            <Link href="/services">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-hero py-20 md:py-28">
          <div className="container">
            <Link href="/services">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Button>
            </Link>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <ServiceIcon className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  {service.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  {service.description}
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
                      Book This Service
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <Card className="bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Quick Facts</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <span>ISO 17025 Accredited</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>Quick Turnaround</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-primary" />
                        <span>Certified Experts</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Pricing</p>
                      <p className="font-semibold text-primary">{service.pricing}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">About This Service</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {service.longDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Features & Benefits */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Features</h2>
                <div className="space-y-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Benefits</h2>
                <div className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment / Topics */}
        <section className="section">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">
              {slug === "calibration" || slug === "maintenance"
                ? "Equipment We Service"
                : slug === "procurement"
                ? "Items We Procure"
                : "Topics Covered"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {service.equipment.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center">
                    <span className="text-sm">{item}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section bg-primary text-primary-foreground">
          <div className="container">
            <h2 className="text-2xl font-bold mb-12 text-center">Our Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {service.process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground mx-auto flex items-center justify-center text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-primary-foreground/80 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container">
            <Card className="gradient-cta text-white overflow-hidden">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  Contact us today for a free consultation and quote for {service.title.toLowerCase()}.
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
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
