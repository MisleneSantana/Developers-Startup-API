import { NextFunction, Request, Response } from 'express';
import { IProject, TProjectResult } from '../interfaces/projects.interfaces';
import { client } from '../database/database';
import { NotFound } from '../error';

export const verifyProjectIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const projectIdParam: string = req.params.id;
  const queryResult: TProjectResult = await client.query(
    `
    SELECT * FROM projects WHERE id = $1;
  `,
    [projectIdParam]
  );

  const projectId: IProject = queryResult.rows[0];

  if (!projectId) {
    throw new NotFound('Project not found.');
  }
  return next();
};
