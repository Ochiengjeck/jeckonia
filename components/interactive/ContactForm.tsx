"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-card bg-background px-5 py-3 text-text shadow-inset-card outline-none focus:ring-2 focus:ring-primary/30";

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
        className="rounded-card bg-primary px-8 py-3 font-medium text-white shadow-[0_4px_6px_rgba(50,50,93,0.11),0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary-dark disabled:opacity-60"
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
