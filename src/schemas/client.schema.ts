import { z } from "zod";

const clientSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(120),
  email: z.string().email().max(120),
  password: z.string().max(120),
  telephone: z.string().max(12),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

const createClientSchema = clientSchema.pick({
  name: true,
  email: true,
  password: true,
  telephone: true,
});
const updateclientSchema = createClientSchema.partial();
const clientReturnSchema = clientSchema.omit({ password: true });
const clientReturnListSchema = clientReturnSchema.array();
const clientReadSchema = clientReturnSchema.array();
const clientLoginSchema = clientSchema.pick({
  email: true,
  password: true,
});

export {
  clientSchema,
  createClientSchema,
  updateclientSchema,
  clientReturnSchema,
  clientReturnListSchema,
  clientReadSchema,
  clientLoginSchema,
};
