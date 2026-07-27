"use client";

import { useRef, useState } from "react";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export function ImageUploadField({
  name,
  label,
  defaultValue = "",
  purpose,
  accept = "image/*",
  preview = true,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  purpose: string;
  accept?: string;
  preview?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("purpose", purpose);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setValue(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex gap-2">
        <input
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={inputClass}
        />
        <label className="flex shrink-0 cursor-pointer items-center rounded-card bg-background px-4 text-sm font-medium text-text hover:bg-primary hover:text-white">
          {uploading ? "Uploading..." : "Upload"}
          <input
            ref={fileRef}
            type="file"
            accept={accept}
            onChange={handleFile}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      {preview && value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="mt-2 h-20 w-20 rounded-card border border-black/10 object-cover"
        />
      )}
    </div>
  );
}
