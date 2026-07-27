import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

const VALID_PURPOSES = [
  "PROFILE",
  "ABOUT",
  "PORTFOLIO_THUMB",
  "PORTFOLIO_FULL",
  "TESTIMONIAL",
  "BLOG_COVER",
  "CV",
  "OTHER",
] as const;

const PURPOSE_FOLDER: Record<(typeof VALID_PURPOSES)[number], string> = {
  PROFILE: "profile",
  ABOUT: "about",
  PORTFOLIO_THUMB: "portfolio",
  PORTFOLIO_FULL: "portfolio",
  TESTIMONIAL: "testimonials",
  BLOG_COVER: "blog",
  CV: "cv",
  OTHER: "other",
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const purposeRaw = formData.get("purpose");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  const purpose = VALID_PURPOSES.includes(purposeRaw as never)
    ? (purposeRaw as (typeof VALID_PURPOSES)[number])
    : "OTHER";

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const folder = `jeckonia/${PURPOSE_FOLDER[purpose]}`;
  const resourceType = file.type === "application/pdf" ? "raw" : "image";

  const result = await uploadToCloudinary(buffer, { folder, resourceType });

  await prisma.media.create({
    data: {
      filename: result.public_id,
      originalName: file.name,
      path: result.secure_url,
      publicId: result.public_id,
      mimeType: file.type,
      size: file.size,
      purpose,
    },
  });

  return NextResponse.json({ path: result.secure_url });
}
