import { QueryResult } from 'pg';

export interface IDeveloper {
  id: number;
  name: string;
  email: string;
}

export type TDeveloperRequest = Omit<IDeveloper, 'id'>;
export type TDeveloperUpdate = Partial<TDeveloperRequest>;
export type TDeveloperRead = Array<IDeveloper>;
export type TDeveloperResult = QueryResult<IDeveloper>;
