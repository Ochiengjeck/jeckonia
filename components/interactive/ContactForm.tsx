"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border-b border-muted-border bg-transparent py-3 text-foreground placeholder:text-text/50 outline-none focus:border-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} method="post" className="space-y-5">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className={inputClass}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className={inputClass}
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        required
        className={inputClass}
      />
      <textarea
        name="message"
        placeholder="Your Message"
        required
        rows={5}
        className={`resize-y ${inputClass}`}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-card bg-accent px-8 py-3 font-mono text-xs uppercase tracking-widest text-background transition-colors duration-200 hover:bg-accent-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-success">
          Thank you for your message! I will get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-danger">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
