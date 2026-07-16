import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Shield,
  CheckCircle2,
  Award,
  ArrowRight,
  Users,
  Target,
  Wrench,
  MessageCircle,
  BarChart3,
  RefreshCw,
} from "lucide-react";

const commitments = [
  {
    icon: Users,
    text: "Employing competent, skilled, and continually trained personnel.",
  },
  {
    icon: Wrench,
    text: "Utilizing appropriate technologies, calibrated standards, and industry best practices.",
  },
  {
    icon: CheckCircle2,
    text: "Delivering services that meet agreed quality, safety, and turnaround time requirements.",
  },
  {
    icon: MessageCircle,
    text: "Understanding and exceeding customer expectations through effective communication and responsive support.",
  },
  {
    icon: Target,
    text: "Maintaining mutually beneficial relationships with customers, suppliers, and other interested parties.",
  },
  {
    icon: BarChart3,
    text: "Identifying and managing risks and opportunities that may impact service quality and customer satisfaction.",
  },
  {
    icon: RefreshCw,
    text: "Continually improving the effectiveness of our Quality Management System in accordance with the requirements of ISO 9001:2015.",
  },
];

export default function QualityPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative gradient-hero py-20 md:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">Quality Policy</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Our Commitment to <span className="text-primary">Quality</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Quality is not a department at Darafunmi Precision Technologies — it is
                the responsibility of every person in our organisation, embedded in
                everything we do.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services">
                  <Button size="lg">
                    Our Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Statement */}
        <section className="section">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Policy Statement</Badge>
              <h2 className="section-title">Quality Policy Statement</h2>
            </div>

            <Card className="border-l-4 border-l-primary mb-12">
              <CardContent className="p-8 md:p-10">
                <div className="flex gap-5">
                  <Shield className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg leading-relaxed text-foreground">
                    Darafunmi Precision Technologies Ltd. is committed to providing
                    accurate, reliable, and cost-effective calibration, maintenance,
                    repair, laboratory equipment supply, installation, commissioning,
                    and after-sales support services that consistently meet customer,
                    statutory, and regulatory requirements.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Commitments */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-2 text-center">
                We are dedicated to achieving excellence in service delivery through:
              </h3>
              <p className="text-center text-muted-foreground mb-8">
                Seven core commitments guide how we operate and deliver every service.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {commitments.map((item, i) => (
                  <Card key={i} className="group hover:border-primary transition-colors">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <item.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                        {item.text}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Signature block */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 md:p-10 text-center">
                <Award className="h-12 w-12 mx-auto mb-6 text-secondary" />
                <blockquote className="text-2xl font-bold italic mb-4">
                  "Quality is our commitment; Customer Satisfaction is our success."
                </blockquote>
                <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                  Management and employees at all levels are committed to implementing
                  this Quality Policy and ensuring that quality remains the responsibility
                  of everyone within the organisation.
                </p>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="font-semibold">Managing Director</p>
                  <p className="text-primary-foreground/70 text-sm mt-1">
                    Darafunmi Precision Technologies Ltd.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ISO 9001:2015 callout */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
              <div className="p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">ISO 9001:2015</h3>
                <p className="text-muted-foreground text-sm">
                  Our Quality Management System aligns with the requirements of ISO 9001:2015,
                  ensuring consistent and auditable processes.
                </p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                  <RefreshCw className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Continual Improvement</h3>
                <p className="text-muted-foreground text-sm">
                  We regularly review and improve our processes, using data, audits, and
                  customer feedback to raise our performance bar.
                </p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Regulatory Compliance</h3>
                <p className="text-muted-foreground text-sm">
                  All our services meet applicable statutory, regulatory, and customer
                  requirements across every industry we serve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section gradient-cta text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience Quality First-hand
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your calibration and technical service needs.
              Our team upholds this quality commitment on every engagement.
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
