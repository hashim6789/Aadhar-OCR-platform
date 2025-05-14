import express from 'express';
import { uploadRouter } from './upload.routes';

export const apiRouter = express.Router();

apiRouter.use('/uploads', uploadRouter);
