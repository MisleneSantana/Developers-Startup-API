import { QueryConfig } from 'pg';
import { IDeveloperInfos, TDeveloperInfosRequest } from '../../interfaces/developerInfos.interfaces';
import { client } from '../../database/database';
import { TDeveloperInfosResult } from '../../interfaces/developerInfos.interfaces';
import { NotFound } from '../../error';
import format from 'pg-format';

export const createDeveloperInfosService = async (
  developerId: number,
  developerInfosData: TDeveloperInfosRequest
): Promise<IDeveloperInfos> => {
  const queryStringDeveloper: string = `
    SELECT * FROM developers WHERE id = $1;
    `;

  const queryConfigDeveloper: QueryConfig = {
    text: queryStringDeveloper,
    values: [developerId],
  };

  const queryResultSelectDeveloper: TDeveloperInfosResult = await client.query(queryConfigDeveloper);

  if (queryResultSelectDeveloper.rowCount === 0) {
    throw new NotFound('Client not Found');
  }

  const developerInfosInsertData = {
    ...developerInfosData,
    developerId: developerId,
  };

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

//   const queryStringUpdateDeveloperInfos: string = `
//     UPDATE
//         developers
//     SET
//         "developerInfos" = $1
//     WHERE
//         id = $2;
//   `;

//   const queryConfigUpdateDeveloperInfos: QueryConfig = {
//     text: queryStringUpdateDeveloperInfos,
//     values: [queryResultDeveloperInfos.rows[0].id, developerId],
//   };
