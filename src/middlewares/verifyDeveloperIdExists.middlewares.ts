import { Request, Response, NextFunction } from 'express';
import { IDeveloper, TDeveloperResult } from '../interfaces/developers.interfaces';
import { client } from '../database/database';
import { NotFound } from '../error';

export const verifyDeveloperIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let developerParamId: number = Number(req.params.id);

  const queryResult: TDeveloperResult = await client.query(
    `
  SELECT * FROM developers WHERE id = $1;
  `,
    [developerParamId]
  );

  const developerId: IDeveloper = queryResult.rows[0];

  if (!developerId) {
    throw new NotFound('Developer not found.');
  }
  return next();
};
