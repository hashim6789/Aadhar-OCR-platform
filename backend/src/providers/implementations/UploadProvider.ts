/* eslint-disable no-unused-vars */
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { Request, Express } from 'express';

interface FilePaths {
  frontImagePath: string;
  backImagePath: string;
}

export class UploadProvider {
  private storage: multer.StorageEngine;
  private upload: multer.Multer;

  constructor() {
    this.storage = multer.diskStorage({
      destination: async (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void,
      ) => {
        try {
          await fs.mkdir('uploads', { recursive: true });
          cb(null, 'uploads/');
        } catch (error: any) {
          cb(error, '');
        }
      },
      filename: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void,
      ) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
      },
    });

    this.upload = multer({
      storage: this.storage,
      fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
          return cb(null, true);
        }
        cb(new Error('Only PNG and JPEG images are allowed'));
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    });
  }

  /**
   * Middleware to handle file uploads for frontImage and backImage.
   */
  handleUpload() {
    return this.upload.fields([
      { name: 'frontImage', maxCount: 1 },
      { name: 'backImage', maxCount: 1 },
    ]);
  }

  /**
   * Validates uploaded files.
   * @param files Multer files object.
   * @returns Paths to front and back images.
   */
  validateFiles(files: { [fieldname: string]: Express.Multer.File[] } | undefined): FilePaths {
    if (!files || !files.frontImage || !files.backImage) {
      throw new Error('Both front and back images are required');
    }
    return {
      frontImagePath: files.frontImage[0].path,
      backImagePath: files.backImage[0].path,
    };
  }
}

export const uploadProvider = new UploadProvider();
