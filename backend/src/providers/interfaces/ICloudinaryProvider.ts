/* eslint-disable no-unused-vars */
export interface ICloudinaryProvider {
  uploadImage(filePath: string, publicId: string): Promise<string>;
  deleteImage(publicId: string): Promise<void>;
  cleanupLocalFile(filePath: string): Promise<void>;
}
