import { Request, Response } from 'express';
import { IProject, TProjectRequest } from '../interfaces/projects.interfaces';
import { createProjectService } from '../services/projects/createProject.services';
import { readProjectService } from '../services/projects/readProject.services';
import { updateProjectService } from '../services/projects/updateProject.services';

export const createProjectController = async (req: Request, res: Response): Promise<Response> => {
  const projectData: TProjectRequest = req.body;

  const newProject: IProject = await createProjectService(projectData);

  return res.status(201).json(newProject);
};

export const readProjectController = async (req: Request, res: Response): Promise<Response> => {
  const projectId: string = req.params.id;

  const projectById = await readProjectService(projectId);

  return res.json(projectById);
};

export const updateProjectController = async (req: Request, res: Response): Promise<Response> => {
  const projectData: TProjectRequest = req.body;
  const projectId: string = req.params.id;

  const updateDeveloperData = await updateProjectService(projectData, parseInt(projectId));

  return res.status(200).json(updateDeveloperData);
};
