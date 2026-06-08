import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  Phone,
  Microscope,
  Wrench,
  GraduationCap,
  Target,
} from "lucide-react";

// ─── Services with numeric IDs matching service_id DB column ──────
const services = [
  { id: 1, name: "Calibration Services",  icon: Microscope,    description: "ISO-compliant calibration for laboratory and medical equipment" },
  { id: 2, name: "Maintenance & Repair",   icon: Wrench,        description: "Comprehensive maintenance and repair services" },
  { id: 3, name: "Training Programs",      icon: GraduationCap, description: "Technical training for equipment operation" },
  { id: 4, name: "Consulting Services",    icon: Target,        description: "Process optimization and compliance consulting" },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM",
];

// ─── Payload uses DB column names (backend ignores Swagger aliases) ─
interface BookingPayload {
  serviceType?:      string;
  preferredDate:     string;
  scheduledTime?:    string;
  name:              string;
  email:             string;
  phone?:            string;
  company?:          string;
  serviceLocation?:  string;
  equipmentDetails?: string;
  notes?:            string;
}

export default function BookService() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    preferredDate:    "",
    scheduledTime:    "",
    name:             user?.name    ?? "",
    email:            user?.email   ?? "",
    phone:            user?.phone   ?? "",
    company:          user?.company ?? "",
    serviceLocation:  "",
    equipmentDetails: "",
    notes:            "",
  });

  const createBookingMutation = useMutation({
    mutationFn: (payload: BookingPayload) =>
      api.post("/bookings", payload).then((r) => r.data?.data ?? r.data),
    onSuccess: (data) => {
      toast.success("Booking submitted successfully!");
      navigate(`/booking-confirmation/${data.bookingNumber}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit booking");
    },
  });

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService)                          { toast.error("Please select a service"); return; }
    if (!formData.name || !formData.email) { toast.error("Name and email are required"); return; }
    if (!formData.preferredDate)                   { toast.error("Please select a preferred date"); return; }

    const selectedServiceName = services.find((s) => s.id === selectedService)?.name;
    createBookingMutation.mutate({
      serviceType:      selectedServiceName,
      preferredDate:    formData.preferredDate,
      scheduledTime:    formData.scheduledTime    || undefined,
      name:             formData.name,
      email:            formData.email,
      phone:            formData.phone            || undefined,
      company:          formData.company          || undefined,
      serviceLocation:  formData.serviceLocation  || undefined,
      equipmentDetails: formData.equipmentDetails || undefined,
      notes:            formData.notes            || undefined,
    });
  };

  const selectedServiceData = services.find((s) => s.id === selectedService);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative gradient-hero py-16 md:py-20">
          <div className="container">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">Book a Service</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Schedule Your <span className="text-primary">Service Appointment</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Book calibration, maintenance, training, or consulting services.
                Our team will confirm your appointment within 24 hours.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container max-w-4xl">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && <div className={`w-16 h-1 mx-2 ${step > s ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1 — Select Service */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Select a Service</h2>
                    <p className="text-muted-foreground">Choose the service you'd like to book</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <Card
                        key={service.id}
                        className={`cursor-pointer transition-all ${
                          selectedService === service.id
                            ? "ring-2 ring-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedService(service.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <service.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">{service.name}</h3>
                              <p className="text-sm text-muted-foreground">{service.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setStep(2)} disabled={!selectedService}>
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2 — Date & Time */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Choose a Date & Time</h2>
                    <p className="text-muted-foreground">Select your preferred appointment slot</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">
                        Preferred Date <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="preferredDate"
                          type="date"
                          className="pl-10"
                          value={formData.preferredDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => handleChange("preferredDate", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Time</Label>
                      <Select
                        value={formData.scheduledTime}
                        onValueChange={(v) => handleChange("scheduledTime", v)}
                      >
                        <SelectTrigger>
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Service Location</Label>
                    <Select
                      value={formData.serviceLocation}
                      onValueChange={(v) => handleChange("serviceLocation", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-site">On-Site (At Your Location)</SelectItem>
                        <SelectItem value="laboratory">Our Laboratory</SelectItem>
                        <SelectItem value="remote">Remote / Virtual (Training Only)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="equipmentDetails">Equipment Details</Label>
                    <Textarea
                      id="equipmentDetails"
                      placeholder="Describe the equipment to be serviced (type, model, quantity, etc.)"
                      value={formData.equipmentDetails}
                      onChange={(e) => handleChange("equipmentDetails", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requirements..."
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button type="button" onClick={() => setStep(3)} disabled={!formData.preferredDate}>
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3 — Contact Info */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Your Information</h2>
                    <p className="text-muted-foreground">Confirm your contact details</p>
                  </div>

                  {/* Summary */}
                  <Card className="bg-muted/30 mb-6">
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-4 text-sm">
                        {selectedServiceData && (
                          <div className="flex items-center gap-2">
                            <selectedServiceData.icon className="h-4 w-4 text-primary" />
                            <span>{selectedServiceData.name}</span>
                          </div>
                        )}
                        {formData.preferredDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{new Date(formData.preferredDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {formData.scheduledTime && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{formData.scheduledTime}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+234 xxx xxx xxxx"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Your organisation"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
                    <Button type="submit" disabled={createBookingMutation.isPending}>
                      {createBookingMutation.isPending ? "Submitting…" : "Submit Booking"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-muted/30">
          <div className="container">
            <Card className="gradient-cta text-white overflow-hidden">
              <CardContent className="p-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  For urgent service requests or questions, contact us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+2348034680544">
                    <Button size="lg" variant="secondary">
                      <Phone className="mr-2 h-5 w-5" />Call Now
                    </Button>
                  </a>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                      Contact Us
                    </Button>
                  </Link>
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