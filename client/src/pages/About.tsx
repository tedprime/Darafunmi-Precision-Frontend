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
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  Linkedin,
  Mail,
} from "lucide-react";

// Company milestones
const milestones = [
  { year: "2006", title: "Company Founded", description: "Darafunmi Precision Technologies established in Ogun State, Nigeria" },
  { year: "2008", title: "First Major Contract", description: "Secured calibration contract with leading pharmaceutical company" },
  { year: "2012", title: "ISO Certification", description: "Achieved ISO 17025 accreditation for calibration services" },
  { year: "2015", title: "Expanded Services", description: "Added training programs and consulting services" },
  { year: "2018", title: "Regional Expansion", description: "Extended operations across West Africa" },
  { year: "2020", title: "Digital Transformation", description: "Launched online booking and customer portal" },
  { year: "2024", title: "Industry Leadership", description: "Recognized as leading calibration service provider in Nigeria" },
];

// Fallback team members shown while API loads or if DB is empty
const fallbackTeam = [
  { id: 1, name: "Funminiyi Daranijo", title: "Founder & CEO",               bio: "With over 20 years of experience in process control engineering, Funminiyi founded Darafunmi Precision Technologies with a vision to provide world-class calibration services in Nigeria.", imageUrl: null, linkedIn: null, email: null },
  { id: 2, name: "Dr. Adaeze Nwosu",   title: "Technical Director",          bio: "PhD in Instrumentation Engineering with expertise in laboratory equipment calibration and quality management systems.", imageUrl: null, linkedIn: null, email: null },
  { id: 3, name: "Engr. Oluwaseun Adeyemi", title: "Operations Manager",     bio: "Certified calibration specialist with 15 years of experience in industrial process control and maintenance.", imageUrl: null, linkedIn: null, email: null },
  { id: 4, name: "Mrs. Chidinma Okonkwo",   title: "Quality Assurance Manager", bio: "ISO lead auditor with extensive experience in implementing quality management systems across various industries.", imageUrl: null, linkedIn: null, email: null },
];

// Certifications
const certifications = [
  { name: "ISO 17025", description: "Accreditation for calibration laboratories", issuer: "SON" },
  { name: "ISO 9001:2015", description: "Quality Management System certification", issuer: "Bureau Veritas" },
  { name: "COREN", description: "Council for Regulation of Engineering in Nigeria", issuer: "COREN" },
  { name: "NSE", description: "Nigerian Society of Engineers membership", issuer: "NSE" },
];

// Core values
const values = [
  { icon: Target, title: "Accuracy", description: "We deliver precise measurements that you can trust" },
  { icon: Award, title: "Effectiveness", description: "Our solutions are designed to maximize your operational efficiency" },
  { icon: Users, title: "Competency", description: "Our team comprises certified professionals with extensive experience" },
  { icon: Heart, title: "Integrity", description: "We maintain the highest ethical standards in all our dealings" },
];

const TeamSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    {[1, 2, 3, 4].map((i) => (
      <Card key={i} className="text-center animate-pulse">
        <CardContent className="pt-8">
          <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4" />
          <div className="h-5 w-32 bg-muted rounded mx-auto mb-2" />
          <div className="h-4 w-24 bg-muted rounded mx-auto mb-4" />
          <div className="h-3 w-full bg-muted rounded mb-2" />
          <div className="h-3 w-3/4 bg-muted rounded mx-auto" />
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function About() {
  const { data: teamData, isLoading: teamLoading } = useQuery({
    queryKey: ["team", "public"],
    queryFn: () => api.get("/team").then((r) => r.data?.data ?? r.data ?? []),
    staleTime: 1000 * 60 * 10,
  });

  const teamMembers = (teamData && teamData.length > 0) ? teamData : fallbackTeam;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-hero py-20 md:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">About Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Precision Engineering Since <span className="text-primary">2006</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Darafunmi Precision Technologies Ltd is a leading process control engineering 
                and calibration services company, committed to delivering accuracy, effectiveness, 
                and competency across Nigeria's key industries.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="pt-8">
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To provide world-class calibration and process control services that ensure 
                    our clients achieve optimal equipment performance, regulatory compliance, 
                    and operational excellence.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-secondary" />
                <CardContent className="pt-8">
                  <Eye className="h-12 w-12 text-secondary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be the most trusted and preferred calibration and process control 
                    partner across Africa, setting the standard for precision, reliability, 
                    and customer satisfaction.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
                <CardContent className="pt-8">
                  <Heart className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Our Promise</h3>
                  <p className="text-muted-foreground">
                    We promise to deliver accurate, timely, and cost-effective services 
                    while maintaining the highest standards of professionalism and 
                    technical excellence.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Core Values */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Our Values</Badge>
              <h2 className="section-title">What Drives Us</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company History Timeline */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Our Journey</Badge>
              <h2 className="section-title">Company Milestones</h2>
              <p className="section-subtitle mx-auto">
                From humble beginnings to industry leadership, here's our story.
              </p>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border hidden md:block" />
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <Card className="inline-block">
                        <CardContent className="p-6">
                          <div className="text-primary font-bold text-2xl mb-2">{milestone.year}</div>
                          <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground text-sm">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Our Team</Badge>
              <h2 className="section-title">Meet Our Experts</h2>
              <p className="section-subtitle mx-auto">
                Our team of certified professionals brings decades of combined experience 
                in calibration and process control engineering.
              </p>
            </div>
            {teamLoading ? (
              <TeamSkeleton />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member: any) => (
                  <Card key={member.id} className="text-center card-hover flex flex-col">
                    <CardContent className="pt-8 flex flex-col flex-1">
                      {member.imageUrl ? (
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                          onError={(e) => {
                            const el = e.currentTarget as HTMLImageElement;
                            el.style.display = "none";
                            el.nextElementSibling?.classList.remove("hidden");
                          }}
                        />
                      ) : null}
                      <div className={`w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4 ${member.imageUrl ? "hidden" : ""}`}>
                        <Users className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-primary text-sm mb-3">{member.title}</p>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-4 flex-1">{member.bio}</p>
                      {(member.linkedIn || member.email) && (
                        <div className="flex justify-center gap-2 mt-auto">
                          {member.linkedIn && (
                            <a href={member.linkedIn} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon">
                                <Linkedin className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          {member.email && (
                            <a href={`mailto:${member.email}`}>
                              <Button variant="ghost" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Certifications */}
        <section className="section bg-primary text-primary-foreground">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Certifications</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Accreditations & Memberships
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                Our certifications demonstrate our commitment to quality and 
                adherence to international standards.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 mx-auto mb-4 text-secondary" />
                    <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                    <p className="text-primary-foreground/80 text-sm mb-2">{cert.description}</p>
                    <p className="text-secondary text-xs">Issued by {cert.issuer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Our Location</Badge>
                <h2 className="section-title">Visit Our Facility</h2>
                <p className="text-muted-foreground mb-6">
                  Our state-of-the-art calibration laboratory is located in Redemption Camp, 
                  Ogun State, Nigeria. We welcome visits from clients and partners.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">Redemption Camp, Ogun State, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 9:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Facilities</p>
                      <p className="text-muted-foreground">ISO-certified calibration laboratory</p>
                      <p className="text-muted-foreground">Training center with modern equipment</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/contact">
                    <Button>
                      Get Directions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-16 w-16 mx-auto mb-4" />
                  <p>Map Integration</p>
                  <p className="text-sm">Redemption Camp, Ogun State</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section gradient-cta text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who trust Darafunmi Precision Technologies 
              for their calibration and process control needs.
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
