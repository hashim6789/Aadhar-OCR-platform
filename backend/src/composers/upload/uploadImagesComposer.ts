import { UploadImagesController } from '@/controllers';
import { IController } from '@/controllers/IController';
import { RecordModel } from '@/models';
import { CloudinaryProvider, OCRProvider, UploadProvider } from '@/providers/implementations';
import { ICloudinaryProvider, IOCRProvider, IUploadProvider } from '@/providers/interfaces';
import { IRecordRepository, RecordRepository } from '@/repositories';
import { IUploadImagesService, UploadImagesService } from '@/services';

export function uploadImagesComposer(): IController {
  const repository: IRecordRepository = new RecordRepository(RecordModel);
  const uploadProvider: IUploadProvider = new UploadProvider();
  const cloudinaryProvider: ICloudinaryProvider = new CloudinaryProvider();
  const ocrProvider: IOCRProvider = new OCRProvider();
  const service: IUploadImagesService = new UploadImagesService(
    repository,
    uploadProvider,
    cloudinaryProvider,
    ocrProvider,
  );
  const controller: IController = new UploadImagesController(service);
  return controller;
}
