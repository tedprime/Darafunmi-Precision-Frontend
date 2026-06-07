import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  FileText,
  CheckCircle2,
  Clock,
  Shield,
  Phone,
  Mail,
} from "lucide-react";

const serviceTypes = [
  "Calibration Services",
  "Equipment Maintenance",
  "Equipment Repair",
  "Training Programs",
  "Consulting Services",
  "Product Purchase",
  "Other",
];

const industries = [
  "Oil & Gas",
  "Pharmaceutical",
  "Manufacturing",
  "Healthcare",
  "Food & Beverage",
  "Environmental",
  "Research & Development",
  "Other",
];

export default function Quote() {
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState("");
  
  const [formData, setFormData] = useState({
    serviceType: "",
    industry: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    companyName: "",
    equipmentType: "",
    quantity: "",
    urgency: "",
    budget: "",
    description: "",
    acceptTerms: false,
  });

  const createQuoteMutation = useMutation({
    mutationFn: (data: unknown) =>
      api.post("/quote-requests", data).then((r) => r.data?.data ?? r.data),
    onSuccess: (data) => {
      setQuoteNumber(data.quoteNumber);
      setSubmitted(true);
      toast.success("Quote request submitted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit quote request");
    },
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    createQuoteMutation.mutate({
      serviceType: formData.serviceType || undefined,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone || undefined,
      companyName: formData.companyName || undefined,
      industry: formData.industry || undefined,
      equipmentType: formData.equipmentType || undefined,
      quantity: formData.quantity ? parseInt(formData.quantity) : undefined,
      budget: formData.budget || undefined,
      urgency: formData.urgency || undefined,
      description: formData.description || undefined,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <Card className="max-w-lg w-full mx-4 text-center">
            <CardContent className="p-12">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Quote Request Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for your interest. Our team will review your request and 
                get back to you within 24-48 hours.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">Reference Number</p>
                <p className="text-xl font-bold text-primary">{quoteNumber}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button variant="outline">Back to Home</Button>
                </Link>
                <Link href="/services">
                  <Button>Explore Services</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-hero py-16 md:py-20">
          <div className="container">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">Get a Quote</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Request a <span className="text-primary">Free Quote</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Tell us about your requirements and receive a customized quote 
                tailored to your specific needs.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section className="section">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quote Request Form</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you with a detailed quote.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Service Details */}
                      <div className="space-y-4">
                        <h3 className="font-semibold">Service Details</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="serviceType">Service Type *</Label>
                            <Select
                              value={formData.serviceType}
                              onValueChange={(value) => handleChange("serviceType", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select service" />
                              </SelectTrigger>
                              <SelectContent>
                                {serviceTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Select
                              value={formData.industry}
                              onValueChange={(value) => handleChange("industry", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                              <SelectContent>
                                {industries.map((ind) => (
                                  <SelectItem key={ind} value={ind}>
                                    {ind}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="equipmentType">Equipment Type</Label>
                            <Input
                              id="equipmentType"
                              placeholder="e.g., Pressure Gauges, Temperature Sensors"
                              value={formData.equipmentType}
                              onChange={(e) => handleChange("equipmentType", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                              id="quantity"
                              type="number"
                              placeholder="Number of items"
                              value={formData.quantity}
                              onChange={(e) => handleChange("quantity", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="urgency">Urgency</Label>
                            <Select
                              value={formData.urgency}
                              onValueChange={(value) => handleChange("urgency", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select urgency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low — standard timeline</SelectItem>
                                <SelectItem value="medium">Medium — priority</SelectItem>
                                <SelectItem value="high">High — urgent (24 hrs)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="budget">Budget Range</Label>
                            <Select
                              value={formData.budget}
                              onValueChange={(value) => handleChange("budget", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="under-100k">Under ₦100,000</SelectItem>
                                <SelectItem value="100k-500k">₦100,000 - ₦500,000</SelectItem>
                                <SelectItem value="500k-1m">₦500,000 - ₦1,000,000</SelectItem>
                                <SelectItem value="over-1m">Over ₦1,000,000</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-4 pt-6 border-t">
                        <h3 className="font-semibold">Contact Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="customerName">Full Name *</Label>
                            <Input
                              id="customerName"
                              placeholder="John Doe"
                              value={formData.customerName}
                              onChange={(e) => handleChange("customerName", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="customerEmail">Email Address *</Label>
                            <Input
                              id="customerEmail"
                              type="email"
                              placeholder="john@example.com"
                              value={formData.customerEmail}
                              onChange={(e) => handleChange("customerEmail", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="customerPhone">Phone Number</Label>
                            <Input
                              id="customerPhone"
                              placeholder="+234 xxx xxx xxxx"
                              value={formData.customerPhone}
                              onChange={(e) => handleChange("customerPhone", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input
                              id="companyName"
                              placeholder="Your Company"
                              value={formData.companyName}
                              onChange={(e) => handleChange("companyName", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Additional Details */}
                      <div className="space-y-4 pt-6 border-t">
                        <h3 className="font-semibold">Additional Details</h3>
                        <div className="space-y-2">
                          <Label htmlFor="description">Project Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Please provide any additional details about your requirements..."
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            rows={5}
                          />
                        </div>
                      </div>

                      {/* Terms */}
                      <div className="flex items-start space-x-2 pt-4">
                        <Checkbox
                          id="acceptTerms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => handleChange("acceptTerms", checked as boolean)}
                        />
                        <label htmlFor="acceptTerms" className="text-sm text-muted-foreground">
                          I agree to the terms and conditions and consent to being contacted 
                          regarding this quote request.
                        </label>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={createQuoteMutation.isPending}
                      >
                        {createQuoteMutation.isPending ? "Submitting..." : "Submit Quote Request"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Why Choose Us?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">ISO Certified</p>
                          <p className="text-sm text-muted-foreground">
                            Accredited calibration services
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Fast Turnaround</p>
                          <p className="text-sm text-muted-foreground">
                            Quick response and service delivery
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Quality Guaranteed</p>
                          <p className="text-sm text-muted-foreground">
                            Traceable to national standards
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Need Help?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our team is ready to assist you with any questions.
                    </p>
                    <div className="space-y-3">
                      <a href="tel:+2348034680544" className="flex items-center gap-2 text-sm hover:text-primary">
                        <Phone className="h-4 w-4" />
                        +234 803 468 0544
                      </a>
                      <a href="mailto:info@darafunmiprecision.com" className="flex items-center gap-2 text-sm hover:text-primary">
                        <Mail className="h-4 w-4" />
                        info@darafunmiprecision.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-cta text-white">
                  <CardContent className="p-6">
                    <FileText className="h-8 w-8 mb-4" />
                    <h3 className="font-semibold mb-2">Response Time</h3>
                    <p className="text-sm text-white/80">
                      We typically respond to quote requests within 24-48 business hours.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}