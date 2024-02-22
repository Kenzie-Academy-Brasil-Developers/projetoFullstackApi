import { Router } from "express";
import { validateBody, verifyToken } from "../middlewares/global.middleware";
import {
  createContactSchema,
  updatecontactSchema,
} from "../schemas/contact.schema";

import {
  createContactController,
  deleteContactController,
  readAllContactController,
  updateContactController,
} from "../controllers/contact.controller";
import { verifyContactUser, verifyUniqueContactEmail, verifyUniqueContactTelephone } from "../middlewares/contacts.middleware";

const contactRouter: Router = Router();

contactRouter.post(
  "",
  verifyToken,
  verifyUniqueContactEmail,
  verifyUniqueContactTelephone,
  validateBody(createContactSchema),
  createContactController
);

contactRouter.get("", verifyToken, readAllContactController);

contactRouter.patch(
  "/:id",
  verifyToken,
  verifyContactUser,
  validateBody(updatecontactSchema),
  updateContactController
);

contactRouter.delete(
  "/:id",
  verifyToken,
  verifyContactUser,
  deleteContactController
);

export { contactRouter };
