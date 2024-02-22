import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/Client.entity";
import {
  ClientCreate,
  ClientReturn,
  ClientUpdate,
} from "../../interfaces/client.interface";
import { clientReturnSchema } from "../../schemas/client.schema";
import { AppError } from "../../errors/error";

const createClientService = async (data: ClientCreate): Promise<ClientReturn> => {
  const userRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const user: Client = userRepository.create(data);

  await userRepository.save(user);

  const parse = clientReturnSchema.parse(user);

  return parse;
};

const retrieveUserByTokenService = async (id: number) => {
  const userRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const user: Client | null = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new AppError("User not found!", 403);
  }

  const client: ClientReturn = clientReturnSchema.parse(user);

  return client;
};

const readClienttByIdService = async (id: number): Promise<ClientReturn> => {
  const userRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const user: Client | null = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new AppError("User not found", 403);
  }

  const client: ClientReturn = clientReturnSchema.parse(user);

  return client;
};

const updateClientService = async (
  data: ClientUpdate,
  id: number
): Promise<ClientReturn> => {
  const userRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const oldData: Client | null = await userRepository.findOneBy({
    id: id,
  });

  const { ...userDataId } = data;

  const user: Client = userRepository.create({
    ...oldData,
    ...userDataId,
  });

  await userRepository.save(user);

  const parse: ClientReturn = clientReturnSchema.parse(user);

  return parse;
};

const deleteClientService = async (id: number): Promise<void> => {
  const userRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  await userRepository.delete(id);
};

export {
  deleteClientService,
  createClientService,
  updateClientService,
  readClienttByIdService,
  retrieveUserByTokenService,
};
