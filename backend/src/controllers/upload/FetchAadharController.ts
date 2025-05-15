import { IFetchAadharsService } from '@/services';
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
import { fetchAadharSchema, IFetchAadharDTO } from '@/schemas';

export class FetchAadharController implements IController {
  constructor(
    private fetchAadharsService: IFetchAadharsService,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {
    this.fetchAadharsService = fetchAadharsService;
    this.httpErrors = httpErrors;
    this.httpSuccess = httpSuccess;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.query && Object.keys(httpRequest.query).length) {
      const { aadharNo, dob } = httpRequest.query as IFetchAadharDTO;

      const parseResult = fetchAadharSchema.safeParse({
        aadharNo,
        dob,
      });

      if (!parseResult.success) {
        const firstError = parseResult.error.errors[0]?.message || 'Invalid input';
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, { error: firstError });
      }

      const fetchAadharDTO = parseResult.data;

      response = await this.fetchAadharsService.execute(fetchAadharDTO);

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
