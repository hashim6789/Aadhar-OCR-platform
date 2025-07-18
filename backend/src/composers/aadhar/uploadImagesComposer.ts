import { UploadImagesController } from '@/controllers';
import { IController } from '@/controllers/IController';
import { RecordModel } from '@/models';
import { CloudinaryProvider, OCRProvider } from '@/providers/implementations';
import { ICloudinaryProvider, IOCRProvider } from '@/providers/interfaces';
import { IRecordRepository, RecordRepository } from '@/repositories';
import { IUploadImagesService, UploadImagesService } from '@/services';

export function uploadImagesComposer(): IController {
  const repository: IRecordRepository = new RecordRepository(RecordModel);
  const cloudinaryProvider: ICloudinaryProvider = new CloudinaryProvider();
  const ocrProvider: IOCRProvider = new OCRProvider();
  const service: IUploadImagesService = new UploadImagesService(
    repository,
    cloudinaryProvider,
    ocrProvider,
  );
  const controller: IController = new UploadImagesController(service);
  return controller;
}
