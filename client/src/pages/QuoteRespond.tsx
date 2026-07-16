import { useState } from "react";
import { useParams, useSearch } from "wouter";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  AlertTriangle,
  Phone,
  Mail,
} from "lucide-react";

type Action = "accepted" | "revision_requested" | "rejected";

const ACTIONS: Record<
  Action,
  {
    label: string;
    description: string;
    icon: React.ReactNode;
    confirmBtn: string;
    variant: "default" | "destructive" | "outline";
    className: string;
    successHeading: string;
    successBody: string;
  }
> = {
  accepted: {
    label:          "Accept Quote",
    description:    "You are confirming that you agree to the pricing and scope, and would like to proceed with this quotation.",
    icon:           <CheckCircle2 className="w-10 h-10 text-green-500" />,
    confirmBtn:     "Yes, Accept this Quote",
    variant:        "default",
    className:      "bg-green-600 hover:bg-green-700 text-white",
    successHeading: "Quote Accepted!",
    successBody:    "Thank you for accepting the quote. Our team will be in touch shortly to confirm next steps and arrange payment.",
  },
  revision_requested: {
    label:          "Request a Revision",
    description:    "You are requesting that the pricing or scope of this quote be revised before you can proceed.",
    icon:           <Clock className="w-10 h-10 text-amber-500" />,
    confirmBtn:     "Yes, Request a Revision",
    variant:        "outline",
    className:      "border-amber-500 text-amber-700 hover:bg-amber-50",
    successHeading: "Revision Requested",
    successBody:    "We've received your revision request. Our team will review your feedback and send you an updated quote shortly.",
  },
  rejected: {
    label:          "Decline Quote",
    description:    "You are declining this quote and will not be proceeding with this service at this time.",
    icon:           <XCircle className="w-10 h-10 text-destructive" />,
    confirmBtn:     "Yes, Decline this Quote",
    variant:        "destructive",
    className:      "",
    successHeading: "Quote Declined",
    successBody:    "We've noted your decision. If you change your mind or need our services in the future, please don't hesitate to reach out.",
  },
};

export default function QuoteRespond() {
  const { quoteNumber } = useParams<{ quoteNumber: string }>();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const rawAction = params.get("action") as Action | null;

  const action = rawAction && ACTIONS[rawAction] ? rawAction : null;
  const meta   = action ? ACTIONS[action] : null;

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]             = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!action || !quoteNumber) return;
    setSubmitting(true);
    setError(null);
    try {
      await api.patch(`/quotes/respond/${quoteNumber}`, { status: action });
      setDone(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">

          {/* Success */}
          {done && meta && (
            <Card>
              <CardContent className="p-10 text-center">
                <div className="flex justify-center mb-4">{meta.icon}</div>
                <h1 className="text-xl font-bold mb-2">{meta.successHeading}</h1>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {meta.successBody}
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-xs text-muted-foreground mb-0.5">Quote Reference</p>
                  <p className="font-mono font-bold text-primary">{quoteNumber}</p>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Questions? Contact our team:</p>
                  <a href="tel:+2348061535441" className="flex items-center justify-center gap-2 hover:text-primary">
                    <Phone className="w-4 h-4" /> +234 806 153 5441
                  </a>
                  <a href="mailto:darafunmi2013@yahoo.com" className="flex items-center justify-center gap-2 hover:text-primary">
                    <Mail className="w-4 h-4" /> darafunmi2013@yahoo.com
                  </a>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Invalid link */}
          {!done && !action && (
            <Card>
              <CardContent className="p-10 text-center">
                <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                <h1 className="text-lg font-bold mb-2">Invalid Link</h1>
                <p className="text-sm text-muted-foreground">
                  This link is missing a valid action. Please use the buttons provided
                  in the email you received.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Confirmation */}
          {!done && action && meta && (
            <Card>
              <CardContent className="p-0">
                {/* Action header */}
                <div className="flex items-start gap-4 p-6 border-b bg-muted/30 rounded-t-lg">
                  {meta.icon}
                  <div>
                    <h2 className="font-bold text-base">{meta.label}</h2>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      {meta.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Quote ref */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-0.5">Quote Reference</p>
                    <p className="font-mono font-bold text-primary">{quoteNumber}</p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-start gap-2.5 bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive">
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                      {error}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground">
                    Please confirm your selection. This response will be recorded and
                    sent to our team immediately.
                  </p>

                  <Button
                    onClick={handleConfirm}
                    disabled={submitting}
                    className={`w-full ${meta.className}`}
                    variant={meta.variant}
                    size="lg"
                  >
                    {submitting
                      ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Processing…</>
                      : meta.confirmBtn
                    }
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Changed your mind?{" "}
                    <a href="mailto:darafunmi2013@yahoo.com" className="text-primary hover:underline">
                      Contact us instead
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
