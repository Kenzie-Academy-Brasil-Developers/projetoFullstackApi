import { NextFunction, Request, Response } from "express";
import { Contact } from "../entities/Contact.entity";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/error";

const verifyContactUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contactId: number = parseInt(req.params.id);

  const userId: number = parseInt(res.locals.id);

  const contact: Contact | null = await contactRepository.findOne({
    where: {
      id: contactId,
    },
    relations: {
      client: true,
    },
  });

  if (!contact) {
    throw new AppError("Contact not found!", 404);
  }

  if (contact?.client.id !== userId) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};


const verifyUniqueContactEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const contactRepository: Repository<Contact> =
  AppDataSource.getRepository(Contact);
  const {email} = req.body
  const contact: Contact | null = await contactRepository.findOneBy({email})

  if(contact) throw new AppError('Email alread exists', 409)

  return next()
}

const verifyUniqueContactTelephone = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const contactRepository: Repository<Contact> =
  AppDataSource.getRepository(Contact);
  const {telephone} = req.body
  const contact: Contact | null = await contactRepository.findOneBy({telephone})

  if(contact) throw new AppError('Telephone alread exists', 409)

  return next()
}


export { verifyContactUser, verifyUniqueContactEmail, verifyUniqueContactTelephone };
