import { QueryResult } from 'pg';

export interface IDeveloper {
  id: number;
  name: string;
  email: string;
}

export type TDeveloperRequest = Omit<IDeveloper, 'id'>;

export type TDeveloperResult = QueryResult<IDeveloper>;
