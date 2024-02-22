import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import Contact from "../entities/Contact.entity";
import {
  contactReturnSchema,
  createContactSchema,
} from "../schemas/contact.schema";

type ContactCreate = z.infer<typeof createContactSchema>;

type ContactUpdate = DeepPartial<ContactCreate>;

type ContactReturn = z.infer<typeof contactReturnSchema>;

type ContactReadReturn = ContactReturn[];

type ContactRepo = Repository<Contact>;

export {
  ContactCreate,
  ContactUpdate,
  ContactReturn,
  ContactReadReturn,
  ContactRepo,
};
