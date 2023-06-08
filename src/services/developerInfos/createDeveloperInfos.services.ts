import { IDeveloperInfos, TDeveloperInfosRequest } from '../../interfaces/developerInfos.interfaces';
import { client } from '../../database/database';
import { TDeveloperInfosResult } from '../../interfaces/developerInfos.interfaces';
import format from 'pg-format';
import { QueryConfig, QueryResult } from 'pg';
import { AlreadyExists } from '../../error';

export const createDeveloperInfosService = async (
  developerInfosData: TDeveloperInfosRequest,
  developerId: string
): Promise<IDeveloperInfos> => {
  const developerInfosInsertData = {
    ...developerInfosData,
    developerId: developerId,
  };

  const queryStringSelectDeveloperId: string = ` 
    SELECT *
      FROM "developerInfos" 
    WHERE 
      "developerId" = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryStringSelectDeveloperId,
    values: [developerId],
  };

  const queryResultDeveloperId: QueryResult = await client.query(queryConfig);

  if (queryResultDeveloperId.rowCount > 0) {
    throw new AlreadyExists('Developer infos already exists.');
  }

  const queryFormatDeveloperInfo: string = format(
    `
    INSERT INTO
        "developerInfos"(%I)
    VALUES
        (%L) RETURNING *;
  `,
    Object.keys(developerInfosInsertData),
    Object.values(developerInfosInsertData)
  );

  const queryResultDeveloperInfos: TDeveloperInfosResult = await client.query(queryFormatDeveloperInfo);

  return queryResultDeveloperInfos.rows[0];
};
