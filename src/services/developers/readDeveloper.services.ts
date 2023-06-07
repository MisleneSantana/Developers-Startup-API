import { QueryConfig } from 'pg';
import { IDeveloper, TDeveloperResult } from '../../interfaces/developers.interfaces';
import { client } from '../../database/database';

export const readDeveloperService = async (developerId: string): Promise<IDeveloper> => {
  const queryString: string = 'SELECT * FROM developers WHERE id = $1;';

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  const queryResult: TDeveloperResult = await client.query(queryConfig);

  return queryResult.rows[0];
};
