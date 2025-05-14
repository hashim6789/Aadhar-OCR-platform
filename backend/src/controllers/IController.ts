/* eslint-disable no-unused-vars */
import { IHttpRequest, IHttpResponse } from '@/http/helpers';

export interface IController {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
