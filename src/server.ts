/* eslint-disable no-console */
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import './database';
import upload from './config/upload';
import AppError from './errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(upload.directory));
app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

app.listen(7000, () => console.log('Server running on port 7000'));
