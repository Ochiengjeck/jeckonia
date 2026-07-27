import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function uploadToCloudinary(
  buffer: Buffer,
  options: { folder: string; resourceType: "image" | "raw" }
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        resource_type: options.resourceType,
        // Caps runaway-large uploads without a separate image-processing
        // step; a no-op for anything already smaller than this.
        transformation:
          options.resourceType === "image"
            ? [{ width: 2000, height: 2000, crop: "limit" }]
            : undefined,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload returned no result"));
          return;
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

export { cloudinary };
