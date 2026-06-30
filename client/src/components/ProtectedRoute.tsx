import { Redirect } from "wouter";

// Auth is cookie-based — read site_token from document.cookie, not localStorage.
const hasCookieToken = () =>
  /(?:^|; )site_token=([^;]+)/.test(document.cookie);

interface ProtectedRouteProps {
  component: React.ComponentType;
}

export default function ProtectedRoute({ component: Component }: ProtectedRouteProps) {
  if (!hasCookieToken()) {
    return <Redirect to="/login" />;
  }

  return <Component />;
}