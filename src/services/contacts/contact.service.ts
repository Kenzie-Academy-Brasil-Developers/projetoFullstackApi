import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/Contact.entity";
import { Client } from "../../entities/Client.entity";
import {
  ContactCreate,
  ContactReadReturn,
  ContactReturn,
  ContactUpdate,
} from "../../interfaces/contact.interface";
import {
  contactReturnSchema,
  contactSchema,
} from "../../schemas/contact.schema";
import { AppError } from "../../errors/error";

const createContactService = async (data: ContactCreate,id: number): Promise<ContactReturn> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const userRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const client: Client | null = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!client) {
    throw new AppError("user not found", 404);
  }

  const contact: Contact = contactRepository.create({
    ...data,
    client,
  });

  await contactRepository.save(contact);

  const parse = contactReturnSchema.parse(contact);

  return parse;
};

const readContactsByClientIdService = async (clientId: number): Promise<ContactReadReturn> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const userRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const user: Client | null = await userRepository.findOne({
    where: {
      id: clientId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const contacts: Contact[] = await contactRepository.find({
    where: {
      client: {
        id: user.id,
      },
    },
  });

  return contacts;
};

const updateContactService = async (data: ContactUpdate,id: number): Promise<ContactReturn> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const oldList: Contact | null = await contactRepository.findOneBy({ id: id });

  if (!oldList) {
    throw new AppError("Contact not found", 404);
  }

  const newData: Contact = contactRepository.create({
    ...oldList,
    ...data,
  });

  await contactRepository.save(newData);

  const parse = contactSchema.parse(newData);

  return parse;
};

const deleteContactService = async (id: number): Promise<void> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);
  const dataId: Contact | null = await contactRepository.findOneBy({
    id: id,
  });

  if (!dataId) {
    throw new AppError("task not found", 404);
  }

  await contactRepository.remove(dataId);
};

export {
  updateContactService,
  createContactService,
  readContactsByClientIdService,
  deleteContactService,
};
