import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import Client from "../entities/Client.entity";
import {
  clientLoginSchema,
  clientReturnSchema,
  createClientSchema,
} from "../schemas/client.schema";

type ClientCreate = z.infer<typeof createClientSchema>;

type ClientUpdate = DeepPartial<ClientCreate>;

type ClientReturn = z.infer<typeof clientReturnSchema>;

type ClientReadReturn = ClientReturn[];

type ClientLogin = z.infer<typeof clientLoginSchema>;

type LoginReturn = { token: string };

type ClientRepo = Repository<Client>;

export {
  ClientCreate,
  ClientLogin,
  ClientUpdate,
  ClientReturn,
  ClientReadReturn,
  LoginReturn,
  ClientRepo,
};
