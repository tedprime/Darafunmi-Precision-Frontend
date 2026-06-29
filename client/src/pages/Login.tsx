import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

export default function Login() {
  const [, navigate] = useLocation();
  const { login, signup } = useAuth();

  // ── Login form state ─────────────────────────────────────────────
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // ── Register form state ──────────────────────────────────────────
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  // ── Handlers ─────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoginLoading(true);
    try {
      await login({ email: loginEmail, password: loginPassword });
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err: any) {
      // api.ts interceptor extracts the message into err.message
      toast.error(err?.message ?? "Invalid email or password.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regConfirm) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (regPassword !== regConfirm) {
      toast.error("Passwords do not match.");
      return;
    }
    if (regPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setRegLoading(true);
    try {
      await signup({
        name: regName,
        email: regEmail,
        password: regPassword,
        phone: regPhone || undefined,
        company: regCompany || undefined,
      });
      toast.success("Account created! Welcome.");
      navigate("/dashboard");
    } catch (err: any) {
      // api.ts interceptor extracts the message into err.message
      toast.error(err?.message ?? "Registration failed. Please try again.");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      {/* Back link */}
      <div className="w-full max-w-md mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Logo / Brand */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Darafunmi Precision Technologies</h1>
        <p className="text-muted-foreground mt-1 text-sm">Sign in or create an account to continue</p>
      </div>

      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Create Account</TabsTrigger>
          </TabsList>

          {/* ── Login Tab ──────────────────────────────────────────── */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button type="submit" className="w-full mt-4" disabled={loginLoading}>
                    {loginLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in…
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="underline text-primary"
                      onClick={() =>
                        (document.querySelector('[data-state="inactive"][value="register"]') as HTMLButtonElement)?.click()
                      }
                    >
                      Create one
                    </button>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* ── Register Tab ───────────────────────────────────────── */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Fill in the form below to get started.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Name <span className="text-destructive">*</span></Label>
                    <Input
                      id="reg-name"
                      placeholder="John Doe"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email <span className="text-destructive">*</span></Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="you@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password <span className="text-destructive">*</span></Label>
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="Min. 6 chars"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-confirm">Confirm <span className="text-destructive">*</span></Label>
                      <Input
                        id="reg-confirm"
                        type="password"
                        placeholder="Repeat password"
                        value={regConfirm}
                        onChange={(e) => setRegConfirm(e.target.value)}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-phone">Phone <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input
                      id="reg-phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-company">Company <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input
                      id="reg-company"
                      placeholder="Your organisation"
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      autoComplete="organization"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full mt-4" disabled={regLoading}>
                    {regLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account…
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}