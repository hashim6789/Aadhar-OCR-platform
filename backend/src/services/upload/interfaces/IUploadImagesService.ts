/* eslint-disable no-unused-vars */

import { ICreateRecordDTO } from '@/schemas';
import { ResponseDTO } from '@/types';

export interface IUploadImagesService {
  execute(data: ICreateRecordDTO): Promise<ResponseDTO>;
}
