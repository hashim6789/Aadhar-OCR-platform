/* eslint-disable no-unused-vars */

import { ICreateRecordDTO, ResponseDTO } from '@/types';

export interface IUploadImagesService {
  execute(data: ICreateRecordDTO): Promise<ResponseDTO>;
}
