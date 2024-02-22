import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/Client.entity";
import { AppError } from "../errors/error";

const verifyUniqueClientEmail = async (req: Request,res: Response,next: NextFunction): Promise<Response | void> => {
  const { email }: { email: string } = req.body;
  if (email === undefined) return next();

  const userRepo: Repository<Client> = AppDataSource.getRepository(Client);

  const user: Client | null = await userRepo.findOne({
    where: {
      email: email,
    },
  });

  if (user && user?.email !== undefined) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

const verifyUniqueClientTelephone = async (req: Request,res: Response,next: NextFunction): Promise<Response | void> => {
  const { telephone }: { telephone: string } = req.body;
  if (telephone === undefined) return next();

  const userRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const user: Client | null = await userRepository.findOneBy({
    telephone: telephone,
  });

  if (user && user.telephone !== undefined) {
    throw new AppError("Telephone already exists", 409);
  }

  return next();
};

const verifyClientExists = async (req: Request,res: Response,next: NextFunction): Promise<Response | void> => {
  const id: number = parseInt(req.params.id);

  const userRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const user: Client | null = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (user && user.id === undefined) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export {
  verifyUniqueClientEmail,
  verifyUniqueClientTelephone,
  verifyClientExists,
};
