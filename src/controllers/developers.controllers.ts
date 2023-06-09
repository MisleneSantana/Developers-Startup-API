import { Request, Response } from 'express';
import { IDeveloper, TDeveloperRequest } from '../interfaces/developers.interfaces';
import { createDeveloperService } from '../services/developers/createDeveloper.services';
import { readDeveloperService } from '../services/developers/readDeveloper.services';
import { TDeveloperInfosRequest } from '../interfaces/developerInfos.interfaces';
import { createDeveloperInfosService } from '../services/developerInfos/createDeveloperInfos.services';
import { updateDeveloperService } from '../services/developers/updateDeveloper.services';
import { deleteDeveloperService } from '../services/developers/deleteDeveloper.services';

export const createDeveloperController = async (req: Request, res: Response): Promise<Response> => {
  const developerData: TDeveloperRequest = req.body;

  const newDeveloper: IDeveloper = await createDeveloperService(developerData);

  return res.status(201).json(newDeveloper);
};

export const readDeveloperController = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const developerById = await readDeveloperService(id);

  return res.json(developerById);
};

export const updateDeveloperController = async (req: Request, res: Response): Promise<Response> => {
  const developerData: TDeveloperRequest = req.body;
  const developerId: string = req.params.id;

  const updateDeveloperData = await updateDeveloperService(developerData, Number(developerId));

  return res.status(200).json(updateDeveloperData);
};

export const deleteDeveloperController = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  await deleteDeveloperService(id);

  return res.status(204).send();
};

export const createDeveloperInfosController = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const developerInfosData: TDeveloperInfosRequest = req.body;

  const newDeveloperInfos = await createDeveloperInfosService(developerInfosData, id);

  return res.status(201).json(newDeveloperInfos);
};
