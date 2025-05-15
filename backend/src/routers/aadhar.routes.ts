import { fetchAadharComposer, uploadImagesComposer } from '@/composers';
import { expressAdapter } from '@/http/adapter';
import { UploadProvider } from '@/providers/implementations';
import { Request, Response, Router } from 'express';

const aadharRouter = Router();
const uploadProvider = new UploadProvider();

aadharRouter.post(
  '/uploads',
  uploadProvider.handleUpload(),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, uploadImagesComposer());

    response.status(adapter.statusCode).json(adapter.body);
  },
);

aadharRouter.get('/', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, fetchAadharComposer());

  response.status(adapter.statusCode).json(adapter.body);
});

export { aadharRouter };
