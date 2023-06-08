import { QueryResult } from 'pg';

export type OS = 'Windows' | 'Linux' | 'MacOS';

export interface IDeveloperInfos {
  id: number;
  developerSince: Date | string;
  preferredOS: OS;
  developerId: number;
}

export type TDeveloperInfosRequest = Omit<IDeveloperInfos, 'id' | 'developerId'>;

export type TDeveloperInfosResult = QueryResult<IDeveloperInfos>;

export type TJoinDevInfos = {
  developerId: number;
  developerName: string;
  developerEmail: string;
  developerInfoDeveloperSince: Date | null;
  developerInfoPreferredOS: string | null;
};
