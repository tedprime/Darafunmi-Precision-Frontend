import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FileText,
  Download,
  Video,
  BookOpen,
  Search,
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
} from "lucide-react";

const resourceCategories = [
  { id: "all", name: "All Resources" },
  { id: "guides", name: "Technical Guides" },
  { id: "whitepapers", name: "Whitepapers" },
  { id: "videos", name: "Videos" },
  { id: "case-studies", name: "Case Studies" },
];

const demoResources = [
  {
    id: 1,
    title: "Complete Guide to Instrument Calibration",
    description: "A comprehensive guide covering calibration principles, procedures, and best practices for various instrument types.",
    type: "guide",
    category: "guides",
    downloadUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop",
    readTime: "15 min read",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "ISO 17025 Compliance Whitepaper",
    description: "Understanding the requirements and implementation strategies for ISO 17025 accreditation in calibration laboratories.",
    type: "whitepaper",
    category: "whitepapers",
    downloadUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
    readTime: "25 min read",
    date: "2024-01-10",
  },
  {
    id: 3,
    title: "Pressure Calibration Techniques",
    description: "Video tutorial demonstrating proper pressure gauge calibration techniques and common pitfalls to avoid.",
    type: "video",
    category: "videos",
    downloadUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    readTime: "12 min watch",
    date: "2024-01-05",
  },
  {
    id: 4,
    title: "Temperature Sensor Selection Guide",
    description: "How to choose the right temperature sensor for your application, including RTDs, thermocouples, and thermistors.",
    type: "guide",
    category: "guides",
    downloadUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop",
    readTime: "10 min read",
    date: "2024-01-01",
  },
  {
    id: 5,
    title: "Oil & Gas Industry Case Study",
    description: "How we helped a major oil company reduce equipment downtime by 40% through predictive calibration scheduling.",
    type: "case-study",
    category: "case-studies",
    downloadUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400&h=250&fit=crop",
    readTime: "8 min read",
    date: "2023-12-20",
  },
  {
    id: 6,
    title: "Calibration Interval Optimization",
    description: "Whitepaper on data-driven approaches to optimizing calibration intervals while maintaining measurement accuracy.",
    type: "whitepaper",
    category: "whitepapers",
    downloadUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    readTime: "20 min read",
    date: "2023-12-15",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "video":
      return Video;
    case "whitepaper":
      return FileText;
    case "case-study":
      return BookOpen;
    default:
      return FileText;
  }
};

const getTypeBadgeColor = (type: string) => {
  switch (type) {
    case "video":
      return "bg-red-100 text-red-700";
    case "whitepaper":
      return "bg-blue-100 text-blue-700";
    case "case-study":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function Resources() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">Resources</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Knowledge <span className="text-primary">Center</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Access technical guides, whitepapers, videos, and case studies 
                to enhance your understanding of calibration and precision measurement.
              </p>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="section">
          <div className="container">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {resourceCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={category.id === "all" ? "default" : "outline"}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoResources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.type);
                return (
                  <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={resource.imageUrl}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className={`absolute top-3 left-3 ${getTypeBadgeColor(resource.type)}`}>
                        <TypeIcon className="h-3 w-3 mr-1" />
                        {resource.type.replace("-", " ")}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {resource.readTime}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        {resource.type === "video" ? "Watch" : "Download"}
                        <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Resources
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section bg-muted/30">
          <div className="container">
            <Card className="gradient-cta text-white overflow-hidden">
              <CardContent className="p-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter for the latest technical resources, 
                  industry insights, and calibration best practices.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Input
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button variant="secondary">
                    Subscribe
                  </Button>
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
