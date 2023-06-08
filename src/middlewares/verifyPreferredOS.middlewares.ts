import { NextFunction, Request, Response } from 'express';
import { OS } from '../interfaces/developerInfos.interfaces';
import { AppError, NotFound } from '../error';

export const verifyPreferredOSMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { preferredOS } = req.body;
  const validPreferredOS: OS[] = ['Windows', 'Linux', 'MacOS'];

  if (!preferredOS) {
    return next();
  }

  if (!validPreferredOS.includes(preferredOS)) {
    throw new NotFound('Invalid OS option.');
  }

  return next();
};
