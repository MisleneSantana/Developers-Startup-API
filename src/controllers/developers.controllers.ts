import { Request, Response } from 'express';
import { TDeveloperRequest } from '../interfaces/developers.interfaces';
import { createDeveloperService } from '../services/developers/createDeveloper.services';
import { readDeveloperService } from '../services/developers/readDeveloper.services';
import { TDeveloperInfosRequest } from '../interfaces/developerInfos.interfaces';
import { createDeveloperInfosService } from '../services/developerInfos/createDeveloperInfos.services';

export const createDeveloperController = async (req: Request, res: Response): Promise<Response> => {
  const developerData: TDeveloperRequest = req.body;

  const newDeveloper = await createDeveloperService(developerData);

  return res.status(201).json(newDeveloper);
};

export const readDeveloperController = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const developerById = await readDeveloperService(id);

  return res.json(developerById);
};

export const createDeveloperInfosController = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const developerInfosData: TDeveloperInfosRequest = req.body;

  const newDeveloperInfos = await createDeveloperInfosService(parseInt(id), developerInfosData);

  return res.status(201).json(newDeveloperInfos);
};
