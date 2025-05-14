import { IUploadImagesService } from '@/services';
import { IController } from '../IController';
import {
  HttpErrors,
  HttpResponse,
  HttpSuccess,
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from '@/http/helpers';
import { ResponseDTO } from '@/types';

export class UploadImagesController implements IController {
  constructor(
    private uploadImagesService: IUploadImagesService,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {
    this.uploadImagesService = uploadImagesService;
    this.httpErrors = httpErrors;
    this.httpSuccess = httpSuccess;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    const files = httpRequest.files;
    if (files && files.frontImage && files.backImage) {
      const frontImagePath = files.frontImage[0].path;
      const backImagePath = files.backImage[0].path;

      response = await this.uploadImagesService.execute({ frontImagePath, backImagePath });

      if (!response.success) {
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      const success = this.httpSuccess.success_200(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
