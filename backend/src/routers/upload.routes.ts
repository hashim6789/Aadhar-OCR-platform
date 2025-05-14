import { uploadImagesComposer } from '@/composers';
import { expressAdapter } from '@/http/adapter';
import { UploadProvider } from '@/providers/implementations';
import { Request, Response, Router } from 'express';

const uploadRouter = Router();
const uploadProvider = new UploadProvider();

uploadRouter.post(
  '/',
  uploadProvider.handleUpload(),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, uploadImagesComposer());

    response.status(adapter.statusCode).json(adapter.body);
  },
);

export { uploadRouter };
