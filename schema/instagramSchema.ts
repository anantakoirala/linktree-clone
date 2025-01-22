import { z } from "zod";

export const instagramSchema = z.object({
  name: z.string().default("Instagram"),
  value: z
    .string()
    .refine((value) => value.startsWith("@") && value.length > "@".length, {
      message: "Please enter a valid Instagram username",
    }),
});
