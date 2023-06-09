import format from 'pg-format';
import { IDeveloper, TDeveloperRequest, TDeveloperResult } from '../../interfaces/developers.interfaces';
import { QueryResult } from 'pg';
import { client } from '../../database/database';

export const createDeveloperService = async (developerData: TDeveloperRequest): Promise<IDeveloper> => {
  const keys: string[] = Object.keys(developerData);
  const values: string[] = Object.values(developerData);

  const queryFormatString: string = format(
    `
    INSERT INTO
        developers (%I)
    VALUES
        (%L) RETURNING *;
  `,
    keys,
    values
  );

  const queryResult: TDeveloperResult = await client.query(queryFormatString);

  return queryResult.rows[0];
};
