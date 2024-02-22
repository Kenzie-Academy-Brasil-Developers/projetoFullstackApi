import { Request, Response, request } from "express";
import { ClientCreate, ClientReturn } from "../interfaces/client.interface";
import {
  createClientService,
  deleteClientService,
  readClienttByIdService,
  retrieveUserByTokenService,
  updateClientService,
} from "../services/clients/client.service";

const createClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: ClientCreate = req.body;

  const client: ClientReturn = await createClientService(data);

  return res.status(201).json(client);
};

const retrieveUserByTokenController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(res.locals.id);

  const newData = await retrieveUserByTokenService(id);

  return res.status(200).json(newData);
};

const readClientByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const data = await readClienttByIdService(id);

  return res.status(200).json(data);
};

const updateClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const data = req.body;

  const updateClient = await updateClientService(data, id);

  return res.status(200).json(updateClient);
};

const deleteClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  await deleteClientService(id);

  return res.status(204).json();
};

export {
  createClientController,
  readClientByIdController,
  retrieveUserByTokenController,
  updateClientController,
  deleteClientController,
};
