import format from 'pg-format';
import { IProject, TProjectRequest } from '../../interfaces/projects.interfaces';
import { QueryResult } from 'pg';
import { client } from '../../database/database';

export const createProjectService = async (projectData: TProjectRequest): Promise<IProject> => {
  const formatString: string = format(
    `
    INSERT INTO
        projects (%I)
    VALUES
        (%L) RETURNING *;
  `,
    Object.keys(projectData),
    Object.values(projectData)
  );

  const queryResult: QueryResult<IProject> = await client.query(formatString);

  return queryResult.rows[0];
};
