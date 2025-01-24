import { z } from "zod";

export const xSchema = z.object({
  name: z.string().default("X"),
  displayName: z.string().default("X"),
  value: z
    .string()
    .refine((value) => value.startsWith("@") && value.length > "@".length, {
      message: "Please enter a valid X handle",
    }),
});
