"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-card bg-primary px-6 py-2.5 font-medium text-white transition-colors duration-300 hover:bg-primary-dark disabled:opacity-60 ${className}`}
    >
      {pending ? "Saving..." : children}
    </button>
  );
}
