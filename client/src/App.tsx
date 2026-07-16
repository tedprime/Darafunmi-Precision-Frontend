import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Industries from "./pages/Industries";
import IndustryDetail from "./pages/IndustryDetail";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CaseStudies from "./pages/CaseStudies";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BookService from "./pages/BookService";
import Dashboard from "./pages/Dashboard";
import OrderConfirmation from "./pages/OrderConfirmation";
import BookingConfirmation from "./pages/BookingConfirmation";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import QuoteRespond from "./pages/QuoteRespond";
import QualityPolicy from "./pages/QualityPolicy";
import ScrollToTop from "./components/ScrollToTop";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* Main Pages */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />

        {/* Services */}
        <Route path="/services" component={Services} />
        <Route path="/services/:slug" component={ServiceDetail} />

        {/* Products / E-commerce */}
        <Route path="/products" component={Products} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/order-confirmation/:orderNumber" component={OrderConfirmation} />
        <Route path="/booking-confirmation/:bookingNumber" component={BookingConfirmation} />

        {/* Industries */}
        <Route path="/industries" component={Industries} />
        <Route path="/industries/:slug" component={IndustryDetail} />

        {/* Contact & Quotes */}
        <Route path="/contact" component={Contact} />
        <Route path="/quote" component={Quote} />
        <Route path="/quotes/respond/:quoteNumber" component={QuoteRespond} />
        <Route path="/book-service" component={BookService} />

        {/* Company */}
        <Route path="/quality-policy" component={QualityPolicy} />

        {/* Blog & Content */}
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/case-studies" component={CaseStudies} />

        {/* Auth */}
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />

        {/* Customer Portal */}
        <Route path="/dashboard">
          <ProtectedRoute component={Dashboard} />
        </Route>

        {/* 404 */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;