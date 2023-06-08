import { QueryConfig } from 'pg';
import { client } from '../../database/database';

export const deleteDeveloperService = async (developerId: string): Promise<void> => {
  const queryString: string = `
    DELETE FROM
        developers
    WHERE
        id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  await client.query(queryConfig);
};
