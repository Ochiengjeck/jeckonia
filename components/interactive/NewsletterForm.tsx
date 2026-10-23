"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const email = new FormData(form).get("email");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mb-5">
      <form onSubmit={handleSubmit} method="post" className="flex items-center gap-3 border-b border-muted-border">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full min-w-0 flex-1 bg-transparent py-3 text-foreground placeholder:text-text/50 outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-label="Subscribe"
          className="text-lg text-accent transition-colors duration-200 hover:text-accent-dark disabled:opacity-60"
        >
          <Icon name="FaPaperPlane" />
        </button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-sm text-success">
          Thank you for subscribing to my newsletter!
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-danger">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
