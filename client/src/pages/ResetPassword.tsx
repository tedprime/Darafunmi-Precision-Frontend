import { useState } from "react";
import { Link, useLocation } from "wouter";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";

export default function ResetPassword() {
  const [, navigate] = useLocation();

  // Read token from ?token=... query param
  const params = new URLSearchParams(window.location.search);
  const token  = params.get("token") ?? "";

  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [status, setStatus]       = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError]         = useState("");

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full">
            <CardContent className="pt-8 text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
              <p className="font-semibold text-lg">Invalid reset link</p>
              <p className="text-sm text-muted-foreground">
                This link is missing a reset token. Please request a new one.
              </p>
              <Link href="/forgot-password">
                <Button className="w-full">Request New Link</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      await api.post("/user/auth/reset-password", { token, password });
      setStatus("success");
    } catch (err: any) {
      setError(err.message ?? "Reset failed. The link may have expired.");
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
                <KeyRound className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">Set a new password</CardTitle>
              <CardDescription>
                Choose a strong password for your account.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {status === "success" ? (
                <div className="text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-7 w-7 text-green-600" />
                  </div>
                  <p className="font-semibold text-lg">Password updated!</p>
                  <p className="text-sm text-muted-foreground">
                    Your password has been reset successfully. You can now sign in with your new password.
                  </p>
                  <Link href="/login">
                    <Button className="w-full mt-2">Sign In</Button>
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
                    <Label htmlFor="password">New password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="confirm">Confirm new password</Label>
                    <Input
                      id="confirm"
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Repeat your new password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Updating…</>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                  <Link href="/login">
                    <Button variant="ghost" className="w-full text-muted-foreground">
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
