"use client";

import { useState, type FormEvent, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push(searchParams.get("callbackUrl") || "/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-[400px] rounded-card bg-card p-10 shadow-card">
        <h1 className="mb-2 text-2xl font-bold text-heading">Admin Login</h1>
        <p className="mb-8 text-sm text-text">
          Sign in to manage your portfolio content.
        </p>
        <form onSubmit={handleSubmit} method="post" className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-card bg-background px-5 py-3 text-text shadow-inset-card outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full rounded-card bg-background px-5 py-3 text-text shadow-inset-card outline-none focus:ring-2 focus:ring-primary/30"
          />
          {error && <p className="text-sm text-danger">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-card bg-primary px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-primary-dark disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
