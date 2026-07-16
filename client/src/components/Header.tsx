import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/_core/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  Menu,
  Phone,
  Mail,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { title: "Calibration Services",        href: "/services/calibration",       description: "ISO-compliant calibration for laboratory and industrial equipment" },
  { title: "Maintenance & Repair",        href: "/services/maintenance",       description: "Preventive & predictive maintenance, equipment overhaul" },
  { title: "Engineering Services",        href: "/services/engineering",       description: "Equipment installation, plant maintenance, and troubleshooting" },
  { title: "Procurement & Supply Chain",  href: "/services/procurement",       description: "Industrial procurement, vendor development, and strategic sourcing" },
  { title: "Quality Assurance",           href: "/services/quality-assurance", description: "ISO implementation, internal audits, and compliance management" },
  { title: "Technical Consultancy",       href: "/services/consulting",        description: "Process optimization, operational excellence, and project management" },
  { title: "Training Programs",           href: "/services/training",          description: "Technical training for equipment operation and calibration" },
];

const industries = [
  { title: "Manufacturing",            href: "/industries/manufacturing"         },
  { title: "Oil & Gas",               href: "/industries/oil-and-gas"           },
  { title: "Pharmaceutical",          href: "/industries/pharmaceutical"        },
  { title: "Food & Beverage",         href: "/industries/food-beverage"         },
  { title: "Power & Energy",          href: "/industries/power-energy"          },
  { title: "Chemical Processing",     href: "/industries/chemical"              },
  { title: "Engineering & Construction", href: "/industries/engineering-construction" },
  { title: "FMCG",                    href: "/industries/fmcg"                  },
  { title: "Logistics & Warehousing", href: "/industries/logistics-warehousing" },
  { title: "Government Agencies",     href: "/industries/government-agencies"   },
];

const resources = [
  { title: "Blog & News",   href: "/blog"         },
  { title: "Case Studies",  href: "/case-studies" },
];

// ─── Cart count hook ──────────────────────────────────────────────
// Reuses the same ["cart"] query key as Cart.tsx so they share cache
function useCartCount() {
  const { isAuthenticated } = useAuth();
  const { data: cartItems = [] } = useQuery<any[]>({
    queryKey: ["cart"],
    queryFn: () => api.get("/cart").then((r) => r.data?.data ?? r.data ?? []),
    enabled: isAuthenticated,
    // No staleTime — badge must reflect refetchQueries calls immediately
  });
  return cartItems.reduce((sum: number, item: any) => sum + (item.quantity ?? 0), 0);
}

export default function Header() {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useCartCount();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+2348061535441" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              <span>+234 806 153 5441</span>
            </a>
            <a href="mailto:support@darafunmi.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-4 w-4" />
              <span>support@darafunmi.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary-foreground/80">Precision • Quality • Innovation</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/dpt-logo.png" alt="Darafunmi Precision Technologies" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-foreground">Darafunmi</span>
              <span className="block text-xs text-muted-foreground -mt-1">Precision Technologies</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    location === "/" && "bg-accent text-accent-foreground"
                  )}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    location === "/about" && "bg-accent text-accent-foreground"
                  )}>
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {services.map((service) => (
                      <li key={service.title}>
                        <Link href={service.href}>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">{service.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {service.description}
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                    <li className="col-span-2">
                      <Link href="/services">
                        <NavigationMenuLink className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm font-medium text-primary">
                          View All Services →
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/products">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    location.startsWith("/products") && "bg-accent text-accent-foreground"
                  )}>
                    Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Industries</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-3">
                    {industries.map((industry) => (
                      <li key={industry.title}>
                        <Link href={industry.href}>
                          <NavigationMenuLink className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            {industry.title}
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-3">
                    {resources.map((resource) => (
                      <li key={resource.title}>
                        <Link href={resource.href}>
                          <NavigationMenuLink className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            {resource.title}
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    location === "/contact" && "bg-accent text-accent-foreground"
                  )}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart icon with live badge */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {isAuthenticated && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  Sign In
                </Button>
              </Link>
            )}

            <Link href="/quote">
              <Button className="hidden md:flex bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Get a Quote
              </Button>
            </Link>

            {/* Mobile menu trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[380px] flex flex-col p-0">
                <div className="px-6 py-5 border-b flex-shrink-0">
                  <SheetHeader>
                    <SheetTitle className="text-left text-base font-semibold">Navigation</SheetTitle>
                  </SheetHeader>
                </div>

                <nav className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-1">
                  {[
                    { label: "Home",     href: "/"        },
                    { label: "About Us", href: "/about"   },
                    { label: "Products", href: "/products"},
                    { label: "Blog",     href: "/blog"    },
                    { label: "Contact",  href: "/contact" },
                  ].map(({ label, href }) => (
                    <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}>
                      <span className={cn(
                        "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        location === href ? "bg-accent text-accent-foreground" : "text-foreground"
                      )}>
                        {label}
                      </span>
                    </Link>
                  ))}

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="services" className="border-none">
                      <AccordionTrigger className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent hover:no-underline [&[data-state=open]]:bg-accent">
                        Services
                      </AccordionTrigger>
                      <AccordionContent className="pb-1">
                        <div className="flex flex-col gap-0.5 pl-3 mt-1">
                          {services.map((service) => (
                            <Link key={service.title} href={service.href} onClick={() => setMobileMenuOpen(false)}>
                              <span className="flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                                {service.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="industries" className="border-none">
                      <AccordionTrigger className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent hover:no-underline [&[data-state=open]]:bg-accent">
                        Industries
                      </AccordionTrigger>
                      <AccordionContent className="pb-1">
                        <div className="flex flex-col gap-0.5 pl-3 mt-1">
                          {industries.map((industry) => (
                            <Link key={industry.title} href={industry.href} onClick={() => setMobileMenuOpen(false)}>
                              <span className="flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                                {industry.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </nav>

                <div className="px-6 py-4 border-t flex flex-col gap-3 flex-shrink-0">
                  {isAuthenticated ? (
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">My Account</Button>
                    </Link>
                  ) : (
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                  )}
                  <Link href="/quote" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      Get a Quote
                    </Button>
                  </Link>
                </div>

                <div className="px-6 py-4 border-t bg-muted/30 flex-shrink-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-3">Get in touch</p>
                  <div className="flex flex-col gap-2">
                    <a href="tel:+2348061535441" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      +234 806 153 5441
                    </a>
                    <a href="mailto:support@darafunmi.com" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      support@darafunmi.com
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}