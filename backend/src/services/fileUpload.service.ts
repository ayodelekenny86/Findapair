import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config';
import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

export class FileUploadService {
  async uploadImage(file: Express.Multer.File, folder: string = 'findapair') {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder,
        resource_type: 'auto',
        transformation: [
          { quality: 'auto', fetch_format: 'auto' },
        ],
      });

      logger.info(`Image uploaded: ${result.public_id}`);

      return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
      };
    } catch (error) {
      logger.error('Image upload failed:', error);
      throw new AppError('Failed to upload image', 500);
    }
  }

  async uploadMultipleImages(files: Express.Multer.File[], folder: string = 'findapair') {
    try {
      const uploadPromises = files.map((file) => this.uploadImage(file, folder));
      const results = await Promise.all(uploadPromises);

      logger.info(`${results.length} images uploaded`);

      return results;
    } catch (error) {
      logger.error('Multiple image upload failed:', error);
      throw new AppError('Failed to upload images', 500);
    }
  }

  async deleteImage(publicId: string) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      logger.info(`Image deleted: ${publicId}`);
      return result;
    } catch (error) {
      logger.error('Image deletion failed:', error);
      throw new AppError('Failed to delete image', 500);
    }
  }

  async deleteMultipleImages(publicIds: string[]) {
    try {
      const deletePromises = publicIds.map((publicId) => this.deleteImage(publicId));
      await Promise.all(deletePromises);

      logger.info(`${publicIds.length} images deleted`);
    } catch (error) {
      logger.error('Multiple image deletion failed:', error);
      throw new AppError('Failed to delete images', 500);
    }
  }

  getOptimizedUrl(publicId: string, options: { width?: number; height?: number; quality?: string } = {}) {
    const { width, height, quality = 'auto' } = options;

    return cloudinary.url(publicId, {
      transformation: [
        { width, height, crop: 'limit' },
        { quality, fetch_format: 'auto' },
      ],
    });
  }
}

export const fileUploadService = new FileUploadService();
