import { IUploadImagesService } from '../interfaces';
import { IRecordRepository } from '@/repositories';
import { ICreateRecordDTO, ResponseDTO } from '@/types';
import { ICloudinaryProvider, IOCRProvider, IUploadProvider } from '@/providers/interfaces';
import { aadharResponse } from '@/constants';
import { IRecord } from '@/models';

export class UploadImagesService implements IUploadImagesService {
  constructor(
    private recordRepository: IRecordRepository,
    private uploadProvider: IUploadProvider,
    private cloudinaryProvider: ICloudinaryProvider,
    private ocrProvider: IOCRProvider,
  ) {
    this.recordRepository = recordRepository;
    this.uploadProvider = uploadProvider;
    this.cloudinaryProvider = cloudinaryProvider;
    this.ocrProvider = ocrProvider;
  }

  private parseAadharData(
    text: string,
  ): Partial<Pick<IRecord, 'aadharNo' | 'name' | 'dob' | 'gender' | 'address'>> {
    // eslint-disable-next-line no-useless-escape
    const dobMatch = text.match(/DOB\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})/i);
    const dob = dobMatch ? new Date(dobMatch[1].split('/').reverse().join('-')) : undefined;

    const genderMatch = text.match(/\b(Male|Female)\b/i);
    const gender = genderMatch ? (genderMatch[1].toLowerCase() as 'male' | 'female') : undefined;

    const addressMatch = text.match(/Address\s*:\s*([^\n]+)/i);
    const address = addressMatch ? addressMatch[1].trim() : undefined;

    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const aadharNo = text.match(/\d{4}\s\d{4}\s\d{4}/)?.[0];

    let name: string | undefined;
    const aadharIndex = lines.findIndex((line) => /\d{4}\s?\d{4}\s?\d{4}/.test(line));
    if (aadharIndex >= 0) {
      for (let i = aadharIndex + 1; i < lines.length; i++) {
        const line = lines[i];
        if (/DOB|Year of Birth|Male|Female|Address/i.test(line)) break;
        if (/^[\p{L}\s.'-]{3,}$/u.test(line)) {
          name = line;
          break;
        }
      }
    }

    return { aadharNo, name, dob, gender, address };
  }

  async execute({ frontImagePath, backImagePath }: ICreateRecordDTO): Promise<ResponseDTO> {
    try {
      // Perform OCR to extract text
      const [frontText, backText] = await Promise.all([
        this.ocrProvider.performOCR(frontImagePath, 'eng'),
        this.ocrProvider.performOCR(backImagePath, 'eng'),
      ]);

      // Upload images to Cloudinary
      const timestamp = Date.now();
      const [frontImageUrl, backImageUrl] = await Promise.all([
        this.cloudinaryProvider.uploadImage(frontImagePath, `aadhar/front-${timestamp}`),
        this.cloudinaryProvider.uploadImage(backImagePath, `aadhar/back-${timestamp}`),
      ]);

      // Clean up local files
      await Promise.all([
        this.cloudinaryProvider.cleanupLocalFile(frontImagePath),
        this.cloudinaryProvider.cleanupLocalFile(backImagePath),
      ]);

      // Parse Aadhar data from OCR text
      const frontAadharData = this.parseAadharData(frontText);
      const backAadharData = this.parseAadharData(backText);

      // Combine parsed data (prioritize front, fallback to back)
      const aadharData = {
        aadharNo: frontAadharData.aadharNo || backAadharData.aadharNo,
        name: frontAadharData.name || backAadharData.name,
        dob: frontAadharData.dob || backAadharData.dob,
        gender: frontAadharData.gender || backAadharData.gender,
        address: frontAadharData.address || backAadharData.address,
      };

      if (!aadharData.aadharNo) {
        return {
          data: { error: aadharResponse.IMAGES_IS_NOT_VALID },
          success: false,
        };
      }

      // Save record to database
      const recordData: Partial<IRecord> = {
        frontImageUrl,
        backImageUrl,
        ...aadharData,
      };

      const existingRecord = await this.recordRepository.findOne({ aadharNo: recordData.aadharNo });
      if (existingRecord) {
        return {
          data: existingRecord,
          success: true,
        };
      }

      const createdRecord = await this.recordRepository.create(recordData);

      return {
        data: createdRecord,
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
