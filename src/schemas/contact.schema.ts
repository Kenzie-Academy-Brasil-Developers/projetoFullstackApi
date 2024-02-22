import { z } from "zod";

const contactSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(120),
  email: z.string().email().max(120),
  telephone: z.string().max(12),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});
const createNewContactSchema = contactSchema.omit({ id: true, clientId: true });
const createContactSchema = contactSchema.pick({
  name: true,
  email: true,
  telephone: true,
});
const updatecontactSchema = createContactSchema.partial();
const contactReturnSchema = contactSchema;
const contactReturnListSchema = contactReturnSchema.array();
const contactReadSchema = contactReturnSchema.array();

export {
  contactSchema,
  createNewContactSchema,
  createContactSchema,
  updatecontactSchema,
  contactReturnListSchema,
  contactReadSchema,
  contactReturnSchema,
};
