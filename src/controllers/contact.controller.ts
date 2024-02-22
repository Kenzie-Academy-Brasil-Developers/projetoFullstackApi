import { Request, Response } from "express";
import {
  createContactService,
  deleteContactService,
  readContactsByClientIdService,
  updateContactService,
} from "../services/contacts/contact.service";
import { ContactReturn } from "../interfaces/contact.interface";

const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = req.body;

  const id: number = parseInt(res.locals.id);

  const contact: ContactReturn = await createContactService(data, id);

  return res.status(201).json(contact);
};

const readAllContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(res.locals.id);

  const contact = await readContactsByClientIdService(userId);

  return res.status(200).json(contact);
};

const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = req.body;
  const id: number = parseInt(req.params.id);

  const newData = await updateContactService(data, id);

  return res.status(200).json(newData);
};

const deleteContactController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: number = parseInt(req.params.id);

  await deleteContactService(id);

  res.status(204).send();
};

export {
  createContactController,
  readAllContactController,
  updateContactController,
  deleteContactController,
};
