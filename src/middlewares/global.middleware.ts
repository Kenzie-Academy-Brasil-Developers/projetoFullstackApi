import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/error";

const validateBody =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);

    return next();
  };

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authentic: string | undefined = req.headers.authorization;

  if (authentic === undefined) {
    throw new AppError("Missing bearer token", 401);
  }

  const [_bearer, token] = authentic.split(" ");

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    res.locals.id = decoded.sub;
  });

  return next();
};

const verifyPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(res.locals.id);
  const idParams: number = parseInt(req.params.id);

  if (id === idParams) {
    return next();
  }

  throw new AppError("Insufficient permissions", 403);
};

export { verifyPermissions, verifyToken, validateBody };
