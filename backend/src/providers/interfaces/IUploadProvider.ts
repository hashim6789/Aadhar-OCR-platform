/* eslint-disable no-unused-vars */
import { Express } from 'express';
export interface IUploadProvider {
  handleUpload(): any; // Multer middleware (any due to complex Express type)
  validateFiles(files: { [fieldname: string]: Express.Multer.File[] } | undefined): {
    frontImagePath: string;
    backImagePath: string;
  };
}
