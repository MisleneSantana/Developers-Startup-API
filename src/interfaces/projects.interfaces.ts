import { QueryResult } from 'pg';

export interface IProject {
  id: number;
  name: string;
  description: string;
  repository: string;
  startDate: Date | string;
  endDate: Date | string;
  developerId: number | null | undefined;
}

export type TProjectRequest = Omit<IProject, 'id' | 'endDate'>;

export type TProjectResult = QueryResult<IProject>;
