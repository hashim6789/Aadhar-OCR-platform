import { FetchAadharController } from '@/controllers';
import { IController } from '@/controllers/IController';
import { RecordModel } from '@/models';
import { IRecordRepository, RecordRepository } from '@/repositories';
import { FetchAadharService } from '@/services';
import { IFetchAadharsService } from '@/services/upload/interfaces/IFetchAadharService';

export function fetchAadharComposer(): IController {
  const repository: IRecordRepository = new RecordRepository(RecordModel);
  const service: IFetchAadharsService = new FetchAadharService(repository);
  const controller: IController = new FetchAadharController(service);
  return controller;
}
