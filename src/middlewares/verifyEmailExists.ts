import { Request, Response, NextFunction } from 'express';
import { TDeveloperResult } from '../interfaces/developers.interfaces';
import { client } from '../database/database';
import { IDeveloper } from '../interfaces/developers.interfaces';
import { AlreadyExists } from '../error';

export const verifyEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email } = req.body;

  const queryResult: TDeveloperResult = await client.query(
    `
  SELECT * FROM developers WHERE email = $1;
  `,
    [email]
  );

  const developerEmail: IDeveloper = queryResult.rows[0];

  if (developerEmail) {
    throw new AlreadyExists('Email already exists.');
  }
  return next();
};
