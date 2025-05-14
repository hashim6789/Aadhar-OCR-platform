import { Request, Express } from 'express';
import { HttpRequest, IHttpResponse } from './helpers';
import { IController } from '@/controllers';

export async function expressAdapter(req: Request, apiRoute: IController): Promise<IHttpResponse> {
  const httpRequest = new HttpRequest({
    headers: req.header,
    query: req.query,
    body: req.body,
    path: req.params,
    files: req.files as { [fieldname: string]: Express.Multer.File[] },
  });

  const httpResponse = await apiRoute.handle(httpRequest);
  return httpResponse;
}
