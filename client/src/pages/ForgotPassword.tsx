import { useState } from "react";
import { Link } from "wouter";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Loader2, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setError("");
    try {
      await api.post("/user/auth/forgot-password", { email });
      setStatus("sent");
    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">Forgot your password?</CardTitle>
              <CardDescription>
                Enter your email and we'll send you a link to reset it.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {status === "sent" ? (
                <div className="text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-7 w-7 text-green-600" />
                  </div>
                  <p className="font-semibold text-lg">Check your email</p>
                  <p className="text-sm text-muted-foreground">
                    If <span className="font-medium text-foreground">{email}</span> is
                    registered, you'll receive a password reset link shortly. It expires in 1 hour.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Don't see it? Check your spam folder.
                  </p>
                  <Link href="/login">
                    <Button variant="outline" className="w-full mt-2">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
                      {error}
                    </p>
                  )}
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Sending…</>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                  <Link href="/login">
                    <Button variant="ghost" className="w-full text-muted-foreground">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Sign In
                    </Button>
                  </Link>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
