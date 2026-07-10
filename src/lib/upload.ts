// src/lib/upload.ts
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary if env variables are present
const isCloudinaryConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * Uploads a file buffer/file to Cloudinary or falls back to local disk storage
 * @param file The File object from React/Next form data
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (isCloudinaryConfigured) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'dpaca_portal' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error, falling back to local:', error);
            // Fallback to local if Cloudinary fails
            resolve(saveLocally(buffer, file.name));
          } else {
            resolve(result?.secure_url || '');
          }
        }
      );
      uploadStream.end(buffer);
    });
  }

  // Graceful fallback to local saving
  return saveLocally(buffer, file.name);
}

function saveLocally(buffer: Buffer, originalName: string): string {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = originalName.split('.').pop() || 'jpg';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
    const filePath = path.join(uploadsDir, uniqueName);

    fs.writeFileSync(filePath, buffer);
    return `/uploads/${uniqueName}`;
  } catch (error) {
    console.error('Failed to save file locally:', error);
    throw new Error('Image write operation failed');
  }
}
