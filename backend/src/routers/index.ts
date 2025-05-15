import express from 'express';
import { aadharRouter } from './aadhar.routes';

export const apiRouter = express.Router();

apiRouter.use('/aadhar', aadharRouter);
