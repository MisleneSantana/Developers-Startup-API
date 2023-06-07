import { QueryResult } from 'pg';

export type OS = 'Windows' | 'Linux' | 'MacOS';

export interface IDeveloperInfos {
  id: number;
  developerSince: Date;
  preferredOS: OS;
  developerId: number;
}

export type TDeveloperInfosRequest = Omit<IDeveloperInfos, 'id' | 'developerId'>;

export type TDeveloperInfosResult = QueryResult<IDeveloperInfos>;
