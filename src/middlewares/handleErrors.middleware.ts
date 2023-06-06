import { Request, Response, NextFunction } from 'express';
import { AppError, NotFound } from '../error';

const handleError = (error: Error, request: Request, response: Response, next: NextFunction): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof NotFound) {
    return response.status(404).json({ message: error.message });
  }

  console.error(error);
  return response.status(500).json({ message: 'Internal Server Error.' });
};

export default handleError;
