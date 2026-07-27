import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
};

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

const PURPOSE_DIR: Record<(typeof VALID_PURPOSES)[number], string> = {
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

  const ext = ALLOWED_MIME_TO_EXT[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  const filename = `${randomUUID()}.${ext}`;
  const dir = PURPOSE_DIR[purpose];
  const uploadDir = path.join(process.cwd(), "public", "uploads", dir);
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(uploadDir, filename);

  const isRasterImage = ["jpg", "png", "webp", "gif"].includes(ext);
  if (isRasterImage) {
    // Re-encode through sharp to strip EXIF/metadata and cap dimensions,
    // rather than trusting the uploaded bytes as-is.
    await sharp(buffer)
      .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
      .toFile(filePath);
  } else {
    await writeFile(filePath, buffer);
  }

  const publicPath = `/uploads/${dir}/${filename}`;

  await prisma.media.create({
    data: {
      filename,
      originalName: file.name,
      path: publicPath,
      mimeType: file.type,
      size: file.size,
      purpose,
    },
  });

  return NextResponse.json({ path: publicPath });
}
