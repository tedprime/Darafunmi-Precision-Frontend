import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  CheckCircle2,
  Target,
  Award,
  Users,
  Clock,
  Shield,
  Wrench,
  GraduationCap,
  Microscope,
  Factory,
  Droplets,
  Ship,
  Package,
  Pill,
  Star,
  Quote,
  Phone,
  ChevronRight,
  Calendar,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

// Demo data for testimonials
const testimonials = [
  {
    id: 1,
    customerName: "Dr. Adebayo Johnson",
    customerTitle: "Quality Assurance Director",
    companyName: "PharmaCare Nigeria Ltd",
    industry: "Pharmaceutical",
    content: "Darafunmi Precision Technologies has been our trusted calibration partner for over 5 years. Their attention to detail and commitment to ISO standards is exceptional.",
    rating: 5,
  },
  {
    id: 2,
    customerName: "Engr. Chioma Okafor",
    customerTitle: "Plant Manager",
    companyName: "Nigerian Bottling Company",
    industry: "Beverages",
    content: "The team's expertise in process control instruments has significantly improved our production efficiency. Highly recommended for any manufacturing facility.",
    rating: 5,
  },
  {
    id: 3,
    customerName: "Mr. Ibrahim Hassan",
    customerTitle: "HSE Manager",
    companyName: "Total E&P Nigeria",
    industry: "Oil and Gas",
    content: "Their on-site calibration services have minimized our equipment downtime. Professional, reliable, and always on schedule.",
    rating: 5,
  },
];

// Demo services
const services = [
  {
    icon: Microscope,
    title: "Calibration Services",
    description: "ISO-compliant calibration of laboratory and medical equipment with traceable standards",
    href: "/services/calibration",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repair",
    description: "Comprehensive maintenance and repair services for process analytical instruments",
    href: "/services/maintenance",
  },
  {
    icon: GraduationCap,
    title: "Training Programs",
    description: "Technical training for equipment operation and calibration procedures",
    href: "/services/training",
  },
  {
    icon: Target,
    title: "Consulting Services",
    description: "Process optimization and compliance consulting for various industries",
    href: "/services/consulting",
  },
];

// Industries served
const industries = [
  { icon: Pill, name: "Pharmaceutical", href: "/industries/pharmaceutical", color: "bg-blue-500" },
  { icon: Factory, name: "Manufacturing", href: "/industries/manufacturing", color: "bg-gray-500" },
  { icon: Droplets, name: "Oil and Gas", href: "/industries/oil-and-gas", color: "bg-amber-500" },
  { icon: Ship, name: "Marine", href: "/industries/marine", color: "bg-cyan-500" },
  { icon: Package, name: "Beverages", href: "/industries/beverages", color: "bg-green-500" },
  { icon: Package, name: "Packaging", href: "/industries/packaging", color: "bg-purple-500" },
];

// Stats
const stats = [
  { value: "18+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100+", label: "Happy Clients" },
  { value: "99%", label: "Client Satisfaction" },
];

export default function Home() {
  const { data: blogPosts } = useQuery({
    queryKey: ["blog", "list", 3],
    queryFn: () => api.get("/blog", { params: { limit: 3, status: "published" } }).then((r) => r.data?.data ?? r.data),
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden gradient-hero">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiMxRTNBOEEiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
          <div className="container relative py-24 md:py-32 lg:py-40">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge variant="secondary" className="text-sm px-4 py-1">
                  Established Since 2006
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  Precision in Every{" "}
                  <span className="text-primary">Measurement</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Process Control Engineers & Calibration Contractors delivering 
                  <strong className="text-foreground"> accuracy, effectiveness, and competency</strong> across 
                  Nigeria's leading industries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/quote">
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      Request a Quote
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button size="lg" variant="outline">
                      Explore Services
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">ISO Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Quick Turnaround</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Expert Team</span>
                  </div>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute -inset-4 bg-primary/10 rounded-3xl transform rotate-3" />
                <div className="relative bg-card rounded-2xl shadow-2xl p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop" 
                    alt="Calibration Equipment"
                    className="rounded-lg w-full h-64 object-cover"
                  />
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Our Services</Badge>
              <h2 className="section-title">Comprehensive Calibration Solutions</h2>
              <p className="section-subtitle mx-auto">
                From laboratory equipment to industrial instruments, we provide end-to-end 
                calibration and maintenance services tailored to your industry needs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Link key={index} href={service.href}>
                  <Card className="h-full card-hover cursor-pointer group">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                      <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Learn More <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/services">
                <Button variant="outline" size="lg">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Industries We Serve</Badge>
              <h2 className="section-title">Trusted Across Multiple Sectors</h2>
              <p className="section-subtitle mx-auto">
                Our expertise spans across diverse industries, providing specialized 
                calibration solutions that meet sector-specific requirements.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {industries.map((industry, index) => (
                <Link key={index} href={industry.href}>
                  <Card className="h-full card-hover cursor-pointer text-center py-8 group">
                    <CardContent className="p-0">
                      <div className={`w-16 h-16 rounded-full ${industry.color} mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <industry.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-medium text-foreground">{industry.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section gradient-primary text-primary-foreground">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Your Trusted Partner in Precision Engineering
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  With nearly two decades of experience, Darafunmi Precision Technologies 
                  has established itself as a leader in calibration services across Nigeria.
                </p>
                <div className="space-y-4">
                  {[
                    "ISO-compliant calibration with traceable standards",
                    "Experienced team of certified engineers",
                    "Quick turnaround time with minimal downtime",
                    "Comprehensive documentation and reporting",
                    "On-site and laboratory calibration options",
                    "Competitive pricing with transparent quotes",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/about">
                    <Button variant="secondary" size="lg">
                      Learn More About Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 text-center p-8">
                    <CardContent className="p-0">
                      <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-primary-foreground/80">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Testimonials</Badge>
              <h2 className="section-title">What Our Clients Say</h2>
              <p className="section-subtitle mx-auto">
                Don't just take our word for it. Here's what industry leaders 
                have to say about our services.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="relative">
                  <CardContent className="pt-8">
                    <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/20" />
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.customerName}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.customerTitle}
                        </div>
                        <div className="text-sm text-primary">{testimonial.companyName}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section gradient-cta text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Our team of experts 
              is ready to help you achieve precision in every measurement.
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
          </div>
        </section>

        {/* Blog Preview Section */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Latest News</Badge>
              <h2 className="section-title">From Our Blog</h2>
              <p className="section-subtitle mx-auto">
                Stay updated with the latest industry news, tips, and company updates.
              </p>
            </div>

            {/* Loading */}
            {!blogPosts && (
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="h-48 bg-muted" />
                    <CardHeader>
                      <div className="h-4 w-24 bg-muted rounded mb-2" />
                      <div className="h-5 w-full bg-muted rounded" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 w-full bg-muted rounded mb-2" />
                      <div className="h-4 w-3/4 bg-muted rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Posts */}
            {blogPosts && blogPosts.length > 0 && (
              <div className="grid md:grid-cols-3 gap-8">
                {blogPosts.map((post: any) => (
                  <Card key={post.id} className="card-hover overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      {post.featuredImage ?? post.imageUrl ? (
                        <img
                          src={post.featuredImage ?? post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {typeof post.author === "object" ? post.author?.name : post.author}
                        </span>
                        <Link href={`/blog/${post.slug ?? post.id}`}>
                          <Button variant="link" className="px-0">
                            Read More <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty state */}
            {blogPosts && blogPosts.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No blog posts available yet.</p>
            )}

            <div className="text-center mt-12">
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  View All Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
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