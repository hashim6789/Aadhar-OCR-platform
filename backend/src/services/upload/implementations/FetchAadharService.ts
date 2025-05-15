import { IFetchAadharsService } from '../interfaces';
import { IRecordRepository } from '@/repositories';
import { ResponseDTO } from '@/types';
import { aadharResponse } from '@/constants';
import { IFetchAadharDTO } from '@/schemas';

export class FetchAadharService implements IFetchAadharsService {
  constructor(private recordRepository: IRecordRepository) {
    this.recordRepository = recordRepository;
  }

  async execute({ aadharNo, dob }: IFetchAadharDTO): Promise<ResponseDTO> {
    try {
      const existingRecord = await this.recordRepository.findOne({ aadharNo });
      const date = new Date(dob);
      console.log(date);
      if (
        !existingRecord ||
        !existingRecord.dob ||
        existingRecord.dob.getTime() !== date.getTime()
      ) {
        return {
          data: { error: aadharResponse.AADHAR_NOT_EXIST },
          success: false,
        };
      }

      return {
        data: existingRecord,
        success: true,
      };
    } catch (error: any) {
      return {
        data: { error: error.message || aadharResponse.PROCESSING_FAILED },
        success: false,
      };
    }
  }
}
