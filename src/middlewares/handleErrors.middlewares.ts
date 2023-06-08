import { Request, Response, NextFunction } from 'express';
import { AlreadyExists, AppError, NotFound } from '../error';

export const handleErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): Response => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof NotFound) {
    return res.status(404).json({ message: error.message });
  }

  if (error instanceof AlreadyExists) {
    return res.status(409).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: 'Internal Server Error.' });
};
