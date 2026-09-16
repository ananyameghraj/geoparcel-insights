import { useNavigate } from "@tanstack/react-router";
import { Layers, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@geoparcel.ai");
  const [password, setPassword] = useState("demo1234");

  const go = (msg: string) => {
    toast.success(msg);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 inline-flex rounded-lg bg-primary p-2 text-primary-foreground">
            <Layers className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">GeoParcel AI</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-powered urban parcel mapping &amp; cadastral intelligence
          </p>
        </div>
        <form
          className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            go("Signed in to the demo environment");
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={() => go("Demo session started")}>
            Demo Login
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            <span className="rounded border border-border bg-muted px-2 py-0.5">Demo Environment</span>
          </p>
        </form>
      </div>
    </div>
  );
}
