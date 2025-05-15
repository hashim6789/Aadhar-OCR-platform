/* eslint-disable no-unused-vars */

import { IFetchAadharDTO } from '@/schemas';
import { ResponseDTO } from '@/types';

export interface IFetchAadharsService {
  execute(data: IFetchAadharDTO): Promise<ResponseDTO>;
}
