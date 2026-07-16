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
  UtensilsCrossed,
  Zap,
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
      "GMP compliant documentation and certificates",
      "Clean room compatible calibration procedures",
      "Validation support and IQ/OQ/PQ protocols",
      "Audit ready documentation packages",
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
      "On site calibration to minimize downtime",
      "Preventive maintenance programs",
      "Calibration management systems",
      "Express and after hours service options",
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
      result: "Reduced calibration related production delays by 75% and achieved ISO 9001 certification.",
    },
    color: "bg-gray-500",
  },
  "oil-and-gas": {
    icon: Droplets,
    name: "Oil and Gas",
    description: "The oil and gas industry operates in demanding environments where safety and accuracy are paramount. Our calibration services ensure that critical measurement instruments perform reliably under challenging conditions.",
    challenges: [
      "Harsh operating environments",
      "Safety critical measurements",
      "Remote location access",
      "Hazardous area requirements",
      "Regulatory compliance (DPR, NUPRC)",
    ],
    solutions: [
      "Hazardous area certified equipment",
      "Mobile calibration units for remote sites",
      "SIL rated instrument calibration",
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
      "Port based mobile calibration units",
      "SOLAS compliant documentation",
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
      "High speed production line accuracy",
      "Temperature sensitive processes",
      "Hygiene and sanitation requirements",
    ],
    solutions: [
      "HACCP compliant calibration procedures",
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
      "High speed packaging line accuracy",
      "Weight and measure compliance",
      "Seal integrity verification",
      "Dimensional accuracy requirements",
      "Waste reduction goals",
    ],
    solutions: [
      "High precision weighing calibration",
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
  "food-beverage": {
    icon: UtensilsCrossed,
    name: "Food & Beverage",
    description: "The food and beverage industry demands precise control of temperature, pressure, flow, and weight to ensure product safety, quality, and regulatory compliance. We help food manufacturers meet NAFDAC, HACCP, and ISO 22000 requirements.",
    challenges: [
      "Product safety and quality consistency",
      "NAFDAC and HACCP compliance",
      "Temperature sensitive processing and cold chain",
      "High speed production line accuracy",
      "Hygiene and sanitation requirements",
    ],
    solutions: [
      "HACCP compliant calibration procedures",
      "Sanitary design compatible calibration equipment",
      "Minimal production disruption scheduling",
      "Cold chain temperature mapping",
      "Comprehensive traceability documentation",
    ],
    services: [
      "Temperature monitoring system calibration",
      "Flow meter calibration",
      "pH and conductivity meters",
      "Filling and packaging line instruments",
      "Weighing and checkweigher calibration",
      "Pressure gauge calibration",
    ],
    equipment: [
      "Temperature sensors and controllers",
      "Magnetic and mass flow meters",
      "pH meters and conductivity meters",
      "Brix refractometers",
      "Check weighers",
      "Pressure transmitters",
      "Filling machine sensors",
      "Cold room temperature loggers",
    ],
    regulations: ["NAFDAC Regulations", "HACCP", "ISO 22000", "FSSC 22000", "SON Standards"],
    caseStudy: {
      title: "Leading Beverage Manufacturer",
      description: "Implemented calibration program for 5 production lines with 300+ instruments across temperature, flow, and weighing systems.",
      result: "Reduced product quality deviations by 60% and achieved FSSC 22000 certification.",
    },
    color: "bg-green-500",
  },
  "power-energy": {
    icon: Zap,
    name: "Power & Energy",
    description: "Power generation and energy facilities rely on precise instrumentation for safe, efficient, and compliant operations. We provide calibration, maintenance, and engineering services that keep power plants and energy assets running reliably.",
    challenges: [
      "High stakes safety critical measurements",
      "Compliance with NERC and regulatory bodies",
      "Continuous operation requirements and planned outage windows",
      "Wide range of electrical and mechanical instrumentation",
      "Ageing infrastructure and equipment reliability",
    ],
    solutions: [
      "Scheduled calibration during planned outages",
      "On site mobile calibration units",
      "Certified calibration for high voltage instruments",
      "Preventive maintenance programs",
      "Emergency support and rapid response",
    ],
    services: [
      "Electrical instrument calibration",
      "Pressure and temperature calibration",
      "Flow measurement systems",
      "Generator and turbine instrumentation",
      "Preventive maintenance programs",
      "Engineering and installation services",
    ],
    equipment: [
      "Power meters and energy analyzers",
      "Current and voltage transformers",
      "Temperature and pressure transmitters",
      "Flow meters (steam, water, gas)",
      "Level sensors and gauges",
      "Vibration monitoring equipment",
      "Control panels and PLCs",
      "Protection relays",
    ],
    regulations: ["NERC Standards", "IEC 61850", "ISO 9001", "NEPA/TCN Guidelines", "IEEE Standards"],
    caseStudy: {
      title: "Power Generation Facility",
      description: "Provided comprehensive calibration and maintenance services for a 220 MW power plant during scheduled outage.",
      result: "All instruments certified within outage window; plant returned to full generation capacity on schedule.",
    },
    color: "bg-yellow-500",
  },
  chemical: {
    icon: Beaker,
    name: "Chemical Processing",
    description: "Chemical processing plants operate under demanding conditions with strict safety and quality requirements. We provide calibration and technical services that support safe plant operations, regulatory compliance, and process efficiency.",
    challenges: [
      "Hazardous and corrosive process environments",
      "Strict health, safety, and environmental (HSE) compliance",
      "Process accuracy critical for yield and quality",
      "Wide temperature and pressure ranges",
      "Risk management and functional safety requirements",
    ],
    solutions: [
      "Hazardous area rated calibration equipment",
      "SIL capable instrument calibration",
      "On site calibration to minimize plant disruption",
      "Comprehensive safety documentation",
      "Preventive maintenance programs",
    ],
    services: [
      "Process instrument calibration",
      "Safety instrumented system (SIS) calibration",
      "Temperature and pressure measurement",
      "Flow and level instrument calibration",
      "Analyzer maintenance and calibration",
      "Engineering and maintenance services",
    ],
    equipment: [
      "Pressure transmitters and gauges (high pressure)",
      "Temperature sensors (RTDs, thermocouples)",
      "Chemical flow meters",
      "Level transmitters",
      "Gas and chemical analyzers",
      "Control valves and positioners",
      "Safety relief valves",
      "pH and conductivity analyzers",
    ],
    regulations: ["ISO 9001", "IEC 61511 (Functional Safety)", "OSHA PSM", "DPR Regulations", "ISO 14001"],
    caseStudy: {
      title: "Chemical Manufacturing Plant",
      description: "Delivered calibration and SIS verification services for a specialty chemical production facility during annual turnaround.",
      result: "100% instrument certification achieved within turnaround schedule; zero HSE incidents recorded.",
    },
    color: "bg-purple-500",
  },
  "engineering-construction": {
    icon: Factory,
    name: "Engineering & Construction",
    description: "Supporting engineering and construction projects with precise instrumentation, calibration, and technical services from groundbreak to commissioning.",
    challenges: [
      "Ensuring instrument accuracy during installation and commissioning",
      "Coordinating calibration across multiple subcontractors and phases",
      "Compliance with project specification and client standards",
      "Managing tight construction and handover timelines",
      "Commissioning readiness and punch list clearance",
    ],
    solutions: [
      "Pre commissioning calibration and loop checks",
      "On site calibration during installation phase",
      "Commissioning support and instrument verification",
      "Comprehensive documentation for project handover",
      "Flexible scheduling aligned with construction milestones",
    ],
    services: [
      "Instrument installation support",
      "Pre commissioning calibration",
      "Loop checking and verification",
      "Commissioning and start up support",
      "Procurement of instrumentation",
      "Engineering project management",
    ],
    equipment: [
      "Pressure transmitters and gauges",
      "Temperature sensors and thermocouples",
      "Flow meters",
      "Level instruments",
      "Control valves and positioners",
      "Junction boxes and field panels",
      "Safety systems and detectors",
      "PLCs and DCS components",
    ],
    regulations: ["ISO 9001", "IEC 61508", "Client Project Specifications", "SON Standards", "COREN Guidelines"],
    caseStudy: {
      title: "Industrial Plant Commissioning",
      description: "Provided full instrument calibration and commissioning support for a greenfield industrial facility across 12 months of construction.",
      result: "All instruments commissioned on schedule; project handover documentation accepted without exceptions.",
    },
    color: "bg-orange-500",
  },
  fmcg: {
    icon: Package,
    name: "FMCG",
    description: "Helping fast moving consumer goods manufacturers maintain production accuracy, product safety, and regulatory compliance through precise calibration and quality services.",
    challenges: [
      "High volume production requiring consistent measurement accuracy",
      "NAFDAC and product safety compliance",
      "Short calibration windows within continuous production schedules",
      "Weight, fill, and packaging accuracy demands",
      "Shelf life and quality control requirements",
    ],
    solutions: [
      "Scheduled calibration during planned shutdowns",
      "Minimal disruption on site calibration services",
      "NAFDAC compliant documentation packages",
      "Weighing and filling equipment calibration",
      "Quality assurance and inspection support",
    ],
    services: [
      "Production instrument calibration",
      "Weighing and check weigher calibration",
      "Temperature and flow meter calibration",
      "Quality inspection services",
      "Preventive maintenance programs",
      "ISO 9001 QMS support",
    ],
    equipment: [
      "Check weighers and platform scales",
      "Temperature controllers and sensors",
      "Flow meters (magnetic and mass)",
      "Filling machine sensors",
      "Pressure transmitters",
      "pH and conductivity meters",
      "Humidity and environmental monitors",
      "Packaging line instruments",
    ],
    regulations: ["NAFDAC Regulations", "ISO 22000", "FSSC 22000", "ISO 9001", "SON Standards"],
    caseStudy: {
      title: "Consumer Goods Manufacturer",
      description: "Implemented a scheduled calibration program covering 400 instruments across 6 FMCG production lines.",
      result: "Achieved consistent fill weight accuracy and passed NAFDAC product quality audit with zero calibration related findings.",
    },
    color: "bg-pink-500",
  },
  "logistics-warehousing": {
    icon: Package,
    name: "Logistics & Warehousing",
    description: "Supporting logistics and warehousing operations with accurate weighing, temperature monitoring, and measurement services that ensure compliance and operational efficiency.",
    challenges: [
      "Accurate cargo weighing and weight compliance",
      "Cold chain temperature monitoring and documentation",
      "Regulatory and customs compliance requirements",
      "High throughput operations with minimal disruption tolerance",
      "Equipment reliability across large warehouse environments",
    ],
    solutions: [
      "Weighbridge and platform scale calibration",
      "Cold chain temperature logger verification",
      "On site calibration with minimal operational disruption",
      "Compliance documentation for regulatory bodies",
      "Preventive maintenance for warehouse equipment",
    ],
    services: [
      "Weighbridge calibration",
      "Platform and bench scale calibration",
      "Temperature logger and sensor verification",
      "Cold room temperature mapping",
      "Forklift scale calibration",
      "Preventive maintenance programs",
    ],
    equipment: [
      "Weighbridges",
      "Platform scales and bench scales",
      "Temperature loggers and data loggers",
      "Cold room temperature sensors",
      "Barcode and dimensional scanners",
      "Humidity and environmental monitors",
      "Forklift mounted scales",
      "Conveyor belt weighers",
    ],
    regulations: ["Weights and Measures Act", "NAFDAC Cold Chain Requirements", "ISO 9001", "Customs Regulations"],
    caseStudy: {
      title: "Regional Distribution Centre",
      description: "Calibrated weighbridges, platform scales, and cold room temperature monitoring systems across a major logistics hub.",
      result: "Full compliance achieved with customs weight requirements and cold chain integrity maintained across all temperature zones.",
    },
    color: "bg-teal-500",
  },
  "government-agencies": {
    icon: Zap,
    name: "Government Agencies",
    description: "Providing calibration, technical consultancy, procurement, and quality assurance services to government agencies, parastatals, and public institutions across Nigeria.",
    challenges: [
      "Compliance with public procurement and regulatory requirements",
      "Equipment reliability for public service delivery",
      "Budget constraints with quality expectations",
      "Documentation and audit trail requirements",
      "Diverse instrumentation across multiple locations",
    ],
    solutions: [
      "Compliant procurement and supply chain services",
      "Cost effective calibration programs",
      "Comprehensive audit ready documentation",
      "On site service across multiple government locations",
      "ISO 9001 quality management support",
    ],
    services: [
      "Laboratory instrument calibration",
      "Government procurement support",
      "Quality assurance and audit support",
      "Technical consultancy",
      "Training and capacity development",
      "Equipment maintenance programs",
    ],
    equipment: [
      "Laboratory analytical instruments",
      "Weighing and measuring equipment",
      "Environmental monitoring systems",
      "Medical and health equipment",
      "Electrical test equipment",
      "Process control instruments",
      "Safety and emergency equipment",
      "Workshop and field instruments",
    ],
    regulations: ["Public Procurement Act", "ISO 9001", "SON Standards", "NAFDAC Guidelines", "Relevant Ministry Regulations"],
    caseStudy: {
      title: "Government Laboratory",
      description: "Supplied, installed, and calibrated laboratory instruments for a state government analytical laboratory.",
      result: "Laboratory accreditation achieved; all instruments traceable to national standards with full documentation.",
    },
    color: "bg-indigo-500",
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
