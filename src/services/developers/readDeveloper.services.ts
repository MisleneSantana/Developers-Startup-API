import { QueryConfig, QueryResult } from 'pg';
import { IDeveloper } from '../../interfaces/developers.interfaces';
import { client } from '../../database/database';

export const readDeveloperService = async (developerId: string): Promise<IDeveloper> => {
  const queryString: string = `
  SELECT 
    "dev"."id" AS "developerId",
    "dev"."name" AS "developerName",
    "dev"."email" AS "developerEmail",
    "infos"."developerSince" AS "developerInfoDeveloperSince",
    "infos"."preferredOS" AS "developerInfoPreferredOS"
  FROM 
    developers AS "dev"
    LEFT OUTER JOIN "developerInfos" AS "infos" ON "infos"."developerId" = "dev"."id"
  WHERE 
    "dev"."id" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};
