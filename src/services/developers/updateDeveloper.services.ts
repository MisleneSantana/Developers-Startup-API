import { IDeveloper, TDeveloperRequest, TDeveloperResult } from '../../interfaces/developers.interfaces';
import format from 'pg-format';
import { client } from '../../database/database';

export const updateDeveloperService = async (
  developerData: TDeveloperRequest,
  developerId: number
): Promise<IDeveloper> => {
  const keys: string[] = Object.keys(developerData);
  const values: string[] = Object.values(developerData);

  const formatString: string = format(
    `
   UPDATE developers 
    SET (%I) = ROW (%L) 
    WHERE id = $1
    RETURNING *;
  `,
    keys,
    values
  );

  const queryResult: TDeveloperResult = await client.query(formatString, [developerId]);

  return queryResult.rows[0];
};
