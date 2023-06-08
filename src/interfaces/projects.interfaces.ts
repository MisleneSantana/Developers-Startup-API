import { QueryResult } from 'pg';

export interface IProject {
  id: number;
  name: string;
  description: string;
  repository: string;
  startDate: Date | string;
  endDate: Date | string;
  developerId: number;
}

export type TProjectRequest = Omit<IProject, 'id'>;

export type TProjectResult = QueryResult<IProject>;

export type TJoinProject = {
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectRepository: string;
  projectStartDate: Date | string;
  projectEndDate: Date | string;
  projectDeveloperName: string;
};
