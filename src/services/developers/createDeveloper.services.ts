import format from 'pg-format';
import { IDeveloper, TDeveloperRequest } from '../../interfaces/developers.interfaces';
import { QueryResult } from 'pg';
import { client } from '../../database/database';

export const createDeveloperService = async (developerData: TDeveloperRequest): Promise<IDeveloper> => {
  const keys: string[] = Object.keys(developerData);
  const values: string[] = Object.values(developerData);

  const formatString = format(
    `
    INSERT INTO
        developers (%I)
    VALUES
        (%L) RETURNING *;
  `,
    keys,
    values
  );

  const queryResult: QueryResult<IDeveloper> = await client.query(formatString);

  return queryResult.rows[0];
};
