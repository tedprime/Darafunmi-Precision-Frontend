import { Redirect } from "wouter";

interface ProtectedRouteProps {
  component: React.ComponentType;
}

export default function ProtectedRoute({ component: Component }: ProtectedRouteProps) {
  const isAuthenticated = !!localStorage.getItem("site_token");

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Component />;
}