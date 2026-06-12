import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Send,
  MessageCircle,
} from "lucide-react";

const quickLinks = [
  { title: "About Us", href: "/about" },
  { title: "Our Services", href: "/services" },
  { title: "Products", href: "/products" },
  { title: "Case Studies", href: "/case-studies" },
  { title: "Blog", href: "/blog" },
  { title: "Contact Us", href: "/contact" },
];

const services = [
  { title: "Calibration Services", href: "/services/calibration" },
  { title: "Maintenance & Repair", href: "/services/maintenance" },
  { title: "Training Programs", href: "/services/training" },
  { title: "Consulting", href: "/services/consulting" },
];

const industries = [
  { title: "Pharmaceutical", href: "/industries/pharmaceutical" },
  { title: "Manufacturing", href: "/industries/manufacturing" },
  { title: "Oil and Gas", href: "/industries/oil-and-gas" },
  { title: "Marine", href: "/industries/marine" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [unsubEmail, setUnsubEmail] = useState("");
  const [showUnsub, setShowUnsub] = useState(false);
const { user } = useAuth();
  const subscribeMutation = useMutation({
    mutationFn: (data: { email: string; name?: string }) =>
      api.post("/newsletter/subscribe", data).then((r) => r.data?.data ?? r.data),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Successfully subscribed to our newsletter!");
        setEmail("");
      } else {
        toast.error(result.message || "Failed to subscribe");
      }
    },
    onError: () => {
      toast.error("Failed to subscribe. Please try again.");
    },
  });

  const unsubscribeMutation = useMutation({
    mutationFn: (email: string) =>
      api.post("/newsletter/unsubscribe", { email }).then((r) => r.data),
    onSuccess: () => {
      toast.success("You've been unsubscribed.");
      setUnsubEmail("");
      setShowUnsub(false);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to unsubscribe. Please try again.");
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) subscribeMutation.mutate({ email, name: user?.name });
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="bg-primary">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-primary-foreground/80">
                Stay updated with the latest industry news and company updates
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-80 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
                required
              />
              <Button
                type="submit"
                variant="secondary"
                disabled={subscribeMutation.isPending}
              >
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
                <span className="text-primary-foreground font-bold text-2xl">D</span>
              </div>
              <div>
                <span className="font-bold text-xl text-background">Darafunmi</span>
                <span className="block text-sm text-background/60">Precision Technologies Ltd</span>
              </div>
            </div>
            <p className="text-background/70 mb-6 max-w-sm">
              Process Control Engineers & Calibration Contractors. Delivering accuracy,
              effectiveness, and competency since 2006.
            </p>
            <div className="space-y-3">
              <a href="tel:+2348034680544" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                <Phone className="h-5 w-5 text-primary" />
                <span>+234 803 468 0544</span>
              </a>
              <a href="mailto:darafunmi2013@yahoo.com" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                <span>darafunmi2013@yahoo.com</span>
              </a>
              <a href="https://wa.me/12044308339" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                <MessageCircle className="h-5 w-5 text-green-500" />
                <span>WhatsApp: +1 204 430 8339</span>
              </a>
              <div className="flex items-start gap-3 text-background/70">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span>Redemption Camp, Ogun State, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-background">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href}>
                    <span className="text-background/70 hover:text-background transition-colors">
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-background">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.title}>
                  <Link href={service.href}>
                    <span className="text-background/70 hover:text-background transition-colors">
                      {service.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-background">Industries</h4>
            <ul className="space-y-3">
              {industries.map((industry) => (
                <li key={industry.title}>
                  <Link href={industry.href}>
                    <span className="text-background/70 hover:text-background transition-colors">
                      {industry.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-12 bg-background/20" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-background/60 text-sm text-center md:text-left">
            <p>© {new Date().getFullYear()} Darafunmi Precision Technologies Ltd. All rights reserved.</p>
            <p className="mt-1">Established April 2006</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-background/60 hover:text-background transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-background/60 hover:text-background transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-background/60 hover:text-background transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-background/60 hover:text-background transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-background/60 hover:text-background transition-colors" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
          </div>

          {/* Legal Links + Unsubscribe */}
          <div className="flex flex-col items-center md:items-end gap-3 text-sm">
            <div className="flex items-center gap-6">
              <Link href="/privacy">
                <span className="text-background/60 hover:text-background transition-colors">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-background/60 hover:text-background transition-colors">
                  Terms of Service
                </span>
              </Link>
              <button
                onClick={() => setShowUnsub((v) => !v)}
                className="text-background/60 hover:text-background transition-colors"
              >
                Unsubscribe
              </button>
            </div>

            {showUnsub && (
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={unsubEmail}
                  onChange={(e) => setUnsubEmail(e.target.value)}
                  className="w-52 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 h-8 text-sm"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={!unsubEmail || unsubscribeMutation.isPending}
                  onClick={() => unsubEmail && unsubscribeMutation.mutate(unsubEmail)}
                >
                  {unsubscribeMutation.isPending ? "…" : "Confirm"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => { setShowUnsub(false); setUnsubEmail(""); }}
                  className="text-background/60 hover:text-background"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}