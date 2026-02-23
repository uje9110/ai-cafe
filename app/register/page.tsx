"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { User, Mail, Lock, Loader2, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        setError("Something went wrong");
        return;
      }

      router.push("/");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-2xl bg-primary/10">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
          </div>

          <CardTitle className="text-2xl font-semibold">
            Create Account
          </CardTitle>

          <CardDescription>
            Join us and start managing your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <Label>Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="John Doe"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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

          {error && (
            <p className="text-sm text-destructive text-center">
              {error}
            </p>
          )}

          <Button
            className="w-full h-11 text-base"
            onClick={handleRegister}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </>
            )}
          </Button>

          <Separator />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer hover:underline"
              onClick={() => router.push("/")}
            >
              Sign in
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}