import { ENV } from '@/configs';
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

export class CloudinaryProvider {
  /**
   * Uploads an image to Cloudinary and returns the public URL.
   * @param filePath Path to the local image file.
   * @param publicId Unique identifier for the image in Cloudinary.
   * @returns Public URL of the uploaded image.
   */
  async uploadImage(filePath: string, publicId: string): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        folder: 'aadhar_images',
        resource_type: 'image',
      });
      return result.secure_url;
    } catch (error: unknown) {
      throw new Error(
        `Cloudinary upload failed: ${error instanceof Error ? error.message : 'cloudinary error'}`,
      );
    }
  }

  /**
   * Deletes an image from Cloudinary.
   * @param publicId Public ID of the image to delete.
   */
  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error: unknown) {
      throw new Error(
        `Failed to delete image ${publicId}: ${error instanceof Error ? error.message : 'cloudinary error'}`,
      );
    }
  }

  /**
   * Cleans up local file after upload.
   * @param filePath Path to the local file.
   */
  async cleanupLocalFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error: unknown) {
      throw new Error(
        `Failed to delete local file ${filePath}: ${error instanceof Error ? error.message : 'cloudinary error'}`,
      );
    }
  }
}

export const cloudinaryProvider = new CloudinaryProvider();
