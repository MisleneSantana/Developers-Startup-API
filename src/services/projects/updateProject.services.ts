import format from 'pg-format';
import { IProject, TProjectRequest, TProjectResult } from '../../interfaces/projects.interfaces';
import { client } from '../../database/database';

export const updateProjectService = async (projectData: TProjectRequest, projectId: number): Promise<IProject> => {
  const formatString: string = format(
    `
    UPDATE projects 
        SET (%I) = ROW (%L) 
    WHERE id = $1
        RETURNING *;
  `,
    Object.keys(projectData),
    Object.values(projectData)
  );

  const queryResult: TProjectResult = await client.query(formatString, [projectId]);

  return queryResult.rows[0];
};
