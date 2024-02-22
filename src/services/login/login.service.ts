import { compare } from "bcryptjs";
import { ClientLogin } from "../../interfaces/client.interface";
import { Repository } from "typeorm";
import { Client } from "../../entities/Client.entity";
import { AppDataSource } from "../../data-source";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/error";

const loginService = async (data: ClientLogin): Promise<string> => {
  const userRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const user: Client | null = await userRepository.findOneBy({
    email: data.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordCompare: boolean = await compare(data.password, user.password);

  if (!passwordCompare) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign({}, process.env.SECRET_KEY!, {
    expiresIn: process.env.EXPIRES_IN,
    subject: String(user.id),
  });

  return token;
};

export { loginService };
