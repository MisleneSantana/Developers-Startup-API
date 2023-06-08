import { QueryConfig, QueryResult } from 'pg';
import { IProject, TJoinProject } from '../../interfaces/projects.interfaces';
import { client } from '../../database/database';

export const readProjectService = async (developerId: string): Promise<IProject> => {
  const queryString: string = `
    SELECT 
        "pro"."id" "projectId",
        "pro"."name" "projectName",
        "pro"."description" "projectDescription",
        "pro"."repository" "projectRepository",
        "pro"."startDate" "projectStartDate",
        "pro"."endDate" "projectEndDate",
        "dev"."name" "projectDeveloperName"
    FROM 
        developers "dev"
    LEFT OUTER JOIN 
        projects AS "pro" 
    ON 
        "pro"."developerId" = "dev"."id"
    WHERE 
        "pro"."id" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};
