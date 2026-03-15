"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { Mail, Lock, LogIn, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/dashboard");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-2xl bg-primary/10">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
          </div>

          <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>

          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Demo Info */}
          <div className="text-sm rounded-lg border bg-muted/40 p-3 space-y-1">
            <p className="font-medium">Demo Access</p>
            <p className="text-muted-foreground">
              This is a demo application. You can log in using:
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium">Email:</span> admin@email.com
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium">Password:</span> admin123
            </p>
            <p className="text-muted-foreground">
              Or create a new account to test the app.
            </p>
          </div>
          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button
            className="w-full h-11 text-base"
            onClick={handleLogin}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>

          <Separator />

          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <span
              className="text-primary cursor-pointer hover:underline"
              onClick={() => router.push("/register")}
            >
              Create one
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
