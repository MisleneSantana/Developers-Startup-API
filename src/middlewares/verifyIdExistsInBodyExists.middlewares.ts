import { NextFunction, Request, Response } from 'express';
import { IProject, TProjectResult } from '../interfaces/projects.interfaces';
import { client } from '../database/database';
import { NotFound } from '../error';

export const verifyIdExistsInBodyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { developerId } = req.body;
  console.log(developerId);

  const queryResult: TProjectResult = await client.query(
    `
    SELECT * FROM developers WHERE id = $1;
  `,
    [developerId]
  );

  console.log(queryResult);

  const developerIdExistsInBody: IProject = queryResult.rows[0];

  if (!developerIdExistsInBody) {
    throw new NotFound('Developer not found.');
  }
  return next();
};
