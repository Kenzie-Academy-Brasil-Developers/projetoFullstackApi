import { retrieveUserByTokenController } from "./../controllers/client.controller";
import { Router } from "express";
import {
  validateBody,
  verifyPermissions,
  verifyToken,
} from "../middlewares/global.middleware";
import {
  createClientSchema,
  updateclientSchema,
} from "../schemas/client.schema";
import {
  verifyClientExists,
  verifyUniqueClientEmail,
  verifyUniqueClientTelephone,
} from "../middlewares/client.middleware";
import {
  createClientController,
  deleteClientController,
  readClientByIdController,
  updateClientController,
} from "../controllers/client.controller";

const clientRouter: Router = Router();

clientRouter.post(
  "",
  validateBody(createClientSchema),
  verifyUniqueClientEmail,
  verifyUniqueClientTelephone,
  createClientController
);

clientRouter.get("", verifyToken, retrieveUserByTokenController);

clientRouter.get(
  "/:id",
  verifyToken,
  verifyPermissions,
  verifyClientExists,
  readClientByIdController
);

clientRouter.patch(
  "/:id",
  verifyToken,
  verifyPermissions,
  verifyClientExists,
  validateBody(updateclientSchema),
  verifyUniqueClientEmail,
  verifyUniqueClientTelephone,
  updateClientController
);

clientRouter.delete(
  "/:id",
  verifyToken,
  verifyClientExists,
  verifyPermissions,
  deleteClientController
);

export { clientRouter };
