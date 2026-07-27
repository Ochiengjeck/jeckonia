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
      <form onSubmit={handleSubmit} method="post" className="flex">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full min-w-0 flex-1 rounded-l-card bg-background px-5 py-3 text-text shadow-inset-card outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-label="Subscribe"
          className="rounded-r-card bg-primary px-5 text-lg text-white transition-colors duration-300 hover:bg-primary-dark disabled:opacity-60"
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
